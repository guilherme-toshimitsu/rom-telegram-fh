const express = require("express");
const router = express.Router();

const classesController = require("../controllers/classes");

router.get("/getAll", async (req, res, next) => {
  const data = await classesController.findAllClasses();
  res.send(data);
});

module.exports = router;
