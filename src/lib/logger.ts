import pino from "pino";

const loggerName = process.env.npm_package_name || 'citizen';

const options: pino.LoggerOptions = {
  name: loggerName,
  level: process.env.LOG_LEVEL || 'error',
};

if (process.env.NODE_ENV === 'development') {
  options.transport = {
    target: 'pino-pretty',
    options: {
      colorize: true,
    },
  };
}

const logger = pino(options);

export default logger;
