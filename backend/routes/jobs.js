const express = require("express");
const {
  createJob,
  getJob,
  getJobs,
  getAllJobs,
  deleteJob,
  updateJob,
  getByDistance,
  getAcceptedJobs,
  acceptJob,
  finishJob,
} = require("../controllers/jobController");

const requireAuth = require("../middleware/requireAuth");

const router = express.Router();

router.use(requireAuth);

// GET all workouts for logged in user
router.get("/", getJobs);

// GET all jobs
router.get("/all", getAllJobs);

// GET accepted jobs
router.get("/accepted", getAcceptedJobs);

// GET jobs within distance
router.post("/find", getByDistance);

// GET a single workout
router.get("/:id", getJob);

// POST a new workout
router.post("/", createJob);

// DELETE a workout
router.delete("/:id", deleteJob);

// UPDATE a workout
router.patch("/:id", updateJob);

// accept a job
router.patch("/accept/:id", acceptJob);

// finish a job
router.patch("/finish/:id", finishJob);

module.exports = router;
