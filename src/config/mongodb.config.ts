import mongoose from 'mongoose';

export default class MongoDB {
  static async connect() {
    await mongoose.connect('');
    console.log(`DB connection successful!`);
  }
}
