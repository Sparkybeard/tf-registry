// saveProviderOptions represents the parameters to the saveProvider function.
export type saveProviderOptions = {
	namespace: string;
	type: string;
};

// saveVersionOptions represents the parameters to the saveVersion function.
export type saveVersionOptions = {
	name: string;
	providerId: number;
	protocolIds: number[];
};

// saveVersionsOptions represents the parameters to the saveVersions function.
export type saveVersionsOptions = {
	versions: saveVersionOptions[];
};

// saveProtocolOptions represents the parameters to the saveProtocol function.
export type saveProtocolOptions = {
	name: string;
};

// saveProtocolsOptions represents the parameters to the saveProtocols function.
export type saveProtocolsOptions = {
	protocols: string[];
};

// savePlatformOptions represents the parameters to the savePlatform function.
export type savePlatformOptions = {
	providerId: number;
	os: string;
	arch: string;
	shasum: string;
	filename: string;
};

// savePlatformsOptions represents the parameters to the savePlatforms function.
export type savePlatformsOptions = {
	platforms: savePlatformOptions[];
};

// saveGpgPublicKeyOptions represents the parameters to the saveGpgPublicKey function.
export type saveGpgPublicKeyOptions = {
	keyId: string;
	asciiArmor: string;
	trustSignature: string;
	source: string;
	sourceUrl: string;
	providerId: number;
};

// findProviderPackageOptions represents the parameters to the findProviderPackage function.
// contains the namespace, type, version, os and arch of the provider.
export type getProviderOptions = {
	namespace: string;
	type: string;
};

// findAllProviderOptions represents the parameters to the findAllProvider function.
// contains the namespace, type and version of the provider.
export type getProvidersOptions = {
	namespace?: string;
	type?: string;
};

// getProviderVersionsOptions represents the parameters to the getProviderVersions function.
export type getVersionOptions = {
	providerId: number;
	name: string;
};

// getVersionsOptions represents the parameters to the getProviderVersions function.
// contains the namespace and type of the provider.
export type getVersionsOptions = {
	providerId: number;
	versions: string[];
};

// getProtocolOptions represents the parameters to the getProtocol function.
export type getProtocolOptions = {
	name: string;
};

// getProtocolsOptions represents the parameters to the getProtocols function.
export type getProtocolsOfVersionOptions = {
	providerId: number;
};

// getPlatformOptions represents the parameters to the getPlatform function.
export type getPlatformOptions = {
	os: string;
	arch: string;
	providerId: number;
};

// getPlatformsOptions represents the parameters to the getPlatforms function.
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
