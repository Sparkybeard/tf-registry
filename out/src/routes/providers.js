"use strict";
// https://www.terraform.io/docs/internals/provider-registry-protocol.html
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const express_1 = require("express");
const uuid_1 = require("uuid");
const multiparty_1 = tslib_1.__importDefault(require("multiparty"));
const logger_1 = tslib_1.__importDefault(require("../lib/logger"));
const storage_1 = tslib_1.__importDefault(require("../storages/storage"));
const store_1 = tslib_1.__importDefault(require("../stores/store"));
const utils_1 = require("../lib/utils");
const router = (0, express_1.Router)();
const store = new store_1.default();
// Route for registering a provider with version
router.post('/:namespace/:type/:version', (req, res, next) => {
    const { namespace, type, version } = req.params;
    const destPath = `${namespace}/${type}/${version}`;
    const form = new multiparty_1.default.Form();
    form.on('error', (err) => {
        logger_1.default.error(`Error parsing form: ${err.stack}`);
        next(err);
    });
    const formData = {};
    const files = [];
    let jsonData;
    let data;
    form.on('part', (part) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const id = (0, uuid_1.v4)();
        formData[id] = new Array();
        part.on('error', (err) => {
            logger_1.default.error(`Error parsing form: ${err.stack}`);
            next(err);
        });
        part.on('data', (buffer) => {
            formData[id].push(buffer);
        });
        part.on('end', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
            if (part.filename) {
                files.push({
                    file: Buffer.concat(formData[id]),
                    filename: part.filename,
                    requestName: part.name,
                });
            }
            else {
                jsonData = Buffer.concat(formData[id]).toString();
            }
        }));
    }));
    form.on('close', () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        try {
            data = JSON.parse(jsonData);
        }
        catch (e) {
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
            const isFilesMatched = data.platforms.every((p) => providerFiles.some((f) => f.filename === `${namespace}-${type}_${version}_${p.os}_${p.arch}.zip`));
            if (!isFilesMatched) {
                const error = new Error('Unmatched platform data and files');
                res.statusCode = 400;
                error.message = 'You must provide list of platform(os/arch) matching submitted files';
                return next(error);
            }
            const hasProvider = yield store.providerHasVersion({
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
            const shaFileMap = yield (0, utils_1.extractShasum)(shasumsFile[0].file.toString());
            data.platforms.forEach((p) => {
                if (p.filename && !p.shasum) {
                    p.shasum = shaFileMap[p.filename]; // eslint-disable-line no-param-reassign
                }
            });
            // save files
            const promises = files.map((archive) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
                const location = `${destPath}/${archive.filename}`;
                yield storage_1.default.saveProvider(location, archive.file);
            }));
            yield Promise.all(promises);
            const savedData = yield store.saveProvider(data);
            return res.status(201).render('providers/register', savedData !== null && savedData !== void 0 ? savedData : {});
        }
        catch (e) {
            logger_1.default.error(e);
            return next(e);
        }
    }));
    form.parse(req);
});
// https://www.terraform.io/docs/internals/provider-registry-protocol.html#list-available-versions
router.get('/:namespace/:type/versions', (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const options = Object.assign({}, req.params);
    const versions = yield store.getProviderVersions(options);
    if (!versions) {
        return next();
    }
    if (versions.versions.length === 0) {
        return res.status(404).send('response length is 0');
    }
    return res.render('providers/versions', { versions: versions.versions });
}));
// https://www.terraform.io/docs/internals/provider-registry-protocol.html#find-a-provider-package
router.get('/:namespace/:type/:version/download/:os/:arch', (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const options = Object.assign({}, req.params);
    const providerPackage = yield store.findProviderPackage(options);
    if (!providerPackage) {
        return next();
    }
    const viewModel = {
        protocols: providerPackage.protocols,
        filename: providerPackage.filename,
        os: providerPackage.os,
        arch: providerPackage.arch,
        downloadUrl: `/v1/providers/${options.namespace}/${options.type}/${options.version}/download/${options.os}/${options.arch}/zip`,
        shaSumsUrl: `/v1/providers/${options.namespace}/${options.type}/${options.version}/sha256sums`,
        shaSumsSignatureUrl: `/v1/providers/${options.namespace}/${options.type}/${options.version}/sha256sums.sig`,
        shasum: providerPackage.shasum,
        gpgPublicKeys: providerPackage.gpgPublicKeys,
    };
    return res.render('providers/providerPackage', viewModel);
}));
// Route for downloading provider package for specified os and arch
router.get('/:namespace/:type/:version/download/:os/:arch/zip', (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = Object.assign({}, req.params);
        const providerPackage = yield store.findProviderPackage(options);
        if (!providerPackage) {
            return next();
        }
        // const provider = await store.findProviderPackage(options);
        const protocols = providerPackage.protocols.map((prot) => Math.floor(parseInt(prot)));
        res.header('x-terraform-protocol-version', Math.min(...protocols).toString());
        res.header('x-terraform-protocol-versions', providerPackage.protocols.join(', '));
        const file = yield storage_1.default.getProvider(`${options.namespace}/${options.type}/${options.version}/${providerPackage.filename}`);
        return res.attachment(providerPackage.filename).send(file);
    }
    catch (e) {
        return next(e);
    }
}));
// Route for getting checksums file expressed in provider metadata
router.get('/:namespace/:type/:version/sha256sums', (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = Object.assign({}, req.params);
        const sumsLocation = `${options.namespace}/${options.type}/${options.version}/${options.namespace}-${options.type}_${options.version}_SHA256SUMS`;
        const shasumsContent = yield storage_1.default.getProvider(sumsLocation);
        if (!shasumsContent) {
            return next();
        }
        const provider = yield store.getProviderVersion({
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
    }
    catch (e) {
        return next(e);
    }
}));
// Route for getting signature file for checksums expressed in provider metadata
router.get('/:namespace/:type/:version/sha256sums.sig', (req, res, next) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    try {
        const options = Object.assign({}, req.params);
        const sigLocation = `${options.namespace}/${options.type}/${options.version}/${options.namespace}-${options.type}_${options.version}_SHA256SUMS.sig`;
        const sig = yield storage_1.default.getProvider(sigLocation);
        if (!sig) {
            return next();
        }
        const provider = yield store.getProviderVersion(options);
        if (!provider) {
            return next();
        }
        const protocols = provider.protocols.map((prot) => Math.floor(parseInt(prot)));
        res.header('x-terraform-protocol-version', Math.min(...protocols).toString());
        res.header('x-terraform-protocol-versions', provider.protocols.join(', '));
        return res
            .set('Content-Type', 'application/octet-stream')
            .set('Content-disposition', `attachment; filename=${options.namespace}-${options.type}_${options.version}_SHA256SUMS.sig`)
            .send(sig);
    }
    catch (e) {
        return next(e);
    }
}));
exports.default = router;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoicHJvdmlkZXJzLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL3JvdXRlcy9wcm92aWRlcnMudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLDBFQUEwRTs7O0FBRTFFLHFDQUFpQztBQUNqQywrQkFBMEI7QUFDMUIsb0VBQW9DO0FBQ3BDLG1FQUFtQztBQUNuQywwRUFBMEM7QUFDMUMsb0VBQW9DO0FBQ3BDLHdDQUE2QztBQU83QyxNQUFNLE1BQU0sR0FBRyxJQUFBLGdCQUFNLEdBQUUsQ0FBQztBQUN4QixNQUFNLEtBQUssR0FBRyxJQUFJLGVBQUssRUFBRSxDQUFBO0FBRXpCLGdEQUFnRDtBQUNoRCxNQUFNLENBQUMsSUFBSSxDQUFDLDRCQUE0QixFQUFFLENBQUMsR0FBRyxFQUFFLEdBQUcsRUFBRSxJQUFJLEVBQUUsRUFBRTtJQUMzRCxNQUFNLEVBQUUsU0FBUyxFQUFFLElBQUksRUFBRSxPQUFPLEVBQUUsR0FBRyxHQUFHLENBQUMsTUFBTSxDQUFDO0lBRWhELE1BQU0sUUFBUSxHQUFHLEdBQUcsU0FBUyxJQUFJLElBQUksSUFBSSxPQUFPLEVBQUUsQ0FBQztJQUVuRCxNQUFNLElBQUksR0FBRyxJQUFJLG9CQUFVLENBQUMsSUFBSSxFQUFFLENBQUM7SUFFbkMsSUFBSSxDQUFDLEVBQUUsQ0FBQyxPQUFPLEVBQUUsQ0FBQyxHQUFHLEVBQUUsRUFBRTtRQUN2QixnQkFBTSxDQUFDLEtBQUssQ0FBQyx1QkFBdUIsR0FBRyxDQUFDLEtBQUssRUFBRSxDQUFDLENBQUM7UUFDakQsSUFBSSxDQUFDLEdBQUcsQ0FBQyxDQUFDO0lBQ1osQ0FBQyxDQUFDLENBQUM7SUFFSCxNQUFNLFFBQVEsR0FBTyxFQUFFLENBQUM7SUFDeEIsTUFBTSxLQUFLLEdBQVMsRUFBRSxDQUFDO0lBQ3ZCLElBQUksUUFBZ0IsQ0FBQztJQUNyQixJQUFJLElBQWtCLENBQUM7SUFFdkIsSUFBSSxDQUFDLEVBQUUsQ0FBQyxNQUFNLEVBQUUsQ0FB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Q0FBQyxDQUFDO1FBQy9FLEdBQUcsQ0FBQyxNQUFNLENBQUMsOEJBQThCLEVBQUUsSUFBSSxDQUFDLEdBQUcsQ0FBQyxHQUFHLFNBQVMsQ0FBQyxDQUFDLFFBQVEsRUFBRSxDQUFDLENBQUM7UUFDOUUsR0FBRyxDQUFDLE1BQU0sQ0FDUiwrQkFBK0IsRUFDL0IsUUFBUSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLENBQzlCLENBQUM7UUFFRixPQUFPLEdBQUc7YUFDUCxHQUFHLENBQUMsY0FBYyxFQUFFLDBCQUEwQixDQUFDO2FBQy9DLEdBQUcsQ0FDRixxQkFBcUIsRUFDckIsd0JBQXdCLE9BQU8sQ0FBQyxTQUFTLElBQUksT0FBTyxDQUFDLElBQUksSUFBSSxPQUFPLENBQUMsT0FBTyxpQkFBaUIsQ0FDOUY7YUFDQSxJQUFJLENBQUMsR0FBRyxDQUFDLENBQUM7S0FDZDtJQUFDLE9BQU8sQ0FBQyxFQUFFO1FBQ1YsT0FBTyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7S0FDaEI7QUFDSCxDQUFDLENBQUEsQ0FDRixDQUFDO0FBRUYsa0JBQWUsTUFBTSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiLy8gaHR0cHM6Ly93d3cudGVycmFmb3JtLmlvL2RvY3MvaW50ZXJuYWxzL3Byb3ZpZGVyLXJlZ2lzdHJ5LXByb3RvY29sLmh0bWxcblxuaW1wb3J0IHsgUm91dGVyIH0gZnJvbSAnZXhwcmVzcyc7XG5pbXBvcnQgeyB2NCB9IGZyb20gJ3V1aWQnO1xuaW1wb3J0IG11bHRpcGFydHkgZnJvbSAnbXVsdGlwYXJ0eSc7XG5pbXBvcnQgbG9nZ2VyIGZyb20gJy4uL2xpYi9sb2dnZXInO1xuaW1wb3J0IHN0b3JhZ2UgZnJvbSAnLi4vc3RvcmFnZXMvc3RvcmFnZSc7XG5pbXBvcnQgU3RvcmUgZnJvbSAnLi4vc3RvcmVzL3N0b3JlJztcbmltcG9ydCB7IGV4dHJhY3RTaGFzdW0gfSBmcm9tICcuLi9saWIvdXRpbHMnO1xuaW1wb3J0IHtcbiAgRmlsZSBhcyBQRixcbiAgRm9ybURhdGEgYXMgRkQsXG4gIFByb3ZpZGVyRGF0YSxcbn0gZnJvbSAnLi4vbW9kZWxzL3Byb3ZpZGVyL3Byb3ZpZGVyJztcblxuY29uc3Qgcm91dGVyID0gUm91dGVyKCk7XG5jb25zdCBzdG9yZSA9IG5ldyBTdG9yZSgpXG5cbi8vIFJvdXRlIGZvciByZWdpc3RlcmluZyBhIHByb3ZpZGVyIHdpdGggdmVyc2lvblxucm91dGVyLnBvc3QoJy86bmFtZXNwYWNlLzp0eXBlLzp2ZXJzaW9uJywgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIGNvbnN0IHsgbmFtZXNwYWNlLCB0eXBlLCB2ZXJzaW9uIH0gPSByZXEucGFyYW1zO1xuXG4gIGNvbnN0IGRlc3RQYXRoID0gYCR7bmFtZXNwYWNlfS8ke3R5cGV9LyR7dmVyc2lvbn1gO1xuXG4gIGNvbnN0IGZvcm0gPSBuZXcgbXVsdGlwYXJ0eS5Gb3JtKCk7XG5cbiAgZm9ybS5vbignZXJyb3InLCAoZXJyKSA9PiB7XG4gICAgbG9nZ2VyLmVycm9yKGBFcnJvciBwYXJzaW5nIGZvcm06ICR7ZXJyLnN0YWNrfWApO1xuICAgIG5leHQoZXJyKTtcbiAgfSk7XG5cbiAgY29uc3QgZm9ybURhdGE6IEZEID0ge307XG4gIGNvbnN0IGZpbGVzOiBQRltdID0gW107XG4gIGxldCBqc29uRGF0YTogc3RyaW5nO1xuICBsZXQgZGF0YTogUHJvdmlkZXJEYXRhO1xuXG4gIGZvcm0ub24oJ3BhcnQnLCBhc3luYyAocGFydCkgPT4ge1xuICAgIGNvbnN0IGlkID0gdjQoKTtcbiAgICBmb3JtRGF0YVtpZF0gPSBuZXcgQXJyYXk8VWludDhBcnJheT4oKTtcblxuICAgIHBhcnQub24oJ2Vycm9yJywgKGVycikgPT4ge1xuICAgICAgbG9nZ2VyLmVycm9yKGBFcnJvciBwYXJzaW5nIGZvcm06ICR7ZXJyLnN0YWNrfWApO1xuICAgICAgbmV4dChlcnIpO1xuICAgIH0pO1xuXG4gICAgcGFydC5vbignZGF0YScsIChidWZmZXIpID0+IHtcbiAgICAgIGZvcm1EYXRhW2lkXS5wdXNoKGJ1ZmZlcik7XG4gICAgfSk7XG5cbiAgICBwYXJ0Lm9uKCdlbmQnLCBhc3luYyAoKSA9PiB7XG4gICAgICBpZiAocGFydC5maWxlbmFtZSkge1xuICAgICAgICBmaWxlcy5wdXNoKHtcbiAgICAgICAgICBmaWxlOiBCdWZmZXIuY29uY2F0KGZvcm1EYXRhW2lkXSksXG4gICAgICAgICAgZmlsZW5hbWU6IHBhcnQuZmlsZW5hbWUsXG4gICAgICAgICAgcmVxdWVzdE5hbWU6IHBhcnQubmFtZSxcbiAgICAgICAgfSk7XG4gICAgICB9IGVsc2Uge1xuICAgICAgICBqc29uRGF0YSA9IEJ1ZmZlci5jb25jYXQoZm9ybURhdGFbaWRdKS50b1N0cmluZygpO1xuICAgICAgfVxuICAgIH0pO1xuICB9KTtcblxuICBmb3JtLm9uKCdjbG9zZScsIGFzeW5jICgpID0+IHtcbiAgICB0cnkge1xuICAgICAgZGF0YSA9IEpTT04ucGFyc2UoanNvbkRhdGEpO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdJbnZhbGlkIEpTT04gZm9ybWF0Jyk7XG4gICAgICByZXMuc3RhdHVzQ29kZSA9IDQwMDtcbiAgICAgIGVycm9yLm1lc3NhZ2UgPSAnVGhlcmUgaXMgaW52YWxpZCBKU09OIGZvciBhIGRhdGEgZmllbGQnO1xuICAgICAgcmV0dXJuIG5leHQoZXJyb3IpO1xuICAgIH1cblxuICAgIHRyeSB7XG4gICAgICBpZiAoZmlsZXMubGVuZ3RoIDwgMykge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignTm90IGVub3VnaCBmaWxlcycpO1xuICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDQwMDtcbiAgICAgICAgZXJyb3IubWVzc2FnZSA9ICdZb3UgbXVzdCBhdHRhY2ggYXQgbGVhc3QgdGhyZWUgZmlsZXMgaW5jbHVkaW5nIHByb3ZpZGVyLCBzaGFzaHVtIGFuZCBzaWduYXR1cmUnO1xuICAgICAgICByZXR1cm4gbmV4dChlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHNoYXN1bXNGaWxlID0gZmlsZXMuZmlsdGVyKChmKSA9PiBmLmZpbGVuYW1lLmVuZHNXaXRoKCdTSEEyNTZTVU1TJykpO1xuICAgICAgaWYgKHNoYXN1bXNGaWxlLmxlbmd0aCA8IDEpIHtcbiAgICAgICAgY29uc3QgZXJyb3IgPSBuZXcgRXJyb3IoJ05vIFNIQTI1NlNVTSBmaWxlJyk7XG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgICAgICBlcnJvci5tZXNzYWdlID0gJ1RoZXJlIGlzIG5vIFNIQSAyNTYgU1VNUyBmaWxlIGF0dGFjaGVkJztcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICBpZiAoIWZpbGVzLnNvbWUoKGYpID0+IGYuZmlsZW5hbWUuZW5kc1dpdGgoJ1NIQTI1NlNVTVMuc2lnJykpKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdObyBzaWduYXR1cmUgZmlsZScpO1xuICAgICAgICByZXMuc3RhdHVzQ29kZSA9IDQwMDtcbiAgICAgICAgZXJyb3IubWVzc2FnZSA9ICdUaGVyZSBpcyBubyBzaWduYXR1cmUgZmlsZSBhdHRhY2hlZCc7XG4gICAgICAgIHJldHVybiBuZXh0KGVycm9yKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvdmlkZXJGaWxlcyA9IGZpbGVzLmZpbHRlcigoZikgPT4gZi5maWxlbmFtZS5lbmRzV2l0aCgnLnppcCcpKTtcbiAgICAgIGlmICghZGF0YS5wbGF0Zm9ybXMgfHwgZGF0YS5wbGF0Zm9ybXMubGVuZ3RoICE9PSBwcm92aWRlckZpbGVzLmxlbmd0aCkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignRGlmZmVyZW50IGNvdW50IGJldHdlZW4gZGF0YSBhbmQgZmlsZXMnKTtcbiAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDA7XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgPSAnWW91IG11c3QgcHJvdmlkZSBtYXRjaGVkIHBsYXRmb3JtIGRhdGEgYW5kIHByb3ZpZGVyIGZpbGVzJztcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBpc0ZpbGVzTWF0Y2hlZCA9IGRhdGEucGxhdGZvcm1zLmV2ZXJ5KChwKSA9PlxuICAgICAgICBwcm92aWRlckZpbGVzLnNvbWUoKGYpID0+IGYuZmlsZW5hbWUgPT09IGAke25hbWVzcGFjZX0tJHt0eXBlfV8ke3ZlcnNpb259XyR7cC5vc31fJHtwLmFyY2h9LnppcGApXG4gICAgICApO1xuICAgICAgaWYgKCFpc0ZpbGVzTWF0Y2hlZCkge1xuICAgICAgICBjb25zdCBlcnJvciA9IG5ldyBFcnJvcignVW5tYXRjaGVkIHBsYXRmb3JtIGRhdGEgYW5kIGZpbGVzJyk7XG4gICAgICAgIHJlcy5zdGF0dXNDb2RlID0gNDAwO1xuICAgICAgICBlcnJvci5tZXNzYWdlID0gJ1lvdSBtdXN0IHByb3ZpZGUgbGlzdCBvZiBwbGF0Zm9ybShvcy9hcmNoKSBtYXRjaGluZyBzdWJtaXR0ZWQgZmlsZXMnO1xuICAgICAgICByZXR1cm4gbmV4dChlcnJvcik7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IGhhc1Byb3ZpZGVyID0gYXdhaXQgc3RvcmUucHJvdmlkZXJIYXNWZXJzaW9uKHtcbiAgICAgICAgbmFtZXNwYWNlOiBkYXRhLm5hbWVzcGFjZSxcbiAgICAgICAgdHlwZTogZGF0YS50eXBlLFxuICAgICAgICB2ZXJzaW9uOiBkYXRhLnZlcnNpb24sXG4gICAgICB9KTtcblxuICAgICAgaWYgKGhhc1Byb3ZpZGVyKSB7XG4gICAgICAgIGNvbnN0IGVycm9yID0gbmV3IEVycm9yKCdUaGUgcHJvdmlkZXIgYWxyZWFkeSBleGlzdHMnKTtcbiAgICAgICAgcmVzLnN0YXR1c0NvZGUgPSA0MDk7XG4gICAgICAgIGVycm9yLm1lc3NhZ2UgPSAnWW91IG11c3Qgc3VibWl0IGRpZmZlcmVudCBwcm92aWRlciB3aXRoIG5hbWVzcGFjZSwgdHlwZSBvciB2ZXJzaW9uJztcbiAgICAgICAgcmV0dXJuIG5leHQoZXJyb3IpO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBzaGFGaWxlTWFwID0gYXdhaXQgZXh0cmFjdFNoYXN1bShzaGFzdW1zRmlsZVswXS5maWxlLnRvU3RyaW5nKCkpO1xuICAgICAgZGF0YS5wbGF0Zm9ybXMuZm9yRWFjaCgocCkgPT4ge1xuICAgICAgICBpZiAocC5maWxlbmFtZSAmJiAhcC5zaGFzdW0pIHtcbiAgICAgICAgICBwLnNoYXN1bSA9IHNoYUZpbGVNYXBbcC5maWxlbmFtZV0gLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1wYXJhbS1yZWFzc2lnblxuICAgICAgICB9XG4gICAgICB9KTtcblxuICAgICAgLy8gc2F2ZSBmaWxlc1xuICAgICAgY29uc3QgcHJvbWlzZXMgPSBmaWxlcy5tYXAoYXN5bmMgKGFyY2hpdmUpID0+IHtcbiAgICAgICAgY29uc3QgbG9jYXRpb24gPSBgJHtkZXN0UGF0aH0vJHthcmNoaXZlLmZpbGVuYW1lfWA7XG4gICAgICAgIGF3YWl0IHN0b3JhZ2Uuc2F2ZVByb3ZpZGVyKGxvY2F0aW9uLCBhcmNoaXZlLmZpbGUpO1xuICAgICAgfSk7XG4gICAgICBhd2FpdCBQcm9taXNlLmFsbChwcm9taXNlcyk7XG5cbiAgICAgIGNvbnN0IHNhdmVkRGF0YSA9IGF3YWl0IHN0b3JlLnNhdmVQcm92aWRlcihkYXRhKTtcbiAgICAgIHJldHVybiByZXMuc3RhdHVzKDIwMSkucmVuZGVyKCdwcm92aWRlcnMvcmVnaXN0ZXInLCBzYXZlZERhdGEgPz8ge30pO1xuICAgIH0gY2F0Y2ggKGUpIHtcbiAgICAgIGxvZ2dlci5lcnJvcihlKTtcbiAgICAgIHJldHVybiBuZXh0KGUpO1xuICAgIH1cbiAgfSk7XG5cbiAgZm9ybS5wYXJzZShyZXEpO1xufSk7XG5cbi8vIGh0dHBzOi8vd3d3LnRlcnJhZm9ybS5pby9kb2NzL2ludGVybmFscy9wcm92aWRlci1yZWdpc3RyeS1wcm90b2NvbC5odG1sI2xpc3QtYXZhaWxhYmxlLXZlcnNpb25zXG5yb3V0ZXIuZ2V0KCcvOm5hbWVzcGFjZS86dHlwZS92ZXJzaW9ucycsIGFzeW5jIChyZXEsIHJlcywgbmV4dCkgPT4ge1xuICBjb25zdCBvcHRpb25zID0geyAuLi5yZXEucGFyYW1zIH07XG5cbiAgY29uc3QgdmVyc2lvbnMgPSBhd2FpdCBzdG9yZS5nZXRQcm92aWRlclZlcnNpb25zKG9wdGlvbnMpO1xuICBpZiAoIXZlcnNpb25zKSB7XG4gICAgcmV0dXJuIG5leHQoKTtcbiAgfVxuXG4gIGlmICh2ZXJzaW9ucy52ZXJzaW9ucy5sZW5ndGggPT09IDApIHtcbiAgICByZXR1cm4gcmVzLnN0YXR1cyg0MDQpLnNlbmQoJ3Jlc3BvbnNlIGxlbmd0aCBpcyAwJyk7XG4gIH1cblxuICByZXR1cm4gcmVzLnJlbmRlcigncHJvdmlkZXJzL3ZlcnNpb25zJywgeyB2ZXJzaW9uczogdmVyc2lvbnMudmVyc2lvbnMgfSk7XG59KTtcblxuLy8gaHR0cHM6Ly93d3cudGVycmFmb3JtLmlvL2RvY3MvaW50ZXJuYWxzL3Byb3ZpZGVyLXJlZ2lzdHJ5LXByb3RvY29sLmh0bWwjZmluZC1hLXByb3ZpZGVyLXBhY2thZ2VcbnJvdXRlci5nZXQoXG4gICcvOm5hbWVzcGFjZS86dHlwZS86dmVyc2lvbi9kb3dubG9hZC86b3MvOmFyY2gnLFxuICBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICBjb25zdCBvcHRpb25zID0geyAuLi5yZXEucGFyYW1zIH07XG5cbiAgICBjb25zdCBwcm92aWRlclBhY2thZ2UgPSBhd2FpdCBzdG9yZS5maW5kUHJvdmlkZXJQYWNrYWdlKG9wdGlvbnMpO1xuICAgIGlmICghcHJvdmlkZXJQYWNrYWdlKSB7XG4gICAgICByZXR1cm4gbmV4dCgpO1xuICAgIH1cblxuICAgIGNvbnN0IHZpZXdNb2RlbCA9IHtcbiAgICAgIHByb3RvY29sczogcHJvdmlkZXJQYWNrYWdlLnByb3RvY29scyxcbiAgICAgIGZpbGVuYW1lOiBwcm92aWRlclBhY2thZ2UuZmlsZW5hbWUsXG4gICAgICBvczogcHJvdmlkZXJQYWNrYWdlLm9zLFxuICAgICAgYXJjaDogcHJvdmlkZXJQYWNrYWdlLmFyY2gsXG4gICAgICBkb3dubG9hZFVybDpcbiAgICAgICAgYC92MS9wcm92aWRlcnMvJHtvcHRpb25zLm5hbWVzcGFjZX0vJHtvcHRpb25zLnR5cGV9LyR7b3B0aW9ucy52ZXJzaW9ufS9kb3dubG9hZC8ke29wdGlvbnMub3N9LyR7b3B0aW9ucy5hcmNofS96aXBgLFxuICAgICAgc2hhU3Vtc1VybDpcbiAgICAgICAgYC92MS9wcm92aWRlcnMvJHtvcHRpb25zLm5hbWVzcGFjZX0vJHtvcHRpb25zLnR5cGV9LyR7b3B0aW9ucy52ZXJzaW9ufS9zaGEyNTZzdW1zYCxcbiAgICAgIHNoYVN1bXNTaWduYXR1cmVVcmw6XG4gICAgICAgIGAvdjEvcHJvdmlkZXJzLyR7b3B0aW9ucy5uYW1lc3BhY2V9LyR7b3B0aW9ucy50eXBlfS8ke29wdGlvbnMudmVyc2lvbn0vc2hhMjU2c3Vtcy5zaWdgLFxuICAgICAgc2hhc3VtOiBwcm92aWRlclBhY2thZ2Uuc2hhc3VtLFxuICAgICAgZ3BnUHVibGljS2V5czogcHJvdmlkZXJQYWNrYWdlLmdwZ1B1YmxpY0tleXMsXG4gICAgfTtcblxuICAgIHJldHVybiByZXMucmVuZGVyKCdwcm92aWRlcnMvcHJvdmlkZXJQYWNrYWdlJywgdmlld01vZGVsKTtcbiAgfSxcbik7XG5cbi8vIFJvdXRlIGZvciBkb3dubG9hZGluZyBwcm92aWRlciBwYWNrYWdlIGZvciBzcGVjaWZpZWQgb3MgYW5kIGFyY2hcbnJvdXRlci5nZXQoXG4gICcvOm5hbWVzcGFjZS86dHlwZS86dmVyc2lvbi9kb3dubG9hZC86b3MvOmFyY2gvemlwJyxcbiAgYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gICAgdHJ5IHtcbiAgICAgIGNvbnN0IG9wdGlvbnMgPSB7IC4uLnJlcS5wYXJhbXMgfTtcblxuICAgICAgY29uc3QgcHJvdmlkZXJQYWNrYWdlID0gYXdhaXQgc3RvcmUuZmluZFByb3ZpZGVyUGFja2FnZShvcHRpb25zKTtcbiAgICAgIGlmICghcHJvdmlkZXJQYWNrYWdlKSB7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgICB9XG5cbiAgICAgIC8vIGNvbnN0IHByb3ZpZGVyID0gYXdhaXQgc3RvcmUuZmluZFByb3ZpZGVyUGFja2FnZShvcHRpb25zKTtcbiAgICAgIGNvbnN0IHByb3RvY29scyA9IHByb3ZpZGVyUGFja2FnZS5wcm90b2NvbHMubWFwKChwcm90KSA9PiBNYXRoLmZsb29yKHBhcnNlSW50KHByb3QpKSk7XG4gICAgICByZXMuaGVhZGVyKCd4LXRlcnJhZm9ybS1wcm90b2NvbC12ZXJzaW9uJywgTWF0aC5taW4oLi4ucHJvdG9jb2xzKS50b1N0cmluZygpKTtcbiAgICAgIHJlcy5oZWFkZXIoXG4gICAgICAgICd4LXRlcnJhZm9ybS1wcm90b2NvbC12ZXJzaW9ucycsXG4gICAgICAgIHByb3ZpZGVyUGFja2FnZS5wcm90b2NvbHMuam9pbignLCAnKSxcbiAgICAgICk7XG5cbiAgICAgIGNvbnN0IGZpbGUgPSBhd2FpdCBzdG9yYWdlLmdldFByb3ZpZGVyKFxuICAgICAgICBgJHtvcHRpb25zLm5hbWVzcGFjZX0vJHtvcHRpb25zLnR5cGV9LyR7b3B0aW9ucy52ZXJzaW9ufS8ke3Byb3ZpZGVyUGFja2FnZS5maWxlbmFtZX1gLFxuICAgICAgKTtcbiAgICAgIHJldHVybiByZXMuYXR0YWNobWVudChwcm92aWRlclBhY2thZ2UuZmlsZW5hbWUpLnNlbmQoZmlsZSk7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG5leHQoZSk7XG4gICAgfVxuICB9LFxuKTtcblxuLy8gUm91dGUgZm9yIGdldHRpbmcgY2hlY2tzdW1zIGZpbGUgZXhwcmVzc2VkIGluIHByb3ZpZGVyIG1ldGFkYXRhXG5yb3V0ZXIuZ2V0KCcvOm5hbWVzcGFjZS86dHlwZS86dmVyc2lvbi9zaGEyNTZzdW1zJywgYXN5bmMgKHJlcSwgcmVzLCBuZXh0KSA9PiB7XG4gIHRyeSB7XG4gICAgY29uc3Qgb3B0aW9ucyA9IHsgLi4ucmVxLnBhcmFtcyB9O1xuXG4gICAgY29uc3Qgc3Vtc0xvY2F0aW9uID1cbiAgICAgIGAke29wdGlvbnMubmFtZXNwYWNlfS8ke29wdGlvbnMudHlwZX0vJHtvcHRpb25zLnZlcnNpb259LyR7b3B0aW9ucy5uYW1lc3BhY2V9LSR7b3B0aW9ucy50eXBlfV8ke29wdGlvbnMudmVyc2lvbn1fU0hBMjU2U1VNU2A7XG4gICAgY29uc3Qgc2hhc3Vtc0NvbnRlbnQgPSBhd2FpdCBzdG9yYWdlLmdldFByb3ZpZGVyKHN1bXNMb2NhdGlvbik7XG4gICAgaWYgKCFzaGFzdW1zQ29udGVudCkge1xuICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICB9XG5cbiAgICBjb25zdCBwcm92aWRlciA9IGF3YWl0IHN0b3JlLmdldFByb3ZpZGVyVmVyc2lvbih7XG4gICAgICBuYW1lc3BhY2U6IG9wdGlvbnMubmFtZXNwYWNlLFxuICAgICAgdHlwZTogb3B0aW9ucy50eXBlLFxuICAgICAgdmVyc2lvbjogb3B0aW9ucy52ZXJzaW9uLFxuICAgIH0pO1xuICAgIGlmICghcHJvdmlkZXIpIHtcbiAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2xzID0gcHJvdmlkZXIucHJvdG9jb2xzLm1hcCgocHJvdCkgPT4gTWF0aC5mbG9vcihwYXJzZUludChwcm90KSkpO1xuICAgIHJlcy5oZWFkZXIoJ3gtdGVycmFmb3JtLXByb3RvY29sLXZlcnNpb24nLCBNYXRoLm1pbiguLi5wcm90b2NvbHMpLnRvU3RyaW5nKCkpO1xuICAgIHJlcy5oZWFkZXIoJ3gtdGVycmFmb3JtLXByb3RvY29sLXZlcnNpb25zJywgcHJvdmlkZXIucHJvdG9jb2xzLmpvaW4oJywgJykpO1xuXG4gICAgcmV0dXJuIHJlcy5jb250ZW50VHlwZSgndGV4dC9wbGFpbicpLnNlbmQoc2hhc3Vtc0NvbnRlbnQudG9TdHJpbmcoJ3V0ZjgnKSk7XG4gIH0gY2F0Y2ggKGUpIHtcbiAgICByZXR1cm4gbmV4dChlKTtcbiAgfVxufSk7XG5cbi8vIFJvdXRlIGZvciBnZXR0aW5nIHNpZ25hdHVyZSBmaWxlIGZvciBjaGVja3N1bXMgZXhwcmVzc2VkIGluIHByb3ZpZGVyIG1ldGFkYXRhXG5yb3V0ZXIuZ2V0KFxuICAnLzpuYW1lc3BhY2UvOnR5cGUvOnZlcnNpb24vc2hhMjU2c3Vtcy5zaWcnLFxuICBhc3luYyAocmVxLCByZXMsIG5leHQpID0+IHtcbiAgICB0cnkge1xuICAgICAgY29uc3Qgb3B0aW9ucyA9IHsgLi4ucmVxLnBhcmFtcyB9O1xuICAgICAgY29uc3Qgc2lnTG9jYXRpb24gPVxuICAgICAgICBgJHtvcHRpb25zLm5hbWVzcGFjZX0vJHtvcHRpb25zLnR5cGV9LyR7b3B0aW9ucy52ZXJzaW9ufS8ke29wdGlvbnMubmFtZXNwYWNlfS0ke29wdGlvbnMudHlwZX1fJHtvcHRpb25zLnZlcnNpb259X1NIQTI1NlNVTVMuc2lnYDtcbiAgICAgIGNvbnN0IHNpZyA9IGF3YWl0IHN0b3JhZ2UuZ2V0UHJvdmlkZXIoc2lnTG9jYXRpb24pO1xuICAgICAgaWYgKCFzaWcpIHtcbiAgICAgICAgcmV0dXJuIG5leHQoKTtcbiAgICAgIH1cblxuICAgICAgY29uc3QgcHJvdmlkZXIgPSBhd2FpdCBzdG9yZS5nZXRQcm92aWRlclZlcnNpb24ob3B0aW9ucyk7XG4gICAgICBpZiAoIXByb3ZpZGVyKSB7XG4gICAgICAgIHJldHVybiBuZXh0KCk7XG4gICAgICB9XG5cbiAgICAgIGNvbnN0IHByb3RvY29scyA9IHByb3ZpZGVyLnByb3RvY29scy5tYXAoKHByb3QpID0+IE1hdGguZmxvb3IocGFyc2VJbnQocHJvdCkpKTtcbiAgICAgIHJlcy5oZWFkZXIoJ3gtdGVycmFmb3JtLXByb3RvY29sLXZlcnNpb24nLCBNYXRoLm1pbiguLi5wcm90b2NvbHMpLnRvU3RyaW5nKCkpO1xuICAgICAgcmVzLmhlYWRlcihcbiAgICAgICAgJ3gtdGVycmFmb3JtLXByb3RvY29sLXZlcnNpb25zJyxcbiAgICAgICAgcHJvdmlkZXIucHJvdG9jb2xzLmpvaW4oJywgJyksXG4gICAgICApO1xuXG4gICAgICByZXR1cm4gcmVzXG4gICAgICAgIC5zZXQoJ0NvbnRlbnQtVHlwZScsICdhcHBsaWNhdGlvbi9vY3RldC1zdHJlYW0nKVxuICAgICAgICAuc2V0KFxuICAgICAgICAgICdDb250ZW50LWRpc3Bvc2l0aW9uJyxcbiAgICAgICAgICBgYXR0YWNobWVudDsgZmlsZW5hbWU9JHtvcHRpb25zLm5hbWVzcGFjZX0tJHtvcHRpb25zLnR5cGV9XyR7b3B0aW9ucy52ZXJzaW9ufV9TSEEyNTZTVU1TLnNpZ2AsXG4gICAgICAgIClcbiAgICAgICAgLnNlbmQoc2lnKTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gbmV4dChlKTtcbiAgICB9XG4gIH0sXG4pO1xuXG5leHBvcnQgZGVmYXVsdCByb3V0ZXI7XG4iXX0=