import express from "express";
import { getUsers, login, register, logout } from "../controllers/users.js";
//Memverifikasi endpoint yang tidak diakses apabila user tidak login
import { verifyToken } from "../middleware/verifyToken.js";
import { refreshToken } from "../controllers/refreshToken.js";

const router = express.Router();

router.get('/users', verifyToken, getUsers);
router.post('/users', register);
router.post('/login', login);
router.get('/token', refreshToken)
router.delete('/logout', logout)

export default router;