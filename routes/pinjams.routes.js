import express from "express";
import { 
    getAllPinjam,
    cariPinjamByNim,
    tambahPinjam,
    updatePinjam,
    deletePinjam,
    insertPinjam,
    // pengembalianSemua,
    // pengembalianSatu,
    laporanPengembalian,
    cariBukuDipinjam,
    pengembalianBuku
    
 } from "../controllers/pinjams.controllers.js";

 import { authenticateToken } from "../middleware/VerifyTokens.js";

const router = express.Router();

router.get("/", getAllPinjam);
router.get("/nim/:nim", cariPinjamByNim);
router.post("/",authenticateToken, insertPinjam);
router.patch("/:id", updatePinjam);
router.delete("/:id", deletePinjam);
// router.patch("/kembali-semua/:id", pengembalianSemua);
// router.patch("/kembali-satu/:id", pengembalianSatu);
router.get("/laporan-pengembalian",authenticateToken , laporanPengembalian);
router.get("/dipinjam/:nim",authenticateToken ,cariBukuDipinjam);
router.post("/pengembalian",authenticateToken ,pengembalianBuku);


export default router;