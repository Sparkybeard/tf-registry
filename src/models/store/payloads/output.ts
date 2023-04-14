/*
 *  Store payloads represent the data that is returned from the store's frontend.
 */

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

// findOneProviderPayload represents the return value of the findOneProvider function.
// contains the namespace type and version.
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

// findAllProviderPayload represents the return value of the findAllProvider function.
// contains the namespace type and version.
export type findProvidersPayload = {
  namespace: string;
  type: string;
  versions: {
    version: string;
    protocols: string[];
  }[];
};

// getProviderVersionPayload represents the return value of the getProviderVersion function.
export type getProviderVersionPayload = {
  namespace: string;
  type: string;
  version: string;
  protocols: string[];
}

// getProviderVersionsPayload represents the return value of the getProviderVersions function.
// contains the versions of the provider and the meta data.
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
