const crypto = require('crypto');

const base64UrlEncode = (value) =>
  Buffer.from(JSON.stringify(value)).toString('base64url');

const sign = (input) =>
  crypto
    .createHmac('sha256', process.env.JWT_SECRET || 'job-portal-dev-secret')
    .update(input)
    .digest('base64url');

const parseDuration = (duration) => {
  const match = /^(\d+)([hdm])$/.exec(duration || '7d');

  if (!match) {
    return 7 * 24 * 60 * 60;
  }

  const value = Number(match[1]);
  const unit = match[2];

  if (unit === 'h') return value * 60 * 60;
  if (unit === 'm') return value * 60;
  return value * 24 * 60 * 60;
};

const createToken = (payload) => {
  const now = Math.floor(Date.now() / 1000);
  const header = { alg: 'HS256', typ: 'JWT' };
  const body = {
    ...payload,
    iat: now,
    exp: now + parseDuration(process.env.JWT_EXPIRES_IN),
  };

  const unsignedToken = `${base64UrlEncode(header)}.${base64UrlEncode(body)}`;
  return `${unsignedToken}.${sign(unsignedToken)}`;
};

const verifyToken = (token) => {
  const parts = token?.split('.');

  if (!parts || parts.length !== 3) {
    throw Object.assign(new Error('Invalid authentication token'), {
      statusCode: 401,
    });
  }

  const [encodedHeader, encodedPayload, signature] = parts;
  const unsignedToken = `${encodedHeader}.${encodedPayload}`;
  const expectedSignature = sign(unsignedToken);

  if (signature.length !== expectedSignature.length) {
    throw Object.assign(new Error('Invalid authentication token'), {
      statusCode: 401,
    });
  }

  if (
    !crypto.timingSafeEqual(
      Buffer.from(signature),
      Buffer.from(expectedSignature),
    )
  ) {
    throw Object.assign(new Error('Invalid authentication token'), {
      statusCode: 401,
    });
  }

  const payload = JSON.parse(Buffer.from(encodedPayload, 'base64url').toString());

  if (payload.exp && payload.exp < Math.floor(Date.now() / 1000)) {
    throw Object.assign(new Error('Authentication token expired'), {
      statusCode: 401,
    });
  }

  return payload;
};

module.exports = {
  createToken,
  verifyToken,
};
