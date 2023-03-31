const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const dataRoutes = require('./routes/data');
require("dotenv").config();

const app = express();
app.use('/api', dataRoutes);
app.use(cors());
app.use(express.json());

// Import routes
const usersRoutes = require("./routes/users");
const foodsRoutes = require("./routes/foods");
const exercisesRoutes = require("./routes/exercises");

// Connect to MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  useCreateIndex: true,
});

const connection = mongoose.connection;
connection.once("open", () => {
  console.log("MongoDB database connection established successfully.");
});

// Use routes
app.use("/api/users", usersRoutes);
app.use("/api/foods", foodsRoutes);
app.use("/api/exercises", exercisesRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
