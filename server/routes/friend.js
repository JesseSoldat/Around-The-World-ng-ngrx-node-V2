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

  // accept a friend request
  app.post(
    "/api/friend/request/accept/:userId",
    isAuth,
    isUser,
    async (req, res) => {
      const msg = "There was an error while accepting the friend request.";
      try {
        const { userId } = req.params;
        const { friendId } = req.body;

        const friendRequest = await FriendRequest.findOne({
          requester: friendId,
          recipient: userId
        });

        if (!friendRequest) return serverRes(res, 400, msg, null);

        // save the friend request id before deleting it
        const friendRequestId = friendRequest._id;

        // change friend status for both the recipient and requestor
        // delete the friend request
        const [recipient, requester] = await Promise.all([
          User.findByIdAndUpdate(
            userId,
            { $addToSet: { friends: friendId } },
            { new: true }
          ).populate(friendProfile),
          User.findByIdAndUpdate(
            friendId,
            { $addToSet: { friends: userId } },
            { new: true }
          ),
          FriendRequest.findByIdAndRemove(friendRequestId)
        ]);

        const msg = "The friend request has been accepted.";

        serverRes(res, 200, msg, {
          friends: recipient.friends,
          friendRequestId
        });
      } catch (err) {
        console.log("Err: Accept Friend Request", err);
        serverRes(res, 400, msg, null);
      }
    }
  );
};
