import { Sequelize } from "sequelize";
import { Pinjam, DetailPinjam, Buku } from "../index/model.js";


export const getAllDetailPinjam=async (req, res)=>{
    try {
        const data= await DetailPinjam.findAll({
            include: { model: Buku},
        });
        res.json(data);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const tambahdetailpinjambaru=async (req, res)=>{
    try {
        const data= await DetailPinjam.create(req.body);
        res.json({"message":"Data Detail Pinjam berhasil disimpan"});
    } catch (error) {
        res.json({message:error.message});
    }
};

export const cariDetailPinjamByID=async (req, res)=>{
    try {
        const data= await DetailPinjam.findAll({
            include:{model:mahasiswa},
            where:{ 
                nim:req.params.id
            }
        });
        res.json(data[0]);
    } catch (error) {
        res.json({message:error.message});
    }
};

export const updateDetailPinjam = async (req, res) => {
    try {
        await DetailPinjam.update(req.body, {
            where: {
                id: req.params.id
            }
        });
        res.json({ "message": "Data Detail Pinjam berhasil diupdate" });
    } catch (error) {
        res.json({ message: error.message });
    }
};

export const deleteDetailPinjam = async (req, res) => {
    try {
        await DetailPinjam.destroy({
            where: {
                id: req.params.id
            }
        });
        res.json({ "message": "Data Detail Pinjam berhasil dihapus" });
    } catch (error) {
        res.json({ message: error.message });
    }
};