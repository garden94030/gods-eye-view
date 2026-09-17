import { chmodSync, cpSync, existsSync, mkdirSync, rmSync } from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const source = path.join(root, 'desktop', 'macos-app');
const output = path.join(root, "God's Eye View.app");

if (!existsSync(source)) throw new Error(`Missing app template: ${source}`);
rmSync(output, { recursive: true, force: true });
mkdirSync(path.dirname(output), { recursive: true });
cpSync(source, output, { recursive: true });
chmodSync(path.join(output, 'Contents', 'MacOS', 'GodsEyeView'), 0o755);
console.log(`Built ${output}`);
