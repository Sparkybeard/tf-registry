declare const _default: {
    getStorageType: () => string;
    saveProvider: (path: string, tarball: Buffer) => Promise<boolean>;
    hasProvider: (path: string) => Promise<boolean>;
    getProvider: (path: string) => Promise<Buffer | null>;
};
export default _default;
//# sourceMappingURL=storage.d.ts.map