import express from "express";
import { getUsers, login, register, logout, createRoom, landingPage } from "../controllers/users.js";
//Memverifikasi endpoint yang tidak diakses apabila user tidak login
import { inputRoomToken } from "../controllers/inputRoomToken.js";
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', register);
router.post('/login', login);
router.get('/token', refreshToken)
router.delete('/logout', logout)
router.post('/room', createRoom)
router.post('/input-room', inputRoomToken)
router.get('/', landingPage)

export default router;