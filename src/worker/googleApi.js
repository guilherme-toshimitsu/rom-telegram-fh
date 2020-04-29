const { GoogleSpreadsheet } = require("google-spreadsheet");
const { promisify } = require("util");
const credentials = require("../config/googleapi.json");

const docId = "1BohWtUVAJRrwUGi5U9bFJOuSFtPQwiUBUMJmPuV70HM";
const doc = new GoogleSpreadsheet(docId);

const accessSheet = async () => {
  await doc.useServiceAccountAuth({
    client_email: credentials.client_email,
    private_key: credentials.private_key,
  });
  await doc.loadInfo();
  return doc;
};

module.exports = {
  accessSheet,
};
