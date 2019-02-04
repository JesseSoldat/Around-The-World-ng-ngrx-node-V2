const mongoose = require("mongoose");
const ObjectId = mongoose.Types.ObjectId;
// models
const Story = require("../models/story");
const User = require("../models/user");
// middleware
const isAuth = require("../middleware/isAuth");
const isUser = require("../middleware/isUser");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // get user stories
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

  // get others stories
  app.get(
    "/api/matched/story/:userId/:matchedUserId",
    isAuth,
    isUser,
    async (req, res) => {
      const { matchedUserId } = req.params;
      try {
        const stories = await Story.find({ user: matchedUserId })
          .sort({ _id: -1 })
          .populate({ path: "user", select: ["email", "username"] });

        serverRes(res, 200, null, { stories });
      } catch (err) {
        console.log("Err: fetch stories", err);
        const msg = getErrMsg("err", "fetch", "stories");
        serverRes(res, 400, msg, null);
      }
    }
  );

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

  // match other users helpers
  const convertToRadiansFromMilesOrKm = ({ unit, maxDistance }) => {
    // meters for GeoJSON
    // radians for coordinate pairs.
    const distance = Number(maxDistance);

    // radians = distance / earth radius
    if (unit === "miles") {
      // mi radians = distance in mi / 3959
      return distance / 3959;
    }
    // km radians = distance in km / 6371
    return distance / 6371;
  };

  const geoMatchGroupSort = async (lng, lat, maxDistance, userId) => {
    const geoOptions = {
      near: [lng, lat],
      distanceField: "dist.calculated",
      maxDistance,
      spherical: true
    };

    return Story.aggregate([
      {
        $geoNear: geoOptions
      },
      {
        $match: { user: { $ne: userId } }
      },
      // $$ROOT References the top-level document, being processed in the aggregation pipeline
      {
        $group: { _id: "$user", stories: { $push: "$$ROOT" } }
      },
      {
        $project: {
          stories: 1,
          length: { $size: "$stories" }
        }
      },
      {
        $sort: { length: -1 }
      },
      {
        $lookup: {
          from: "users",
          localField: "_id",
          foreignField: "_id",
          as: "userInfo"
        }
      },
      {
        $project: {
          length: 1,
          "userInfo.username": 1,
          "userInfo.email": 1,
          "userInfo._id": 1,
          "stories.title": 1,
          "stories.description": 1,
          "stories.geometry": 1
        }
      }
    ]);
  };

  // match other users api call
  app.get("/api/story/match/:userId", isAuth, isUser, async (req, res) => {
    const { userId } = req.params;
    // Tokyo to Seoul 716 miles || 1,155 km
    // miles = 706 / 3959 || km = 1000 / 6371
    try {
      //  Required Fields
      // near - 2dsphere index - either a GeoJSON point or legacy coordinate pair.
      // distanceField - The output field that contains the calculated distance.
      // To specify a field within an embedded document, use dot notation.
      // spherical - Determines how MongoDB calculates the distance between two points:
      const user = new ObjectId(userId);
      const maxDistance = convertToRadiansFromMilesOrKm(req.query);
      const lng = parseFloat(req.query.lng);
      const lat = parseFloat(req.query.lat);

      // queries
      const friendProfile = {
        path: "friends",
        select: [
          "username",
          "avatar",
          "email",
          "gender",
          "hometown",
          "birthDate",
          "about",
          "occupation"
        ]
      };

      const [friends, matches] = await Promise.all([
        User.findById(userId, { _id: 1 }).populate(friendProfile),
        geoMatchGroupSort(lng, lat, maxDistance, user)
      ]);

      serverRes(res, 200, null, { friends: friends.friends, matches });
    } catch (err) {
      console.log("Err: Match Location", err);
      const msg = getErrMsg("err", "match", "other users");
      serverRes(res, 400, msg, null);
    }
  });
};
