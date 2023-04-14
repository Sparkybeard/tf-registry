declare const file: {
    type: () => string;
    setItem: (path: string, tarball: Buffer) => Promise<boolean>;
    hasItem: (path: string) => Promise<boolean>;
    getItem: (path: string) => Promise<Buffer | null>;
};
export default file;
//# sourceMappingURL=file.d.ts.map