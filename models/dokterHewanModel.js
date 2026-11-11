const mongoose = require('mongoose');

const dokterHewanSchema = new mongoose.Schema({
  kode: { type: String, required: [true, 'Kode dokter wajib diisi'], unique: true, trim: true, uppercase: true },
  nama: { type: String, required: [true, 'Nama dokter wajib diisi'], trim: true },
});

module.exports = mongoose.model('DokterHewan', dokterHewanSchema);
