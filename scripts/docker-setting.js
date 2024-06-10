"use strict";
// docker compose exec
Object.defineProperty(exports, "__esModule", { value: true });
var child_process_1 = require("child_process");
var path_1 = require("path");
var fs = require("fs");
var dockerComposePath = (0, path_1.join)(__dirname, '../docker-compose.yml');
if (!fs.existsSync(dockerComposePath)) {
    console.error('docker-compose.yml not found');
    process.exit(1);
}
var exec = function (command) {
    (0, child_process_1.execSync)(command, {
        stdio: 'inherit',
    });
};
var execDockerCompose = function (command) {
    exec("docker-compose -f ".concat(dockerComposePath, " ").concat(command));
};
var args = process.argv.slice(2);
execDockerCompose('up -d');
// change env
var localEnv = fs.readFileSync((0, path_1.join)(__dirname, '../.env.local'), 'utf-8');
fs.writeFileSync((0, path_1.join)(__dirname, '../.env'), localEnv);
// npx prisma migrate dev
exec('npx prisma migrate dev');
