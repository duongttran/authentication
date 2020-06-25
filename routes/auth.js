var express = require('express');
var router = express.Router();
const { loginRequired } = require("../middleware/auth")
const { loginWithEmail, logout } = require("../controllers/authController");



// localhost:5000/auth/

router.route("/login").post(loginWithEmail)
router.route("/logout").get(loginRequired, logout)


module.exports = router;