// Turns an app's Runtipi docker-compose.json into a plain Compose file, so CI can start the stack with Docker.
// ponytail: covers only the fields our apps use; Runtipi itself does the real conversion on install.
import fs from 'node:fs';

const [input, hostPort] = process.argv.slice(2);
const app = JSON.parse(fs.readFileSync(input, 'utf8'));
const services = {};
for (const s of app.services) {
  const out = { image: s.image, restart: 'unless-stopped' };
  if (s.environment) out.environment = Object.fromEntries(s.environment.map(({ key, value }) => [key, value]));
  if (s.volumes) out.volumes = s.volumes.map((v) => `${v.hostPath}:${v.containerPath}${v.readOnly ? ':ro' : ''}`);
  if (s.dependsOn) out.depends_on = s.dependsOn;
  if (s.shmSize) out.shm_size = s.shmSize;
  if (s.stopGracePeriod) out.stop_grace_period = s.stopGracePeriod;
  if (s.isMain) out.ports = [`${hostPort}:${s.internalPort}`];
  if (s.healthCheck) {
    const { test, interval, timeout, retries, startPeriod, startInterval } = s.healthCheck;
    out.healthcheck = { test: ['CMD-SHELL', test], interval, timeout, retries, start_period: startPeriod, start_interval: startInterval };
  }
  services[s.name] = out;
}
process.stdout.write(JSON.stringify({ services }, null, 2));
