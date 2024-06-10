import { PostgreSqlContainer } from '@testcontainers/postgresql';

async function setupTestContainer() {
  const container = await new PostgreSqlContainer('postgres:15').start();

  const connectionConfig = {
    host: container.getHost(),
    port: container.getMappedPort(5432),
    database: container.getDatabase(),
    user: container.getUsername(),
    password: container.getPassword(),
  };
  const databaseUrl = `postgresql://${connectionConfig.user}:${connectionConfig.password}@${connectionConfig.host}:${connectionConfig.port}/${connectionConfig.database}`;
  return { container, databaseUrl };
}

export default async () => {
  const { container, databaseUrl } = await setupTestContainer();
  process.env.TEST_DATABASE_URL = databaseUrl;
};
