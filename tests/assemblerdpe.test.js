const { describe, it } = require("node:test");
const assert = require("node:assert");
const assembler = require("../src/index.js");

describe("Transforms data", () => {
  it("in JSON", async () => {
    const config = {
      data: JSON.stringify({ hello: "world" }),
      decoder: { input: { decoder: { type: "json" } } },
      inputSchema: { type: "object", properties: { hello: { type: "string" } } },
      mapping: `{ "goodbye": hello }`,
      outputSchema: { type: "object", properties: { goodbye: { type: "string" } } }
    };

    const result = await assembler.process(config);
    
    assert.deepEqual(result, { goodbye: "world" });
  });
});
