const express = require("express");
const app = express();
const db = require("./db");
const dotenv = require("dotenv");
require("dotenv").config();
// const PORT = 3000;
const bodyparser = require("body-parser");
app.use(bodyparser.json());

//Port number
const PORT = process.env.PORT || 3000;

const Personroute = require("./Routes/Personroute");
const MenuRoute = require("./Routes/MenuRoute");

app.use("/person", Personroute);
app.use("/menu", MenuRoute);
app.listen(PORT, () => {
  console.log(`application run on port no ${PORT}`);
});
