import Buku from "../models/buku.model.js";
import Pinjam from "../models/pinjams.model.js";
import DetailPinjam from "../models/detail_pinjam.model.js";
import Mahasiswas from "../models/mahasiswa.model.js";

/*relasi antara mahasiswa dengan tabel pinjam, agar ketika seleksi pada
 tabel pinjam yang muncul tidak hanya nim, tapi juga nama
 */
Mahasiswas.hasMany(Pinjam, {  foreignKey: "nim"});

Pinjam.belongsTo(Mahasiswas, {  foreignKey: "nim"});

/*relasi antara Buku dengan tabel DetilPinjam, agar ketika seleksi pada
 tabel DetilPinjam yang muncul tidak hanya buku_id, tapi juga nama_bukunya
 */
Buku.hasMany(DetailPinjam, { foreignKey: "buku_id" });

DetailPinjam.belongsTo(Buku, { foreignKey: "buku_id" });

/*relasi antara Pinjam dengan tabel DetilPinjam, agar ketika seleksi pada
 tabel Pinjam akan muncul data pada detail pinjam, serta ketika kita
melakukan save
 peminjaman buku kita tinggal panggil model DetilPinjam
 */
Pinjam.hasMany(DetailPinjam, { foreignKey: "pinjam_id", as: "detail_pinjams" });
DetailPinjam.belongsTo(Pinjam, { foreignKey: "pinjam_id" });

export { Buku, Pinjam, DetailPinjam, Mahasiswas };
