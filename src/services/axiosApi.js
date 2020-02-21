const base = require("./axiosBase");

const baseApi = base();

const request = (path, options) => baseApi.request(path, { ...options });

module.exports = request;
