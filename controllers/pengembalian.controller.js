import { Pinjams, DetailPinjam, Buku } from "../index/model.js";
import Mahasiswa from "../models/mahasiswa.model.js";

// LAPORAN PENGEMBALIAN
export const laporanPengembalian = async (req, res) => {
  try {
    const data = await Pinjams.findAll({
      attributes: ["tanggal_kembali"],

      include: [
        {
          model: Mahasiswa,
          attributes: ["nama_mahasiswa"],
        },
        {
          model: DetailPinjam,
          attributes: ["jml_pinjam"],
          include: [
            {
              model: Buku,
              attributes: ["judul_buku"],
            },
          ],
        },
      ],
    });

    res.json(data);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};
