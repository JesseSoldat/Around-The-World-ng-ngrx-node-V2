const mongoose = require("mongoose");
// models
const Story = require("../models/story");
// middleware
const isAuth = require("../middleware/isAuth");
const isUser = require("../middleware/isUser");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // get user stories or other peoples stories
  app.get("/api/story/:userId", isAuth, isUser, async (req, res) => {
    const { userId } = req.params;
    try {
      const stories = await Story.find({ user: userId })
        .sort({ _id: -1 })
        .populate({ path: "user", select: ["email", "username"] });

      serverRes(res, 200, null, { stories });
    } catch (err) {
      console.log("Err: fetch stories", err);
      const msg = getErrMsg("err", "fetch", "stories");
      serverRes(res, 400, msg, null);
    }
  });
  // add a story
  app.post("/api/story/add/:userId", isAuth, isUser, async (req, res) => {
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

  // add an image to the story
  app.patch(
    "/api/story/addImage/:userId/:storyId",
    isAuth,
    isUser,
    async (req, res) => {
      const { storyId } = req.params;
      const { storyImg } = req.body;

      try {
        const story = await Story.findOneAndUpdate(
          { _id: storyId },
          {
            $addToSet: { images: storyImg }
          },
          { new: true }
        );
        const msg = "Your image was uploaded";
        serverRes(res, 200, msg, { story });
      } catch (err) {
        console.log("Err: add story image", err);
        const msg = getErrMsg("err", "add", "story image");
        serverRes(res, 400, msg, null);
      }
    }
  );
};
