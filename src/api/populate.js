const express = require("express");
const router = express.Router();

const excel = require("../utils/readFromxlsx");
const classesController = require("../controllers/classes");

router.get("/", (req, res, next) => {
  res.send("server is Working");
});

router.get("/jobs", (req, res, next) => {
  const allJobs = excel.getROMClassesJobsFromXLSX();
  allJobs.forEach((jobs) => {
    try {
      classesController.addClassToDB(jobs[1], jobs[0]);
    } catch (err) {
      console.log(err);
    }
  });

  res.send("server is Working");
});

module.exports = router;
