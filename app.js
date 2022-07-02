const express = require("express");
const taskRoutes = require("./routes/taskRoutes");
const connectDB = require("./db/connectDB");
require("dotenv").config();

// security
const helmet = require("helmet");
const cors = require("cors");
const xss = require("xss-clean");
const rateLimit = require("express-rate-limit");

const app = express();
// app.set("trust proxy", 1);
// app.use(
//   rateLimit({
//     windowMs: 15 * 60 * 1000,
//     max: 100,
//   })
// );
app.use(express.json());
app.use(helmet());
app.use(cors());
app.use(xss());

app.get("/", (req, res) => {
  res.send("hello world");
});

app.use("/api/v1/tasks", taskRoutes);

const port = process.env.PORT || 5000;
const startServer = async () => {
  try {
    await connectDB(process.env.MONGO_URL);
    app.listen(port, (req, res) => {
      console.log(`app running on port ${5000}`);
    });
  } catch (error) {
    console.log(error);
  }
};

startServer();
