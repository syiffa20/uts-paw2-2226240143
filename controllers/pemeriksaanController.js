const Pemeriksaan = require('../models/pemeriksaanModel');
const { errorHttp } = require('../middlewares/errorHandler');

exports.create = async (req, res) => {
  const {
    kodePemeriksaan,
    namaHewan,
    umurBulan,
    statusPemeriksaan,
    dataHewan,
    dokter,
  } = req.body || {};

  const dataHewanYangDiterima = dataHewan && {
    jenisHewan: dataHewan.jenisHewan,
    ras: dataHewan.ras,
  };

  const pemeriksaan = await Pemeriksaan.create({
    kodePemeriksaan,
    namaHewan,
    umurBulan,
    statusPemeriksaan,
    dataHewan: dataHewanYangDiterima,
    dokter,
  });

  res.status(201).json(pemeriksaan);
};

exports.getAll = async (req, res) => {
  const filter = {};
  if (req.query.statusPemeriksaan !== undefined) {
    if (typeof req.query.statusPemeriksaan !== 'string') {
      throw errorHttp(400, 'Filter status pemeriksaan tidak valid');
    }
    filter.statusPemeriksaan = req.query.statusPemeriksaan;
  }

  const pemeriksaan = await Pemeriksaan.find(filter)
    .select('_id kodePemeriksaan namaHewan umurBulan statusPemeriksaan');

  res.json(pemeriksaan);
};

exports.getById = async (req, res) => {
  const pemeriksaan = await Pemeriksaan.findById(req.params.id)
    .populate('dokter', 'kode nama');

  if (!pemeriksaan) {
    throw errorHttp(404, 'Data pemeriksaan tidak ditemukan');
  }

  res.json(pemeriksaan);
};
