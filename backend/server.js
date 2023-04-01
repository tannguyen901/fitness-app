const express = require("express");
const cors = require("cors");
const mongoose = require("mongoose");
const bmiRoutes = require("./routes/bmiRoutes");
const exerciseRoutes = require("./routes/exerciseRoutes");
const foodRoutes = require("./routes/foodRoutes");
const runningRoutes = require("./routes/runningRoutes");
require("dotenv").config();

const app = express();
app.use(express.json());
app.use(cors());

app.use("/api/bmi", bmiRoutes);
app.use("/api/exercises", exerciseRoutes);
app.use("/api/foods", foodRoutes);
app.use("/api/runs", runningRoutes);

const PORT = process.env.PORT || 5000;

const MONGODB_CONNECTION_STRING = process.env.MONGODB_URI;

mongoose
  .connect(MONGODB_CONNECTION_STRING, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Connected to MongoDB Atlas");
    app.listen(PORT, () => {
      console.log(`Server running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB Atlas:", err);
  });
