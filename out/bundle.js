'use strict';

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
