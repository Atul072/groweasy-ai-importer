const express = require("express");
const cors = require("cors");
require("dotenv").config();
const connectDB = require("./config/db");

const importRoutes = require("./routes/importRoutes");
connectDB();

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", importRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "GrowEasy AI Backend is Running 🚀",
  });
});

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});