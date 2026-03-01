const express = require("express");
const aiRoutes = require("./routes/ai.routes");
const executeRoutes = require("./routes/execute.routes");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(express.json());

app.get("/", (req, res) => {
  res.send("Hello World");
});

app.use("/ai", aiRoutes);
app.use("/execute", executeRoutes); 


module.exports = app;

