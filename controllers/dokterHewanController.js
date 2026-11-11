const DokterHewan = require('../models/dokterHewanModel');

exports.create = async (req, res) => {
  const { kode, nama } = req.body || {};
  const dokter = await DokterHewan.create({ kode, nama });
  res.status(201).json(dokter);
};

exports.getAll = async (req, res) => {
  res.json(await DokterHewan.find());
};
