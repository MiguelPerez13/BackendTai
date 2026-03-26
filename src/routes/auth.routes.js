const express = require('express');
const router = express.Router();
const authController = require('../controllers/auth.controller');
const { route } = require('express/lib/application');
const verifyToken = require("../middlewares/auth.middleware")


router.post('/login',authController.login);
router.post('/register',authController.register);
router.get('/users' , verifyToken ,authController.getUsers);
router.get('/users/:id' ,authController.getUserById)
router.put('/edit',authController.editUserById)


module.exports = router;