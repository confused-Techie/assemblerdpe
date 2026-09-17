const Validator = require("jsonschema").Validator;
const DecodeConfigSchema = require("./decoder.schema.json");

class DecodeProcessor {
  constructor(config) {
    this.validator = new Validator();

    this.config = config;
    this.dataType = config.input.decoder.type;
  }

  validateConfig() {
    const v = this.validator.validate(this.config, DecodeConfigSchema);

    if (v.valid) {
      return v.valid;
    } else {
      throw new Error(`Invalid Schema Passed: ${v.errors}`);
    }
  }

  execute(data) {
    let output;

    switch(this.dataType) {
      case "json":
        output = JSON.parse(data);
        break;
      default:
        break;
    }

    return output;
  }
}

async function decode(data, decodeConfig, globalConfig) {
  const processor = new DecodeProcessor(decodeConfig);
  const valid = processor.validateConfig();
  if (!valid) {
    throw new Error(`Invalid Schema Passed: ${valid}`);
  }

  return processor.execute(data);
}

module.exports = {
  decode: decode,
  DecodeProcessor: DecodeProcessor
};
