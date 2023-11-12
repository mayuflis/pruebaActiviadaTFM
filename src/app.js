const express = require("express");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.use("/api", require("./routes/api"));

app.use((req, res) => {
  res.status(404).json({ error: "Not fount" });
});

module.exports = app;
