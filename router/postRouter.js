const router = require('express').Router();
const {createPost, getPost , editPost, deletePost, getPostById, getPostByUser} = require("../controller/postController.js");
const fileUpload = require('../middleware/fileUpload.js');
const requireLogin = require('../middleware/requireLogin');

router.post("/create", fileUpload.single("image"), requireLogin, createPost);

router.get("/getpost" , requireLogin, getPost);

router.put("/editpost" , requireLogin ,  editPost);

router.delete("/deletepost", requireLogin , deletePost);

router.get("/getpostbyuser" , requireLogin , getPostByUser);

router.get("/getpostbyid/:id" , requireLogin , getPostById);

module.exports = router;
