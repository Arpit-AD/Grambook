const express = require("express");
const mongoose = require("mongoose");
const userRouter = require("./router/userRouter.js");
const postRouter = require("./router/postRouter.js");
const path = require("path");
const cors = require("cors");
const {mongoURI} = require('./keys')


// const mongoURI = "mongodb://localhost:27017/socialmedia";
const app = express();

app.use(
  express.urlencoded({
    extended: false,
  })
);
app.use(express.json());
app.use(cors());

mongoose.connect(mongoURI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => console.log("MongoDB connected")) //AtUNbnkGSwpP6Yz -- atlas pwd
  .catch((err) => console.log(err));

app.use("/user", userRouter);

app.use("/post", postRouter);

app.use("/uploads/media", express.static(path.join("uploads", "media")));

const PORT = process.env.PORT || 5000;


if(process.env.NODE_ENV == "production"){
  app.use(express.static('client/build'));
  // const path = require('path');
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
  });
}

console.log(process.env.NODE_ENV);


app.listen(PORT, () => console.log("Server listening at port 5000"));

//ApoJkKAqWbTMIhZL-user password
//FuEIqe5n8DUFZqmJ