import storage from './file';

const getStorageType = () => storage.type();

const saveProvider = (path: string, tarball: Buffer) => {
  return storage.setItem(`providers/${path}`, tarball);
};

const hasProvider = (path: string) => {
  return storage.hasItem(`providers/${path}`);
};

const getProvider = (path: string) => {
  return storage.getItem(`providers/${path}`);
};

export default {
  getStorageType,
  saveProvider,
  hasProvider,
  getProvider,
};
