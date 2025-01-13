const express = require("express");
const router = express.Router();
const Menuitem = require("../models/Menuitem");

router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newitem = new Menuitem(data);
    const responce = await newitem.save();
    console.log("data saved");
    res.status(200).json(responce);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Menuitem.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

router.get("/:taste", async (req, res) => {
  try {
    const taste = req.params.taste;
    if (
      taste == "spicy" ||
      taste == "sweet" ||
      taste == "salty" ||
      taste == "bitter" ||
      taste == "sour"
    ) {
      const responce = await Menuitem.find({ taste: taste });
      res.status(200).json(responce);
    } else {
      res.status(404).json({ error: "invalid menu" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

module.exports = router;
