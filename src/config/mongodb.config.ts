import mongoose from 'mongoose';

import config from './env.config';

export default class MongoDB {
  static async connect() {
    await mongoose.connect(config.mongoose.url);
    console.log(`DB connection successful!`);
  }
}
