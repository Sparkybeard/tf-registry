
export type FormData = {
  [key: string]: Array<Uint8Array>
}

export type File = {
  file: Buffer;
  filename: string;
  requestName: string;
}

export type ProviderData = {
  namespace: string;
  type: string;
  version: string;
  protocols: string[];
  platforms: {
    os: string;
    filename: string;
    arch: string;
    shasum: string;
  }[];
  gpgPublicKeys: {
    keyId: string;
    asciiArmor: string;
    trustSignature: string;
    source: string;
    sourceUrl: string;
  }[];
  published_at?: string;
}
