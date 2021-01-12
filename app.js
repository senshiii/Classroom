require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const response = require("./utils/response");

const app = express();

// MONGOOSE CONNECTION
mongoose
  .connect(process.env.DB_URI, {
    useCreateIndex: true,
    useFindAndModify: true,
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("Connected to DB"))
  .catch((err) => console.log("Error connecting to Db: ", err));

// ADDITIONAL SETUP

// MULTER CONFIG
require("./config/multer-config");

// AWS CONFIG
require("./config/aws-config");

// MIDDLEWARES
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

// CORS HEADERS
console.log(process.env.CLIENT_URL);
if (process.env.NODE_ENV == "production") {
  app.use(
    cors({
      origin: `${process.env.CLIENT_URL}`,
      optionsSuccessStatus: 200,
    })
  );
} else {
  app.use(cors());
}

// AUTH ROUTES
app.use("/a", require("./routes/auth"));

// USER ROUTES
app.use("/u", require("./routes/user"));

// CLASSROOM ROUTES
app.use("/c", require("./routes/classroom"));

app.use((err, req, res, next) => {
  console.log("Caught Error:", err);
  if (err)
    res.status(500).json(response(false, "Unexpected Server Error", null));
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on PORT: ${PORT}`));
