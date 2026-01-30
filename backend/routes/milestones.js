const express = require("express");
const router = express.Router();
const { readMilestones, addMilestone } = require("../helpers/milestoneStore");

const allowedCategories = ["Work", "Personal", "Health"];


router.get("/", (req, res) => {
  try {
    const milestones = readMilestones();
    res.json(milestones);
  } catch {
    res.status(500).json({ message: "Failed to load milestones" });
  }
});

router.post("/", (req, res) => {
  const { title, category } = req.body;

  if (!title || title.trim().length < 3) {
    return res.status(400).json({
      message: "Title must be at least 3 characters long",
    });
  }

  if (!category || !allowedCategories.includes(category)) {
    return res.status(400).json({
      message: "Category must be one of: Work, Personal, Health",
    });
  }

  try {
    const newMilestone = {
      id: Date.now(),
      title: title.trim(),
      category,
      createdAt: new Date(),
    };

    addMilestone(newMilestone);
    res.status(201).json(newMilestone);
  } catch {
    res.status(500).json({ message: "Failed to save milestone" });
  }
});

module.exports = router;
