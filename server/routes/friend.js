// models
const User = require("../models/user");
const FriendRequest = require("../models/friends");
// middleware
const isAuth = require("../middleware/isAuth");
const isUser = require("../middleware/isUser");
// utils
const { serverRes } = require("../utils/serverRes");
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

module.exports = app => {
  // get all friends
  app.get("/api/friends/:userId", isAuth, isUser, async (req, res) => {
    try {
      const { userId } = req.params;
      const friends = await User.findById(userId, { _id: 1 }).populate(
        friendProfile
      );

      serverRes(res, 200, null, { friends: friends.friends });
    } catch (err) {
      console.log("Err: Get Friends", err);
      const msg = getErrMsg("err", "fetch", "friends");
      serverRes(res, 400, msg, null);
    }
  });

  // get all friend requests sent or received
  app.get("/api/friend/requests/:userId", isAuth, isUser, async (req, res) => {
    try {
      const { userId } = req.params;
      const friendRequests = await FriendRequest.find({
        $or: [{ requester: userId }, { recipient: userId }]
      })
        .populate({
          path: "recipient",
          select: ["username"]
        })
        .populate({
          path: "requester",
          select: ["username"]
        });

      serverRes(res, 200, null, { friendRequests });
    } catch (err) {
      console.log("Err: Get Friend Requests", err);
      const msg = getErrMsg("err", "fetch", "friend request");
      serverRes(res, 400, msg, null);
    }
  });

  // send a friend request
  app.post("/api/friend/request/:userId", isAuth, isUser, async (req, res) => {
    try {
      const { userId } = req.params;
      const { friendId } = req.body;

      const friendRequest = new FriendRequest({
        requester: userId,
        recipient: friendId,
        status: "requested"
      });

      await friendRequest.save();

      const savedFriendRequest = await FriendRequest.findById(friendRequest._id)
        .populate({
          path: "recipient",
          select: ["username"]
        })
        .populate({
          path: "requester",
          select: ["username"]
        });

      const msg = "Your friend request has been sent.";

      serverRes(res, 200, msg, { friendRequest: savedFriendRequest });
    } catch (err) {
      console.log("Err: Friend Request", err);
      const msg = "There was an error while sending a friend request.";
      serverRes(res, 400, msg, null);
    }
  });
};
