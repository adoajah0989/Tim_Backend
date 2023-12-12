import express from "express";
import { getGuests, getGuestById, createGuest, updateGuest, deleteGuest } from "../controllers/Guest.js";
import { getUsers, Register, Login, Logout } from "../controllers/Users.js";
import { getFormPatrolById,getFormPatrols, saveFormPatrol, updateFormPatrol, deleteFormPatrol } from "../controllers/formPatrol.js";
import {getBMutasi, getBMutasiById,deleteBMutasi} from "../controllers/bukuMutasi.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";

 
const router = express.Router();
 
router.get('/users', verifyToken, getUsers);
router.post('/users', Register);
router.post('/login', Login);
router.get('/token', refreshToken);
router.delete('/logout', Logout);
router.get('/guests', getGuests);
router.get('/guests/:id', getGuestById);
router.get('/bmutasi/:id',getBMutasiById);
router.get('/bmutasi',getBMutasi);
router.delete('/bmutasi/:id',deleteBMutasi);
router.post('/guests', createGuest);
router.patch('/guests/:id', updateGuest);
router.delete('/guests/:id', deleteGuest);
router.get('/formpatrol', getFormPatrols);
router.get('/formpatrols/:id', getFormPatrolById);
router.post('/formpatrol', saveFormPatrol);
router.patch('/formpatrol/:id', updateFormPatrol);
router.delete('/formpatrol/:id', deleteFormPatrol);

 
export default router;