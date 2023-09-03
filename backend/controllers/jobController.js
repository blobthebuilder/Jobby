const Job = require("../models/jobModel");
const mongoose = require("mongoose");

// get all jobs for specific user
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

// get all jobs
const getAllJobs = async (req, res) => {
  const jobs = await Job.find({}).sort({ createdAt: -1 });

  res.status(200).json(jobs);
};

// get by distance
const getByDistance = async (req, res) => {
  const user_id = req.user._id;
  const { latitude, longitude, maxDistance } = req.body;
  // maxDistance in meters
  console.log(latitude, longitude);
  const jobs = await Job.find({
    location: {
      $near: {
        $geometry: {
          type: "Point",
          coordinates: [longitude, latitude],
        },
        $maxDistance: maxDistance,
      },
    },
    user_id: { $ne: user_id },
  }).sort({ score: -1 });

  res.status(200).json(jobs);
};

// get accepted jobs
const getAcceptedJobs = async (req, res) => {
  const user_id = req.user._id;
  const jobs = await Job.find({ accepted: user_id }).sort({ createdAt: -1 });

  res.status(200).json(jobs);
};

// create a new job
const createJob = async (req, res) => {
  const { title, description, pay, longitude, latitude, accepted } = req.body;

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
    const job = await Job.create({
      title,
      description,
      pay,
      user_id,
      accepted,
      location: { type: "Point", coordinates: [longitude, latitude] },
    });
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

// accept a job
const acceptJob = async (req, res) => {
  const user_id = req.user._id;
  const { id } = req.params;

  if (!mongoose.Types.ObjectId.isValid(id)) {
    return res.status(400).json({ error: "No such job" });
  }

  const job = await Job.findOneAndUpdate(
    { _id: id },
    {
      accepted: user_id,
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
  getAllJobs,
  createJob,
  deleteJob,
  updateJob,
  getByDistance,
  getAcceptedJobs,
  acceptJob,
};
