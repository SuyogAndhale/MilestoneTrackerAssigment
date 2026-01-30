const express = require("express");
const cors = require("cors");

const milestoneRoutes = require("./routes/milestones");

const app = express();
const PORT = 4000;

app.use(cors());
app.use(express.json());

app.use("/milestones", milestoneRoutes);

app.listen(PORT, () => {
  console.log(`Backend running at http://localhost:${PORT}`);
});
