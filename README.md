# AssemblerDPE

> Assembler Data Processing Engine

A simple Data Processing Engine, used to turn one form of raw data into a specific JSON object.

## Usage

AssemblerDPE exports one async function `process` that should be called with the relevant `config`.
The config should contain instructions for the `decoder`, `mapping`, as well as validation for the `inputSchema` and `outputSchema`.

```js
const assembler = require("assemblerdpe");

const config = {
  data: JSON.stringify({ hello: "world" }), // The raw data to be parsed.
  decoder: { input: { decoder: { type: "json" } } }, // Instructions for decoding the raw data.
  inputSchema: { type: "object", properties: { hello: { type: "string" } } }, // JSONSchema validation for the decoder output.
  mapping: `{ "goodbye": hello }`, // JSONata expression for mapping the data.
  outputSchema: { type: "object", properties: { goodbye: { type: "string" } } } // JSONSchema validation for the mapping output.
};

(async () => {
  const result = await assembler.process(config);
  // Returns `{ "goodbye": "world" }`
})();
```
