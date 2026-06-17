const { verifyToken } = require('../utils/jwt');

exports.requireAuth = (req, res, next) => {
  try {
    const authHeader = req.headers.authorization || '';
    const [scheme, token] = authHeader.split(' ');

    if (scheme !== 'Bearer' || !token) {
      return res.status(401).json({
        success: false,
        message: 'Authorization token is required',
      });
    }

    req.user = verifyToken(token);
    return next();
  } catch (error) {
    return next(error);
  }
};
