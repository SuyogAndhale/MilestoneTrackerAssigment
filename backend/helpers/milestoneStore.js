const fs = require("fs");
const path = require("path");

const dataFile = path.join(__dirname, "..", "data", "milestones.json");

function readMilestones() {
  const data = fs.readFileSync(dataFile, "utf-8");
  return JSON.parse(data);
}

function writeMilestones(milestones) {
  fs.writeFileSync(dataFile, JSON.stringify(milestones, null, 2));
}

function addMilestone(milestone) {
  console.log("ttt",milestone)
  const milestones = readMilestones();
  milestones.push(milestone);
  writeMilestones(milestones);
  return milestone;
}

module.exports = {
  readMilestones,
  addMilestone,
};
