const Validator = require("jsonschema").Validator;
const { decode } = require("./decode.js");
const { map } = require("./map.js");

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
  const decodeValidator = new Validator();
  const decodeV = decodeValidator.validate(decodedData, inputSchema);

  if (!decodeV.valid) {
    throw new Error(`Decoded data failed input validation: ${decodeV.errors}`);
  }

  const mappedData = await map(decodedData, mapping, config);
  const mapValidator = new Validator();
  const mapV = mapValidator.validate(mappedData, outputSchema);

  if (!mapV.valid) {
    throw new Error(`Mapped data failed output validation: ${mapV.errors}`);
  }

  return mappedData;
}

module.exports = {
  process: process,
};
