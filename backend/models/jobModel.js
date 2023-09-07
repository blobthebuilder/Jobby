const mongoose = require("mongoose");

const Schema = mongoose.Schema;

const jobSchema = new Schema(
  {
    title: { type: String, required: true },
    description: {
      type: String,
      required: true,
    },
    pay: {
      type: Number,
      required: true,
    },
    user_id: {
      type: String,
      required: true,
    },
    accepted: { type: String, required: true },
    location: {
      type: {
        type: String,
        default: "Point",
      },
      coordinates: {
        type: [Number],
      },
    },
    finished: { type: Boolean, default: false, required: true },
  },
  { timestamps: true }
);

// for the model need to add: location, duration of job
// user id of poster, if the job is accepted (can't update if job is accepted already)
// potentially type of job (eg: small job, or big job or plumbing or yardwork)

// mongoose automatically stores to plural of "Job" database
module.exports = mongoose.model("Job", jobSchema);
