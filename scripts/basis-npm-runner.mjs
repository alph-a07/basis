#!/usr/bin/env node

import { spawn } from "node:child_process";
import { mkdtempSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

const args = process.argv.slice(2);
const labelIndex = args.indexOf("--label");
const separatorIndex = args.indexOf("--");
const label = labelIndex >= 0 ? args[labelIndex + 1] : "npm task";
const commandArgs = args.slice(separatorIndex + 1);
const command =
    commandArgs[0] === "sh" && commandArgs[1] === "-c"
        ? `sh -c ${JSON.stringify(commandArgs.slice(2).join(" "))}`
        : commandArgs.join(" ");

if (separatorIndex < 0 || !command) {
    console.error("Usage: basis-npm-runner.mjs --label <name> -- <command>");
    process.exit(2);
}

const color = process.stdout.isTTY || process.stderr.isTTY;
const ansi = {
    reset: "\u001b[0m",
    bold: "\u001b[1m",
    dim: "\u001b[2m",
    cyan: "\u001b[36m",
    green: "\u001b[32m",
    red: "\u001b[31m",
};
const paint = (value, code) => (color ? `${code}${value}${ansi.reset}` : value);
const tempDirectory = mkdtempSync(join(tmpdir(), "basis-npm-"));
const outputFile = join(tempDirectory, "output.log");
const startedAt = Date.now();
let output = "";

const child = spawn(command, {
    cwd: process.cwd(),
    env: { ...process.env, FORCE_COLOR: color ? "1" : "0" },
    shell: true,
    stdio: ["inherit", "pipe", "pipe"],
});

const append = (chunk) => {
    output += chunk.toString();
    writeFileSync(outputFile, output);
};
child.stdout.on("data", append);
child.stderr.on("data", append);

const frames = ["⠋", "⠙", "⠹", "⠸", "⠼", "⠴", "⠦", "⠧", "⠇", "⠏"];
let frame = 0;
const spinner =
    process.stderr.isTTY
        ? setInterval(() => {
              process.stderr.write(`\r\u001b[K  ${frames[frame++ % frames.length]}  ${label} is running…`);
          }, 120)
        : undefined;

const exitCode = await new Promise((resolve) => child.on("close", (code) => resolve(code ?? 1)));
if (spinner) {
    clearInterval(spinner);
    process.stderr.write("\r\u001b[K");
}

const duration = ((Date.now() - startedAt) / 1000).toFixed(1);
const lines = output
    .replace(/\u001b\[[0-9;]*m/g, "")
    .split(/\r?\n/)
    .filter(Boolean);
const interesting = lines.filter((line) => /error|failed|failure|passed|success|warning|✓|✗|❌|✅/i.test(line));
const diagnostics = (interesting.length ? interesting : lines.slice(-8)).slice(-16);

console.log(`\n${paint("◆", ansi.cyan)} ${paint(label, ansi.bold)} ${paint(`· ${duration}s`, ansi.dim)}`);
console.log(
    exitCode === 0
        ? `  ${paint("✓", ansi.green)} ${paint("Completed successfully", ansi.green)}`
        : `  ${paint("✗", ansi.red)} ${paint(`Failed (exit ${exitCode})`, ansi.red)}`,
);
if (exitCode !== 0 && diagnostics.length) {
    console.log(`\n  ${paint("Diagnostics", ansi.bold)}`);
    diagnostics.forEach((line) => console.log(`  │ ${line}`));
}

rmSync(tempDirectory, { recursive: true, force: true });
process.exit(exitCode);
