const mongoose = require("mongoose");
require("dotenv").config();

// require app from app.js
const app = require("./app");

// server port
const port = process.env.PORT || 5000;

// Connect to MongoDB Atlas
const dbURL = process.env.CLOUD_DATABASE_URL || LOCAL_DATABASE_URL;
mongoose
  .connect(dbURL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("Database Connected.");
    // Start the server after successful database connection
    app.listen(port, () => {
      console.log(`Server is running on port ${port}`);
    });
  })
  .catch((err) => {
    console.error("Error connecting to database:", err.message);
  });
