const jsonata = require("jsonata");

async function map(data, mapExpression, globalConfig) {
  const opts = {};
  // Optionally apply a custom Regex engine
  if (globalConfig?.mapping?.regexEngine) {
    opts.RegexEngine = globalConfig.mapping.regexEngine;
  }
  // TODO Apply safety parameters here, once we can determine their current defaults

  const expression = jsonata(mapExpression);

  const result = await expression.evaluate(data);

  return result;
}

module.exports = {
  map: map,
};
