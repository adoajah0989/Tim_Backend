import express from "express";
import { getGuests, getGuestById, createGuest, updateGuest, deleteGuest } from "../controllers/Guest.js";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import {getBMutasi, getBMutasiById} from "../controllers/bukuMutasi.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

 
const router = express.Router();
 
router.get('/bmutasi', getBMutasi);
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/guests', getGuests);
router.get('/guests/:id', getGuestById);
router.get('/bmutasi/:id',getBMutasiById);
router.get('/bmutasi',getBMutasi);
router.post('/guests', createGuest);
router.patch('/guests/:id', updateGuest);
router.delete('/guests/:id', deleteGuest);

 
export default router;