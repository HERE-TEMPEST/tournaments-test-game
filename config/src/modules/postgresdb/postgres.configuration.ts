import { PostgresConfiguration } from './postgres-configuration.type';

export const getPostgresConfig = (): PostgresConfiguration => ({
  postgres: {
    username: process.env.POSTGRES_USER,
    password: process.env.POSTGRES_PASSWORD,
    port: Number(process.env.POSTGRES_PORT),
    host: process.env.POSTGRES_HOST,
    database: process.env.POSTGRES_DB,
  },
});
