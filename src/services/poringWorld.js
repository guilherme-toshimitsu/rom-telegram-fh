const request = require("./axiosApi");

const poringWorldUrl = "https://poring.world/api/search";

const getPoring = params => request(poringWorldUrl, { params });

module.exports = {
  getPoring
};
