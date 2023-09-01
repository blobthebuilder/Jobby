const express = require("express");
const {
  createJob,
  getJob,
  getJobs,
  getAllJobs,
  deleteJob,
  updateJob,
} = require("../controllers/jobController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all workouts for logged in user
router.get("/", getJobs);

// GET all jobs
router.get("/all", getAllJobs);

// GET a single workout
router.get("/:id", getJob);

// POST a new workout
router.post("/", createJob);

// DELETE a workout
router.delete("/:id", deleteJob);

// UPDATE a workout
router.patch("/:id", updateJob);

module.exports = router;
