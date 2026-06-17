module.exports = (error, req, res, next) => {
  console.error(error);

  if (req.originalUrl.startsWith('/api') || req.originalUrl.startsWith('/auth')) {
    return res.status(error.statusCode || 500).json({
      success: false,
      message: error.message || 'Internal server error'
    });
  }

  res.status(500).render('pages/error', {
    title: 'Server Error',
    message: 'Something went wrong. Please try again later.'
  });
};
