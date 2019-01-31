require("./server/config/config");

const express = require("express");
const connectToDb = require("./server/db/mongoose");
const bodyParser = require("body-parser");

const app = express();

connectToDb();

app.listen(process.env.PORT);

app.use(bodyParser.json());

require("./server/routes/auth")(app);
require("./server/routes/story")(app);
require("./server/routes/friend")(app);

if (process.env.NODE_ENV === "production") {
  const path = require("path");

  app.use(
    express.static(
      path.resolve(__dirname, "dist", "aroundTheWorldV2", "index.html")
    )
  );
} else {
  app.get("*", (req, res) => res.send("Welcome to Around the World"));
}
