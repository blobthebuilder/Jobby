require("dotenv").config();

const express = require("express");
const mongoose = require("mongoose");
const jobRoutes = require("./routes/jobs");
const userRoutes = require("./routes/user");

//express app
const app = express();

//middleware
app.use(express.json());

app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// routes
app.use("/api/jobs", jobRoutes);
app.use("/api/user", userRoutes);

// connect to db
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    const db = mongoose.connection;
    db.collection("jobs")
      .createIndex({ location: "2dsphere" })
      .then(() => {
        console.log("2dsphere index created successfully");
      })
      .catch((error) => {
        console.error("Error creating 2dsphere index:", error);
      });

    // listen for requests
    app.listen(process.env.PORT, () => {
      console.log("connected to db & listening on port " + process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
