"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const promises_1 = require("node:fs/promises");
const node_path_1 = require("node:path");
const debug_1 = tslib_1.__importDefault(require("debug"));
('citizen:server');
const mkdirp_1 = require("mkdirp");
const normalizePath = (path) => { var _a; return (0, node_path_1.join)((_a = process.env.CITIZEN_STORAGE_PATH) !== null && _a !== void 0 ? _a : '', path); };
const file = {
    type: () => 'file',
    setItem: (path, tarball) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        if (!path) {
            throw new Error('path is required.');
        }
        if (!tarball) {
            throw new Error('tarball is required.');
        }
        const pathToStore = normalizePath(path);
        (0, debug_1.default)(`set item in ${pathToStore}`);
        const parsedPath = (0, node_path_1.parse)(pathToStore);
        yield (0, mkdirp_1.mkdirp)(parsedPath.dir);
        yield (0, promises_1.writeFile)(pathToStore, tarball);
        return true;
    }),
    hasItem: (path) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const pathToStore = normalizePath(path);
        (0, debug_1.default)(`${pathToStore} is exist`);
        try {
            yield (0, promises_1.access)(pathToStore);
            return true;
        }
        catch (e) {
            return false;
        }
    }),
    getItem: (path) => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
        const pathToStore = normalizePath(path);
        (0, debug_1.default)(`get item from ${pathToStore}.`);
        try {
            const content = yield (0, promises_1.readFile)(pathToStore);
            return content;
        }
        catch (e) {
            return null;
        }
    }),
};
exports.default = file;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZmlsZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uL3NyYy9zdG9yYWdlcy9maWxlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7OztBQUFBLCtDQUErRDtBQUMvRCx5Q0FBd0M7QUFDeEMsMERBQTBCO0FBQUMsQ0FBQyxnQkFBZ0IsQ0FBQyxDQUFDO0FBQzlDLG1DQUFnQztBQUVoQyxNQUFNLGFBQWEsR0FBRyxDQUFDLElBQVksRUFBRSxFQUFFLFdBQUMsT0FBQSxJQUFBLGdCQUFJLEVBQUMsTUFBQSxPQUFPLENBQUMsR0FBRyxDQUFDLG9CQUFvQixtQ0FBSSxFQUFFLEVBQUUsSUFBSSxDQUFDLENBQUEsRUFBQSxDQUFDO0FBRTNGLE1BQU0sSUFBSSxHQUFHO0lBQ1gsSUFBSSxFQUFFLEdBQUcsRUFBRSxDQUFDLE1BQU07SUFDbEIsT0FBTyxFQUFFLENBQU8sSUFBWSxFQUFFLE9BQWUsRUFBRSxFQUFFO1FBQy9DLElBQUksQ0FBQyxJQUFJLEVBQUU7WUFDVCxNQUFNLElBQUksS0FBSyxDQUFDLG1CQUFtQixDQUFDLENBQUM7U0FDdEM7UUFDRCxJQUFJLENBQUMsT0FBTyxFQUFFO1lBQ1osTUFBTSxJQUFJLEtBQUssQ0FBQyxzQkFBc0IsQ0FBQyxDQUFDO1NBQ3pDO1FBRUQsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUEsZUFBSyxFQUFDLGVBQWUsV0FBVyxFQUFFLENBQUMsQ0FBQztRQUNwQyxNQUFNLFVBQVUsR0FBRyxJQUFBLGlCQUFLLEVBQUMsV0FBVyxDQUFDLENBQUM7UUFDdEMsTUFBTSxJQUFBLGVBQU0sRUFBQyxVQUFVLENBQUMsR0FBRyxDQUFDLENBQUM7UUFFN0IsTUFBTSxJQUFBLG9CQUFTLEVBQUMsV0FBVyxFQUFFLE9BQU8sQ0FBQyxDQUFDO1FBRXRDLE9BQU8sSUFBSSxDQUFDO0lBQ2QsQ0FBQyxDQUFBO0lBQ0QsT0FBTyxFQUFFLENBQU8sSUFBWSxFQUFFLEVBQUU7UUFDOUIsTUFBTSxXQUFXLEdBQUcsYUFBYSxDQUFDLElBQUksQ0FBQyxDQUFDO1FBQ3hDLElBQUEsZUFBSyxFQUFDLEdBQUcsV0FBVyxXQUFXLENBQUMsQ0FBQztRQUNqQyxJQUFJO1lBQ0YsTUFBTSxJQUFBLGlCQUFNLEVBQUMsV0FBVyxDQUFDLENBQUM7WUFDMUIsT0FBTyxJQUFJLENBQUM7U0FDYjtRQUFDLE9BQU8sQ0FBQyxFQUFFO1lBQ1YsT0FBTyxLQUFLLENBQUM7U0FDZDtJQUNILENBQUMsQ0FBQTtJQUNELE9BQU8sRUFBRSxDQUFPLElBQVksRUFBRSxFQUFFO1FBQzlCLE1BQU0sV0FBVyxHQUFHLGFBQWEsQ0FBQyxJQUFJLENBQUMsQ0FBQztRQUN4QyxJQUFBLGVBQUssRUFBQyxpQkFBaUIsV0FBVyxHQUFHLENBQUMsQ0FBQztRQUN2QyxJQUFJO1lBQ0YsTUFBTSxPQUFPLEdBQUcsTUFBTSxJQUFBLG1CQUFRLEVBQUMsV0FBVyxDQUFDLENBQUM7WUFDNUMsT0FBTyxPQUFPLENBQUM7U0FDaEI7UUFBQyxPQUFPLENBQUMsRUFBRTtZQUNWLE9BQU8sSUFBSSxDQUFDO1NBQ2I7SUFDSCxDQUFDLENBQUE7Q0FDRixDQUFDO0FBRUYsa0JBQWUsSUFBSSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IHsgcmVhZEZpbGUsIHdyaXRlRmlsZSwgYWNjZXNzIH0gZnJvbSAnbm9kZTpmcy9wcm9taXNlcyc7XG5pbXBvcnQgeyBqb2luLCBwYXJzZSB9IGZyb20gJ25vZGU6cGF0aCc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnOyAoJ2NpdGl6ZW46c2VydmVyJyk7XG5pbXBvcnQgeyBta2RpcnAgfSBmcm9tICdta2RpcnAnO1xuXG5jb25zdCBub3JtYWxpemVQYXRoID0gKHBhdGg6IHN0cmluZykgPT4gam9pbihwcm9jZXNzLmVudi5DSVRJWkVOX1NUT1JBR0VfUEFUSCA/PyAnJywgcGF0aCk7XG5cbmNvbnN0IGZpbGUgPSB7XG4gIHR5cGU6ICgpID0+ICdmaWxlJyxcbiAgc2V0SXRlbTogYXN5bmMgKHBhdGg6IHN0cmluZywgdGFyYmFsbDogQnVmZmVyKSA9PiB7XG4gICAgaWYgKCFwYXRoKSB7XG4gICAgICB0aHJvdyBuZXcgRXJyb3IoJ3BhdGggaXMgcmVxdWlyZWQuJyk7XG4gICAgfVxuICAgIGlmICghdGFyYmFsbCkge1xuICAgICAgdGhyb3cgbmV3IEVycm9yKCd0YXJiYWxsIGlzIHJlcXVpcmVkLicpO1xuICAgIH1cblxuICAgIGNvbnN0IHBhdGhUb1N0b3JlID0gbm9ybWFsaXplUGF0aChwYXRoKTtcbiAgICBkZWJ1Zyhgc2V0IGl0ZW0gaW4gJHtwYXRoVG9TdG9yZX1gKTtcbiAgICBjb25zdCBwYXJzZWRQYXRoID0gcGFyc2UocGF0aFRvU3RvcmUpO1xuICAgIGF3YWl0IG1rZGlycChwYXJzZWRQYXRoLmRpcik7XG5cbiAgICBhd2FpdCB3cml0ZUZpbGUocGF0aFRvU3RvcmUsIHRhcmJhbGwpO1xuXG4gICAgcmV0dXJuIHRydWU7XG4gIH0sXG4gIGhhc0l0ZW06IGFzeW5jIChwYXRoOiBzdHJpbmcpID0+IHtcbiAgICBjb25zdCBwYXRoVG9TdG9yZSA9IG5vcm1hbGl6ZVBhdGgocGF0aCk7XG4gICAgZGVidWcoYCR7cGF0aFRvU3RvcmV9IGlzIGV4aXN0YCk7XG4gICAgdHJ5IHtcbiAgICAgIGF3YWl0IGFjY2VzcyhwYXRoVG9TdG9yZSk7XG4gICAgICByZXR1cm4gdHJ1ZTtcbiAgICB9IGNhdGNoIChlKSB7XG4gICAgICByZXR1cm4gZmFsc2U7XG4gICAgfVxuICB9LFxuICBnZXRJdGVtOiBhc3luYyAocGF0aDogc3RyaW5nKSA9PiB7XG4gICAgY29uc3QgcGF0aFRvU3RvcmUgPSBub3JtYWxpemVQYXRoKHBhdGgpO1xuICAgIGRlYnVnKGBnZXQgaXRlbSBmcm9tICR7cGF0aFRvU3RvcmV9LmApO1xuICAgIHRyeSB7XG4gICAgICBjb25zdCBjb250ZW50ID0gYXdhaXQgcmVhZEZpbGUocGF0aFRvU3RvcmUpO1xuICAgICAgcmV0dXJuIGNvbnRlbnQ7XG4gICAgfSBjYXRjaCAoZSkge1xuICAgICAgcmV0dXJuIG51bGw7XG4gICAgfVxuICB9LFxufTtcblxuZXhwb3J0IGRlZmF1bHQgZmlsZTtcbiJdfQ==