require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.json());

app.use("/users", userRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${8080}`);
});
