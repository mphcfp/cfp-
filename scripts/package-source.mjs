import { readFile, readdir, mkdir, writeFile } from 'node:fs/promises';
import { dirname, join, relative } from 'node:path';
import { fileURLToPath } from 'node:url';
import { zipSync } from 'fflate';

const root = fileURLToPath(new URL('../', import.meta.url));
const output = join(root, 'public/aura-source.zip');
const sourcePaths = [
  'app', 'components', 'public/assets', 'scripts', '.openai',
  'package.json', 'package-lock.json', 'next.config.ts', 'next-env.d.ts',
  'tsconfig.json', 'README.md', '.gitignore',
];
const files = {};
const stableDate = new Date('2026-01-01T00:00:00Z');

async function add(path) {
  const full = join(root, path);
  try {
    const entries = await readdir(full, { withFileTypes: true });
    for (const entry of entries.sort((a, b) => a.name.localeCompare(b.name))) {
      if (entry.isDirectory() || entry.isFile()) await add(join(path, entry.name));
    }
  } catch (error) {
    if (error.code !== 'ENOTDIR') throw error;
    // Next.js adds a build-local route type import; it is regenerated on build.
    let data = await readFile(full);
    if (path === 'next-env.d.ts') {
      data = Buffer.from('/// <reference types="next" />\n/// <reference types="next/image-types/global" />\n\n// This file is maintained by Next.js.\n');
    }
    files[`aura-website/${relative(root, full).replaceAll('\\', '/')}`] = [new Uint8Array(data), { mtime: stableDate }];
  }
}

for (const path of sourcePaths) await add(path);
await mkdir(dirname(output), { recursive: true });
await writeFile(output, zipSync(files, { level: 6 }));
console.log(`Packaged ${Object.keys(files).length} source files in public/aura-source.zip`);
