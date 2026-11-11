const mongoose = require('mongoose');

const dataHewanSchema = new mongoose.Schema({
  jenisHewan: { type: String, required: [true, 'Jenis hewan wajib diisi'], trim: true },
  ras: { type: String, required: [true, 'Ras hewan wajib diisi'], trim: true },
}, { _id: false });

const pemeriksaanSchema = new mongoose.Schema({
  kodePemeriksaan: { type: String, required: [true, 'Kode pemeriksaan wajib diisi'], unique: true, trim: true },
  namaHewan: { type: String, required: [true, 'Nama hewan wajib diisi'], trim: true },
  umurBulan: { type: Number, required: [true, 'Umur hewan wajib diisi'], min: [0, 'Umur hewan tidak boleh kurang dari 0'] },
  statusPemeriksaan: { type: String, required: [true, 'Status pemeriksaan wajib diisi'], trim: true },
  dataHewan: { type: dataHewanSchema, required: [true, 'Data hewan wajib diisi'] },
  dokter: { type: mongoose.Schema.Types.ObjectId, ref: 'DokterHewan', required: [true, 'Dokter hewan wajib dipilih'] },
  createdAt: { type: Date, default: Date.now },
});

module.exports = mongoose.model('Pemeriksaan', pemeriksaanSchema);
