import { Sequelize } from "sequelize";
import { Pinjam, Mahasiswas, DetailPinjam, Buku } from "../index/model.js";
import Prodis from "../models/prodi.model.js";

// GET semua pinjam
export const getAllPinjam = async (req, res) => {
  try {
    const pinjams = await Pinjam.findAll({
      include: [
        { model: Mahasiswas, attributes: ["nama"] },
        { model: DetailPinjam, include: "buku" },
      ],
    });
    res.json(pinjams);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// GET pinjam by NIM
export const cariPinjamByNim = async (req, res) => {
  try {
    const data = await Pinjam.findAll({
      // Peminjaman -> -> Mahasiswa ->Prodi ?
      // Peminjaman -> Mahasiswa
      // Mahasiswa -> Prodi : prodi_id
      include: [
        {
          model: Mahasiswas,
          include: Prodis,
        },
        { model: DetailPinjam, include: "buku" },
      ],
      where: { nim: req.params.nim },
    });
    res.json(data[0]);
  } catch (error) {
    res.json({ message: error.message });
  }
};

// POST tambah pinjam baru
export const tambahPinjam = async (req, res) => {
  try {
    const data = await Pinjam.create(req.body);
    res.json({ message: "Pinjam berhasil disimpan" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// PATCH update pinjam
export const updatePinjam = async (req, res) => {
  try {
    console.log(req.body);
    await Pinjam.update(req.body, {
      where: { id: req.params.id },
    });
    res.json({ message: "Pinjam berhasil diupdate" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

// DELETE hapus pinjam
export const deletePinjam = async (req, res) => {
  try {
    await Pinjam.destroy({
      where: { id: req.params.id },
    });
    res.json({ message: "Pinjam berhasil dihapus" });
  } catch (error) {
    res.json({ message: error.message });
  }
};

export const insertPinjam = async (req, res) => {
  try {
    const tanggalPinjam = new Date();
    const tanggalKembali = new Date();

    tanggalKembali.setDate(tanggalKembali.getDate() + 7);

    const pinjam = await Pinjam.create(
      {
        tanggal_pinjam: tanggalPinjam,
        tanggal_kembali: tanggalKembali,
        nim: req.body.nim,
        pegawai_id: req.body.pegawai_id,

        detail_pinjams: req.body.detail_pinjams,
      },
      {
        include: [
          {
            model: DetailPinjam,
            as: "detail_pinjams",
          },
        ],
      },
    );

    for (const item of req.body.detail_pinjams) {
      await Buku.decrement("jumlah", {
        by: item.jml_pinjam,
        where: { kode_buku: item.buku_id },
      });
    }

    res.json({
      message: "Peminjaman berhasil",
      data: req.body.detail_pinjams,
    });
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

// kembalikan semua buku
// export const pengembalianSemua = async (req, res) => {
//   try {
//     await DetailPinjam.update(
//       { status: 2 },
//       {
//         where: { pinjam_id: req.params.id },
//       },
//     );

//     res.json({ message: "Semua buku berhasil dikembalikan" });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

// // kembalikan 1 buku saja
// export const pengembalianSatu = async (req, res) => {
//   try {
//     await DetailPinjam.update(
//       { status: 1 },
//       {
//         where: {
//           id: req.params.id,
//         },
//       },
//     );

//     res.json({ message: "Buku berhasil dikembalikan" });
//   } catch (error) {
//     res.json({ message: error.message });
//   }
// };

export const laporanPengembalian = async (req, res) => {
  try {
    const data = await Pinjam.findAll({
      attributes: ["tanggal_pinjam", "tanggal_kembali"],

      include: [
        {
          model: Mahasiswas,

          as: "mahasiswa",

          attributes: ["nama"],
        },

        {
          model: DetailPinjam,

          as: "detail_pinjams",

          where: {
            status: 2,
          },

          attributes: ["id","buku_id", "jml_pinjam", "updated_at"],

          include: [
            {
              model: Buku,

              as: "buku",

              attributes: ["judul"],
            },
          ],
        },
      ],
    });

    const hasil = data.map((p) => ({

      nama_mahasiswa: p.mahasiswa?.nama || "-",

      tanggal_pinjam: p.tanggal_pinjam,

      buku: (p.detail_pinjams || []).map((d) => {
        // tanggal batas pengembalian
        const batasKembali = new Date(p.tanggal_kembali);

        // tanggal sekarang (real time)
        // const sekarang = new Date();

        // hitung selisih hari
        const tanggalPengembalian = new Date(d.updated_at);

        let terlambat = Math.ceil(
          (tanggalPengembalian - batasKembali) / (1000 * 60 * 60 * 24),
        );

        // jika belum terlambat
        if (terlambat < 0) {
          terlambat = 0;
        }

        return { 

          id_DPinjam : d.id,

          Id_Buku: d.buku_id,
          
          judul_buku: d.buku?.judul || "-",

          jumlah_pinjam: d.jml_pinjam,

          tanggal_pengembalian: d.updated_at ,

          jumlah_hari_terlambat: terlambat + " hari",
        };
      }),
    }));

    res.json(hasil);
  } catch (error) {
    res.json({
      message: error.message,
    });
  }
};

export const cariBukuDipinjam = async (req, res) => {
  try {
    const data = await Pinjam.findAll({
      attributes: [],

      where: {
        nim: req.params.nim,
      },

      include: [
        {
          model: Mahasiswas,
          as: "mahasiswa",
          attributes: ["nama"],
        },

        {
          model: DetailPinjam,
          as: "detail_pinjams",
          attributes: ["id", "jml_pinjam", "status"],

          where: {
            status: 1,
          },

          include: [
            {
              model: Buku,
              attributes: ["judul"],
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

  export const pengembalianBuku = async (req, res) => {
    try {
      for (const item of req.body.buku_kembali) {
        // cari detail pinjam
        const detail = await DetailPinjam.findOne({
          where: {
            id: item.detail_pinjam_id,
            status: 1,
          },
        });

        if (!detail) {
          return res.json({
            message: "Data pinjam tidak ditemukan",
          });
        }

        // validasi
        if (item.jml_kembali > detail.jml_pinjam) {
          return res.json({
            message: "Jumlah lebih besar dari jumlah pinjam",
          });
        }

        // jika kembali semua
        if (item.jml_kembali == detail.jml_pinjam) {
          await DetailPinjam.update(
            {
              status: 2,
            },
            {
              where: {
                id: detail.id,
              },
            },
          );
        } else {
          // insert riwayat pengembalian
          await DetailPinjam.create({
            pinjam_id: detail.pinjam_id,
            buku_id: detail.buku_id,
            jml_pinjam: item.jml_kembali,
            status: 2,
          });

          // update sisa pinjaman
          await DetailPinjam.update(
            {
              jml_pinjam: detail.jml_pinjam - item.jml_kembali,
            },
            {
              where: {
                id: detail.id,
              },
            },
          );
        }

        // tambah stok buku
        await Buku.increment("jumlah", {
          by: item.jml_kembali,
          where: {
            kode_buku: detail.buku_id,
          },
        });
      }

      res.json({
        message: "Pengembalian berhasil",
      });
    } catch (error) {
      res.json({
        message: error.message,
      });
    }
  };
