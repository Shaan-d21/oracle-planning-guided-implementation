import { spawnSync } from "node:child_process";
import { fileURLToPath } from "node:url";
import path from "node:path";

const projectRoot = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "..");
const nextBin = path.join(projectRoot, "node_modules", "next", "dist", "bin", "next");

const result = spawnSync(process.execPath, [nextBin, "build"], {
  cwd: projectRoot,
  env: {
    ...process.env,
    BISP_STATIC_EXPORT: "true",
  },
  stdio: "inherit",
});

if (result.error) {
  console.error("Unable to start the static export build:", result.error.message);
  process.exit(1);
}

process.exit(result.status ?? 1);
