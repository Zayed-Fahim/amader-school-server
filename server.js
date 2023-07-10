const mongoose = require("mongoose");
require("dotenv").config();

// require app from app.js
const app = require("./app");

// server port
const port = process.env.PORT || 8080;

//connect to database
mongoose
  .connect(process.env.LOCAL_DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected.");
  });

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
