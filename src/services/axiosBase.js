const axios = require("axios");
const qs = require("query-string");

const getApiConfig = () => ({
  headers: {
    Accept: "application/json",
    "Accept-Language": "pt-BR",
    "Access-Control-Allow-Origin": "*",
    "Access-Control-Allow-Credentials": "true"
  }
});

const base = (baseURL, config) => {
  const api = axios.create({
    mode: "cors",
    baseURL,
    ...config
  });

  const axiosRequest = api.request;

  api.request = (path, options) => {
    return axiosRequest({
      url: path,
      ...getApiConfig(),
      ...options,
      paramsSerializer: params =>
        qs.stringify(params, { arrayFormat: "repeat" })
    }).then(res => res.data);
  };

  return api;
};

module.exports = base;
