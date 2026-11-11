require('dotenv').config({ quiet: true });
const mongoose = require('mongoose');
const DokterHewan = require('./models/dokterHewanModel');
const Pemeriksaan = require('./models/pemeriksaanModel');

const DATA_DOKTER = [
  { kode: 'DRH001', nama: 'Drh. Nadia Putri' },
  { kode: 'DRH002', nama: 'Drh. Raka Pratama' },
];

const DATA_PEMERIKSAAN = [
  {
    kodePemeriksaan: 'PM001',
    namaHewan: 'Milo',
    umurBulan: 18,
    statusPemeriksaan: 'Selesai',
    dataHewan: { jenisHewan: 'Kucing', ras: 'Persia' },
    kodeDokter: 'DRH001',
  },
  {
    kodePemeriksaan: 'PM002',
    namaHewan: 'Buddy',
    umurBulan: 30,
    statusPemeriksaan: 'Menunggu',
    dataHewan: { jenisHewan: 'Anjing', ras: 'Golden Retriever' },
    kodeDokter: 'DRH002',
  },
];

async function main() {
  await mongoose.connect(process.env.DB_URI);

  try {
    const dokter = await Promise.all(DATA_DOKTER.map((data) => DokterHewan.findOneAndUpdate(
      { kode: data.kode },
      { $set: { nama: data.nama } },
      { upsert: true, returnDocument: 'after', runValidators: true }
    )));

    const dokterByKode = {};
    dokter.forEach((data) => {
      dokterByKode[data.kode] = data._id;
    });

    const pemeriksaan = await Promise.all(DATA_PEMERIKSAAN.map(({ kodeDokter, ...data }) => (
      Pemeriksaan.findOneAndUpdate(
        { kodePemeriksaan: data.kodePemeriksaan },
        { $set: { ...data, dokter: dokterByKode[kodeDokter] } },
        { upsert: true, returnDocument: 'after', runValidators: true }
      )
    )));

    console.log(`Seed selesai: ${dokter.length} dokter, ${pemeriksaan.length} pemeriksaan`);
  } finally {
    await mongoose.disconnect();
  }
}

main().catch((err) => {
  console.error(err.message);
  process.exit(1);
});
