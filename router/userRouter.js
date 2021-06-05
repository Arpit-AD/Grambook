const router = require('express').Router();
const {start,userLogin,editUser,userSignup} = require("../controller/userController.js");
const requireLogin = require('../middleware/requireLogin.js');

// router.get("/", requireLogin ,start);

router.post("/signup" , userSignup);

router.put("/edituser" , editUser );

router.post("/login", userLogin );

module.exports = router;
