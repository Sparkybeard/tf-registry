export type saveProviderOptions = {
    namespace: string;
    type: string;
};
export type saveVersionOptions = {
    name: string;
    providerId: number;
    protocolIds: number[];
};
export type saveVersionsOptions = {
    versions: saveVersionOptions[];
};
export type saveProtocolOptions = {
    name: string;
};
export type saveProtocolsOptions = {
    protocols: string[];
};
export type savePlatformOptions = {
    providerId: number;
    os: string;
    arch: string;
    shasum: string;
    filename: string;
};
export type savePlatformsOptions = {
    platforms: savePlatformOptions[];
};
export type saveGpgPublicKeyOptions = {
    keyId: string;
    asciiArmor: string;
    trustSignature: string;
    source: string;
    sourceUrl: string;
    providerId: number;
};
export type getProviderOptions = {
    namespace: string;
    type: string;
};
export type getProvidersOptions = {
    namespace?: string;
    type?: string;
};
export type getVersionOptions = {
    providerId: number;
    name: string;
};
export type getVersionsOptions = {
    providerId: number;
    versions: string[];
};
export type getAllProviderVersionsOptions = {
    providerId: number;
};
export type getProtocolOptions = {
    name: string;
};
export type getProtocolsOfVersionOptions = {
    providerId: number;
};
export type getPlatformOptions = {
    os: string;
    arch: string;
    providerId: number;
};
export type getPlatformsOptions = {
    os?: string;
    arch?: string;
    providerId: number;
};
export type getGpgPublicKeysOptions = {
    keyId?: string;
    asciiArmor?: string;
    trustSignature?: string;
    source?: string;
    sourceUrl?: string;
    providerId: number;
};
//# sourceMappingURL=options.d.ts.map