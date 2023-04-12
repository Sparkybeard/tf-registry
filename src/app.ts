import path from 'path';
import express from 'express';
import morgan from 'morgan';
import swaggerUi from 'swagger-ui-express';

import helmet from 'helmet';
import cors from 'cors';

import logger from './lib/logger';
import index from './routes/index';

const app = express();
let code: number;

app.use(express.json())
app.use(express.urlencoded({ extended: true }))
app.use(helmet());
app.use(cors());

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jten');

app.use(morgan('dev'));

app.use(
  "/docs",
  swaggerUi.serve,
  swaggerUi.setup(undefined, {
    swaggerOptions: {
      url: "/swagger.json",
    },
  }),
);

app.use('/', index);

// catch 404 and forward to error handler
app.use((_req, _res, next) => {
  const err = new Error('Not Found');
  code = 404;
  next(err);
});

// error handlers
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    next: express.NextFunction,
  ) => {
    if (!res.status || code >= 500) {
      logger.error(err.stack);
    }
    res.status(code || 500);
    next(err);
  },
);

// development error handler
// will print stacktrace
if (app.get('env') === 'development') {
  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      res.render('error', {
        message: err.message,
        error: err,
      });
    },
  );
}

// production error handler
// no stacktraces leaked to user
app.use(
  (
    err: Error,
    _req: express.Request,
    res: express.Response,
    _next: express.NextFunction,
  ) => {
    res.render('error', {
      message: err.message,
      error: {},
    });
  },
);

export default app;
