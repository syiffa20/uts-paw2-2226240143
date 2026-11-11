require('dotenv').config();
const mongoose = require('mongoose');
const express = require('express');
const cors = require('cors');

const logger = require('./middlewares/logger');
const { notFoundHandler, errorHandler } = require('./middlewares/errorHandler');

const dokterHewanRoutes = require('./routes/dokterHewanRoutes');
const pemeriksaanRoutes = require('./routes/pemeriksaanRoutes');

const app = express();
const PORT = process.env.PORT || 3000;
const DB_URI = process.env.DB_URI;

// ---------- Middleware global ----------
app.use(logger);
app.use(cors({
  origin: process.env.CORS_ORIGIN,
  methods: ['GET', 'POST'],
}));
app.use(express.json());

// ---------- Route dasar ----------
app.get('/', (req, res) => {
  res.send('Server Express.js berjalan!');
});

// ---------- Route per modul ----------
app.use('/api/dokter-hewan', dokterHewanRoutes);
app.use('/api/pemeriksaan', pemeriksaanRoutes);

// ---------- Handler 404 dan error handler (paling bawah) ----------
app.use(notFoundHandler);
app.use(errorHandler);

mongoose.connect(DB_URI)
  .then(() => {
    console.log('Terhubung ke MongoDB');
    app.listen(PORT, () => console.log(`Server berjalan di http://localhost:${PORT}`));
  })
  .catch((err) => {
    console.error('Gagal terhubung:', err.message);
    process.exit(1);
  });
