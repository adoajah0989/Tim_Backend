import express from "express";
import {
  getUsers,
  Register,
  Login,
  Logout,
  getDropdownOptions,
} from "../controllers/Users.js";
import { getGuests, updateGuest, createGuest, getGuestById,deleteGuest } from "../controllers/Guest.js";
import { verifyToken } from "../middleware/VerifyToken.js";
import { refreshToken } from "../controllers/RefreshToken.js";
import { updateMutasi } from "../controllers/Mutasi.js";
import {
  createPatroli,
  updatePatroli,
  uploadPhotoPatroli,
  getPatroli,
  getPatroliById,
  savePatroli,
  deletePatroli,
  getPatroliQ,
} from "../controllers/Patroli.js";
import {
  createExpedisi,
  updateExpedisi,
  uploadPhotoExpedisi,
  getExpedisi,
  getExpedisiById,
  saveExpedisi,
  deleteExpedisi,
} from "../controllers/Expedisi.js";
import { 
  handleUpload, 
  uploadPhotos, 
  getAsset,
  getAssetById,
  saveAsset,
  deleteAsset,
  getAssetQ, createAsset } from "../controllers/Asset.js";
import { uploadLapdi, createLapdi, getLapdi,deleteLapdi } from "../controllers/Lapdi.js";
import { LoginAtasan, getAtasan } from "../controllers/Atasan.js";
import { createLKM } from "../controllers/LKM.js";
import { addDarurat, editDarurat, getDarurat } from "../controllers/darurat.js";
import { createBarcode } from "../controllers/Barcode.js";
import { createBAP, deleteBAP, getBap } from "../controllers/BAP.js";
import { getMutasi, getMutasiById, handleDeleteMutasi } from "../controllers/bukuMutasi.js";
import { deleteInOut, getinOut, getinOutById } from "../controllers/InOut.js";
const router = express.Router();

// Metode GET
router.get("/users", verifyToken, getUsers);
router.get("/token", refreshToken);
router.get("/anggota", getDropdownOptions);
router.get("/data", getLapdi);
router.get("/atasan", getAtasan);
router.get("/guests", getGuests);
router.get("/guests/:id", getGuestById);
router.get("/lapdi",getLapdi);
router.get("/mutasi",getMutasi);
router.get("/mutasi/:id",getMutasiById);
router.get('/expedisi/:id', getExpedisiById);
router.get('/asset/:id', getAssetById);
router.get('/expedisi', getExpedisi);
router.get('/asset', getAsset);
router.get("/bap",getBap);
router.get("/darurat",getDarurat);
router.get("/ekspedisi",getExpedisi);
router.get("/ekspedisi/:id",getExpedisiById);
router.get("/InOut",getinOut)
router.get("/InOut/:id",getinOutById)
// Metode POST
router.post("/users", Register);
router.post("/login", Login);
router.post("/guest", updateGuest);
router.post("/mutasi", updateMutasi);
router.post("/patroli", uploadPhotoPatroli, createPatroli);
router.post("/expedisi", uploadPhotoExpedisi, createExpedisi);
router.post("/upload", uploadPhotos, handleUpload);
router.post("/lapdi", uploadLapdi, createLapdi);
router.post("/loginatas", LoginAtasan);
router.post("/lkm", createLKM);
router.post("/barcode", createBarcode);
router.post("/bap", createBAP);
router.post('/guests', createGuest);
// router.post('/darurat', addDarurat);

// Metode DELETE
router.delete("/logout", Logout);
router.delete('/guests/:id', deleteGuest);
router.delete('/lapdi/:id', deleteLapdi);
router.get('/patroli', getPatroli);
router.get('/patroli/:id', getPatroliById);
router.post('/patroli', savePatroli);
router.post('/expedisi', saveExpedisi);
router.post('/asset', saveAsset);
router.patch('/patroli/:id', updatePatroli);
router.patch('/expedisi/:id', updateExpedisi);
router.delete('/patroli/:id', deletePatroli);
router.delete('/expedisi/:id', deleteExpedisi);
router.delete('/mutasi/:id', handleDeleteMutasi);
router.delete('/expedisi/:id', deleteExpedisi);
router.delete('/asset/:id', deleteAsset);
router.delete('/inout/:id', deleteInOut);

// Metode PUT/PATCH
router.put("/patroli/:id", updatePatroli);
router.put("/expedisi/:id", updateExpedisi);
router.put("/darurat/:id", editDarurat);
router.patch('/guests/:id', updateGuest);



export default router;
