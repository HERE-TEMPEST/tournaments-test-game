import { MongooseConfiguration } from './mongo-configuration.type';

export const getMongooseConfig = (): MongooseConfiguration => ({
  mongoose: {
    username: process.env.MONGO_USERNAME,
    password: process.env.MONGO_PASSWORD,
    db: process.env.MONGO_DATABASE,
    port: Number(process.env.MONGO_PORT),
    host: process.env.MONGO_HOST,
  },
});
