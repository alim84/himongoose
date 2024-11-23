const express = require("express");
const { default: mongoose } = require("mongoose");
const connectdb = require("./DBconnect/dbconnect");
const himodel = require("./models/hi.model");

const app = express();
const port = 4000;

connectdb();

app.use(express.json());

app.post("/insertdata", async (req, res) => {
  try {
    let { name } = req.body;
    let himodelInstance = new himodel({
      name: name,
    });

    await himodelInstance.save();
    res.status(201).send({ message: "Data inserted" });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/", (req, res) => {
  res.status(200).send("How r you");
});

app.listen(port, (req, res) => {
  console.log(`Server is running http://localhost:${port}`);
});
