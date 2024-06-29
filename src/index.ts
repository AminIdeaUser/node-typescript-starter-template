import MongoDB from './config/mongodb.config';
import config from './config/env.config';
import logger from './config/winston.config';
import app from './app';

(async () => {
  await MongoDB.connect();
  const server = app.listen(config.port, () =>
    console.log(`Listening to requests on port ${config.port}`)
  );

  process.on('unhandledRejection', err => {
    logger.error(err);
    server.close(() => {
      logger.info('Shutting down the server! 💥💥💥');
      process.exit(1);
    });
  });
})();
