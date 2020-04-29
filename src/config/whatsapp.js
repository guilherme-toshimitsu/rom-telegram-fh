require("dotenv/config");

const accountsid = process.env.WHATSAPPACCOUNTSID;
const authtoken = process.env.WHATSAPPACCOUNTTOKEN;

module.exports = {
  accountsid,
  authtoken,
};
