import http from 'http';
import debug from 'debug';
import app from './src/app';
import ngrok from 'ngrok';

const dg = debug('citizen:server');
const normalizePort = (val: string) => {
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

const run = async () => {
  const port = normalizePort(process.env.PORT || '3000');
  app.set('port', port);
  const ng = await ngrok.connect({
    proto: 'http',
    addr: port.toString(),
    region: 'eu',
    authtoken: '2OKxpSFTLt2Cs7ATdlAeXDGVJuM_4CsKeTvn66hmZZaJ7eFme'
  });

  console.info(ng); // eslint-disable-line no-console
  const server = http.createServer(app);
  server.listen(port);
  server.on('error', (error: NodeJS.ErrnoException) => {
    if (error.syscall !== 'listen') {
      throw error;
    }

    const bind = typeof port === 'string' ? `Pipe ${port}` : `Port ${port}`;

    // handle specific listen errors with friendly messages
    switch (error.code) {
      case 'EACCES':
        console.error(`${bind} requires elevated privileges`); // eslint-disable-line no-console
        ngrok.disconnect();
        process.exit(1);
        break;
      case 'EADDRINUSE':
        console.error(`${bind} is already in use`); // eslint-disable-line no-console
        ngrok.disconnect();
        process.exit(1);
        break;
      default:
        ngrok.disconnect();
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
      ngrok.disconnect();
      throw new Error('Server address is not an object');
    }
  });
};

run();
