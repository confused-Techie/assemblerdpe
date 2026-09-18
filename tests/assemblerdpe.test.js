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

describe("Errors when expected", () => {
  it("Errors on missing raw data", async () => {
    const config = {
      data: null,
      decoder: "doesnt-matter",
      inputSchema: "doesnt-matter",
      mapping: "doesnt-matter",
      outputSchema: "doesnt-matter"
    };

    await assert.rejects(async () => {
      await assembler.process(config);
    }, {
      message: "No Raw Data provided."
    });
  });

  it("Errors on missing decoder", async () => {
    const config = {
      data: JSON.stringify({ hello: "world" }),
      decoder: null,
      inputSchema: { type: "object", properties: { hello: { type: "string" } } },
      mapping: `{ "goodbye": hello }`,
      outputSchema: { type: "object", properties: { goodbye: { type: "string" } } }
    };

    await assert.rejects(async () => {
      await assembler.process(config);
    }, {
      message: "Missing required input."
    });
  });

  it("Errors on missing input schema", async () => {
    const config = {
      data: JSON.stringify({ hello: "world" }),
      decoder: { input: { decoder: { type: "json" } } },
      inputSchema: null,
      mapping: `{ "goodbye": hello }`,
      outputSchema: { type: "object", properties: { goodbye: { type: "string" } } }
    };

    await assert.rejects(async () => {
      await assembler.process(config);
    }, {
      message: "Missing required input."
    });
  });

  it("Errors on missing mapping", async () => {
    const config = {
      data: JSON.stringify({ hello: "world" }),
      decoder: { input: { decoder: { type: "json" } } },
      inputSchema: { type: "object", properties: { hello: { type: "string" } } },
      mapping: null,
      outputSchema: { type: "object", properties: { goodbye: { type: "string" } } }
    };

    await assert.rejects(async () => {
      await assembler.process(config);
    }, {
      message: "Missing required input."
    });
  });

  it("Errors on missing output schema", async () => {
    const config = {
      data: JSON.stringify({ hello: "world" }),
      decoder: { input: { decoder: { type: "json" } } },
      inputSchema: { type: "object", properties: { hello: { type: "string" } } },
      mapping: `{ "goodbye": hello }`,
      outputSchema: null
    };

    await assert.rejects(async () => {
      await assembler.process(config);
    }, {
      message: "Missing required input."
    });
  });

  it("Errors on failed input schema", async () => {
    const config = {
      data: JSON.stringify({ hello: "world" }),
      decoder: { input: { decoder: { type: "json" } } },
      inputSchema: { type: "object", properties: { hello: { type: "number" } } },
      mapping: `{ "goodbye": hello }`,
      outputSchema: { type: "object", properties: { goodbye: { type: "string" } } }
    };

    await assert.rejects(async () => {
      await assembler.process(config);
    }, {
      message: "Decoded data failed input validation: instance.hello is not of a type(s) number"
    });
  });

  it("Errors on failed output schema", async () => {
    const config = {
      data: JSON.stringify({ hello: "world" }),
      decoder: { input: { decoder: { type: "json" } } },
      inputSchema: { type: "object", properties: { hello: { type: "string" } } },
      mapping: `{ "goodbye": hello }`,
      outputSchema: { type: "object", properties: { goodbye: { type: "number" } } }
    };

    await assert.rejects(async () => {
      await assembler.process(config);
    }, {
      message: "Mapped data failed output validation: instance.goodbye is not of a type(s) number"
    });
  });
});
