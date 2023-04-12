// https://www.terraform.io/docs/internals/provider-registry-protocol.html

import { Router } from 'express';
import { v4 } from 'uuid';
import multiparty from 'multiparty';
import logger from '../lib/logger';
import storage from '../storages/storage';
import Store from '../stores/store';
import { extractShasum } from '../lib/utils';
import {
  File as PF,
  FormData as FD,
  ProviderData,
} from '../models/provider/provider';

const router = Router();
const store = new Store()

// Route for registering a provider with version
router.post('/:namespace/:type/:version', (req, res, next) => {
  const { namespace, type, version } = req.params;

  const destPath = `${namespace}/${type}/${version}`;

  const form = new multiparty.Form();

  form.on('error', (err) => {
    logger.error(`Error parsing form: ${err.stack}`);
    next(err);
  });

  const formData: FD = {};
  const files: PF[] = [];
  let jsonData: string;
  let data: ProviderData;

  form.on('part', async (part) => {
    const id = v4();
    formData[id] = new Array<Uint8Array>();

    part.on('error', (err) => {
      logger.error(`Error parsing form: ${err.stack}`);
      next(err);
    });

    part.on('data', (buffer) => {
      formData[id].push(buffer);
    });

    part.on('end', async () => {
      if (part.filename) {
        files.push({
          file: Buffer.concat(formData[id]),
          filename: part.filename,
          requestName: part.name,
        });
      } else {
        jsonData = Buffer.concat(formData[id]).toString();
      }
    });
  });

  form.on('close', async () => {
    try {
      data = JSON.parse(jsonData);
    } catch (e) {
      const error = new Error('Invalid JSON format');
      res.statusCode = 400;
      error.message = 'There is invalid JSON for a data field';
      return next(error);
    }

    try {
      if (files.length < 3) {
        const error = new Error('Not enough files');
        res.statusCode = 400;
        error.message = 'You must attach at least three files including provider, shashum and signature';
        return next(error);
      }

      const shasumsFile = files.filter((f) => f.filename.endsWith('SHA256SUMS'));
      if (shasumsFile.length < 1) {
        const error = new Error('No SHA256SUM file');
        res.statusCode = 400;
        error.message = 'There is no SHA 256 SUMS file attached';
        return next(error);
      }

      if (!files.some((f) => f.filename.endsWith('SHA256SUMS.sig'))) {
        const error = new Error('No signature file');
        res.statusCode = 400;
        error.message = 'There is no signature file attached';
        return next(error);
      }

      const providerFiles = files.filter((f) => f.filename.endsWith('.zip'));
      if (!data.platforms || data.platforms.length !== providerFiles.length) {
        const error = new Error('Different count between data and files');
        res.statusCode = 400;
        error.message = 'You must provide matched platform data and provider files';
        return next(error);
      }

      const isFilesMatched = data.platforms.every((p) =>
        providerFiles.some((f) => f.filename === `${namespace}-${type}_${version}_${p.os}_${p.arch}.zip`)
      );
      if (!isFilesMatched) {
        const error = new Error('Unmatched platform data and files');
        res.statusCode = 400;
        error.message = 'You must provide list of platform(os/arch) matching submitted files';
        return next(error);
      }

      const hasProvider = await store.providerHasVersion({
        namespace: data.namespace,
        type: data.type,
        version: data.version,
      });

      if (hasProvider) {
        const error = new Error('The provider already exists');
        res.statusCode = 409;
        error.message = 'You must submit different provider with namespace, type or version';
        return next(error);
      }

      const shaFileMap = await extractShasum(shasumsFile[0].file.toString());
      data.platforms.forEach((p) => {
        if (p.filename && !p.shasum) {
          p.shasum = shaFileMap[p.filename] // eslint-disable-line no-param-reassign
        }
      });

      // save files
      const promises = files.map(async (archive) => {
        const location = `${destPath}/${archive.filename}`;
        await storage.saveProvider(location, archive.file);
      });
      await Promise.all(promises);

      const savedData = await store.saveProvider(data);
      return res.status(201).render('providers/register', savedData ?? {});
    } catch (e) {
      logger.error(e);
      return next(e);
    }
  });

  form.parse(req);
});

// https://www.terraform.io/docs/internals/provider-registry-protocol.html#list-available-versions
router.get('/:namespace/:type/versions', async (req, res, next) => {
  const options = { ...req.params };

  const versions = await store.getProviderVersions(options);
  if (!versions) {
    return next();
  }

  if (versions.versions.length === 0) {
    return res.status(404).send('response length is 0');
  }

  return res.render('providers/versions', { versions: versions.versions });
});

// https://www.terraform.io/docs/internals/provider-registry-protocol.html#find-a-provider-package
router.get(
  '/:namespace/:type/:version/download/:os/:arch',
  async (req, res, next) => {
    const options = { ...req.params };

    const providerPackage = await store.findProviderPackage(options);
    if (!providerPackage) {
      return next();
    }

    const viewModel = {
      protocols: providerPackage.protocols,
      filename: providerPackage.filename,
      os: providerPackage.os,
      arch: providerPackage.arch,
      downloadUrl:
        `/v1/providers/${options.namespace}/${options.type}/${options.version}/download/${options.os}/${options.arch}/zip`,
      shaSumsUrl:
        `/v1/providers/${options.namespace}/${options.type}/${options.version}/sha256sums`,
      shaSumsSignatureUrl:
        `/v1/providers/${options.namespace}/${options.type}/${options.version}/sha256sums.sig`,
      shasum: providerPackage.shasum,
      gpgPublicKeys: providerPackage.gpgPublicKeys,
    };

    return res.render('providers/providerPackage', viewModel);
  },
);

// Route for downloading provider package for specified os and arch
router.get(
  '/:namespace/:type/:version/download/:os/:arch/zip',
  async (req, res, next) => {
    try {
      const options = { ...req.params };

      const providerPackage = await store.findProviderPackage(options);
      if (!providerPackage) {
        return next();
      }

      // const provider = await store.findProviderPackage(options);
      const protocols = providerPackage.protocols.map((prot) => Math.floor(parseInt(prot)));
      res.header('x-terraform-protocol-version', Math.min(...protocols).toString());
      res.header(
        'x-terraform-protocol-versions',
        providerPackage.protocols.join(', '),
      );

      const file = await storage.getProvider(
        `${options.namespace}/${options.type}/${options.version}/${providerPackage.filename}`,
      );
      return res.attachment(providerPackage.filename).send(file);
    } catch (e) {
      return next(e);
    }
  },
);

// Route for getting checksums file expressed in provider metadata
router.get('/:namespace/:type/:version/sha256sums', async (req, res, next) => {
  try {
    const options = { ...req.params };

    const sumsLocation =
      `${options.namespace}/${options.type}/${options.version}/${options.namespace}-${options.type}_${options.version}_SHA256SUMS`;
    const shasumsContent = await storage.getProvider(sumsLocation);
    if (!shasumsContent) {
      return next();
    }

    const provider = await store.getProviderVersion({
      namespace: options.namespace,
      type: options.type,
      version: options.version,
    });
    if (!provider) {
      return next();
    }

    const protocols = provider.protocols.map((prot) => Math.floor(parseInt(prot)));
    res.header('x-terraform-protocol-version', Math.min(...protocols).toString());
    res.header('x-terraform-protocol-versions', provider.protocols.join(', '));

    return res.contentType('text/plain').send(shasumsContent.toString('utf8'));
  } catch (e) {
    return next(e);
  }
});

// Route for getting signature file for checksums expressed in provider metadata
router.get(
  '/:namespace/:type/:version/sha256sums.sig',
  async (req, res, next) => {
    try {
      const options = { ...req.params };
      const sigLocation =
        `${options.namespace}/${options.type}/${options.version}/${options.namespace}-${options.type}_${options.version}_SHA256SUMS.sig`;
      const sig = await storage.getProvider(sigLocation);
      if (!sig) {
        return next();
      }

      const provider = await store.getProviderVersion(options);
      if (!provider) {
        return next();
      }

      const protocols = provider.protocols.map((prot) => Math.floor(parseInt(prot)));
      res.header('x-terraform-protocol-version', Math.min(...protocols).toString());
      res.header(
        'x-terraform-protocol-versions',
        provider.protocols.join(', '),
      );

      return res
        .set('Content-Type', 'application/octet-stream')
        .set(
          'Content-disposition',
          `attachment; filename=${options.namespace}-${options.type}_${options.version}_SHA256SUMS.sig`,
        )
        .send(sig);
    } catch (e) {
      return next(e);
    }
  },
);

export default router;
