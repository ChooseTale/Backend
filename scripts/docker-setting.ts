// docker compose exec

import { execSync } from 'child_process';
import { join } from 'path';
import * as fs from 'fs';

const dockerComposePath = join(__dirname, '../docker-compose.yml');

if (!fs.existsSync(dockerComposePath)) {
  console.error('docker-compose.yml not found');
  process.exit(1);
}

const exec = (command: string) => {
  execSync(command, {
    stdio: 'inherit',
  });
};

const execDockerCompose = (command: string) => {
  exec(`docker-compose -f ${dockerComposePath} ${command}`);
};

execDockerCompose('up -d');

// change env

const localEnv = fs.readFileSync(join(__dirname, '../.env.local'), 'utf-8');
fs.writeFileSync(join(__dirname, '../.env'), localEnv);

// npx prisma migrate dev
exec('npx prisma migrate dev');
