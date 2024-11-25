const express = require("express");
const { default: mongoose } = require("mongoose");
const connectdb = require("./DBconnect/dbconnect");
const himodel = require("./models/hi.model");
const cors = require("cors");

const app = express();
const port = 4000;
app.use(cors());

connectdb();

app.use(express.json());

app.post("/insertdata", async (req, res) => {
  try {
    let { name } = req.body;
    let himodelInstance = new himodel({
      name: name,
    });

    await himodelInstance.save();
    res.status(201).send({ message: "Data inserted", data: himodelInstance });
  } catch (error) {
    console.error(error);
    res.status(500).send({ message: "Internal server error" });
  }
});

app.get("/getalldata", async (req, res) => {
  let getalldata = await himodel.find({});
  res.status(200).send({ message: "Show all data", data: getalldata });
});
app.get("/getdata/:id", async (req, res) => {
  let { id } = req.params;
  let getdata = await himodel.findOne({ _id: id });
  res.status(200).send({ message: "Show all data", data: getdata });
});
app.delete("/deletedata/:id", async (req, res) => {
  let { id } = req.params;
  let deletedata = await himodel.findOneAndDelete({ _id: id });
  res.status(200).send({ message: "Deleted data", data: deletedata });
});

app.patch("/updatedata/:id", async (req, res) => {
  let { id } = req.params;
  let { name } = req.body;
  let updatedata = await himodel.findOneAndUpdate(
    { _id: id },
    { name: name },
    { new: true }
  );
  res.status(200).send({ message: "update data", data: updatedata });
});

app.listen(port, (req, res) => {
  console.log(`Server is running http://localhost:${port}`);
});
