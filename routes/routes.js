const express = require("express");
const { getUsers, login, register, logout, createRoom, landingPage } = require("../controllers/users.js");
//Memverifikasi endpoint yang tidak diakses apabila user tidak login
const { verifyToken } = require("../middleware/verifyToken.js");
const { refreshToken } = require("../controllers/refreshToken.js");


const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/register', register);
router.post('/login', login);
router.get('/token', refreshToken)
router.delete('/logout', logout)
router.post('/room', createRoom)
router.get('/', landingPage)

module.exports = router;