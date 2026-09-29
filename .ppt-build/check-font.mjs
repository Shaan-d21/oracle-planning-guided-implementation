import path from "node:path";
import { pathToFileURL } from "node:url";

const skillDir = "C:\\Users\\Shaan Dewang\\.codex\\plugins\\cache\\openai-primary-runtime\\presentations\\26.923.10815\\skills\\presentations";
const { resolvePresentationFont } = await import(pathToFileURL(path.join(skillDir, "container_tools/artifact_tool_utils.mjs")).href);
console.log(resolvePresentationFont());
