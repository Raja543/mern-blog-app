const express = require("express");
const mongoose = require("mongoose");
const dotenv = require("dotenv");
const config = require("./config");
const cors = require("cors");

dotenv.config();

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));


app.use(cors({
  origin: 'http://localhost:3000',
  methods: ['GET', 'POST', 'PUT', 'DELETE'],
  credentials: true
}) )


app.use("/", require("./routes"));

mongoose
  .connect(config.mongooseUrl, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("MongoDB connected");

    // Start the Express server
    app.listen(config.port, () => {
      console.log(`Server running on port: ${config.port}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
    process.exit(1);
  });
