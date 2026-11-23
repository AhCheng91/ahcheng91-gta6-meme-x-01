import { mkdirSync, copyFileSync, readFileSync, existsSync } from "node:fs";
import { join } from "node:path";
import { createHash } from "node:crypto";
import process from "node:process";

const BOT_DIR = process.env.MAKEFUN_BOT_DIR ?? import.meta.dirname;
const OUTPUT_DIR = process.env.MAKEFUN_OUTPUT_DIR ?? "/output";

function fail(reason: string): never {
  console.error(reason);
  process.exit(1);
}

let parsed: unknown;
try {
  parsed = JSON.parse(readFileSync(join(BOT_DIR, "POST.json"), "utf8"));
} catch (err) {
  fail(`Could not read or parse POST.json: ${err instanceof Error ? err.message : String(err)}`);
}

if (typeof parsed !== "object" || parsed === null || Array.isArray(parsed)) {
  fail("POST.json is not a JSON object.");
}
const record = parsed as Record<string, unknown>;
if (typeof record.url !== "string") {
  fail('POST.json must have a string "url" field.');
}
const url = record.url;
let parsedUrl: URL;
try {
  parsedUrl = new URL(url);
} catch {
  fail(`"url" is not a valid URL: ${url}`);
}
if (parsedUrl.protocol !== "https:") {
  fail(`"url" must be an https address: ${url}`);
}
const host = parsedUrl.hostname.toLowerCase();
if (host !== "x.com" && host !== "twitter.com" && host !== "www.x.com" && host !== "www.twitter.com") {
  fail(`"url" must be on x.com or twitter.com: ${url}`);
}
if (!/^\/[^/]*\/status\/\d+/.test(parsedUrl.pathname)) {
  fail(`"url" must contain /status/ followed by digits: ${url}`);
}

try {
  mkdirSync(OUTPUT_DIR, { recursive: true });
  copyFileSync(join(BOT_DIR, "POST.json"), join(OUTPUT_DIR, "POST.json"));
} catch (err) {
  fail(`Could not copy POST.json to output: ${err instanceof Error ? err.message : String(err)}`);
}

const memeExists = existsSync(join(import.meta.dirname, "meme", "gta6-meme.jpg"));
const writtenBytes = readFileSync(join(OUTPUT_DIR, "POST.json"));
const sha256 = createHash("sha256").update(writtenBytes).digest("hex");

console.error(`node version: ${process.version}`);
console.error(`BOT_DIR: ${BOT_DIR}`);
console.error(`OUTPUT_DIR: ${OUTPUT_DIR}`);
console.error(`meme/gta6-meme.jpg exists beside program: ${memeExists}`);
console.error(`sha256 of written POST.json: ${sha256}`);

console.log(`posted to ${url}`);
