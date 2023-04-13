import { debug } from 'debug';
import {
  GpgPublicKey,
  Platform,
  Protocol,
  Provider,
} from '../../prisma/generated/client/index';
import SqlServerStore from './mssql/mssql';
import * as inmds from '../models/store/payloads/input';
import * as outmds from '../models/store/payloads/output';

export default class Store {
  dg = debug('tfregistry:server:store');
  private store: SqlServerStore;
  constructor() {
    this.store = new SqlServerStore();
  }

  /**
   * save Provider release, get provider, if exists, create new version, if not, create new provider
   *
   * @param {inmds.saveProviderData} provider - provider payload
   * @returns {Promise<outmds.providerPayload>} - provider payload
   */
  saveProvider = async (
    input: inmds.saveProviderData,
  ): Promise<outmds.saveProviderPayload | null> => {
    // Check for existing protocols, and create new ones if required do not exist
    const protocols: Protocol[] = [];
    for (const i of input.protocols) {
      const protocol = await this.store.getProtocol({ name: i });
      if (protocol) {
        protocols.push(protocol);
        break;
      }
      const newProtocol = await this.store.saveProtocol({ name: i });
      if (newProtocol) {
        protocols.push(newProtocol);
      }
    }

    if (protocols.length === 0) {
      return null;
    }

    // Check if base entity for provider exists, if not, create new one
    let provider: Provider;
    const p = await this.store.getProvider({
      namespace: input.namespace,
      type: input.type,
    });
    if (!p) {
      // provider does not exist, create new provider
      const newP = await this.store.saveProvider({
        namespace: input.namespace,
        type: input.type,
      });
      if (!newP) {
        return null;
      }
      provider = newP;
    } else provider = p;

    // Get / Set GPG Public Keys for provider release, may already exist, and should not overlap
    const gpgPublicKeys: GpgPublicKey[] = [];
    input.gpgPublicKeys.map(async (i) => {
      const keyOptions = {
        keyId: i.keyId,
        asciiArmor: i.asciiArmor,
        trustSignature: i.trustSignature ?? 'true',
        source: i.source ?? '',
        sourceUrl: i.sourceUrl ?? '',
        providerId: provider.id,
      };
      const keys = await this.store.getGpgPublicKeys(keyOptions);
      if (keys && keys.length > 0) {
        keys.forEach((key) => {
          gpgPublicKeys.push(key);
        });
        return;
      }
      const newGpgPublicKey = await this.store.saveGpgPublicKey(keyOptions);
      if (newGpgPublicKey) {
        gpgPublicKeys.push(newGpgPublicKey);
        return;
      }
    });

    // Add provider version, always created
    const newProviderVersion = await this.store.saveVersion({
      name: input.version,
      providerId: provider.id,
      protocolIds: protocols.map((p) => p.id),
    });
    if (!newProviderVersion) {
      return null;
    }

    // Add platforms for provider release, always created
    const platforms: Platform[] = [];
    input.platforms.map(async (i) => {
      const newPlatform = await this.store.savePlatform({
        os: i.os,
        arch: i.arch,
        filename: i.filename,
        shasum: i.shasum,
        providerId: newProviderVersion.id,
      });
      if (newPlatform) {
        platforms.push(newPlatform);
      }
    });
    if (platforms.length === 0) {
      return null;
    }

    return {
      id: provider.id,
      namespace: provider.namespace,
      type: provider.type,
      version: newProviderVersion.name,
      protocols: protocols.map((p) => p.name),
      platforms: platforms.map((p) => {
        return {
          os: p.os,
          arch: p.arch,
          filename: p.filename,
          shasum: p.shasum,
        };
      }),
      gpgPublicKeys: gpgPublicKeys.map((p) => {
        return {
          keyId: p.keyId,
          asciiArmor: p.asciiArmor,
          trustSignature: p.trustSignature,
          source: p.source,
          sourceUrl: p.sourceUrl,
        };
      }),
      published_at: provider.published_at.toISOString(),
    };
  };

  getAllProviders = async (): Promise<outmds.findProvidersPayload[]> => {
    const payload: outmds.findProvidersPayload[] = [];

    const providers = await this.store.getAllProviders();
    if (!providers) {
      return payload;
    }

    for (let i = 0; i < providers.length; i++) {
      const provider = providers[i];
      payload.push({
        namespace: provider.namespace,
        type: provider.type,
        versions: [],
      });

      const versions = await this.store.getVersions({
        providerId: provider.id,
        versions: [],
      });
      if (!versions) {
        providers.splice(i, 1);
        continue;
      }

      versions.forEach(async (v) => {
        const protocols = await this.store.getProtocolsByVersion({
          providerId: v.id,
        });
        if (!protocols) {
          return;
        }

        payload[i].versions.push({
          version: v.name,
          protocols: protocols.map((p) => p.name),
        });
      });
    }

    return payload;
  };

  getProviderVersion = async (
    p: inmds.getProviderVersion,
  ): Promise<outmds.getProviderVersionPayload | null> => {
    const provider = await this.store.getProvider(p);
    if (!provider) {
      return null;
    }

    const version = await this.store.getVersion({
      providerId: provider.id,
      name: p.version,
    });
    if (!version) {
      return null;
    }

    const protocols = await this.store.getProtocolsByVersion({
      providerId: version.id,
    });
    if (!protocols) {
      return null;
    }

    return {
      namespace: provider.namespace,
      type: provider.type,
      version: version.name,
      protocols: protocols.map((p) => p.name),
    };
  }

  getProviderVersions = async (
    p: inmds.getProviderVersions,
  ): Promise<outmds.getProviderVersionsPayload> => {
    const payload: outmds.getProviderVersionsPayload = { versions: [] };
    const provider = await this.store.getProvider(p);
    if (!provider) {
      return payload;
    }
    const versions = await this.store.getVersions({
      providerId: provider.id,
      versions: [],
    });
    if (!versions) {
      return payload;
    }

    versions.forEach(async (v) => {
      const protocols = await this.store.getProtocolsByVersion({
        providerId: v.id,
      });
      if (!protocols) {
        return;
      }

      const platforms = await this.store.getPlatforms({
        providerId: v.id,
      });
      if (!platforms) {
        return;
      }

      payload.versions.push({
        version: v.name,
        protocols: protocols.map((p) => p.name),
        platforms: platforms.map((p) => {
          return {
            os: p.os,
            arch: p.arch,
            filename: p.filename,
            shasum: p.shasum,
          };
        }),
      });
    });

    return payload;
  };

  /**
   * gets details for requested provider binary, includes gpg public keys, platform bins path and shasum,
   * specific for one version and platform
   *
   * @param {inmds.findProviderPackage} provider - Provider version and platform details
   * @param {string} provider.namespace - Provider namespace
   * @param {string} provider.type - Provider type
   * @param {string} provider.version - Provider version
   * @param {string} provider.os - Provider platform os
   * @param {string} provider.arch - Provider platform arch
   *
   * @returns {outmds.findProviderPackagePayload | null} - Provider details or null if not found
   */
  findProviderPackage = async (
    p: inmds.findProviderPackage,
  ): Promise<outmds.findProviderPackagePayload | null> => {
    const provider = await this.store.getProvider({
      namespace: p.namespace,
      type: p.type,
    });
    if (!provider) {
      return null;
    }

    const version = await this.store.getVersion({
      providerId: provider.id,
      name: p.version,
    });
    if (!version) {
      return null;
    }

    const protocols = await this.store.getProtocolsByVersion({
      providerId: version.id,
    });
    if (!protocols) {
      return null;
    }

    const platform = await this.store.getPlatform({
      os: p.os,
      arch: p.arch,
      providerId: version.id,
    });
    if (!platform) {
      return null;
    }

    const gpgPublicKeys = await this.store.getGpgPublicKeys({
      providerId: provider.id,
    });
    if (!gpgPublicKeys || gpgPublicKeys.length === 0) {
      return null;
    }

    return {
      protocols: protocols.map((p) => p.name),
      os: platform.os,
      arch: platform.arch,
      filename: platform.filename,
      shasum: platform.shasum,
      gpgPublicKeys: gpgPublicKeys.map((p) => {
        return {
          keyId: p.keyId,
          asciiArmor: p.asciiArmor,
          trustSignature: p.trustSignature,
          source: p.source,
          sourceUrl: p.sourceUrl,
        };
      }),
    };
  };

  /**
   * checks if provider version exists
   *
   * @param {inmds.getProviderVersion} p - Provider version details
   * @param {string} p.namespace - Provider namespace
   * @param {string} p.type - Provider type
   * @param {string} p.version - Provider version
   * @returns {Promise<boolean>} - true if provider version exists, false otherwise
   */
  providerHasVersion = async (p: inmds.getProviderVersion): Promise<boolean> => {
    const provider = await this.store.getProvider({
      namespace: p.namespace,
      type: p.type,
    });
    if (!provider) {
      return false;
    }

    return !!(await this.store.getVersion({
      providerId: provider.id,
      name: p.version,
    }));
  }
}
