const xlsx = require("node-xlsx");
const fs = require("fs");

const getROMClassesJobsFromXLSX = () => {
  const data = xlsx.parse(fs.readFileSync(__dirname + "/assets/classes.xlsx"));
  return data[0].data;
};

module.exports = {
  getROMClassesJobsFromXLSX,
};
