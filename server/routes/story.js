const mongoose = require("mongoose");
// models
const Story = require("../models/story");
// middleware
const isAuth = require("../middleware/isAuth");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // add a story
  app.post("/api/story/add/:userId", isAuth, async (req, res) => {
    const { userId } = req.params;
    const { title, description, geometry } = req.body;

    if (!title || !geometry)
      return serverRes(res, 400, getErrMsg("requiredFields"));

    try {
      const story = new Story({ user: userId, title, description, geometry });

      story.save();

      const msg = "Your new story has been saved.";

      serverRes(res, 200, msg, { story });
    } catch (err) {
      console.log("Err: Add Story", err);
      serverRes(res, 400, getErrMsg("err", "create", "story"));
    }
  });
};
