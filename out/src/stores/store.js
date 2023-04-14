"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const debug_1 = require("debug");
const mssql_1 = tslib_1.__importDefault(require("./mssql/mssql"));
class Store {
    constructor() {
        this.dg = (0, debug_1.debug)('tfregistry:server:store');
        /**
         * save Provider release, get provider, if exists, create new version, if not, create new provider
         *
         * @param {inmds.saveProviderData} provider - provider payload
         * @returns {Promise<outmds.providerPayload>} - provider payload
         */
        this.saveProvider = (input) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            // Check for existing protocols, and create new ones if required do not exist
            const protocols = [];
            for (const i of input.protocols) {
                const protocol = yield this.store.getProtocol({ name: i });
                if (protocol) {
                    protocols.push(protocol);
                    break;
                }
                const newProtocol = yield this.store.saveProtocol({ name: i });
                if (newProtocol) {
                    protocols.push(newProtocol);
                }
            }
            if (protocols.length === 0) {
                return null;
            }
            // Check if base entity for provider exists, if not, create new one
            let provider;
            const p = yield this.store.getProvider({
                namespace: input.namespace,
                type: input.type,
            });
            if (!p) {
                // provider does not exist, create new provider
                const newP = yield this.store.saveProvider({
                    namespace: input.namespace,
                    type: input.type,
                });
                if (!newP) {
                    return null;
                }
                provider = newP;
            }
            else
                provider = p;
            // Get / Set GPG Public Keys for provider release, may already exist, and should not overlap
            const gpgPublicKeys = [];
            input.gpgPublicKeys.map((i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                var _a, _b, _c;
                const keyOptions = {
                    keyId: i.keyId,
                    asciiArmor: i.asciiArmor,
                    trustSignature: (_a = i.trustSignature) !== null && _a !== void 0 ? _a : '',
                    source: (_b = i.source) !== null && _b !== void 0 ? _b : '',
                    sourceUrl: (_c = i.sourceUrl) !== null && _c !== void 0 ? _c : '',
                    providerId: provider.id,
                };
                const keys = yield this.store.getGpgPublicKeys(keyOptions);
                if (keys && keys.length > 0) {
                    keys.forEach((key) => {
                        gpgPublicKeys.push(key);
                    });
                    return;
                }
                const newGpgPublicKey = yield this.store.saveGpgPublicKey(keyOptions);
                if (newGpgPublicKey) {
                    gpgPublicKeys.push(newGpgPublicKey);
                    return;
                }
            }));
            // Add provider version, always created
            const newProviderVersion = yield this.store.saveVersion({
                name: input.version,
                providerId: provider.id,
                protocolIds: protocols.map((p) => p.id),
            });
            if (!newProviderVersion) {
                return null;
            }
            // Add platforms for provider release, always created
            const platforms = [];
            input.platforms.map((i) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const newPlatform = yield this.store.savePlatform({
                    os: i.os,
                    arch: i.arch,
                    filename: i.filename,
                    shasum: i.shasum,
                    providerId: newProviderVersion.id,
                });
                if (newPlatform) {
                    platforms.push(newPlatform);
                }
            }));
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
        });
        this.getAllProviders = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = [];
            const providers = yield this.store.getAllProviders();
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
                const versions = yield this.store.getVersions({
                    providerId: provider.id,
                    versions: [],
                });
                if (!versions) {
                    providers.splice(i, 1);
                    continue;
                }
                versions.forEach((v) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                    const protocols = yield this.store.getProtocolsByVersion({
                        providerId: v.id,
                    });
                    if (!protocols) {
                        return;
                    }
                    payload[i].versions.push({
                        version: v.name,
                        protocols: protocols.map((p) => p.name),
                    });
                }));
            }
            return payload;
        });
        this.getProviderVersion = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const provider = yield this.store.getProvider({
                namespace: p.namespace,
                type: p.type
            });
            if (!provider) {
                return null;
            }
            const version = yield this.store.getVersion({
                providerId: provider.id,
                name: p.version,
            });
            if (!version) {
                return null;
            }
            const protocols = yield this.store.getProtocolsByVersion({
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
        });
        this.getProviderVersions = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const payload = { versions: [] };
            const provider = yield this.store.getProvider(p);
            if (!provider) {
                return payload;
            }
            const versions = yield this.store.getAllProviderVersions({
                providerId: provider.id,
            });
            if (!versions) {
                return payload;
            }
            const r = yield Promise.all(versions.map((v) => tslib_1.__awaiter(this, void 0, void 0, function* () {
                const protocols = yield this.store.getProtocolsByVersion({
                    providerId: v.id,
                });
                if (!protocols) {
                    return null;
                }
                const platforms = yield this.store.getPlatforms({
                    providerId: v.id,
                });
                if (!platforms) {
                    return null;
                }
                return {
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
                };
            })));
            const result = {
                versions: r.filter((v) => v !== null),
            };
            return result;
        });
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
        this.findProviderPackage = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const provider = yield this.store.getProvider({
                namespace: p.namespace,
                type: p.type,
            });
            if (!provider) {
                return null;
            }
            const version = yield this.store.getVersion({
                providerId: provider.id,
                name: p.version,
            });
            if (!version) {
                return null;
            }
            const protocols = yield this.store.getProtocolsByVersion({
                providerId: version.id,
            });
            if (!protocols) {
                return null;
            }
            const platform = yield this.store.getPlatform({
                os: p.os,
                arch: p.arch,
                providerId: version.id,
            });
            if (!platform) {
                return null;
            }
            const gpgPublicKeys = yield this.store.getGpgPublicKeys({
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
        });
        /**
         * checks if provider version exists
         *
         * @param {inmds.getProviderVersion} p - Provider version details
         * @param {string} p.namespace - Provider namespace
         * @param {string} p.type - Provider type
         * @param {string} p.version - Provider version
         * @returns {Promise<boolean>} - true if provider version exists, false otherwise
         */
        this.providerHasVersion = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const provider = yield this.store.getProvider({
                namespace: p.namespace,
                type: p.type,
            });
            if (!provider) {
                return false;
            }
            return !!(yield this.store.getVersion({
                providerId: provider.id,
                name: p.version,
            }));
        });
        this.store = new mssql_1.default();
    }
}
exports.default = Store;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic3RvcmUuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvc3RvcmVzL3N0b3JlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGlDQUE4QjtBQU85QixrRUFBMkM7QUFJM0MsTUFBcUIsS0FBSztJQUd4QjtRQUZBLE9BQUUsR0FBRyxJQUFBLGFBQUssRUFBQyx5QkFBeUIsQ0FBQyxDQUFDO1FBTXRDOzs7OztXQUtHO1FBQ0gsaUJBQVksR0FBRyxDQUNiLEtBQTZCLEVBQ2UsRUFBRTtZQUM5Qyw2RUFBNkU7WUFDN0UsTUFBTSxTQUFTLEdBQWUsRUFBRSxDQUFDO1lBQ2pDLEtBQUssTUFBTSxDQUFDLElBQUksS0FBSyxDQUFDLFNBQVMsRUFBRTtnQkFDL0IsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO2dCQUMzRCxJQUFJLFFBQVEsRUFBRTtvQkFDWixTQUFTLENBQUMsSUFBSSxDQUFDLFFBQVEsQ0FBQyxDQUFDO29CQUN6QixNQUFNO2lCQUNQO2dCQUNELE1BQU0sV0FBVyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxZQUFZLENBQUMsRUFBRSxJQUFJLEVBQUUsQ0FBQyxFQUFFLENBQUMsQ0FBQztnQkFDL0QsSUFBSSxXQUFXLEVBQUU7b0JBQ2YsU0FBUyxDQUFDLElBQUksQ0FBQyxXQUFXLENBQUMsQ0FBQztpQkFDN0I7YUFDRjtZQUVELElBQUksU0FBUyxDQUFDLE1BQU0sS0FBSyxDQUFDLEVBQUU7Z0JBQzFCLE9BQU8sSUFBSSxDQUFDO2FBQ2I7WUFFRCxtRUFBbUU7WUFDbkUsSUFBSSxRQUFrQixDQUFDO1lBQ3ZCLE1BQU0sQ0FBQyxHQUFHLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxXQUFXLENBQUM7Z0JBQ3JDLFNBQVMsRUFBRSxLQUFLLENBQUMsU0FBUztnQkFDMUIsSUFBSSxFQUFFLEtB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LEVBQUUsQ0FBQyxDQUFDLFVBQVU7d0JBQ3hCLGNBQWMsRUFBRSxDQUFDLENBQUMsY0FBYzt3QkFDaEMsTUFBTSxFQUFFLENBQUMsQ0FBQyxNQUFNO3dCQUNoQixTQUFTLEVBQUUsQ0FBQyxDQUFDLFNBQVM7cUJBQ3ZCLENBQUM7Z0JBQ0osQ0FBQyxDQUFDO2FBQ0gsQ0FBQztRQUNKLENBQUMsQ0FBQSxDQUFDO1FBRUY7Ozs7Ozs7O1dBUUc7UUFDSCx1QkFBa0IsR0FBRyxDQUFPLENBQTJCLEVBQW9CLEVBQUU7WUFDM0UsTUFBTSxRQUFRLEdBQUcsTUFBTSxJQUFJLENBQUMsS0FBSyxDQUFDLFdBQVcsQ0FBQztnQkFDNUMsU0FBUyxFQUFFLENBQUMsQ0FBQyxTQUFTO2dCQUN0QixJQUFJLEVBQUUsQ0FBQyxDQUFDLElBQUk7YUFDYixDQUFDLENBQUM7WUFDSCxJQUFJLENBQUMsUUFBUSxFQUFFO2dCQUNiLE9BQU8sS0FBSyxDQUFDO2FBQ2Q7WUFFRCxPQUFPLENBQUMsQ0FBQyxDQUFDLE1BQU0sSUFBSSxDQUFDLEtBQUssQ0FBQyxVQUFVLENBQUM7Z0JBQ3BDLFVBQVUsRUFBRSxRQUFRLENBQUMsRUFBRTtnQkFDdkIsSUFBSSxFQUFFLENBQUMsQ0FBQyxPQUFPO2FBQ2hCLENBQUMsQ0FBQyxDQUFDO1FBQ04sQ0FBQyxDQUFBLENBQUE7UUEvVkMsSUFBSSxDQUFDLEtBQUssR0FBRyxJQUFJLGVBQWMsRUFBRSxDQUFDO0lBQ3BDLENBQUM7Q0ErVkY7QUFwV0Qsd0JBb1dDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgZGVidWcgfSBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQge1xuICBHcGdQdWJsaWNLZXksXG4gIFBsYXRmb3JtLFxuICBQcm90b2NvbCxcbiAgUHJvdmlkZXIsXG59IGZyb20gJy4uLy4uL3ByaXNtYS9nZW5lcmF0ZWQvY2xpZW50L2luZGV4JztcbmltcG9ydCBTcWxTZXJ2ZXJTdG9yZSBmcm9tICcuL21zc3FsL21zc3FsJztcbmltcG9ydCAqIGFzIGlubWRzIGZyb20gJy4uL21vZGVscy9zdG9yZS9wYXlsb2Fkcy9pbnB1dCc7XG5pbXBvcnQgKiBhcyBvdXRtZHMgZnJvbSAnLi4vbW9kZWxzL3N0b3JlL3BheWxvYWRzL291dHB1dCc7XG5cbmV4cG9ydCBkZWZhdWx0IGNsYXNzIFN0b3JlIHtcbiAgZGcgPSBkZWJ1ZygndGZyZWdpc3RyeTpzZXJ2ZXI6c3RvcmUnKTtcbiAgcHJpdmF0ZSBzdG9yZTogU3FsU2VydmVyU3RvcmU7XG4gIGNvbnN0cnVjdG9yKCkge1xuICAgIHRoaXMuc3RvcmUgPSBuZXcgU3FsU2VydmVyU3RvcmUoKTtcbiAgfVxuXG4gIC8qKlxuICAgKiBzYXZlIFByb3ZpZGVyIHJlbGVhc2UsIGdldCBwcm92aWRlciwgaWYgZXhpc3RzLCBjcmVhdGUgbmV3IHZlcnNpb24sIGlmIG5vdCwgY3JlYXRlIG5ldyBwcm92aWRlclxuICAgKlxuICAgKiBAcGFyYW0ge2lubWRzLnNhdmVQcm92aWRlckRhdGF9IHByb3ZpZGVyIC0gcHJvdmlkZXIgcGF5bG9hZFxuICAgKiBAcmV0dXJucyB7UHJvbWlzZTxvdXRtZHMucHJvdmlkZXJQYXlsb2FkPn0gLSBwcm92aWRlciBwYXlsb2FkXG4gICAqL1xuICBzYXZlUHJvdmlkZXIgPSBhc3luYyAoXG4gICAgaW5wdXQ6IGlubWRzLnNhdmVQcm92aWRlckRhdGEsXG4gICk6IFByb21pc2U8b3V0bWRzLnNhdmVQcm92aWRlclBheWxvYWQgfCBudWxsPiA9PiB7XG4gICAgLy8gQ2hlY2sgZm9yIGV4aXN0aW5nIHByb3RvY29scywgYW5kIGNyZWF0ZSBuZXcgb25lcyBpZiByZXF1aXJlZCBkbyBub3QgZXhpc3RcbiAgICBjb25zdCBwcm90b2NvbHM6IFByb3RvY29sW10gPSBbXTtcbiAgICBmb3IgKGNvbnN0IGkgb2YgaW5wdXQucHJvdG9jb2xzKSB7XG4gICAgICBjb25zdCBwcm90b2NvbCA9IGF3YWl0IHRoaXMuc3RvcmUuZ2V0UHJvdG9jb2woeyBuYW1lOiBpIH0pO1xuICAgICAgaWYgKHByb3RvY29sKSB7XG4gICAgICAgIHByb3RvY29scy5wdXNoKHByb3RvY29sKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdQcm90b2NvbCA9IGF3YWl0IHRoaXMuc3RvcmUuc2F2ZVByb3RvY29sKHsgbmFtZTogaSB9KTtcbiAgICAgIGlmIChuZXdQcm90b2NvbCkge1xuICAgICAgICBwcm90b2NvbHMucHVzaChuZXdQcm90b2NvbCk7XG4gICAgICB9XG4gICAgfVxuXG4gICAgaWYgKHByb3RvY29scy5sZW5ndGggPT09IDApIHtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cblxuICAgIC8vIENoZWNrIGlmIGJhc2UgZW50aXR5IGZvciBwcm92aWRlciBleGlzdHMsIGlmIG5vdCwgY3JlYXRlIG5ldyBvbmVcbiAgICBsZXQgcHJvdmlkZXI6IFByb3ZpZGVyO1xuICAgIGNvbnN0IHAgPSBhd2FpdCB0aGlzLnN0b3JlLmdldFByb3ZpZGVyKHtcbiAgICAgIG5hbWVzcGFjZTogaW5wdXQubmFtZXNwYWNlLFxuICAgICAgdHlwZTogaW5wdXQudHlwZSxcbiAgICB9KTtcbiAgICBpZiAoIXApIHtcbiAgICAgIC8vIHByb3ZpZGVyIGRvZXMgbm90IGV4aXN0LCBjcmVhdGUgbmV3IHByb3ZpZGVyXG4gICAgICBjb25zdCBuZXdQID0gYXdhaXQgdGhpcy5zdG9yZS5zYXZlUHJvdmlkZXIoe1xuICAgICAgICBuYW1lc3BhY2U6IGlucHV0Lm5hbWVzcGFjZSxcbiAgICAgICAgdHlwZTogaW5wdXQudHlwZSxcbiAgICAgIH0pO1xuICAgICAgaWYgKCFuZXdQKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuICAgICAgcHJvdmlkZXIgPSBuZXdQO1xuICAgIH0gZWxzZSBwcm92aWRlciA9IHA7XG5cbiAgICAvLyBHZXQgLyBTZXQgR1BHIFB1YmxpYyBLZXlzIGZvciBwcm92aWRlciByZWxlYXNlLCBtYXkgYWxyZWFkeSBleGlzdCwgYW5kIHNob3VsZCBub3Qgb3ZlcmxhcFxuICAgIGNvbnN0IGdwZ1B1YmxpY0tleXM6IEdwZ1B1YmxpY0tleVtdID0gW107XG4gICAgaW5wdXQuZ3BnUHVibGljS2V5cy5tYXAoYXN5bmMgKGkpID0+IHtcbiAgICAgIGNvbnN0IGtleU9wdGlvbnMgPSB7XG4gICAgICAgIGtleUlkOiBpLmtleUlkLFxuICAgICAgICBhc2NpaUFybW9yOiBpLmFzY2lpQXJtb3IsXG4gICAgICAgIHRydXN0U2lnbmF0dXJlOiBpLnRydXN0U2lnbmF0dXJlID8/ICcnLFxuICAgICAgICBzb3VyY2U6IGkuc291cmNlID8/ICcnLFxuICAgICAgICBzb3VyY2VVcmw6IGkuc291cmNlVXJsID8/ICcnLFxuICAgICAgICBwcm92aWRlcklkOiBwcm92aWRlci5pZCxcbiAgICAgIH07XG4gICAgICBjb25zdCBrZXlzID0gYXdhaXQgdGhpcy5zdG9yZS5nZXRHcGdQdWJsaWNLZXlzKGtleU9wdGlvbnMpO1xuICAgICAgaWYgKGtleXMgJiYga2V5cy5sZW5ndGggPiAwKSB7XG4gICAgICAgIGtleXMuZm9yRWFjaCgoa2V5KSA9PiB7XG4gICAgICAgICAgZ3BnUHVibGljS2V5cy5wdXNoKGtleSk7XG4gICAgICAgIH0pO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgICBjb25zdCBuZXdHcGdQdWJsaWNLZXkgPSBhd2FpdCB0aGlzLnN0b3JlLnNhdmVHcGdQdWJsaWNLZXkoa2V5T3B0aW9ucyk7XG4gICAgICBpZiAobmV3R3BnUHVibGljS2V5KSB7XG4gICAgICAgIGdwZ1B1YmxpY0tleXMucHVzaChuZXdHcGdQdWJsaWNLZXkpO1xuICAgICAgICByZXR1cm47XG4gICAgICB9XG4gICAgfSk7XG5cbiAgICAvLyBBZGQgcHJvdmlkZXIgdmVyc2lvbiwgYWx3YXlzIGNyZWF0ZWRcbiAgICBjb25zdCBuZXdQcm92aWRlclZlcnNpb24gPSBhd2FpdCB0aGlzLnN0b3JlLnNhdmVWZXJzaW9uKHtcbiAgICAgIG5hbWU6IGlucHV0LnZlcnNpb24sXG4gICAgICBwcm92aWRlcklkOiBwcm92aWRlci5pZCxcbiAgICAgIHByb3RvY29sSWRzOiBwcm90b2NvbHMubWFwKChwKSA9PiBwLmlkKSxcbiAgICB9KTtcbiAgICBpZiAoIW5ld1Byb3ZpZGVyVmVyc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgLy8gQWRkIHBsYXRmb3JtcyBmb3IgcHJvdmlkZXIgcmVsZWFzZSwgYWx3YXlzIGNyZWF0ZWRcbiAgICBjb25zdCBwbGF0Zm9ybXM6IFBsYXRmb3JtW10gPSBbXTtcbiAgICBpbnB1dC5wbGF0Zm9ybXMubWFwKGFzeW5jIChpKSA9PiB7XG4gICAgICBjb25zdCBuZXdQbGF0Zm9ybSA9IGF3YWl0IHRoaXMuc3RvcmUuc2F2ZVBsYXRmb3JtKHtcbiAgICAgICAgb3M6IGkub3MsXG4gICAgICAgIGFyY2g6IGkuYXJjaCxcbiAgICAgICAgZmlsZW5hbWU6IGkuZmlsZW5hbWUsXG4gICAgICAgIHNoYXN1bTogaS5zaGFzdW0sXG4gICAgICAgIHByb3ZpZGVySWQ6IG5ld1Byb3ZpZGVyVmVyc2lvbi5pZCxcbiAgICAgIH0pO1xuICAgICAgaWYgKG5ld1BsYXRmb3JtKSB7XG4gICAgICAgIHBsYXRmb3Jtcy5wdXNoKG5ld1BsYXRmb3JtKTtcbiAgICAgIH1cbiAgICB9KTtcbiAgICBpZiAocGxhdGZvcm1zLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIGlkOiBwcm92aWRlci5pZCxcbiAgICAgIG5hbWVzcGFjZTogcHJvdmlkZXIubmFtZXNwYWNlLFxuICAgICAgdHlwZTogcHJvdmlkZXIudHlwZSxcbiAgICAgIHZlcnNpb246IG5ld1Byb3ZpZGVyVmVyc2lvbi5uYW1lLFxuICAgICAgcHJvdG9jb2xzOiBwcm90b2NvbHMubWFwKChwKSA9PiBwLm5hbWUpLFxuICAgICAgcGxhdGZvcm1zOiBwbGF0Zm9ybXMubWFwKChwKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAgb3M6IHAub3MsXG4gICAgICAgICAgYXJjaDogcC5hcmNoLFxuICAgICAgICAgIGZpbGVuYW1lOiBwLmZpbGVuYW1lLFxuICAgICAgICAgIHNoYXN1bTogcC5zaGFzdW0sXG4gICAgICAgIH07XG4gICAgICB9KSxcbiAgICAgIGdwZ1B1YmxpY0tleXM6IGdwZ1B1YmxpY0tleXMubWFwKChwKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAga2V5SWQ6IHAua2V5SWQsXG4gICAgICAgICAgYXNjaWlBcm1vcjogcC5hc2NpaUFybW9yLFxuICAgICAgICAgIHRydXN0U2lnbmF0dXJlOiBwLnRydXN0U2lnbmF0dXJlLFxuICAgICAgICAgIHNvdXJjZTogcC5zb3VyY2UsXG4gICAgICAgICAgc291cmNlVXJsOiBwLnNvdXJjZVVybCxcbiAgICAgICAgfTtcbiAgICAgIH0pLFxuICAgICAgcHVibGlzaGVkX2F0OiBwcm92aWRlci5wdWJsaXNoZWRfYXQudG9JU09TdHJpbmcoKSxcbiAgICB9O1xuICB9O1xuXG4gIGdldEFsbFByb3ZpZGVycyA9IGFzeW5jICgpOiBQcm9taXNlPG91dG1kcy5maW5kUHJvdmlkZXJzUGF5bG9hZFtdPiA9PiB7XG4gICAgY29uc3QgcGF5bG9hZDogb3V0bWRzLmZpbmRQcm92aWRlcnNQYXlsb2FkW10gPSBbXTtcblxuICAgIGNvbnN0IHByb3ZpZGVycyA9IGF3YWl0IHRoaXMuc3RvcmUuZ2V0QWxsUHJvdmlkZXJzKCk7XG4gICAgaWYgKCFwcm92aWRlcnMpIHtcbiAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cblxuICAgIGZvciAobGV0IGkgPSAwOyBpIDwgcHJvdmlkZXJzLmxlbmd0aDsgaSsrKSB7XG4gICAgICBjb25zdCBwcm92aWRlciA9IHByb3ZpZGVyc1tpXTtcbiAgICAgIHBheWxvYWQucHVzaCh7XG4gICAgICAgIG5hbWVzcGFjZTogcHJvdmlkZXIubmFtZXNwYWNlLFxuICAgICAgICB0eXBlOiBwcm92aWRlci50eXBlLFxuICAgICAgICB2ZXJzaW9uczogW10sXG4gICAgICB9KTtcblxuICAgICAgY29uc3QgdmVyc2lvbnMgPSBhd2FpdCB0aGlzLnN0b3JlLmdldFZlcnNpb25zKHtcbiAgICAgICAgcHJvdmlkZXJJZDogcHJvdmlkZXIuaWQsXG4gICAgICAgIHZlcnNpb25zOiBbXSxcbiAgICAgIH0pO1xuICAgICAgaWYgKCF2ZXJzaW9ucykge1xuICAgICAgICBwcm92aWRlcnMuc3BsaWNlKGksIDEpO1xuICAgICAgICBjb250aW51ZTtcbiAgICAgIH1cblxuICAgICAgdmVyc2lvbnMuZm9yRWFjaChhc3luYyAodikgPT4ge1xuICAgICAgICBjb25zdCBwcm90b2NvbHMgPSBhd2FpdCB0aGlzLnN0b3JlLmdldFByb3RvY29sc0J5VmVyc2lvbih7XG4gICAgICAgICAgcHJvdmlkZXJJZDogdi5pZCxcbiAgICAgICAgfSk7XG4gICAgICAgIGlmICghcHJvdG9jb2xzKSB7XG4gICAgICAgICAgcmV0dXJuO1xuICAgICAgICB9XG5cbiAgICAgICAgcGF5bG9hZFtpXS52ZXJzaW9ucy5wdXNoKHtcbiAgICAgICAgICB2ZXJzaW9uOiB2Lm5hbWUsXG4gICAgICAgICAgcHJvdG9jb2xzOiBwcm90b2NvbHMubWFwKChwKSA9PiBwLm5hbWUpLFxuICAgICAgICB9KTtcbiAgICAgIH0pO1xuICAgIH1cblxuICAgIHJldHVybiBwYXlsb2FkO1xuICB9O1xuXG4gIGdldFByb3ZpZGVyVmVyc2lvbiA9IGFzeW5jIChcbiAgICBwOiBpbm1kcy5nZXRQcm92aWRlclZlcnNpb24sXG4gICk6IFByb21pc2U8b3V0bWRzLmdldFByb3ZpZGVyVmVyc2lvblBheWxvYWQgfCBudWxsPiA9PiB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBhd2FpdCB0aGlzLnN0b3JlLmdldFByb3ZpZGVyKHtcbiAgICAgIG5hbWVzcGFjZTogcC5uYW1lc3BhY2UsXG4gICAgICB0eXBlOiBwLnR5cGVcbiAgICB9KTtcbiAgICBpZiAoIXByb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJzaW9uID0gYXdhaXQgdGhpcy5zdG9yZS5nZXRWZXJzaW9uKHtcbiAgICAgIHByb3ZpZGVySWQ6IHByb3ZpZGVyLmlkLFxuICAgICAgbmFtZTogcC52ZXJzaW9uLFxuICAgIH0pO1xuICAgIGlmICghdmVyc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2xzID0gYXdhaXQgdGhpcy5zdG9yZS5nZXRQcm90b2NvbHNCeVZlcnNpb24oe1xuICAgICAgcHJvdmlkZXJJZDogdmVyc2lvbi5pZCxcbiAgICB9KTtcbiAgICBpZiAoIXByb3RvY29scykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIG5hbWVzcGFjZTogcHJvdmlkZXIubmFtZXNwYWNlLFxuICAgICAgdHlwZTogcHJvdmlkZXIudHlwZSxcbiAgICAgIHZlcnNpb246IHZlcnNpb24ubmFtZSxcbiAgICAgIHByb3RvY29sczogcHJvdG9jb2xzLm1hcCgocCkgPT4gcC5uYW1lKSxcbiAgICB9O1xuICB9XG5cbiAgZ2V0UHJvdmlkZXJWZXJzaW9ucyA9IGFzeW5jIChcbiAgICBwOiBpbm1kcy5nZXRQcm92aWRlclZlcnNpb25zLFxuICApOiBQcm9taXNlPG91dG1kcy5nZXRQcm92aWRlclZlcnNpb25zUGF5bG9hZD4gPT4ge1xuICAgIGNvbnN0IHBheWxvYWQ6IG91dG1kcy5nZXRQcm92aWRlclZlcnNpb25zUGF5bG9hZCA9IHsgdmVyc2lvbnM6IFtdIH07XG4gICAgY29uc3QgcHJvdmlkZXIgPSBhd2FpdCB0aGlzLnN0b3JlLmdldFByb3ZpZGVyKHApO1xuICAgIGlmICghcHJvdmlkZXIpIHtcbiAgICAgIHJldHVybiBwYXlsb2FkO1xuICAgIH1cbiAgICBjb25zdCB2ZXJzaW9ucyA9IGF3YWl0IHRoaXMuc3RvcmUuZ2V0QWxsUHJvdmlkZXJWZXJzaW9ucyh7XG4gICAgICBwcm92aWRlcklkOiBwcm92aWRlci5pZCxcbiAgICB9KTtcbiAgICBpZiAoIXZlcnNpb25zKSB7XG4gICAgICByZXR1cm4gcGF5bG9hZDtcbiAgICB9XG5cbiAgICBjb25zdCByID0gYXdhaXQgUHJvbWlzZS5hbGwodmVyc2lvbnMubWFwKGFzeW5jICh2KSA9PiB7XG4gICAgICBjb25zdCBwcm90b2NvbHMgPSBhd2FpdCB0aGlzLnN0b3JlLmdldFByb3RvY29sc0J5VmVyc2lvbih7XG4gICAgICAgIHByb3ZpZGVySWQ6IHYuaWQsXG4gICAgICB9KTtcbiAgICAgIGlmICghcHJvdG9jb2xzKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICBjb25zdCBwbGF0Zm9ybXMgPSBhd2FpdCB0aGlzLnN0b3JlLmdldFBsYXRmb3Jtcyh7XG4gICAgICAgIHByb3ZpZGVySWQ6IHYuaWQsXG4gICAgICB9KTtcbiAgICAgIGlmICghcGxhdGZvcm1zKSB7XG4gICAgICAgIHJldHVybiBudWxsO1xuICAgICAgfVxuXG4gICAgICByZXR1cm4ge1xuICAgICAgICB2ZXJzaW9uOiB2Lm5hbWUsXG4gICAgICAgIHByb3RvY29sczogcHJvdG9jb2xzLm1hcCgocCkgPT4gcC5uYW1lKSxcbiAgICAgICAgcGxhdGZvcm1zOiBwbGF0Zm9ybXMubWFwKChwKTogb3V0bWRzLlBsYXRmb3JtUGF5bG9hZCA9PiB7XG4gICAgICAgICAgcmV0dXJuIHtcbiAgICAgICAgICAgIG9zOiBwLm9zLFxuICAgICAgICAgICAgYXJjaDogcC5hcmNoLFxuICAgICAgICAgICAgZmlsZW5hbWU6IHAuZmlsZW5hbWUsXG4gICAgICAgICAgICBzaGFzdW06IHAuc2hhc3VtLFxuICAgICAgICAgIH07XG4gICAgICAgIH0pLFxuICAgICAgfTtcbiAgICB9KSk7XG5cbiAgICBjb25zdCByZXN1bHQgPSB7XG4gICAgICB2ZXJzaW9uczogci5maWx0ZXIoKHYpID0+IHYgIT09IG51bGwpLFxuICAgIH0gYXMgb3V0bWRzLmdldFByb3ZpZGVyVmVyc2lvbnNQYXlsb2FkO1xuXG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvKipcbiAgICogZ2V0cyBkZXRhaWxzIGZvciByZXF1ZXN0ZWQgcHJvdmlkZXIgYmluYXJ5LCBpbmNsdWRlcyBncGcgcHVibGljIGtleXMsIHBsYXRmb3JtIGJpbnMgcGF0aCBhbmQgc2hhc3VtLFxuICAgKiBzcGVjaWZpYyBmb3Igb25lIHZlcnNpb24gYW5kIHBsYXRmb3JtXG4gICAqXG4gICAqIEBwYXJhbSB7aW5tZHMuZmluZFByb3ZpZGVyUGFja2FnZX0gcHJvdmlkZXIgLSBQcm92aWRlciB2ZXJzaW9uIGFuZCBwbGF0Zm9ybSBkZXRhaWxzXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm92aWRlci5uYW1lc3BhY2UgLSBQcm92aWRlciBuYW1lc3BhY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IHByb3ZpZGVyLnR5cGUgLSBQcm92aWRlciB0eXBlXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwcm92aWRlci52ZXJzaW9uIC0gUHJvdmlkZXIgdmVyc2lvblxuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvdmlkZXIub3MgLSBQcm92aWRlciBwbGF0Zm9ybSBvc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcHJvdmlkZXIuYXJjaCAtIFByb3ZpZGVyIHBsYXRmb3JtIGFyY2hcbiAgICpcbiAgICogQHJldHVybnMge291dG1kcy5maW5kUHJvdmlkZXJQYWNrYWdlUGF5bG9hZCB8IG51bGx9IC0gUHJvdmlkZXIgZGV0YWlscyBvciBudWxsIGlmIG5vdCBmb3VuZFxuICAgKi9cbiAgZmluZFByb3ZpZGVyUGFja2FnZSA9IGFzeW5jIChcbiAgICBwOiBpbm1kcy5maW5kUHJvdmlkZXJQYWNrYWdlLFxuICApOiBQcm9taXNlPG91dG1kcy5maW5kUHJvdmlkZXJQYWNrYWdlUGF5bG9hZCB8IG51bGw+ID0+IHtcbiAgICBjb25zdCBwcm92aWRlciA9IGF3YWl0IHRoaXMuc3RvcmUuZ2V0UHJvdmlkZXIoe1xuICAgICAgbmFtZXNwYWNlOiBwLm5hbWVzcGFjZSxcbiAgICAgIHR5cGU6IHAudHlwZSxcbiAgICB9KTtcbiAgICBpZiAoIXByb3ZpZGVyKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCB2ZXJzaW9uID0gYXdhaXQgdGhpcy5zdG9yZS5nZXRWZXJzaW9uKHtcbiAgICAgIHByb3ZpZGVySWQ6IHByb3ZpZGVyLmlkLFxuICAgICAgbmFtZTogcC52ZXJzaW9uLFxuICAgIH0pO1xuICAgIGlmICghdmVyc2lvbikge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcHJvdG9jb2xzID0gYXdhaXQgdGhpcy5zdG9yZS5nZXRQcm90b2NvbHNCeVZlcnNpb24oe1xuICAgICAgcHJvdmlkZXJJZDogdmVyc2lvbi5pZCxcbiAgICB9KTtcbiAgICBpZiAoIXByb3RvY29scykge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgY29uc3QgcGxhdGZvcm0gPSBhd2FpdCB0aGlzLnN0b3JlLmdldFBsYXRmb3JtKHtcbiAgICAgIG9zOiBwLm9zLFxuICAgICAgYXJjaDogcC5hcmNoLFxuICAgICAgcHJvdmlkZXJJZDogdmVyc2lvbi5pZCxcbiAgICB9KTtcbiAgICBpZiAoIXBsYXRmb3JtKSB7XG4gICAgICByZXR1cm4gbnVsbDtcbiAgICB9XG5cbiAgICBjb25zdCBncGdQdWJsaWNLZXlzID0gYXdhaXQgdGhpcy5zdG9yZS5nZXRHcGdQdWJsaWNLZXlzKHtcbiAgICAgIHByb3ZpZGVySWQ6IHByb3ZpZGVyLmlkLFxuICAgIH0pO1xuICAgIGlmICghZ3BnUHVibGljS2V5cyB8fCBncGdQdWJsaWNLZXlzLmxlbmd0aCA9PT0gMCkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgcmV0dXJuIHtcbiAgICAgIHByb3RvY29sczogcHJvdG9jb2xzLm1hcCgocCkgPT4gcC5uYW1lKSxcbiAgICAgIG9zOiBwbGF0Zm9ybS5vcyxcbiAgICAgIGFyY2g6IHBsYXRmb3JtLmFyY2gsXG4gICAgICBmaWxlbmFtZTogcGxhdGZvcm0uZmlsZW5hbWUsXG4gICAgICBzaGFzdW06IHBsYXRmb3JtLnNoYXN1bSxcbiAgICAgIGdwZ1B1YmxpY0tleXM6IGdwZ1B1YmxpY0tleXMubWFwKChwKSA9PiB7XG4gICAgICAgIHJldHVybiB7XG4gICAgICAgICAga2V5SWQ6IHAua2V5SWQsXG4gICAgICAgICAgYXNjaWlBcm1vcjogcC5hc2NpaUFybW9yLFxuICAgICAgICAgIHRydXN0U2lnbmF0dXJlOiBwLnRydXN0U2lnbmF0dXJlLFxuICAgICAgICAgIHNvdXJjZTogcC5zb3VyY2UsXG4gICAgICAgICAgc291cmNlVXJsOiBwLnNvdXJjZVVybCxcbiAgICAgICAgfTtcbiAgICAgIH0pLFxuICAgIH07XG4gIH07XG5cbiAgLyoqXG4gICAqIGNoZWNrcyBpZiBwcm92aWRlciB2ZXJzaW9uIGV4aXN0c1xuICAgKlxuICAgKiBAcGFyYW0ge2lubWRzLmdldFByb3ZpZGVyVmVyc2lvbn0gcCAtIFByb3ZpZGVyIHZlcnNpb24gZGV0YWlsc1xuICAgKiBAcGFyYW0ge3N0cmluZ30gcC5uYW1lc3BhY2UgLSBQcm92aWRlciBuYW1lc3BhY2VcbiAgICogQHBhcmFtIHtzdHJpbmd9IHAudHlwZSAtIFByb3ZpZGVyIHR5cGVcbiAgICogQHBhcmFtIHtzdHJpbmd9IHAudmVyc2lvbiAtIFByb3ZpZGVyIHZlcnNpb25cbiAgICogQHJldHVybnMge1Byb21pc2U8Ym9vbGVhbj59IC0gdHJ1ZSBpZiBwcm92aWRlciB2ZXJzaW9uIGV4aXN0cywgZmFsc2Ugb3RoZXJ3aXNlXG4gICAqL1xuICBwcm92aWRlckhhc1ZlcnNpb24gPSBhc3luYyAocDogaW5tZHMuZ2V0UHJvdmlkZXJWZXJzaW9uKTogUHJvbWlzZTxib29sZWFuPiA9PiB7XG4gICAgY29uc3QgcHJvdmlkZXIgPSBhd2FpdCB0aGlzLnN0b3JlLmdldFByb3ZpZGVyKHtcbiAgICAgIG5hbWVzcGFjZTogcC5uYW1lc3BhY2UsXG4gICAgICB0eXBlOiBwLnR5cGUsXG4gICAgfSk7XG4gICAgaWYgKCFwcm92aWRlcikge1xuICAgICAgcmV0dXJuIGZhbHNlO1xuICAgIH1cblxuICAgIHJldHVybiAhIShhd2FpdCB0aGlzLnN0b3JlLmdldFZlcnNpb24oe1xuICAgICAgcHJvdmlkZXJJZDogcHJvdmlkZXIuaWQsXG4gICAgICBuYW1lOiBwLnZlcnNpb24sXG4gICAgfSkpO1xuICB9XG59XG4iXX0=