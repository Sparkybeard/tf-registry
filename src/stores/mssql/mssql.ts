import {
  GpgPublicKey,
  Platform,
  PrismaClient,
  Protocol,
  Provider,
  Version,
} from '../../../prisma/generated/client/index';
import { debug } from 'debug';
import * as options from '../../models/store/options';

export default class SqlServerStore {
  private prisma!: PrismaClient;
  private dg: debug.Debugger;

  constructor() {
    this.dg = debug('citizen:server:store');

    this.prisma = new PrismaClient({
      datasources: {
        db: {
          url: process.env.DATABASE_URL ?? '',
        },
      },
    });
  }

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
  saveProvider = async (
    p: options.saveProviderOptions,
  ): Promise<Provider | null> => {
    const result = await this.prisma.provider.create({ data: p });
    this.dg('saved the provider into db: %o', result);
    return result;
  };

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
  saveVersion = async (
    p: options.saveVersionOptions,
  ): Promise<Version | null> => {
    const result = await this.prisma.version.create({
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
  };

  /**
   * @param {options.saveVersionsOptions} p - The options to save the versions.
   * @param {string} p.versions - The versions to save.
   *
   * @returns {Version[] | null} - The correspondent version model that was saved on the database or null if there was an error.
   */
  saveVersions = async (
    p: options.saveVersionsOptions,
  ): Promise<Version[] | null> => {
    const result = await this.prisma.$transaction(
      p.versions.map((version) =>
        this.prisma.version.create({ data: version })
      ),
    );
    this.dg('saved the provider into db: %o', result);
    return result;
  };

  /**
   * @param {options.saveProtocolOptions} p - The options to save the protocol.
   * @param {string} p.name - The name of the protocol.
   *
   * @returns {Protocol | null} - The correspondent protocol model that was saved on the database or null if there was an error.
   */
  saveProtocol = async (
    p: options.saveProtocolOptions,
  ): Promise<Protocol | null> => {
    const result = await this.prisma.protocol.create({ data: p });
    this.dg('saved the provider into db: %o', result);
    return result;
  };

  /**
   * Saves a list of protocols to the database.
   * @param {saveProtocolsOptions} p - The options to save the protocols.
   * @param {string[]} p.protocols - The list of protocols to save.
   *
   * @returns {Protocol[] | null} - The correspondent protocol model that was saved on the database or null if there was an error.
   */
  saveProtocols = async (
    p: options.saveProtocolsOptions,
  ): Promise<Protocol[] | null> => {
    const result = await this.prisma.$transaction(
      p.protocols.map((prot) =>
        this.prisma.protocol.create({ data: { name: prot } })
      ),
    );
    this.dg('saved the provider into db: %o', result);

    return result;
  };

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
  savePlatform = async (
    p: options.savePlatformOptions,
  ): Promise<Platform | null> => {
    const result = await this.prisma.platform.create({ data: p });
    this.dg('saved the provider into db: %o', result);
    return result;
  };

  /**
   * Saves a list of platforms to the database.
   *
   * @param {options.savePlatformsOptions} p - The options to save the provider executable platform definitions.
   * @param {options.savePlatformOptions[]} p.platforms - The provided platform definitions to save.
   *
   * @returns {Platform[] | null} - The correspondent platform models that were saved on the database or null if there was an error.
   */
  savePlatforms = async (
    p: options.savePlatformsOptions,
  ): Promise<Platform[] | null> => {
    const result = await this.prisma.$transaction(
      p.platforms.map((plat) => this.prisma.platform.create({ data: plat })),
    );
    this.dg('saved the provider into db: %o', result);
    return result;
  };

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
  saveGpgPublicKey = async (
    p: options.saveGpgPublicKeyOptions,
  ): Promise<GpgPublicKey | null> => {
    const result = await this.prisma.gpgPublicKey.create({ data: p });
    this.dg('saved the provider into db: %o', result);
    return result;
  };

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
  getProvider = async (
    opts: options.getProviderOptions,
  ): Promise<Provider | null> => {
    const provider = await this.prisma.provider.findFirst({ where: opts });
    this.dg('search a provider in store with opts', opts);
    return provider;
  };

  /**
   * @param {options.getProviderOptions} opts - The options to get the provider.
   * @param {string | null} opts.namespace - The name of the provider.
   * @param {string | null} opts.type - The types of the provider.
   * @param {number} offset - The offset to start the search
   * @param {number} limit - The limit of the search
   *
   * @returns {Provider[] | null} - The correspondent provider models that was saved on the database or null if there was an error.
   */
  getProviders = async (
    opts: options.getProvidersOptions,
    offset: number,
    limit: number,
  ): Promise<Provider[] | null> => {
    if (opts.namespace && opts.type) {
      this.dg(
        'error in getting provider, with both namespace and type defined getProviders would return a single result',
      );
      return null;
    }

    const result = await this.prisma.provider.findMany({
      where: opts,
      skip: offset,
      take: limit,
      orderBy: [{ id: 'desc' }],
    });

    this.dg('search result from store: %o', result);
    return result;
    // return providers.map((p) => deserializeProvider(p));
  };

  /**
   * Gets a version from the database.
   *
   * @param {options.getVersionOptions} opts - The options to get the version.
   * @param {string} opts.providerId - The id of the entity containing the base provider info model.
   * @param {string} opts.version - The name of the provider's version.
   *
   * @returns {Version | null} - The correspondent version model that was saved on the database or null if there was an error.
   */
  getVersion = async (
    opts: options.getVersionOptions,
  ): Promise<Version | null> => {
    this.dg('search provider version in store with %o', opts);
    const result = await this.prisma.version.findFirst({ where: opts });
    return result;
  };

  /**
   * Gets a list of versions from the database.
   *
   * @param {options.getVersionsOptions} opts - The options to get the versions.
   * @param {number} opts.providerId - The id of the entity containing the base provider info model.
   * @param {string} opts.versions - The names of the desired versions.
   *
   * @returns {Version[] | null} - The correspondent version models that were saved on the database or null if there was an error.
   */
  getVersions = async (
    opts: options.getVersionsOptions,
  ): Promise<Version[] | null> => {
    this.dg('search provider versions in store with %o', opts);
    const result = await this.prisma.version.findMany({
      where: opts,
      orderBy: { id: 'asc' },
    });
    return result;
    // return result.map((p) => deserializeProvider(p));
  };

  /**
   * Gets a protocol from the database.
   *
   * @param {options.getProtocolOptions} opts - The options to get the protocol.
   * @param {string} opts.name - The os of the protocol.
   *
   * @returns {Protocol | null} - The correspondent protocol model that was saved on the database or null if there was an error.
   */
  getProtocol = async (
    opts: options.getProtocolOptions,
  ): Promise<Protocol | null> => {
    this.dg('search provider protocol in store with %o', opts);
    const result = await this.prisma.protocol.findFirst({ where: opts });
    return result;
  };

  /**
   * Gets a list of protocols from the database.
   *
   * @param {options.getProtocolsOfVersionOptions} opts - The options to get the protocols.
   * @param {string} opts.providerId The os of the protocol.
   *
   * @returns {Protocol[] | null} - The correspondent protocol models that were saved on the database or null if there was an error.
   */
  getProtocolsByVersion = async (
    opts: options.getProtocolsOfVersionOptions,
  ): Promise<Protocol[] | null> => {
    this.dg('search provider protocols in store with %o', opts);
    const result = await this.prisma.protocol.findMany({
      where: {
        providers: {
          every: {
            versionId: opts.providerId,
          },
        },
      },
    });
    return result;
  };

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
  getPlatform = async (
    opts: options.getPlatformOptions,
  ): Promise<Platform | null> => {
    this.dg('search provider platform in store with %o', opts);
    const result = await this.prisma.platform.findFirst({ where: opts });
    return result;
  };

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
  getPlatforms = async (
    opts: options.getPlatformsOptions,
  ): Promise<Platform[] | null> => {
    if (opts.providerId && opts.os) {
      this.dg(
        'error in getting platforms, both values set can only produce one result',
      );
      return null;
    }

    this.dg('search provider platforms in store with %o', opts);
    const result = await this.prisma.platform.findMany({ where: opts });
    return result;
  };

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
  getGpgPublicKeys = async (
    opts: options.getGpgPublicKeysOptions,
  ): Promise<GpgPublicKey[] | null> => {
    this.dg('search provider gpg public key in store with %o', opts);
    const result = await this.prisma.gpgPublicKey.findMany({ where: opts });
    return result;
  };
}
