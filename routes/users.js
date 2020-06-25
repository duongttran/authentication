var express = require('express');
var router = express.Router();
const { createUser, getMyProfile, readUser } = require("../controllers/userController");
const { loginRequired } = require("../middleware/auth")
/* GET users listing. */
// localhost:5000/users/
router.route("/")
  .get(readUser)
  .post(createUser)

// localhost:5000/users/me => all current user information
router.route("/me").get(loginRequired, getMyProfile)

module.exports = router;