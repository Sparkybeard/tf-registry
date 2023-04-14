import { GpgPublicKey, Platform, Protocol, Provider, Version } from '../../../prisma/generated/client/index';
import * as options from '../../models/store/options';
export default class SqlServerStore {
    private prisma;
    private dg;
    constructor();
    /**
     * Saves a provider to the database.
     *
     * @param {options.saveProviderOptions} opts - The options to save the provider.
     * @param {string} opts.namespace - The namespace of the provider.
     * @param {string} opts.type - The type of the provider.
     *
     * @returns {Provider | null} - The correspondent provider model that was saved on the database or null if there was an error.
     */
    saveProvider: (p: options.saveProviderOptions) => Promise<Provider | null>;
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
    saveVersion: (p: options.saveVersionOptions) => Promise<Version | null>;
    /**
     * @param {options.saveVersionsOptions} p - The options to save the versions.
     * @param {string} p.versions - The versions to save.
     *
     * @returns {Version[] | null} - The correspondent version model that was saved on the database or null if there was an error.
     */
    saveVersions: (p: options.saveVersionsOptions) => Promise<Version[] | null>;
    /**
     * @param {options.saveProtocolOptions} p - The options to save the protocol.
     * @param {string} p.name - The name of the protocol.
     *
     * @returns {Protocol | null} - The correspondent protocol model that was saved on the database or null if there was an error.
     */
    saveProtocol: (p: options.saveProtocolOptions) => Promise<Protocol | null>;
    /**
     * Saves a list of protocols to the database.
     * @param {saveProtocolsOptions} p - The options to save the protocols.
     * @param {string[]} p.protocols - The list of protocols to save.
     *
     * @returns {Protocol[] | null} - The correspondent protocol model that was saved on the database or null if there was an error.
     */
    saveProtocols: (p: options.saveProtocolsOptions) => Promise<Protocol[] | null>;
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
    savePlatform: (p: options.savePlatformOptions) => Promise<Platform | null>;
    /**
     * Saves a list of platforms to the database.
     *
     * @param {options.savePlatformsOptions} p - The options to save the provider executable platform definitions.
     * @param {options.savePlatformOptions[]} p.platforms - The provided platform definitions to save.
     *
     * @returns {Platform[] | null} - The correspondent platform models that were saved on the database or null if there was an error.
     */
    savePlatforms: (p: options.savePlatformsOptions) => Promise<Platform[] | null>;
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
    saveGpgPublicKey: (p: options.saveGpgPublicKeyOptions) => Promise<GpgPublicKey | null>;
    /**
     * Gets a provider from the database.
     *
     * @param {options.getProviderOptions} opts - The options to get the provider.
     * @param {string} opts.namespace - The name of the provider.
     *
     * @returns {Provider | null} - The correspondent provider model that was saved on the database or null if there was an error.
     */
    getProvider: (opts: options.getProviderOptions) => Promise<Provider | null>;
    /**
     * @param {options.getProviderOptions} opts - The options to get the provider.
     * @param {string | null} opts.namespace - The name of the provider.
     * @param {string | null} opts.type - The types of the provider.
     * @param {number} offset - The offset to start the search
     * @param {number} limit - The limit of the search
     *
     * @returns {Provider[] | null} - The correspondent provider models that was saved on the database or null if there was an error.
     */
    getProviders: (opts: options.getProvidersOptions, offset: number, limit: number) => Promise<Provider[] | null>;
    /**
     * Gets all providers from the database.
     * @returns {Provider[] | null} - The correspondent provider models that was saved on the database or null if there was an error.
     */
    getAllProviders: () => Promise<Provider[] | null>;
    /**
     * Gets a version from the database.
     *
     * @param {options.getVersionOptions} opts - The options to get the version.
     * @param {string} opts.providerId - The id of the entity containing the base provider info model.
     * @param {string} opts.version - The name of the provider's version.
     *
     * @returns {Version | null} - The correspondent version model that was saved on the database or null if there was an error.
     */
    getVersion: (opts: options.getVersionOptions) => Promise<Version | null>;
    /**
     * Gets a list of versions from the database.
     *
     * @param {options.getVersionsOptions} opts - The options to get the versions.
     * @param {number} opts.providerId - The id of the entity containing the base provider info model.
     * @param {string} opts.versions - The names of the desired versions.
     *
     * @returns {Version[] | null} - The correspondent version models that were saved on the database or null if there was an error.
     */
    getVersions: (opts: options.getVersionsOptions) => Promise<Version[] | null>;
    /**
     * Gets all versions from the database.
     * @returns {Version[] | null} - The correspondent version models that were saved on the database or null if there was an error.
     * @param {options.getAllProviderVersionsOptions} opts - The options to get the versions.
     * @param {number} opts.providerId - The id of the entity containing the base provider info model.
     *
     * @returns {Version[] | null} - The correspondent version models that were saved on the database or null if there was an error.
     */
    getAllProviderVersions: (opts: options.getAllProviderVersionsOptions) => Promise<Version[] | null>;
    /**
     * Gets a protocol from the database.
     *
     * @param {options.getProtocolOptions} opts - The options to get the protocol.
     * @param {string} opts.name - The os of the protocol.
     *
     * @returns {Protocol | null} - The correspondent protocol model that was saved on the database or null if there was an error.
     */
    getProtocol: (opts: options.getProtocolOptions) => Promise<Protocol | null>;
    /**
     * Gets a list of protocols from the database.
     *
     * @param {options.getProtocolsOfVersionOptions} opts - The options to get the protocols.
     * @param {string} opts.providerId The os of the protocol.
     *
     * @returns {Protocol[] | null} - The correspondent protocol models that were saved on the database or null if there was an error.
     */
    getProtocolsByVersion: (opts: options.getProtocolsOfVersionOptions) => Promise<Protocol[] | null>;
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
    getPlatform: (opts: options.getPlatformOptions) => Promise<Platform | null>;
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
    getPlatforms: (opts: options.getPlatformsOptions) => Promise<Platform[] | null>;
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
    getGpgPublicKeys: (opts: options.getGpgPublicKeysOptions) => Promise<GpgPublicKey[] | null>;
}
//# sourceMappingURL=mssql.d.ts.map