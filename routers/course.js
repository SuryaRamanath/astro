const express = require("express");
const {signup,login,getUsers } = require("../controllers/user");
const router = express.Router();

router.post('/get-users', getUsers)
router.post('/register', signup)
router.post('/login', login)


module.exports = router;