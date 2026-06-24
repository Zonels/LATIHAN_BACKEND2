import express from "express";
import { laporanPengembalian } from "../controllers/pengembalian.controller.js";

const router = express.Router();

// laporan pengembalian
router.get('/laporan/pengembalian', laporanPengembalian);

export default router;
