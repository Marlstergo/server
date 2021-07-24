const express = require("express");
const app = express();
const joi = require("joi");
const mongoose = require("mongoose");
const morgan = require("morgan");
const Model = require("./model");
const cors = require("cors");
const connectDB = require("./db")

connectDB();

  app.use(cors());
  app.use(morgan("dev"));
  app.use(express.json()); // body request parser
  app.use(express.urlencoded({ extended: true }));

const validation = (data) => {
  const SignupSchema = joi.object({
    email: joi.string().min(6).required().email(),
    name: joi.string().required(),
    phone: joi.string().min(6).required(),
  });
  return SignupSchema.validate(data);
};

app.get("/", async (req, res) => {
  res.send("Welcome to Crud Api");
});
app.post("/users", async (req, res) => {
  const { name, email, phone } = req.body;

  const { error } = validation(req.body);
  if (error)
    return res.status(422).send({
      status: false,
      msg: error.details[0].message,
    });
  try {
    const findUser = await Model.findOne({ email: email });
    if (findUser)
      res.status(402).send({
        status: false,
        msg: "User already exist",
      });
    if (!findUser) {
      const newuser = new Model({
        email: email,
        name: name,
        phone: phone,
      });
    await newuser.save()
      if (newuser)
        res.status(201).send({
          status: true,
          msg: "New user created",
        });
    }
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

app.get("/users", async (req, res) => {
  try {
    const getalluser = await Model.find({});
    if (getalluser)
      res.status(200).send({
        status: true,
        msg: "User fetched succesfully",
        data: getalluser,
      });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

app.get("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const getalluser = await Model.findOne({ _id: id });
    if (getalluser)
      res.status(200).send({
        status: true,
        msg: "User fetched succesfully",
        data: getalluser,
      });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

app.put("/users/:id", async (req, res) => {
  const { id } = req.params;
  const { email, name, phone } = req.body;

  try {
    const findUser = await Model.findOne({ _id: id });

    const getalluser = await Model.findOneAndUpdate(
      { _id: id },
      {
        $set: {
          email: email || findUser.email,
          phone: phone || findUser.phone,
          name: name || findUser.name,
        },
      }
    );

    if (getalluser)
      res.status(200).send({
        status: true,
        msg: "User detail edited succesfully",
      });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

app.delete("/users/:id", async (req, res) => {
  const { id } = req.params;

  try {
    const deleteUser = await Model.findOneAndDelete({ _id: id });
    if (deleteUser)
      res.status(200).send({
        status: true,
        msg: "User deleted succesfully",
      });
  } catch (error) {
    res.status(500).send({ msg: error.message });
  }
});

const Port = process.env.PORT || 8090;

app.listen(Port, () => {
  console.log("Sample crud listening");
});