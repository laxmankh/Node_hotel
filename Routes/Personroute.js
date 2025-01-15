const express = require("express");
const router = express.Router();
const Person = require("../models/Person");
const { jwtauthmiddleware, generatetoken } = require("../jwttoken");
router.post("/signup", async (req, res) => {
  try {
    const data = req.body;
    const newperson = new Person(data);
    const responce = await newperson.save();
    console.log("data saved");
    const payload = {
      id: responce.id,
      username: responce.username,
    };
    const token = generatetoken(payload);
    res.status(200).json({ responce, token: token });
  } catch (error) {
    console.log(error);
  }
});

router.post("/login", async (req, res) => {
  try {
    const { username, password } = req.body;
    const user = await Person.findOne({ username: username });
    const pass = user.password === password ? true : false;
    if (!user || !pass) {
      return res.status(404).json({ error: "incorrect password and username" });
    }
    const payload = {
      id: user.id,
      username: user.username,
    };
    const token = generatetoken(payload);
    res.json({ token: token });
  } catch (error) {
    console.log(error);
    res.status(404).json({ error: "internal error" });
  }
});

router.get("/", jwtauthmiddleware, async (req, res) => {
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
