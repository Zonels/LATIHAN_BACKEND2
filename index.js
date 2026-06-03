import "dotenv/config";
import express from "express";
import db from "./config/db.config.js";
import cors from "cors";

import bukuRoute from "./routes/buku.routes.js";
import mahasiswas from "./routes/mahasiswa.routes.js";
import prodis from "./routes/prodi.routes.js";
import pinjam from "./routes/pinjams.routes.js";
import detail_pinjam from "./routes/detail_pinjam.routes.js";
import User from "./routes/user.routes.js";

const app = express();

try {
 await db.authenticate();
 console.log("Database terhubung");
} catch(error){
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
app.use('/api/user', User);

app.listen(5000,()=>{
 console.log("Server berjalan di http://localhost:5000");
});
