const express = require("express");
const bodyParser = require("body-parser");
const app = express();
const port = 5000;

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const mongoose = require("mongoose");
mongoose.connect("mongodb://localhost:27017/app_repository", {
  useNewUrlParser: true,
  useUnifiedTopology: true,
});

//  apps schema
const Apps = mongoose.model("App", {
  title: {
    type: String,
    required: true,
  },
  platform: {
    type: String,
    required: true,
  },
  team: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  link: {
    type: String,
    required: true,
  },
  created_at: {
    type: Date,
    required: true,
  },
  created_by: {
    type: String,
    required: true,
  },
});

app.get("/", async (req, res) => {
  try {
    const apps = await Apps.find().sort({ created_at: "desc" });
    res.send({
      success: true,
      message: "Success to get submitted apps",
      data: apps,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed to get submitted apps",
      data: error,
    });
  }
});

app.get("/:id", async (req, res) => {
  try {
    const { id } = req.params;
    const apps = await Apps.findOne({ _id: id }).sort({ created_at: "desc" });
    res.send({
      success: true,
      message: "Success to get submitted apps by id",
      data: apps,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed to get submitted apps by id",
      data: error,
    });
  }
});

app.post("/", async (req, res) => {
  try {
    const { title, team, description, platform, link, created_by } = req.body;
    const apps = await Apps.create({
      title,
      team,
      description,
      platform,
      link,
      created_by,
      created_at: new Date(),
    });
    console.log(apps);
    res.send({
      success: true,
      message: "Success to submit apps",
      data: apps,
    });
  } catch (error) {
    res.send({
      success: false,
      message: "Failed to get submitted apps",
      data: error,
    });
  }
});

app.listen(port, () => {
  console.log(`Example app listening at http://localhost:${port}`);
});
