const { decode } = require("./decode.js");

async function process(opts = {}) {
  const rawData = opts.data;
  const decoder = opts.decoder;
  const inputSchema = opts.inputSchema;
  const mapping = opts.mapping;
  const outputSchema = opts.outputSchema;
  const config = opts.config;

  if (!rawData) {
    throw new Error("No Raw Data provided.");
  }

  if (!decoder || !inputSchema || !mapping || !outputSchema) {
    throw new Error("Missing required input.");
  }

  const decodedData = await decode(rawData, decoder, config);
}

module.exports = {
  process: process,
};
