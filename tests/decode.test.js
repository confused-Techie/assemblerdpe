const { describe, it } = require("node:test");
const assert = require("node:assert");
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
    const dataRaw = JSON.stringify({ hello: "world" });
    const dataParsed = { hello: "world" };

    const processor = new decode.DecodeProcessor(config);
    assert.ok(processor.validateConfig());
    assert.deepStrictEqual(processor.execute(dataRaw), dataParsed);
  });
});
