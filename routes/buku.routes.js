import express from "express";
import { 
    getAllProducts,
    tambahbukubaru,
    cariBukuById,
    updateBuku,
    deleteBuku
 } from "../controllers/buku.controllers.js";

const router = express.Router();
router.get("/", getAllProducts);
router.post("/", tambahbukubaru);
router.get("/:id", cariBukuById);
router.patch("/:id", updateBuku);
router.delete("/:id", deleteBuku);

export default router;