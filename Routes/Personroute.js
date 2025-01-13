const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
router.post("/", async (req, res) => {
  try {
    const data = req.body;
    const newperson = new Person(data);
    const responce = await newperson.save();
    console.log("data saved");
    res.status(200).json(responce);
  } catch (error) {
    console.log(error);
  }
});

router.get("/", async (req, res) => {
  try {
    const data = await Person.find();
    console.log("data fetched");
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

router.get("/:worktype", async (req, res) => {
  try {
    const worktype = req.params.worktype;
    if (worktype == "chef" || worktype == "manager" || worktype == "waiter") {
      const data = await Person.find({ work: worktype });
      res.status(200).json(data);
    } else {
      res.status(404).json({ error: "invalid work type" });
    }
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

router.put("/:id", async (req, res) => {
  try {
    const personid = req.params.id;
    const updatedata = req.body;

    const responace = await Person.findByIdAndUpdate(personid, updatedata, {
      new: true,
      runValidators: true,
    });
    if (!updatedata) {
      res.status(404).json({ error: "data is not found" });
    }
    console.log("data updated");
    res.status(200).json(responace);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

router.delete("/:id", async (req, res) => {
  try {
    const personid = req.params.id;
    const responce = await Person.findByIdAndRemove(personid);
    if (!responce) {
      res.status(404).json({ error: "data is not found" });
    }
    console.log("data deleted");
    res.status(200).json(responace);
  } catch (error) {
    console.log(error);
    res.status(500).json({ error: "internal error" });
  }
});

module.exports = router;
