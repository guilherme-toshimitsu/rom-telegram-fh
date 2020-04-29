const RagJobs = require("../models/classes");

const addClassToDB = async (name, job) => {
  await RagJobs.update({ name }, { name, job }, { upsert: true });
};

const findAllClasses = () => {
  return RagJobs.find({}, { job: false, _id: false, __v: 0 });
};

const findClass = (name) => {
  return RagJobs.find({ name });
};
module.exports = {
  addClassToDB,
  findAllClasses,
  findClass,
};
