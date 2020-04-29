const express = require("express");
const router = express.Router();
// const googleApi = require("../worker/googleApi");

const { getAllAtendancy, getAtendancy } = require("../controllers/war");

router.get("/getAll", async (req, res, next) => {
  const data = await getAllAtendancy();
  res.send(data);
});

router.get("/getByDate/:date", async (req, res, next) => {
  const data = await getAtendancy(req.params.date);
  res.send(data);
});

router.get("/sendData/:date", async (req, res, next) => {
  //   const data = await getAtendancy(req.params.date);
  //   const doc = googleApi.accessSheet();
  res.send(data);
});

module.exports = router;
