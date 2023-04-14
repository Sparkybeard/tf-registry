"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const http_1 = tslib_1.__importDefault(require("http"));
const debug_1 = tslib_1.__importDefault(require("debug"));
const app_1 = tslib_1.__importDefault(require("./src/app"));
const dg = (0, debug_1.default)('citizen:server');
const normalizePort = (val) => {
    const port = parseInt(val, 10);
    if (Number.isNaN(port)) {
        // named pipe
        return val;
    }
    if (port >= 0) {
        // port number
        return port;
    }
    return false;
};
const run = () => tslib_1.__awaiter(void 0, void 0, void 0, function* () {
    const port = normalizePort(process.env.PORT || '3000');
    app_1.default.set('port', port);
    const server = http_1.default.createServer(app_1.default);
    server.listen(port);
    server.on('error', (error) => {
        if (error.syscall !== 'listen') {
            throw error;
        }
        const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;
        // handle specific listen errors with friendly messages
        switch (error.code) {
            case 'EACCES':
                console.error(`${bind} requires elevated privileges`); // eslint-disable-line no-console
                process.exit(1);
                break;
            case 'EADDRINUSE':
                console.error(`${bind} is already in use`); // eslint-disable-line no-console
                process.exit(1);
                break;
            default:
                throw error;
        }
    });
    server.on('listening', () => {
        const addr = server.address();
        if (typeof addr === 'object' && addr) {
            const bind = typeof addr === 'string' ? `pipe ${addr}` : `port ${addr.port}`;
            dg(`Listening on ${bind}`);
        }
        else {
            throw new Error('Server address is not an object');
        }
    });
});
run();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibWFpbi5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uL21haW4udHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7O0FBQUEsd0RBQXdCO0FBQ3hCLDBEQUEwQjtBQUMxQiw0REFBNEI7QUFFNUIsTUFBTSxFQUFFLEdBQUcsSUFBQSxlQUFLLEVBQUMsZ0JBQWdCLENBQUMsQ0FBQztBQUNuQyxNQUFNLGFBQWEsR0FBRyxDQUFDLEdBQVcsRUFBRSxFQUFFO0lBQ3BDLE1BQU0sSUFBSSxHQUFHLFFBQVEsQ0FBQyxHQUFHLEVBQUUsRUFBRSxDQUFDLENBQUM7SUFFL0IsSUFBSSxNQUFNLENBQUMsS0FBSyxDQUFDLElBQUksQ0FBQyxFQUFFO1FBQ3RCLGFBQWE7UUFDYixPQUFPLEdBQUcsQ0FBQztLQUNaO0lBRUQsSUFBSSxJQUFJLElBQUksQ0FBQyxFQUFFO1FBQ2IsY0FBYztRQUNkLE9BQU8sSUFBSSxDQUFDO0tBQ2I7SUFFRCxPQUFPLEtBQUssQ0FBQztBQUNmLENBQUMsQ0FBQztBQUVGLE1BQU0sR0FBRyxHQUFHLEdBQVMsRUFBRTtJQUNyQixNQUFNLElBQUksR0FBRyxhQUFhLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLElBQUksTUFBTSxDQUFDLENBQUM7SUFDdkQsYUFBRyxDQUFDLEdBQUcsQ0FBQyxNQUFNLEVBQUUsSUFBSSxDQUFDLENBQUM7SUFFdEIsTUFBTSxNQUFNLEdBQUcsY0FBSSxDQUFDLFlBQVksQ0FBQyxhQUFHLENBQUMsQ0FBQztJQUN0QyxNQUFNLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxDQUFDO0lBQ3BCLE1BQU0sQ0FBQyxFQUFFLENBQUMsT0FBTyxFQUFFLENBQUMsS0FBNEIsRUFBRSxFQUFFO1FBQ2xELElBQUksS0FBSyxDQUFDLE9BQU8sS0FBSyxRQUFRLEVBQUU7WUFDOUIsTUFBTSxLQUFLLENBQUM7U0FDYjtRQUVELE1BQU0sSUFBSSxHQUFHLE9BQU8sSUFBSSxLQUFLLFFBQVEsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQyxDQUFDLENBQUMsUUFBUSxJQUFJLEVBQUUsQ0FBQztRQUV4RSx1REFBdUQ7UUFDdkQsUUFBUSxLQUFLLENBQUMsSUFBSSxFQUFFO1lBQ2xCLEtBQUssUUFBUTtnQkFDWCxPQUFPLENBQUMsS0FBSyxDQUFDLEdBQUcsSUFBSSwrQkFBK0IsQ0FBQyxDQUFDLENBQUMsaUNBQWlDO2dCQUN4RixPQUFPLENBQUMsSUFBSSxDQUFDLENBQUMsQ0FBQyxDQUFDO2dCQUNoQixNQUFNO1lBQ1IsS0FBSyxZQUFZO2dCQUNmLE9BQU8sQ0FBQyxLQUFLLENBQUMsR0FBRyxJQUFJLG9CQUFvQixDQUFDLENBQUMsQ0FBQyxpQ0FBaUM7Z0JBQzdFLE9BQU8sQ0FBQyxJQUFJLENBQUMsQ0FBQyxDQUFDLENBQUM7Z0JBQ2hCLE1BQU07WUFDUjtnQkFDRSxNQUFNLEtBQUssQ0FBQztTQUNmO0lBQ0gsQ0FBQyxDQUFDLENBQUM7SUFDSCxNQUFNLENBQUMsRUFBRSxDQUFDLFdBQVcsRUFBRSxHQUFHLEVBQUU7UUFDMUIsTUFBTSxJQUFJLEdBQUcsTUFBTSxDQUFDLE9BQU8sRUFBRSxDQUFDO1FBQzlCLElBQUksT0FBTyxJQUFJLEtBQUssUUFBUSxJQUFJLElBQUksRUFBRTtZQUNwQyxNQUFNLElBQUksR0FBRyxPQUFPLElBQUksS0FBSyxRQUFRLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLFFBQVEsSUFBSSxDQUFDLElBQUksRUFBRSxDQUFDO1lBQzdFLEVBQUUsQ0FBQyxnQkFBZ0IsSUFBSSxFQUFFLENBQUMsQ0FBQztTQUM1QjthQUNJO1lBQ0gsTUFBTSxJQUFJLEtBQUssQ0FBQyxpQ0FBaUMsQ0FBQyxDQUFDO1NBQ3BEO0lBQ0gsQ0FBQyxDQUFDLENBQUM7QUFDTCxDQUFDLENBQUEsQ0FBQztBQUVGLEdBQUcsRUFBRSxDQUFDIiwic291cmNlc0NvbnRlbnQiOlsiaW1wb3J0IGh0dHAgZnJvbSAnaHR0cCc7XG5pbXBvcnQgZGVidWcgZnJvbSAnZGVidWcnO1xuaW1wb3J0IGFwcCBmcm9tICcuL3NyYy9hcHAnO1xuXG5jb25zdCBkZyA9IGRlYnVnKCdjaXRpemVuOnNlcnZlcicpO1xuY29uc3Qgbm9ybWFsaXplUG9ydCA9ICh2YWw6IHN0cmluZykgPT4ge1xuICBjb25zdCBwb3J0ID0gcGFyc2VJbnQodmFsLCAxMCk7XG5cbiAgaWYgKE51bWJlci5pc05hTihwb3J0KSkge1xuICAgIC8vIG5hbWVkIHBpcGVcbiAgICByZXR1cm4gdmFsO1xuICB9XG5cbiAgaWYgKHBvcnQgPj0gMCkge1xuICAgIC8vIHBvcnQgbnVtYmVyXG4gICAgcmV0dXJuIHBvcnQ7XG4gIH1cblxuICByZXR1cm4gZmFsc2U7XG59O1xuXG5jb25zdCBydW4gPSBhc3luYyAoKSA9PiB7XG4gIGNvbnN0IHBvcnQgPSBub3JtYWxpemVQb3J0KHByb2Nlc3MuZW52LlBPUlQgfHwgJzMwMDAnKTtcbiAgYXBwLnNldCgncG9ydCcsIHBvcnQpO1xuXG4gIGNvbnN0IHNlcnZlciA9IGh0dHAuY3JlYXRlU2VydmVyKGFwcCk7XG4gIHNlcnZlci5saXN0ZW4ocG9ydCk7XG4gIHNlcnZlci5vbignZXJyb3InLCAoZXJyb3I6IE5vZGVKUy5FcnJub0V4Y2VwdGlvbikgPT4ge1xuICAgIGlmIChlcnJvci5zeXNjYWxsICE9PSAnbGlzdGVuJykge1xuICAgICAgdGhyb3cgZXJyb3I7XG4gICAgfVxuXG4gICAgY29uc3QgYmluZCA9IHR5cGVvZiBwb3J0ID09PSAnc3RyaW5nJyA/IGBQaXBlICR7cG9ydH1gIDogYFBvcnQgJHtwb3J0fWA7XG5cbiAgICAvLyBoYW5kbGUgc3BlY2lmaWMgbGlzdGVuIGVycm9ycyB3aXRoIGZyaWVuZGx5IG1lc3NhZ2VzXG4gICAgc3dpdGNoIChlcnJvci5jb2RlKSB7XG4gICAgICBjYXNlICdFQUNDRVMnOlxuICAgICAgICBjb25zb2xlLmVycm9yKGAke2JpbmR9IHJlcXVpcmVzIGVsZXZhdGVkIHByaXZpbGVnZXNgKTsgLy8gZXNsaW50LWRpc2FibGUtbGluZSBuby1jb25zb2xlXG4gICAgICAgIHByb2Nlc3MuZXhpdCgxKTtcbiAgICAgICAgYnJlYWs7XG4gICAgICBjYXNlICdFQUREUklOVVNFJzpcbiAgICAgICAgY29uc29sZS5lcnJvcihgJHtiaW5kfSBpcyBhbHJlYWR5IGluIHVzZWApOyAvLyBlc2xpbnQtZGlzYWJsZS1saW5lIG5vLWNvbnNvbGVcbiAgICAgICAgcHJvY2Vzcy5leGl0KDEpO1xuICAgICAgICBicmVhaztcbiAgICAgIGRlZmF1bHQ6XG4gICAgICAgIHRocm93IGVycm9yO1xuICAgIH1cbiAgfSk7XG4gIHNlcnZlci5vbignbGlzdGVuaW5nJywgKCkgPT4ge1xuICAgIGNvbnN0IGFkZHIgPSBzZXJ2ZXIuYWRkcmVzcygpO1xuICAgIGlmICh0eXBlb2YgYWRkciA9PT0gJ29iamVjdCcgJiYgYWRkcikge1xuICAgICAgY29uc3QgYmluZCA9IHR5cGVvZiBhZGRyID09PSAnc3RyaW5nJyA/IGBwaXBlICR7YWRkcn1gIDogYHBvcnQgJHthZGRyLnBvcnR9YDtcbiAgICAgIGRnKGBMaXN0ZW5pbmcgb24gJHtiaW5kfWApO1xuICAgIH1cbiAgICBlbHNlIHtcbiAgICAgIHRocm93IG5ldyBFcnJvcignU2VydmVyIGFkZHJlc3MgaXMgbm90IGFuIG9iamVjdCcpO1xuICAgIH1cbiAgfSk7XG59O1xuXG5ydW4oKTtcbiJdfQ==