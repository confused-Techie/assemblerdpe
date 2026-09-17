const { describe, it } = require("node:test");
const assert = require("node:assert");
const fs = require("node:fs");
const decode = require("../src/decode.js");

describe("Processes `decode` configurations correctly", () => {
  it("Supports JSON decoder types", () => {
    const config = {
      input: {
        decoder: {
          type: "json"
        }
      }
    };

    const processor = new decode.DecodeProcessor(config);
    assert.ok(processor.validateConfig());
  });
});

describe("Decodes data correctly", () => {
  it("Decodes JSON", () => {
    const config = {
      input: {
        decoder: {
          type: "json"
        }
      }
    };
    const dataRaw = fs.readFileSync("./tests/spec/decode.valid.simple.json", { encoding: "utf8" });
    const dataParsed = { hello: "world" };

    const processor = new decode.DecodeProcessor(config);
    assert.ok(processor.validateConfig());
    assert.deepStrictEqual(processor.execute(dataRaw), dataParsed);
  });
});
