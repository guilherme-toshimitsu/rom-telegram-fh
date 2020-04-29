const express = require("express");
const router = express.Router();
const { listener } = require("../worker/whatsappBot");

router.post("/", listener);

module.exports = router;
