/// <reference types="debug" />
import * as inmds from '../models/store/payloads/input';
import * as outmds from '../models/store/payloads/output';
export default class Store {
    dg: import("debug").Debugger;
    private store;
    constructor();
    /**
     * save Provider release, get provider, if exists, create new version, if not, create new provider
     *
     * @param {inmds.saveProviderData} provider - provider payload
     * @returns {Promise<outmds.providerPayload>} - provider payload
     */
    saveProvider: (input: inmds.saveProviderData) => Promise<outmds.saveProviderPayload | null>;
    getAllProviders: () => Promise<outmds.findProvidersPayload[]>;
    getProviderVersion: (p: inmds.getProviderVersion) => Promise<outmds.getProviderVersionPayload | null>;
    getProviderVersions: (p: inmds.getProviderVersions) => Promise<outmds.getProviderVersionsPayload>;
    /**
     * gets details for requested provider binary, includes gpg public keys, platform bins path and shasum,
     * specific for one version and platform
     *
     * @param {inmds.findProviderPackage} provider - Provider version and platform details
     * @param {string} provider.namespace - Provider namespace
     * @param {string} provider.type - Provider type
     * @param {string} provider.version - Provider version
     * @param {string} provider.os - Provider platform os
     * @param {string} provider.arch - Provider platform arch
     *
     * @returns {outmds.findProviderPackagePayload | null} - Provider details or null if not found
     */
    findProviderPackage: (p: inmds.findProviderPackage) => Promise<outmds.findProviderPackagePayload | null>;
    /**
     * checks if provider version exists
     *
     * @param {inmds.getProviderVersion} p - Provider version details
     * @param {string} p.namespace - Provider namespace
     * @param {string} p.type - Provider type
     * @param {string} p.version - Provider version
     * @returns {Promise<boolean>} - true if provider version exists, false otherwise
     */
    providerHasVersion: (p: inmds.getProviderVersion) => Promise<boolean>;
}
//# sourceMappingURL=store.d.ts.map