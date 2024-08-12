import mongoose from 'mongoose';
import { MONGO_URI } from '../env';

export const connectMongoDB = async () => {
  await mongoose
    .connect(MONGO_URI)
    .then(() => {
      console.log('connected to mongodb');
    })
    .catch(err => {
      console.log('error connecting to mongodb', err);
    });
};
