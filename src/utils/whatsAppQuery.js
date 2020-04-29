const { valueQueryBuilder } = require("./stringUtils");

const hasName = valueQueryBuilder("name");
const hasLevel = valueQueryBuilder("level");
const hasClasse = valueQueryBuilder("classe");

const extractDataFromMsg = (msg) => {
  let name = hasName(msg).trim();
  let level = hasLevel(msg).trim();
  let classe = hasClasse(msg).trim();

  return {
    name,
    level,
    classe,
  };
};

module.exports = {
  extractDataFromMsg,
};
