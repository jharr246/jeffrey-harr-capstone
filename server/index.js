require("dotenv").config();
const express = require("express");
const userRoutes = require("./routes/userRoutes");
const profileRoutes = require("./routes/profileRoutes");
const parkRoutes = require("./routes/parkRoutes");
const meetRoutes = require("./routes/meetRoutes");
const cors = require("cors");
const app = express();
const PORT = 8080;

app.use(cors());

app.use(express.json());

app.use("/users", userRoutes);
app.use("/profiles", profileRoutes);
app.use("/meets", meetRoutes);
app.use("/parks", parkRoutes);

app.listen(PORT, () => {
  console.log(`Listening on port ${8080}`);
});
