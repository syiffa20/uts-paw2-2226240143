function errorHttp(status, message) {
  const err = new Error(message);
  err.status = status;
  return err;
}

function notFoundHandler(req, res) {
  res.status(404).json({ message: `Rute ${req.method} ${req.originalUrl} tidak ditemukan` });
}

function errorHandler(err, req, res, next) {
  if (res.headersSent) {
    return next(err);
  }

  if (err.type === 'entity.parse.failed' || (err instanceof SyntaxError && err.status === 400 && 'body' in err)) {
    return res.status(400).json({ message: 'Format JSON tidak valid' });
  }

  if (err.name === 'CastError') {
    return res.status(400).json({ message: 'ID tidak valid' });
  }

  if (err.name === 'ValidationError') {
    return res.status(400).json({
      message: 'Data tidak valid',
      detail: Object.values(err.errors).map((item) => item.message),
    });
  }

  if (err.code === 11000) {
    return res.status(409).json({ message: 'Nilai unik sudah digunakan' });
  }

  const status = err.status || 500;
  if (status === 500) {
    console.error(err.stack);
    return res.status(500).json({ message: 'Terjadi kesalahan pada server' });
  }

  res.status(status).json({ message: err.message });
}

module.exports = { errorHttp, notFoundHandler, errorHandler };
