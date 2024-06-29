import mongoose from 'mongoose';

import logger from './winston.config';
import config from './env.config';

export default class MongoDB {
  static async connect() {
    await mongoose.connect(config.mongoose.url);
    logger.info('DB connection successful');
  }
}
