"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const index_1 = require("../../../prisma/generated/client/index");
const debug_1 = require("debug");
class SqlServerStore {
    constructor() {
        var _a;
        /*
         * CREATE OPs
         */
        /**
         * Saves a provider to the database.
         *
         * @param {options.saveProviderOptions} opts - The options to save the provider.
         * @param {string} opts.namespace - The namespace of the provider.
         * @param {string} opts.type - The type of the provider.
         *
         * @returns {Provider | null} - The correspondent provider model that was saved on the database or null if there was an error.
         */
        this.saveProvider = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.provider.create({ data: p });
            this.dg('saved the provider into db: %o', result);
            return result;
        });
        /**
         * Save a provider version into the database.
         *
         * @param {options.saveVersionOptions} p - The options to save the version.
         * @param {string} p.name - The namespace of the provider.
         * @param {string} p.providerId - The ID of the provider.
         * @param {string} p.protocolIds - The ids the provider supports.
         *
         * @returns {Version | null} - The correspondent version model that was saved on the database or null if there was an error.
         */
        this.saveVersion = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.version.create({
                data: {
                    name: p.name,
                    provider: {
                        connect: {
                            id: p.providerId,
                        },
                    },
                    protocols: {
                        create: p.protocolIds.map((id) => {
                            return { protocol: { connect: { id: id } } };
                        }),
                    },
                },
            });
            this.dg('saved the provider into db: %o', result);
            return result;
        });
        /**
         * @param {options.saveVersionsOptions} p - The options to save the versions.
         * @param {string} p.versions - The versions to save.
         *
         * @returns {Version[] | null} - The correspondent version model that was saved on the database or null if there was an error.
         */
        this.saveVersions = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.$transaction(p.versions.map((version) => this.prisma.version.create({ data: version })));
            this.dg('saved the provider into db: %o', result);
            return result;
        });
        /**
         * @param {options.saveProtocolOptions} p - The options to save the protocol.
         * @param {string} p.name - The name of the protocol.
         *
         * @returns {Protocol | null} - The correspondent protocol model that was saved on the database or null if there was an error.
         */
        this.saveProtocol = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.protocol.create({ data: p });
            this.dg('saved the provider into db: %o', result);
            return result;
        });
        /**
         * Saves a list of protocols to the database.
         * @param {saveProtocolsOptions} p - The options to save the protocols.
         * @param {string[]} p.protocols - The list of protocols to save.
         *
         * @returns {Protocol[] | null} - The correspondent protocol model that was saved on the database or null if there was an error.
         */
        this.saveProtocols = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.$transaction(p.protocols.map((prot) => this.prisma.protocol.create({ data: { name: prot } })));
            this.dg('saved the provider into db: %o', result);
            return result;
        });
        /**
         * Saves a platform to the database.
         * @param {savePlatformOptions} p - The options to save the provider executable platform definitions.
         * @param {number} p.providerId- The Id of the provider.
         * @param {string} p.os - The desired os of the selected provider executable.
         * @param {string} p.arch - The os architecture of the selected provider executable.
         * @param {string} p.filename - The file path of the executable.
         *
         * @returns {Platform | null} - The correspondent platform model that was saved on the database or null if there was an error.
         */
        this.savePlatform = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.platform.create({ data: p });
            this.dg('saved the provider into db: %o', result);
            return result;
        });
        /**
         * Saves a list of platforms to the database.
         *
         * @param {options.savePlatformsOptions} p - The options to save the provider executable platform definitions.
         * @param {options.savePlatformOptions[]} p.platforms - The provided platform definitions to save.
         *
         * @returns {Platform[] | null} - The correspondent platform models that were saved on the database or null if there was an error.
         */
        this.savePlatforms = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.$transaction(p.platforms.map((plat) => this.prisma.platform.create({ data: plat })));
            this.dg('saved the provider into db: %o', result);
            return result;
        });
        /**
         * Saves a GPG public key to the database.
         *
         * @param {options.saveGpgPublicKeyOptions} p - The options to save the GPG public key.
         * @param {string} p.providerId - The ID of the provider.
         * @param {string} p.keyId - The GPG public key ID.
         * @param {string} p.asciiArmor - The GPG public key ASCII armor.
         * @param {string} p.trustSignature - The GPG public key trust signature.
         * @param {string} p.sourceUrl - The GPG public key source URL.
         * @param {string} p.source - The GPG public key source.
         *
         * @returns {GpgPublicKey | null} - The correspondent GPG public key model that was saved on the database or null if there was an error.
         */
        this.saveGpgPublicKey = (p) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.gpgPublicKey.create({ data: p });
            this.dg('saved the provider into db: %o', result);
            return result;
        });
        /*
         * READ OPs
         */
        /**
         * Gets a provider from the database.
         *
         * @param {options.getProviderOptions} opts - The options to get the provider.
         * @param {string} opts.namespace - The name of the provider.
         *
         * @returns {Provider | null} - The correspondent provider model that was saved on the database or null if there was an error.
         */
        this.getProvider = (opts) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const provider = yield this.prisma.provider.findFirst({ where: opts });
            this.dg('search a provider in store with opts', opts);
            return provider;
        });
        /**
         * @param {options.getProviderOptions} opts - The options to get the provider.
         * @param {string | null} opts.namespace - The name of the provider.
         * @param {string | null} opts.type - The types of the provider.
         * @param {number} offset - The offset to start the search
         * @param {number} limit - The limit of the search
         *
         * @returns {Provider[] | null} - The correspondent provider models that was saved on the database or null if there was an error.
         */
        this.getProviders = (opts, offset, limit) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (opts.namespace && opts.type) {
                this.dg('error in getting provider, with both namespace and type defined getProviders would return a single result');
                return null;
            }
            this.prisma.provider.findMany;
            const result = yield this.prisma.provider.findMany({
                where: opts,
                skip: offset,
                take: limit,
                orderBy: [{ id: 'desc' }],
            });
            this.dg('search result from store: %o', result);
            return result;
            // return providers.map((p) => deserializeProvider(p));
        });
        /**
         * Gets all providers from the database.
         * @returns {Provider[] | null} - The correspondent provider models that was saved on the database or null if there was an error.
         */
        this.getAllProviders = () => tslib_1.__awaiter(this, void 0, void 0, function* () {
            const result = yield this.prisma.provider.findMany();
            this.dg('search result from store: %o', result);
            return result;
        });
        /**
         * Gets a version from the database.
         *
         * @param {options.getVersionOptions} opts - The options to get the version.
         * @param {string} opts.providerId - The id of the entity containing the base provider info model.
         * @param {string} opts.version - The name of the provider's version.
         *
         * @returns {Version | null} - The correspondent version model that was saved on the database or null if there was an error.
         */
        this.getVersion = (opts) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.dg('search provider version in store with %o', opts);
            const result = yield this.prisma.version.findFirst({ where: opts });
            return result;
        });
        /**
         * Gets a list of versions from the database.
         *
         * @param {options.getVersionsOptions} opts - The options to get the versions.
         * @param {number} opts.providerId - The id of the entity containing the base provider info model.
         * @param {string} opts.versions - The names of the desired versions.
         *
         * @returns {Version[] | null} - The correspondent version models that were saved on the database or null if there was an error.
         */
        this.getVersions = (opts) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.dg('search provider versions in store with %o', opts);
            const result = yield this.prisma.version.findMany({
                where: opts,
                orderBy: { id: 'asc' },
            });
            return result;
            // return result.map((p) => deserializeProvider(p));
        });
        /**
         * Gets all versions from the database.
         * @returns {Version[] | null} - The correspondent version models that were saved on the database or null if there was an error.
         * @param {options.getAllProviderVersionsOptions} opts - The options to get the versions.
         * @param {number} opts.providerId - The id of the entity containing the base provider info model.
         *
         * @returns {Version[] | null} - The correspondent version models that were saved on the database or null if there was an error.
         */
        this.getAllProviderVersions = (opts) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.dg('search provider versions in store with %o', opts);
            const result = yield this.prisma.version.findMany({
                where: {
                    providerId: opts.providerId,
                }
            });
            return result;
        });
        /**
         * Gets a protocol from the database.
         *
         * @param {options.getProtocolOptions} opts - The options to get the protocol.
         * @param {string} opts.name - The os of the protocol.
         *
         * @returns {Protocol | null} - The correspondent protocol model that was saved on the database or null if there was an error.
         */
        this.getProtocol = (opts) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.dg('search provider protocol in store with %o', opts);
            const result = yield this.prisma.protocol.findFirst({ where: opts });
            return result;
        });
        /**
         * Gets a list of protocols from the database.
         *
         * @param {options.getProtocolsOfVersionOptions} opts - The options to get the protocols.
         * @param {string} opts.providerId The os of the protocol.
         *
         * @returns {Protocol[] | null} - The correspondent protocol models that were saved on the database or null if there was an error.
         */
        this.getProtocolsByVersion = (opts) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.dg('search provider protocols in store with %o', opts);
            const result = yield this.prisma.protocol.findMany({
                where: {
                    providers: {
                        every: {
                            versionId: opts.providerId,
                        },
                    },
                },
            });
            return result;
        });
        /**
         * Gets a list of protocols from the database.
         *
         * @param {options.getPlatformOptions} opts - The options to get the protocols.
         * @param {string} opts.name - The os of the protocol.
         * @param {string} opts.version - The version of the protocol.
         * @param {string} opts.providerId - The id of the entity containing the base provider version info model.
         *
         * @returns {Platform | null} - The correspondent protocol models that were saved on the database or null if there was an error.
         */
        this.getPlatform = (opts) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.dg('search provider platform in store with %o', opts);
            const result = yield this.prisma.platform.findFirst({ where: opts });
            return result;
        });
        /**
         * Gets a list of platforms from the database.
         *
         * @param {options.getPlatformsOptions} opts - The options to get the protocols.
         * @param {string | null} opts.os - The os of the protocol.
         * @param {string | null} opts.arch - The version of the protocol.
         * @param {string} opts.providerId - The id of the entity containing the base provider info model.
         *
         * @returns {Platform[] | null} - The correspondent protocol models that were saved on the database or null if there was an error.
         */
        this.getPlatforms = (opts) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            if (opts.providerId && opts.os) {
                this.dg('error in getting platforms, both values set can only produce one result');
                return null;
            }
            this.dg('search provider platforms in store with %o', opts);
            const result = yield this.prisma.platform.findMany({ where: opts });
            return result;
        });
        /**
         * Gets a list of platforms from the database.
         *
         * @param {options.getGpgPublicKeysOptions} opts - The options to get the protocols.
         * @param {string} opts.providerId - The id of the entity containing the base provider info model.
         * @param {string} opts.keyId - The id of the entity containing the base provider info model.
         * @param {string} opts.asciiArmor - The id of the entity containing the base provider info model.
         * @param {string} opts.trustSignature - The id of the entity containing the base provider info model.
         * @param {string} opts.source - The id of the entity containing the base provider info model.
         * @param {string} opts.sourceUrl - The id of the entity containing the base provider info model.
         *
         * @returns {GpgPublicKey[] | null} - The correspondent protocol models that were saved on the database or null if there was an error.
         */
        this.getGpgPublicKeys = (opts) => tslib_1.__awaiter(this, void 0, void 0, function* () {
            this.dg('search provider gpg public key in store with %o', opts);
            const result = yield this.prisma.gpgPublicKey.findMany({ where: opts });
            return result;
        });
        this.dg = (0, debug_1.debug)('citizen:server:store');
        this.prisma = new index_1.PrismaClient({
            datasources: {
                db: {
                    url: (_a = process.env.DATABASE_URL) !== null && _a !== void 0 ? _a : '',
                },
            },
        });
    }
}
exports.default = SqlServerStore;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibXNzcWwuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvc3RvcmVzL21zc3FsL21zc3FsLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLGtFQU9nRDtBQUNoRCxpQ0FBOEI7QUFHOUIsTUFBcUIsY0FBYztJQUlqQzs7UUFZQTs7V0FFRztRQUVIOzs7Ozs7OztXQVFHO1FBQ0gsaUJBQVksR0FBRyxDQUNiLENBQThCLEVBQ0osRUFBRTtZQUM1QixNQUFNLE1BQU0sR0FBRyxNQUFNLElBQUksQ0FBQyxNQUFNLENBQUMsUUFBUSxDQUFDLE1BQU0sQ0FBQyxFQUFFLElBQUksRUFBRSxDQUFDLEVBQUUsQ0FBQyxDQUFDO1lBQzlELElBQUksQ0FBQyxFQUFFLENBQUMsZ0NBQWdDLEVBQUUsTUFBTSxDQUFDLENBQUM7WUFDbEQsT0FBTyxNQUFNLENBQUM7UUFDaEIsQ0FBQyxDQUFBLENBQUM7UUFFRjs7Ozs7Ozs7O1dBU0c7UUFDSCxnQkFBVyxHQUFHLENBQ1osQ0FBNkIsRUFDSixFQUFFO1lBQzNCLE1BQU0sTUFBTSxHQUFHLE1BQU0sSUFBSSxDQUFDLE1BQU0sQ0FBQyxPQUFPLENBQUMsTUFBTSxDQUFDO2dCQUM5QyxJQUFJLEVBQUU7b0JBQ0osSUFBSSxFQUFFLENBQUMsQ0FBQyxJQUFJO29CQUNaLFFBQVEsRUFBRTt3QkFDUixPQUFPLEVBQUU7NEJBQ1AsRUFBRSxFQUFFLENBQUMsQ0FBQyxVQUFVO3lCQUNqQjtxQkFDRjtvQkFDRCxTQUFTLEVBQUU7d0JBQ1QsTUFBTSxFQUFFLENBQUMsQ0FBQyxXQUFXLENBQUMsR0FBRyxDQUFDLENBQUMsRUFBRSxFQUFFLEVBQUU7NEJBQy9CLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRSxPQUFPLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxFQUFFLEVBQUUsRUFBRSxDQUFDO3dCQUMvQyxDQUFDLENBQUM7cUJBQ0g7aUJBQ0Y7YUFDRixDQUFDLENBQUM7WUFDSCxJQUFJLENB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Q0YsQ0FBQyxDQUFDO0lBQ0wsQ0FBQztDQXNZRjtBQXBaRCxpQ0FvWkMiLCJzb3VyY2VzQ29udGVudCI6WyJpbXBvcnQge1xuICBHcGdQdWJsaWNLZXksXG4gIFBsYXRmb3JtLFxuICBQcmlzbWFDbGllbnQsXG4gIFByb3RvY29sLFxuICBQcm92aWRlcixcbiAgVmVyc2lvbixcbn0gZnJvbSAnLi4vLi4vLi4vcHJpc21hL2dlbmVyYXRlZC9jbGllbnQvaW5kZXgnO1xuaW1wb3J0IHsgZGVidWcgfSBmcm9tICdkZWJ1Zyc7XG5pbXBvcnQgKiBhcyBvcHRpb25zIGZyb20gJy4uLy4uL21vZGVscy9zdG9yZS9vcHRpb25zJztcblxuZXhwb3J0IGRlZmF1bHQgY2xhc3MgU3FsU2VydmVyU3RvcmUge1xuICBwcml2YXRlIHByaXNtYSE6IFByaXNtYUNsaWVudDtcbiAgcHJpdmF0ZSBkZzogZGVidWcuRGVidWdnZXI7XG5cbiAgY29uc3RydWN0b3IoKSB7XG4gICAgdGhpcy5kZyA9IGRlYnVnKCdjaXRpemVuOnNlcnZlcjpzdG9yZScpO1xuXG4gICAgdGhpcy5wcmlzbWEgPSBuZXcgUHJpc21hQ2xpZW50KHtcbiAgICAgIGRhdGFzb3VyY2VzOiB7XG4gICAgICAgIGRiOiB7XG4gICAgICAgICAgdXJsOiBwcm9jZXNzLmVudi5EQVRBQkFTRV9VUkwgPz8gJycsXG4gICAgICAgIH0sXG4gICAgICB9LFxuICAgIH0pO1xuICB9XG5cbiAgLypcbiAgICogQ1JFQVRFIE9Qc1xuICAgKi9cblxuICAvKipcbiAgICogU2F2ZXMgYSBwcm92aWRlciB0byB0aGUgZGF0YWJhc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7b3B0aW9ucy5zYXZlUHJvdmlkZXJPcHRpb25zfSBvcHRzIC0gVGhlIG9wdGlvbnMgdG8gc2F2ZSB0aGUgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm5hbWVzcGFjZSAtIFRoZSBuYW1lc3BhY2Ugb2YgdGhlIHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy50eXBlIC0gVGhlIHR5cGUgb2YgdGhlIHByb3ZpZGVyLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvdmlkZXIgfCBudWxsfSAtIFRoZSBjb3JyZXNwb25kZW50IHByb3ZpZGVyIG1vZGVsIHRoYXQgd2FzIHNhdmVkIG9uIHRoZSBkYXRhYmFzZSBvciBudWxsIGlmIHRoZXJlIHdhcyBhbiBlcnJvci5cbiAgICovXG4gIHNhdmVQcm92aWRlciA9IGFzeW5jIChcbiAgICBwOiBvcHRpb25zLnNhdmVQcm92aWRlck9wdGlvbnMsXG4gICk6IFByb21pc2U8UHJvdmlkZXIgfCBudWxsPiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wcmlzbWEucHJvdmlkZXIuY3JlYXRlKHsgZGF0YTogcCB9KTtcbiAgICB0aGlzLmRnKCdzYXZlZCB0aGUgcHJvdmlkZXIgaW50byBkYjogJW8nLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNhdmUgYSBwcm92aWRlciB2ZXJzaW9uIGludG8gdGhlIGRhdGFiYXNlLlxuICAgKlxuICAgKiBAcGFyYW0ge29wdGlvbnMuc2F2ZVZlcnNpb25PcHRpb25zfSBwIC0gVGhlIG9wdGlvbnMgdG8gc2F2ZSB0aGUgdmVyc2lvbi5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHAubmFtZSAtIFRoZSBuYW1lc3BhY2Ugb2YgdGhlIHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcC5wcm92aWRlcklkIC0gVGhlIElEIG9mIHRoZSBwcm92aWRlci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHAucHJvdG9jb2xJZHMgLSBUaGUgaWRzIHRoZSBwcm92aWRlciBzdXBwb3J0cy5cbiAgICpcbiAgICogQHJldHVybnMge1ZlcnNpb24gfCBudWxsfSAtIFRoZSBjb3JyZXNwb25kZW50IHZlcnNpb24gbW9kZWwgdGhhdCB3YXMgc2F2ZWQgb24gdGhlIGRhdGFiYXNlIG9yIG51bGwgaWYgdGhlcmUgd2FzIGFuIGVycm9yLlxuICAgKi9cbiAgc2F2ZVZlcnNpb24gPSBhc3luYyAoXG4gICAgcDogb3B0aW9ucy5zYXZlVmVyc2lvbk9wdGlvbnMsXG4gICk6IFByb21pc2U8VmVyc2lvbiB8IG51bGw+ID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnByaXNtYS52ZXJzaW9uLmNyZWF0ZSh7XG4gICAgICBkYXRhOiB7XG4gICAgICAgIG5hbWU6IHAubmFtZSxcbiAgICAgICAgcHJvdmlkZXI6IHtcbiAgICAgICAgICBjb25uZWN0OiB7XG4gICAgICAgICAgICBpZDogcC5wcm92aWRlcklkLFxuICAgICAgICAgIH0sXG4gICAgICAgIH0sXG4gICAgICAgIHByb3RvY29sczoge1xuICAgICAgICAgIGNyZWF0ZTogcC5wcm90b2NvbElkcy5tYXAoKGlkKSA9PiB7XG4gICAgICAgICAgICByZXR1cm4geyBwcm90b2NvbDogeyBjb25uZWN0OiB7IGlkOiBpZCB9IH0gfTtcbiAgICAgICAgICB9KSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgdGhpcy5kZygnc2F2ZWQgdGhlIHByb3ZpZGVyIGludG8gZGI6ICVvJywgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBAcGFyYW0ge29wdGlvbnMuc2F2ZVZlcnNpb25zT3B0aW9uc30gcCAtIFRoZSBvcHRpb25zIHRvIHNhdmUgdGhlIHZlcnNpb25zLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcC52ZXJzaW9ucyAtIFRoZSB2ZXJzaW9ucyB0byBzYXZlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VmVyc2lvbltdIHwgbnVsbH0gLSBUaGUgY29ycmVzcG9uZGVudCB2ZXJzaW9uIG1vZGVsIHRoYXQgd2FzIHNhdmVkIG9uIHRoZSBkYXRhYmFzZSBvciBudWxsIGlmIHRoZXJlIHdhcyBhbiBlcnJvci5cbiAgICovXG4gIHNhdmVWZXJzaW9ucyA9IGFzeW5jIChcbiAgICBwOiBvcHRpb25zLnNhdmVWZXJzaW9uc09wdGlvbnMsXG4gICk6IFByb21pc2U8VmVyc2lvbltdIHwgbnVsbD4gPT4ge1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucHJpc21hLiR0cmFuc2FjdGlvbihcbiAgICAgIHAudmVyc2lvbnMubWFwKCh2ZXJzaW9uKSA9PlxuICAgICAgICB0aGlzLnByaXNtYS52ZXJzaW9uLmNyZWF0ZSh7IGRhdGE6IHZlcnNpb24gfSlcbiAgICAgICksXG4gICAgKTtcbiAgICB0aGlzLmRnKCdzYXZlZCB0aGUgcHJvdmlkZXIgaW50byBkYjogJW8nLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEBwYXJhbSB7b3B0aW9ucy5zYXZlUHJvdG9jb2xPcHRpb25zfSBwIC0gVGhlIG9wdGlvbnMgdG8gc2F2ZSB0aGUgcHJvdG9jb2wuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwLm5hbWUgLSBUaGUgbmFtZSBvZiB0aGUgcHJvdG9jb2wuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm90b2NvbCB8IG51bGx9IC0gVGhlIGNvcnJlc3BvbmRlbnQgcHJvdG9jb2wgbW9kZWwgdGhhdCB3YXMgc2F2ZWQgb24gdGhlIGRhdGFiYXNlIG9yIG51bGwgaWYgdGhlcmUgd2FzIGFuIGVycm9yLlxuICAgKi9cbiAgc2F2ZVByb3RvY29sID0gYXN5bmMgKFxuICAgIHA6IG9wdGlvbnMuc2F2ZVByb3RvY29sT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxQcm90b2NvbCB8IG51bGw+ID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnByaXNtYS5wcm90b2NvbC5jcmVhdGUoeyBkYXRhOiBwIH0pO1xuICAgIHRoaXMuZGcoJ3NhdmVkIHRoZSBwcm92aWRlciBpbnRvIGRiOiAlbycsIHJlc3VsdCk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvKipcbiAgICogU2F2ZXMgYSBsaXN0IG9mIHByb3RvY29scyB0byB0aGUgZGF0YWJhc2UuXG4gICAqIEBwYXJhbSB7c2F2ZVByb3RvY29sc09wdGlvbnN9IHAgLSBUaGUgb3B0aW9ucyB0byBzYXZlIHRoZSBwcm90b2NvbHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nW119IHAucHJvdG9jb2xzIC0gVGhlIGxpc3Qgb2YgcHJvdG9jb2xzIHRvIHNhdmUuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm90b2NvbFtdIHwgbnVsbH0gLSBUaGUgY29ycmVzcG9uZGVudCBwcm90b2NvbCBtb2RlbCB0aGF0IHdhcyBzYXZlZCBvbiB0aGUgZGF0YWJhc2Ugb3IgbnVsbCBpZiB0aGVyZSB3YXMgYW4gZXJyb3IuXG4gICAqL1xuICBzYXZlUHJvdG9jb2xzID0gYXN5bmMgKFxuICAgIHA6IG9wdGlvbnMuc2F2ZVByb3RvY29sc09wdGlvbnMsXG4gICk6IFByb21pc2U8UHJvdG9jb2xbXSB8IG51bGw+ID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnByaXNtYS4kdHJhbnNhY3Rpb24oXG4gICAgICBwLnByb3RvY29scy5tYXAoKHByb3QpID0+XG4gICAgICAgIHRoaXMucHJpc21hLnByb3RvY29sLmNyZWF0ZSh7IGRhdGE6IHsgbmFtZTogcHJvdCB9IH0pXG4gICAgICApLFxuICAgICk7XG4gICAgdGhpcy5kZygnc2F2ZWQgdGhlIHByb3ZpZGVyIGludG8gZGI6ICVvJywgcmVzdWx0KTtcblxuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNhdmVzIGEgcGxhdGZvcm0gdG8gdGhlIGRhdGFiYXNlLlxuICAgKiBAcGFyYW0ge3NhdmVQbGF0Zm9ybU9wdGlvbnN9IHAgLSBUaGUgb3B0aW9ucyB0byBzYXZlIHRoZSBwcm92aWRlciBleGVjdXRhYmxlIHBsYXRmb3JtIGRlZmluaXRpb25zLlxuICAgKiBAcGFyYW0ge251bWJlcn0gcC5wcm92aWRlcklkLSBUaGUgSWQgb2YgdGhlIHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcC5vcyAtIFRoZSBkZXNpcmVkIG9zIG9mIHRoZSBzZWxlY3RlZCBwcm92aWRlciBleGVjdXRhYmxlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcC5hcmNoIC0gVGhlIG9zIGFyY2hpdGVjdHVyZSBvZiB0aGUgc2VsZWN0ZWQgcHJvdmlkZXIgZXhlY3V0YWJsZS5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHAuZmlsZW5hbWUgLSBUaGUgZmlsZSBwYXRoIG9mIHRoZSBleGVjdXRhYmxlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UGxhdGZvcm0gfCBudWxsfSAtIFRoZSBjb3JyZXNwb25kZW50IHBsYXRmb3JtIG1vZGVsIHRoYXQgd2FzIHNhdmVkIG9uIHRoZSBkYXRhYmFzZSBvciBudWxsIGlmIHRoZXJlIHdhcyBhbiBlcnJvci5cbiAgICovXG4gIHNhdmVQbGF0Zm9ybSA9IGFzeW5jIChcbiAgICBwOiBvcHRpb25zLnNhdmVQbGF0Zm9ybU9wdGlvbnMsXG4gICk6IFByb21pc2U8UGxhdGZvcm0gfCBudWxsPiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wcmlzbWEucGxhdGZvcm0uY3JlYXRlKHsgZGF0YTogcCB9KTtcbiAgICB0aGlzLmRnKCdzYXZlZCB0aGUgcHJvdmlkZXIgaW50byBkYjogJW8nLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIFNhdmVzIGEgbGlzdCBvZiBwbGF0Zm9ybXMgdG8gdGhlIGRhdGFiYXNlLlxuICAgKlxuICAgKiBAcGFyYW0ge29wdGlvbnMuc2F2ZVBsYXRmb3Jtc09wdGlvbnN9IHAgLSBUaGUgb3B0aW9ucyB0byBzYXZlIHRoZSBwcm92aWRlciBleGVjdXRhYmxlIHBsYXRmb3JtIGRlZmluaXRpb25zLlxuICAgKiBAcGFyYW0ge29wdGlvbnMuc2F2ZVBsYXRmb3JtT3B0aW9uc1tdfSBwLnBsYXRmb3JtcyAtIFRoZSBwcm92aWRlZCBwbGF0Zm9ybSBkZWZpbml0aW9ucyB0byBzYXZlLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UGxhdGZvcm1bXSB8IG51bGx9IC0gVGhlIGNvcnJlc3BvbmRlbnQgcGxhdGZvcm0gbW9kZWxzIHRoYXQgd2VyZSBzYXZlZCBvbiB0aGUgZGF0YWJhc2Ugb3IgbnVsbCBpZiB0aGVyZSB3YXMgYW4gZXJyb3IuXG4gICAqL1xuICBzYXZlUGxhdGZvcm1zID0gYXN5bmMgKFxuICAgIHA6IG9wdGlvbnMuc2F2ZVBsYXRmb3Jtc09wdGlvbnMsXG4gICk6IFByb21pc2U8UGxhdGZvcm1bXSB8IG51bGw+ID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnByaXNtYS4kdHJhbnNhY3Rpb24oXG4gICAgICBwLnBsYXRmb3Jtcy5tYXAoKHBsYXQpID0+IHRoaXMucHJpc21hLnBsYXRmb3JtLmNyZWF0ZSh7IGRhdGE6IHBsYXQgfSkpLFxuICAgICk7XG4gICAgdGhpcy5kZygnc2F2ZWQgdGhlIHByb3ZpZGVyIGludG8gZGI6ICVvJywgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBTYXZlcyBhIEdQRyBwdWJsaWMga2V5IHRvIHRoZSBkYXRhYmFzZS5cbiAgICpcbiAgICogQHBhcmFtIHtvcHRpb25zLnNhdmVHcGdQdWJsaWNLZXlPcHRpb25zfSBwIC0gVGhlIG9wdGlvbnMgdG8gc2F2ZSB0aGUgR1BHIHB1YmxpYyBrZXkuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBwLnByb3ZpZGVySWQgLSBUaGUgSUQgb2YgdGhlIHByb3ZpZGVyLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcC5rZXlJZCAtIFRoZSBHUEcgcHVibGljIGtleSBJRC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHAuYXNjaWlBcm1vciAtIFRoZSBHUEcgcHVibGljIGtleSBBU0NJSSBhcm1vci5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHAudHJ1c3RTaWduYXR1cmUgLSBUaGUgR1BHIHB1YmxpYyBrZXkgdHJ1c3Qgc2lnbmF0dXJlLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gcC5zb3VyY2VVcmwgLSBUaGUgR1BHIHB1YmxpYyBrZXkgc291cmNlIFVSTC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IHAuc291cmNlIC0gVGhlIEdQRyBwdWJsaWMga2V5IHNvdXJjZS5cbiAgICpcbiAgICogQHJldHVybnMge0dwZ1B1YmxpY0tleSB8IG51bGx9IC0gVGhlIGNvcnJlc3BvbmRlbnQgR1BHIHB1YmxpYyBrZXkgbW9kZWwgdGhhdCB3YXMgc2F2ZWQgb24gdGhlIGRhdGFiYXNlIG9yIG51bGwgaWYgdGhlcmUgd2FzIGFuIGVycm9yLlxuICAgKi9cbiAgc2F2ZUdwZ1B1YmxpY0tleSA9IGFzeW5jIChcbiAgICBwOiBvcHRpb25zLnNhdmVHcGdQdWJsaWNLZXlPcHRpb25zLFxuICApOiBQcm9taXNlPEdwZ1B1YmxpY0tleSB8IG51bGw+ID0+IHtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnByaXNtYS5ncGdQdWJsaWNLZXkuY3JlYXRlKHsgZGF0YTogcCB9KTtcbiAgICB0aGlzLmRnKCdzYXZlZCB0aGUgcHJvdmlkZXIgaW50byBkYjogJW8nLCByZXN1bHQpO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLypcbiAgICogUkVBRCBPUHNcbiAgICovXG5cbiAgLyoqXG4gICAqIEdldHMgYSBwcm92aWRlciBmcm9tIHRoZSBkYXRhYmFzZS5cbiAgICpcbiAgICogQHBhcmFtIHtvcHRpb25zLmdldFByb3ZpZGVyT3B0aW9uc30gb3B0cyAtIFRoZSBvcHRpb25zIHRvIGdldCB0aGUgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm5hbWVzcGFjZSAtIFRoZSBuYW1lIG9mIHRoZSBwcm92aWRlci5cbiAgICpcbiAgICogQHJldHVybnMge1Byb3ZpZGVyIHwgbnVsbH0gLSBUaGUgY29ycmVzcG9uZGVudCBwcm92aWRlciBtb2RlbCB0aGF0IHdhcyBzYXZlZCBvbiB0aGUgZGF0YWJhc2Ugb3IgbnVsbCBpZiB0aGVyZSB3YXMgYW4gZXJyb3IuXG4gICAqL1xuICBnZXRQcm92aWRlciA9IGFzeW5jIChcbiAgICBvcHRzOiBvcHRpb25zLmdldFByb3ZpZGVyT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxQcm92aWRlciB8IG51bGw+ID0+IHtcbiAgICBjb25zdCBwcm92aWRlciA9IGF3YWl0IHRoaXMucHJpc21hLnByb3ZpZGVyLmZpbmRGaXJzdCh7IHdoZXJlOiBvcHRzIH0pO1xuICAgIHRoaXMuZGcoJ3NlYXJjaCBhIHByb3ZpZGVyIGluIHN0b3JlIHdpdGggb3B0cycsIG9wdHMpO1xuICAgIHJldHVybiBwcm92aWRlcjtcbiAgfTtcblxuICAvKipcbiAgICogQHBhcmFtIHtvcHRpb25zLmdldFByb3ZpZGVyT3B0aW9uc30gb3B0cyAtIFRoZSBvcHRpb25zIHRvIGdldCB0aGUgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gb3B0cy5uYW1lc3BhY2UgLSBUaGUgbmFtZSBvZiB0aGUgcHJvdmlkZXIuXG4gICAqIEBwYXJhbSB7c3RyaW5nIHwgbnVsbH0gb3B0cy50eXBlIC0gVGhlIHR5cGVzIG9mIHRoZSBwcm92aWRlci5cbiAgICogQHBhcmFtIHtudW1iZXJ9IG9mZnNldCAtIFRoZSBvZmZzZXQgdG8gc3RhcnQgdGhlIHNlYXJjaFxuICAgKiBAcGFyYW0ge251bWJlcn0gbGltaXQgLSBUaGUgbGltaXQgb2YgdGhlIHNlYXJjaFxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvdmlkZXJbXSB8IG51bGx9IC0gVGhlIGNvcnJlc3BvbmRlbnQgcHJvdmlkZXIgbW9kZWxzIHRoYXQgd2FzIHNhdmVkIG9uIHRoZSBkYXRhYmFzZSBvciBudWxsIGlmIHRoZXJlIHdhcyBhbiBlcnJvci5cbiAgICovXG4gIGdldFByb3ZpZGVycyA9IGFzeW5jIChcbiAgICBvcHRzOiBvcHRpb25zLmdldFByb3ZpZGVyc09wdGlvbnMsXG4gICAgb2Zmc2V0OiBudW1iZXIsXG4gICAgbGltaXQ6IG51bWJlcixcbiAgKTogUHJvbWlzZTxQcm92aWRlcltdIHwgbnVsbD4gPT4ge1xuICAgIGlmIChvcHRzLm5hbWVzcGFjZSAmJiBvcHRzLnR5cGUpIHtcbiAgICAgIHRoaXMuZGcoXG4gICAgICAgICdlcnJvciBpbiBnZXR0aW5nIHByb3ZpZGVyLCB3aXRoIGJvdGggbmFtZXNwYWNlIGFuZCB0eXBlIGRlZmluZWQgZ2V0UHJvdmlkZXJzIHdvdWxkIHJldHVybiBhIHNpbmdsZSByZXN1bHQnLFxuICAgICAgKTtcbiAgICAgIHJldHVybiBudWxsO1xuICAgIH1cbiAgICB0aGlzLnByaXNtYS5wcm92aWRlci5maW5kTWFueVxuXG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wcmlzbWEucHJvdmlkZXIuZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IG9wdHMsXG4gICAgICBza2lwOiBvZmZzZXQsXG4gICAgICB0YWtlOiBsaW1pdCxcbiAgICAgIG9yZGVyQnk6IFt7IGlkOiAnZGVzYycgfV0sXG4gICAgfSk7XG5cbiAgICB0aGlzLmRnKCdzZWFyY2ggcmVzdWx0IGZyb20gc3RvcmU6ICVvJywgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICAgIC8vIHJldHVybiBwcm92aWRlcnMubWFwKChwKSA9PiBkZXNlcmlhbGl6ZVByb3ZpZGVyKHApKTtcbiAgfTtcblxuICAvKipcbiAgICogR2V0cyBhbGwgcHJvdmlkZXJzIGZyb20gdGhlIGRhdGFiYXNlLlxuICAgKiBAcmV0dXJucyB7UHJvdmlkZXJbXSB8IG51bGx9IC0gVGhlIGNvcnJlc3BvbmRlbnQgcHJvdmlkZXIgbW9kZWxzIHRoYXQgd2FzIHNhdmVkIG9uIHRoZSBkYXRhYmFzZSBvciBudWxsIGlmIHRoZXJlIHdhcyBhbiBlcnJvci5cbiAgICovXG4gIGdldEFsbFByb3ZpZGVycyA9IGFzeW5jICgpOiBQcm9taXNlPFByb3ZpZGVyW10gfCBudWxsPiA9PiB7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wcmlzbWEucHJvdmlkZXIuZmluZE1hbnkoKTtcbiAgICB0aGlzLmRnKCdzZWFyY2ggcmVzdWx0IGZyb20gc3RvcmU6ICVvJywgcmVzdWx0KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgdmVyc2lvbiBmcm9tIHRoZSBkYXRhYmFzZS5cbiAgICpcbiAgICogQHBhcmFtIHtvcHRpb25zLmdldFZlcnNpb25PcHRpb25zfSBvcHRzIC0gVGhlIG9wdGlvbnMgdG8gZ2V0IHRoZSB2ZXJzaW9uLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wcm92aWRlcklkIC0gVGhlIGlkIG9mIHRoZSBlbnRpdHkgY29udGFpbmluZyB0aGUgYmFzZSBwcm92aWRlciBpbmZvIG1vZGVsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy52ZXJzaW9uIC0gVGhlIG5hbWUgb2YgdGhlIHByb3ZpZGVyJ3MgdmVyc2lvbi5cbiAgICpcbiAgICogQHJldHVybnMge1ZlcnNpb24gfCBudWxsfSAtIFRoZSBjb3JyZXNwb25kZW50IHZlcnNpb24gbW9kZWwgdGhhdCB3YXMgc2F2ZWQgb24gdGhlIGRhdGFiYXNlIG9yIG51bGwgaWYgdGhlcmUgd2FzIGFuIGVycm9yLlxuICAgKi9cbiAgZ2V0VmVyc2lvbiA9IGFzeW5jIChcbiAgICBvcHRzOiBvcHRpb25zLmdldFZlcnNpb25PcHRpb25zLFxuICApOiBQcm9taXNlPFZlcnNpb24gfCBudWxsPiA9PiB7XG4gICAgdGhpcy5kZygnc2VhcmNoIHByb3ZpZGVyIHZlcnNpb24gaW4gc3RvcmUgd2l0aCAlbycsIG9wdHMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucHJpc21hLnZlcnNpb24uZmluZEZpcnN0KHsgd2hlcmU6IG9wdHMgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2YgdmVyc2lvbnMgZnJvbSB0aGUgZGF0YWJhc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7b3B0aW9ucy5nZXRWZXJzaW9uc09wdGlvbnN9IG9wdHMgLSBUaGUgb3B0aW9ucyB0byBnZXQgdGhlIHZlcnNpb25zLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0cy5wcm92aWRlcklkIC0gVGhlIGlkIG9mIHRoZSBlbnRpdHkgY29udGFpbmluZyB0aGUgYmFzZSBwcm92aWRlciBpbmZvIG1vZGVsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy52ZXJzaW9ucyAtIFRoZSBuYW1lcyBvZiB0aGUgZGVzaXJlZCB2ZXJzaW9ucy5cbiAgICpcbiAgICogQHJldHVybnMge1ZlcnNpb25bXSB8IG51bGx9IC0gVGhlIGNvcnJlc3BvbmRlbnQgdmVyc2lvbiBtb2RlbHMgdGhhdCB3ZXJlIHNhdmVkIG9uIHRoZSBkYXRhYmFzZSBvciBudWxsIGlmIHRoZXJlIHdhcyBhbiBlcnJvci5cbiAgICovXG4gIGdldFZlcnNpb25zID0gYXN5bmMgKFxuICAgIG9wdHM6IG9wdGlvbnMuZ2V0VmVyc2lvbnNPcHRpb25zLFxuICApOiBQcm9taXNlPFZlcnNpb25bXSB8IG51bGw+ID0+IHtcbiAgICB0aGlzLmRnKCdzZWFyY2ggcHJvdmlkZXIgdmVyc2lvbnMgaW4gc3RvcmUgd2l0aCAlbycsIG9wdHMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucHJpc21hLnZlcnNpb24uZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IG9wdHMsXG4gICAgICBvcmRlckJ5OiB7IGlkOiAnYXNjJyB9LFxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gICAgLy8gcmV0dXJuIHJlc3VsdC5tYXAoKHApID0+IGRlc2VyaWFsaXplUHJvdmlkZXIocCkpO1xuICB9O1xuXG5cbiAgLyoqXG4gICAqIEdldHMgYWxsIHZlcnNpb25zIGZyb20gdGhlIGRhdGFiYXNlLlxuICAgKiBAcmV0dXJucyB7VmVyc2lvbltdIHwgbnVsbH0gLSBUaGUgY29ycmVzcG9uZGVudCB2ZXJzaW9uIG1vZGVscyB0aGF0IHdlcmUgc2F2ZWQgb24gdGhlIGRhdGFiYXNlIG9yIG51bGwgaWYgdGhlcmUgd2FzIGFuIGVycm9yLlxuICAgKiBAcGFyYW0ge29wdGlvbnMuZ2V0QWxsUHJvdmlkZXJWZXJzaW9uc09wdGlvbnN9IG9wdHMgLSBUaGUgb3B0aW9ucyB0byBnZXQgdGhlIHZlcnNpb25zLlxuICAgKiBAcGFyYW0ge251bWJlcn0gb3B0cy5wcm92aWRlcklkIC0gVGhlIGlkIG9mIHRoZSBlbnRpdHkgY29udGFpbmluZyB0aGUgYmFzZSBwcm92aWRlciBpbmZvIG1vZGVsLlxuICAgKlxuICAgKiBAcmV0dXJucyB7VmVyc2lvbltdIHwgbnVsbH0gLSBUaGUgY29ycmVzcG9uZGVudCB2ZXJzaW9uIG1vZGVscyB0aGF0IHdlcmUgc2F2ZWQgb24gdGhlIGRhdGFiYXNlIG9yIG51bGwgaWYgdGhlcmUgd2FzIGFuIGVycm9yLlxuICAgKi9cbiAgZ2V0QWxsUHJvdmlkZXJWZXJzaW9ucyA9IGFzeW5jIChcbiAgICBvcHRzOiBvcHRpb25zLmdldEFsbFByb3ZpZGVyVmVyc2lvbnNPcHRpb25zLFxuICApOiBQcm9taXNlPFZlcnNpb25bXSB8IG51bGw+ID0+IHtcbiAgICB0aGlzLmRnKCdzZWFyY2ggcHJvdmlkZXIgdmVyc2lvbnMgaW4gc3RvcmUgd2l0aCAlbycsIG9wdHMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucHJpc21hLnZlcnNpb24uZmluZE1hbnkoe1xuICAgICAgd2hlcmU6IHtcbiAgICAgICAgcHJvdmlkZXJJZDogb3B0cy5wcm92aWRlcklkLFxuICAgICAgfVxuICAgIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldHMgYSBwcm90b2NvbCBmcm9tIHRoZSBkYXRhYmFzZS5cbiAgICpcbiAgICogQHBhcmFtIHtvcHRpb25zLmdldFByb3RvY29sT3B0aW9uc30gb3B0cyAtIFRoZSBvcHRpb25zIHRvIGdldCB0aGUgcHJvdG9jb2wuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm5hbWUgLSBUaGUgb3Mgb2YgdGhlIHByb3RvY29sLlxuICAgKlxuICAgKiBAcmV0dXJucyB7UHJvdG9jb2wgfCBudWxsfSAtIFRoZSBjb3JyZXNwb25kZW50IHByb3RvY29sIG1vZGVsIHRoYXQgd2FzIHNhdmVkIG9uIHRoZSBkYXRhYmFzZSBvciBudWxsIGlmIHRoZXJlIHdhcyBhbiBlcnJvci5cbiAgICovXG4gIGdldFByb3RvY29sID0gYXN5bmMgKFxuICAgIG9wdHM6IG9wdGlvbnMuZ2V0UHJvdG9jb2xPcHRpb25zLFxuICApOiBQcm9taXNlPFByb3RvY29sIHwgbnVsbD4gPT4ge1xuICAgIHRoaXMuZGcoJ3NlYXJjaCBwcm92aWRlciBwcm90b2NvbCBpbiBzdG9yZSB3aXRoICVvJywgb3B0cyk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wcmlzbWEucHJvdG9jb2wuZmluZEZpcnN0KHsgd2hlcmU6IG9wdHMgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2YgcHJvdG9jb2xzIGZyb20gdGhlIGRhdGFiYXNlLlxuICAgKlxuICAgKiBAcGFyYW0ge29wdGlvbnMuZ2V0UHJvdG9jb2xzT2ZWZXJzaW9uT3B0aW9uc30gb3B0cyAtIFRoZSBvcHRpb25zIHRvIGdldCB0aGUgcHJvdG9jb2xzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wcm92aWRlcklkIFRoZSBvcyBvZiB0aGUgcHJvdG9jb2wuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQcm90b2NvbFtdIHwgbnVsbH0gLSBUaGUgY29ycmVzcG9uZGVudCBwcm90b2NvbCBtb2RlbHMgdGhhdCB3ZXJlIHNhdmVkIG9uIHRoZSBkYXRhYmFzZSBvciBudWxsIGlmIHRoZXJlIHdhcyBhbiBlcnJvci5cbiAgICovXG4gIGdldFByb3RvY29sc0J5VmVyc2lvbiA9IGFzeW5jIChcbiAgICBvcHRzOiBvcHRpb25zLmdldFByb3RvY29sc09mVmVyc2lvbk9wdGlvbnMsXG4gICk6IFByb21pc2U8UHJvdG9jb2xbXSB8IG51bGw+ID0+IHtcbiAgICB0aGlzLmRnKCdzZWFyY2ggcHJvdmlkZXIgcHJvdG9jb2xzIGluIHN0b3JlIHdpdGggJW8nLCBvcHRzKTtcbiAgICBjb25zdCByZXN1bHQgPSBhd2FpdCB0aGlzLnByaXNtYS5wcm90b2NvbC5maW5kTWFueSh7XG4gICAgICB3aGVyZToge1xuICAgICAgICBwcm92aWRlcnM6IHtcbiAgICAgICAgICBldmVyeToge1xuICAgICAgICAgICAgdmVyc2lvbklkOiBvcHRzLnByb3ZpZGVySWQsXG4gICAgICAgICAgfSxcbiAgICAgICAgfSxcbiAgICAgIH0sXG4gICAgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcblxuICAvKipcbiAgICogR2V0cyBhIGxpc3Qgb2YgcHJvdG9jb2xzIGZyb20gdGhlIGRhdGFiYXNlLlxuICAgKlxuICAgKiBAcGFyYW0ge29wdGlvbnMuZ2V0UGxhdGZvcm1PcHRpb25zfSBvcHRzIC0gVGhlIG9wdGlvbnMgdG8gZ2V0IHRoZSBwcm90b2NvbHMuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLm5hbWUgLSBUaGUgb3Mgb2YgdGhlIHByb3RvY29sLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy52ZXJzaW9uIC0gVGhlIHZlcnNpb24gb2YgdGhlIHByb3RvY29sLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wcm92aWRlcklkIC0gVGhlIGlkIG9mIHRoZSBlbnRpdHkgY29udGFpbmluZyB0aGUgYmFzZSBwcm92aWRlciB2ZXJzaW9uIGluZm8gbW9kZWwuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQbGF0Zm9ybSB8IG51bGx9IC0gVGhlIGNvcnJlc3BvbmRlbnQgcHJvdG9jb2wgbW9kZWxzIHRoYXQgd2VyZSBzYXZlZCBvbiB0aGUgZGF0YWJhc2Ugb3IgbnVsbCBpZiB0aGVyZSB3YXMgYW4gZXJyb3IuXG4gICAqL1xuICBnZXRQbGF0Zm9ybSA9IGFzeW5jIChcbiAgICBvcHRzOiBvcHRpb25zLmdldFBsYXRmb3JtT3B0aW9ucyxcbiAgKTogUHJvbWlzZTxQbGF0Zm9ybSB8IG51bGw+ID0+IHtcbiAgICB0aGlzLmRnKCdzZWFyY2ggcHJvdmlkZXIgcGxhdGZvcm0gaW4gc3RvcmUgd2l0aCAlbycsIG9wdHMpO1xuICAgIGNvbnN0IHJlc3VsdCA9IGF3YWl0IHRoaXMucHJpc21hLnBsYXRmb3JtLmZpbmRGaXJzdCh7IHdoZXJlOiBvcHRzIH0pO1xuICAgIHJldHVybiByZXN1bHQ7XG4gIH07XG5cbiAgLyoqXG4gICAqIEdldHMgYSBsaXN0IG9mIHBsYXRmb3JtcyBmcm9tIHRoZSBkYXRhYmFzZS5cbiAgICpcbiAgICogQHBhcmFtIHtvcHRpb25zLmdldFBsYXRmb3Jtc09wdGlvbnN9IG9wdHMgLSBUaGUgb3B0aW9ucyB0byBnZXQgdGhlIHByb3RvY29scy5cbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBvcHRzLm9zIC0gVGhlIG9zIG9mIHRoZSBwcm90b2NvbC5cbiAgICogQHBhcmFtIHtzdHJpbmcgfCBudWxsfSBvcHRzLmFyY2ggLSBUaGUgdmVyc2lvbiBvZiB0aGUgcHJvdG9jb2wuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLnByb3ZpZGVySWQgLSBUaGUgaWQgb2YgdGhlIGVudGl0eSBjb250YWluaW5nIHRoZSBiYXNlIHByb3ZpZGVyIGluZm8gbW9kZWwuXG4gICAqXG4gICAqIEByZXR1cm5zIHtQbGF0Zm9ybVtdIHwgbnVsbH0gLSBUaGUgY29ycmVzcG9uZGVudCBwcm90b2NvbCBtb2RlbHMgdGhhdCB3ZXJlIHNhdmVkIG9uIHRoZSBkYXRhYmFzZSBvciBudWxsIGlmIHRoZXJlIHdhcyBhbiBlcnJvci5cbiAgICovXG4gIGdldFBsYXRmb3JtcyA9IGFzeW5jIChcbiAgICBvcHRzOiBvcHRpb25zLmdldFBsYXRmb3Jtc09wdGlvbnMsXG4gICk6IFByb21pc2U8UGxhdGZvcm1bXSB8IG51bGw+ID0+IHtcbiAgICBpZiAob3B0cy5wcm92aWRlcklkICYmIG9wdHMub3MpIHtcbiAgICAgIHRoaXMuZGcoXG4gICAgICAgICdlcnJvciBpbiBnZXR0aW5nIHBsYXRmb3JtcywgYm90aCB2YWx1ZXMgc2V0IGNhbiBvbmx5IHByb2R1Y2Ugb25lIHJlc3VsdCcsXG4gICAgICApO1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuXG4gICAgdGhpcy5kZygnc2VhcmNoIHByb3ZpZGVyIHBsYXRmb3JtcyBpbiBzdG9yZSB3aXRoICVvJywgb3B0cyk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wcmlzbWEucGxhdGZvcm0uZmluZE1hbnkoeyB3aGVyZTogb3B0cyB9KTtcbiAgICByZXR1cm4gcmVzdWx0O1xuICB9O1xuXG4gIC8qKlxuICAgKiBHZXRzIGEgbGlzdCBvZiBwbGF0Zm9ybXMgZnJvbSB0aGUgZGF0YWJhc2UuXG4gICAqXG4gICAqIEBwYXJhbSB7b3B0aW9ucy5nZXRHcGdQdWJsaWNLZXlzT3B0aW9uc30gb3B0cyAtIFRoZSBvcHRpb25zIHRvIGdldCB0aGUgcHJvdG9jb2xzLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5wcm92aWRlcklkIC0gVGhlIGlkIG9mIHRoZSBlbnRpdHkgY29udGFpbmluZyB0aGUgYmFzZSBwcm92aWRlciBpbmZvIG1vZGVsLlxuICAgKiBAcGFyYW0ge3N0cmluZ30gb3B0cy5rZXlJZCAtIFRoZSBpZCBvZiB0aGUgZW50aXR5IGNvbnRhaW5pbmcgdGhlIGJhc2UgcHJvdmlkZXIgaW5mbyBtb2RlbC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMuYXNjaWlBcm1vciAtIFRoZSBpZCBvZiB0aGUgZW50aXR5IGNvbnRhaW5pbmcgdGhlIGJhc2UgcHJvdmlkZXIgaW5mbyBtb2RlbC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMudHJ1c3RTaWduYXR1cmUgLSBUaGUgaWQgb2YgdGhlIGVudGl0eSBjb250YWluaW5nIHRoZSBiYXNlIHByb3ZpZGVyIGluZm8gbW9kZWwuXG4gICAqIEBwYXJhbSB7c3RyaW5nfSBvcHRzLnNvdXJjZSAtIFRoZSBpZCBvZiB0aGUgZW50aXR5IGNvbnRhaW5pbmcgdGhlIGJhc2UgcHJvdmlkZXIgaW5mbyBtb2RlbC5cbiAgICogQHBhcmFtIHtzdHJpbmd9IG9wdHMuc291cmNlVXJsIC0gVGhlIGlkIG9mIHRoZSBlbnRpdHkgY29udGFpbmluZyB0aGUgYmFzZSBwcm92aWRlciBpbmZvIG1vZGVsLlxuICAgKlxuICAgKiBAcmV0dXJucyB7R3BnUHVibGljS2V5W10gfCBudWxsfSAtIFRoZSBjb3JyZXNwb25kZW50IHByb3RvY29sIG1vZGVscyB0aGF0IHdlcmUgc2F2ZWQgb24gdGhlIGRhdGFiYXNlIG9yIG51bGwgaWYgdGhlcmUgd2FzIGFuIGVycm9yLlxuICAgKi9cbiAgZ2V0R3BnUHVibGljS2V5cyA9IGFzeW5jIChcbiAgICBvcHRzOiBvcHRpb25zLmdldEdwZ1B1YmxpY0tleXNPcHRpb25zLFxuICApOiBQcm9taXNlPEdwZ1B1YmxpY0tleVtdIHwgbnVsbD4gPT4ge1xuICAgIHRoaXMuZGcoJ3NlYXJjaCBwcm92aWRlciBncGcgcHVibGljIGtleSBpbiBzdG9yZSB3aXRoICVvJywgb3B0cyk7XG4gICAgY29uc3QgcmVzdWx0ID0gYXdhaXQgdGhpcy5wcmlzbWEuZ3BnUHVibGljS2V5LmZpbmRNYW55KHsgd2hlcmU6IG9wdHMgfSk7XG4gICAgcmV0dXJuIHJlc3VsdDtcbiAgfTtcbn1cbiJdfQ==