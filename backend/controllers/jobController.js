const Job = require("../models/jobModel");
const mongoose = require("mongoose");

// get all jobs
const getJobs = async (req, res) => {
  const user_id = req.user._id;
  const jobs = await Job.find({ user_id }).sort({ createdAt: -1 });

  res.status(200).json(jobs);
};

// get a single job
const getJob = async (req, res) => {
  //this is job id, not user id
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(404).json({ error: "No such job" });
  }

  const job = await Job.findById(id);

  if (!job) {
    return res.status(404).json({ error: "No such job" });
  }

  res.status(200).json(job);
};

// create a new job
const createJob = async (req, res) => {
  const { title, description, pay } = req.body;

  let emptyFields = [];

  if (!title) {
    emptyFields.push("title");
  }
  if (!description) {
    emptyFields.push("description");
  }
  if (!pay) {
    emptyFields.push("pay");
  }
  if (emptyFields.length > 0) {
    return res
      .status(400)
      .json({ error: "Please fill in all fields", emptyFields });
  }

  // add to the database
  try {
    const user_id = req.user._id;
    const job = await Job.create({ title, description, pay, user_id });
    res.status(200).json(job);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

// delete a job
const deleteJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such job" });
  }

  const job = await Job.findOneAndDelete({ _id: id });

  if (!job) {
    return res.status(400).json({ error: "No such job" });
  }

  res.status(200).json(job);
};

// update a job
const updateJob = async (req, res) => {
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such job" });
  }

  const job = await Job.findOneAndUpdate(
    { _id: id },
    {
      ...req.body,
    }
  );

  if (!job) {
    return res.status(400).json({ error: "No such job" });
  }

  res.status(200).json(job);
};

module.exports = {
  getJobs,
  getJob,
  createJob,
  deleteJob,
  updateJob,
};
