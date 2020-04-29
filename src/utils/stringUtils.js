const QUERYPARAMCHAR = "+";

const valueQueryBuilderBoolean = (queryParam) => (msg) => {
  let paramBool = msg.includes(`${QUERYPARAMCHAR}${queryParam}`);
  return paramBool;
};

const valueQueryBuilder = (queryParam) => (msg) => {
  let paramValue = "";
  let paramBool = false;
  if (msg.includes(`${QUERYPARAMCHAR}${queryParam}(`)) {
    let newQueryArray = msg.split(`${QUERYPARAMCHAR}${queryParam}(`);
    let stringVar = newQueryArray[1].split(")");
    paramValue = stringVar[0];
    paramBool = true;
    // query = query.replace(`${QUERYPARAMCHAR}${queryParam}(${paramValue})`);
  }
  return paramBool ? paramValue : false;
};

module.exports = {
  valueQueryBuilderBoolean,
  valueQueryBuilder,
};
