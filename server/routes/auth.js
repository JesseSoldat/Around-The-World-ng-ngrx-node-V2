// models
const User = require("../models/user");
// middleware
const authCheckInputs = require("../middleware/authCheckInputs");
// utils
const { serverRes, getErrMsg } = require("../utils/serverRes");

module.exports = app => {
  // register
  app.post("/api/register", authCheckInputs, async (req, res) => {
    const { username, email, password } = req.body;

    try {
      const haveUser = await User.findOne({ email });

      if (haveUser) {
        const msg = getErrMsg("haveUser");
        return serverRes(res, 400, msg, null);
      }

      const user = new User({ username, email, password });

      user["role"] = "user";

      await user.save();

      const { token, err } = await user.generateAuthToken();

      if (err) {
        const msg = err;
        return serverRes(res, 400, msg, null);
      }

      const msg = `${user.email} is now registered.`;

      serverRes(res, 200, msg, { token });
    } catch (err) {
      console.log("Err: Register", err);
      const msg = getErrMsg("err", "register", "user");
      serverRes(res, 400, msg, null);
    }
  });

  // login
  app.post("/api/login", authCheckInputs, async (req, res) => {
    const { email, password } = req.body;

    try {
      const user = await User.findByCredentials(email, password);

      if (!user) {
        const msg = getErrMsg("noUser");
        return serverRes(res, 400, msg, null);
      }

      const { token, err } = await user.generateAuthToken();

      if (err) {
        const msg = err;
        return serverRes(res, 400, msg, null);
      }

      const msg = `${user.email} has logged in successfully.`;

      serverRes(res, 200, msg, { token });
    } catch (err) {
      console.log("Err: Login", err);
      const msg = getErrMsg("err", "login", "user");
      serverRes(res, 400, msg, null);
    }
  });
};
