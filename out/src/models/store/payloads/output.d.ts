export type saveProviderPayload = {
    id: number;
    namespace: string;
    type: string;
    version: string;
    protocols: string[];
    platforms: PlatformPayload[];
    gpgPublicKeys: gpgPublicKeyPayload[];
    published_at: string;
};
export type findProviderPayload = {
    id: number;
    namespace: string;
    type: string;
    version: string;
    protocols: string;
    platforms: string;
    gpgPublicKeys: string;
    published_at: Date;
};
export type findProvidersPayload = {
    namespace: string;
    type: string;
    versions: {
        version: string;
        protocols: string[];
    }[];
};
export type getProviderVersionPayload = {
    namespace: string;
    type: string;
    version: string;
    protocols: string[];
};
export type getProviderVersionsPayload = {
    versions: {
        version: string;
        protocols: string[];
        platforms: PlatformPayload[];
    }[];
};
export type providerPayload = {
    namespace: string;
    type: string;
    version: string;
    protocols: string[];
    platforms: PlatformPayload[];
    gpgPublicKeys: string[];
    published_at: string;
};
export type findProviderPackagePayload = {
    protocols: string[];
    os: string;
    arch: string;
    filename: string;
    shasum: string;
    gpgPublicKeys: gpgPublicKeyPayload[];
};
type gpgPublicKeyPayload = {
    keyId: string;
    asciiArmor: string;
    trustSignature: string;
    source: string;
    sourceUrl: string;
};
export type PlatformPayload = {
    os: string;
    arch: string;
    filename: string;
    shasum: string;
};
export {};
//# sourceMappingURL=output.d.ts.map