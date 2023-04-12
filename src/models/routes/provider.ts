export type createProviderData = {
    name: string;
    namespace: string;
    type: string;
    version: string;
    platforms: {
        os: string;
        arch: string;
        filename: string;
    }[];
    protocols: string[];
}
