export type saveProviderData = {
    namespace: string;
    type: string;
    version: string;
    platforms: {
        os: string;
        arch: string;
        filename: string;
        shasum: string;
    }[];
    protocols: string[];
    gpgPublicKeys: {
        keyId: string;
        asciiArmor: string;
        trustSignature: string;
        source: string;
        sourceUrl: string;
    }[];
};
export type getProviderVersion = {
    namespace: string;
    type: string;
    version: string;
};
export type getProviderVersions = {
    namespace: string;
    type: string;
};
export type findProviderPackage = {
    namespace: string;
    type: string;
    version: string;
    os: string;
    arch: string;
};
//# sourceMappingURL=input.d.ts.map