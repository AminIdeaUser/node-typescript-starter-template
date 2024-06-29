import MongoDB from './config/mongodb.config';
import config from './config/env.config';
import app from './app';

(async () => {
  await MongoDB.connect();
  const server = app.listen(config.port, () =>
    console.log(`Listening to requests on port ${config.port}`)
  );

  process.on('unhandledRejection', err => {
    console.log(err);
    server.close(() => {
      console.log('Shutting down the server! 💥💥💥');
      process.exit(1);
    });
  });
})();
