#!/usr/bin/env node

const Bundler = require("parcel-bundler");
const path = require("path");
const fs = require("fs");
const assert = require("assert");

function validateStdin(stdin) {
  const arr = JSON.parse(stdin);
  assert(Array.isArray(arr), "stdin must be array");
  arr.forEach(v => {
    const { acronym, name, logo, href, color } = v;
    assert(typeof acronym === "string");
    assert(typeof name === "string");
    assert(typeof logo === "string");
    assert(typeof href === "string");
    assert(typeof color === "string");
  });
}

function writeInputJson() {
  const stdin = fs.readFileSync(0, "utf-8");
  validateStdin(stdin);
  const inputJson = path.join(__dirname, "./src/input.json");
  fs.writeFileSync(inputJson, stdin);
}

const entryFiles = path.join(__dirname, "./src/index.html");

const withProductionEnv = task => async () => {
  const oldEnv = process.env.NODE_ENV;
  process.env.NODE_ENV = "production";
  await task();
  process.env.NODE_ENV = oldEnv;
}

const bundle = withProductionEnv(async () => {
  const bundler = new Bundler(entryFiles, {
    publicUrl: "/"
  });
  await bundler.bundle();
})

async function main() {
  writeInputJson();
  await bundle();
}

main();



