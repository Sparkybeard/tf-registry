import { readFile, writeFile, access } from 'node:fs/promises';
import { join, parse } from 'node:path';
import debug from 'debug'; ('citizen:server');
import { mkdirp } from 'mkdirp';

const normalizePath = (path: string) => join(process.env.CITIZEN_STORAGE_PATH ?? '', path);

const file = {
  type: () => 'file',
  setItem: async (path: string, tarball: Buffer) => {
    if (!path) {
      throw new Error('path is required.');
    }
    if (!tarball) {
      throw new Error('tarball is required.');
    }

    const pathToStore = normalizePath(path);
    debug(`set item in ${pathToStore}`);
    const parsedPath = parse(pathToStore);
    await mkdirp(parsedPath.dir);

    await writeFile(pathToStore, tarball);

    return true;
  },
  hasItem: async (path: string) => {
    const pathToStore = normalizePath(path);
    debug(`${pathToStore} is exist`);
    try {
      await access(pathToStore);
      return true;
    } catch (e) {
      return false;
    }
  },
  getItem: async (path: string) => {
    const pathToStore = normalizePath(path);
    debug(`get item from ${pathToStore}.`);
    try {
      const content = await readFile(pathToStore);
      return content;
    } catch (e) {
      return null;
    }
  },
};

export default file;
