import "dotenv/config";
import express from "express";
import db from "./config/db.config.js";
import cors from "cors";

import "./models/user.model.js";
import "./models/buku.model.js";
import "./models/mahasiswa.model.js";
import "./models/pinjams.model.js";
import "./models/detail_pinjam.model.js";

import bukuRoute from "./routes/buku.routes.js";
import mahasiswas from "./routes/mahasiswa.routes.js";
import prodis from "./routes/prodi.routes.js";
import pinjam from "./routes/pinjams.routes.js";
import detail_pinjam from "./routes/detail_pinjam.routes.js";
import user from "./routes/user.routes.js";

const app = express();

try {
  await db.authenticate();
  console.log("Database terhubung");

  await db.sync();
  console.log("Database sync");
} catch (error) {
  console.log(error);
}

app.use(cors());
app.use(express.json());
app.use(express.urlencoded({extended:true}));

app.use('/api/buku', bukuRoute);
app.use('/api/siswa', mahasiswas);
app.use('/api/prodi', prodis);
app.use('/api/pinjam', pinjam);
app.use('/api/detail_pinjam', detail_pinjam);
app.use('/api/user', user);

app.listen(5000,()=>{
 console.log("Server berjalan di http://localhost:5000");
});
