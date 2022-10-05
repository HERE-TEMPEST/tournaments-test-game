export interface PostgresConfiguration {
  postgres: {
    username: string;
    password: string;
    port: number;
    host: string;
    database: string;
  };
}
