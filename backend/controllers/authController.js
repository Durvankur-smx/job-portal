const crypto = require('crypto');
const db = require('../config/db');
const { createToken } = require('../utils/jwt');

const hashPassword = (password, salt = crypto.randomBytes(16).toString('hex')) => {
  const hash = crypto.scryptSync(password, salt, 64).toString('hex');
  return `${salt}:${hash}`;
};

const verifyPassword = (password, storedPassword) => {
  if (!storedPassword) {
    return false;
  }

  if (!storedPassword.includes(':')) {
    return password === storedPassword;
  }

  const [salt, storedHash] = storedPassword.split(':');
  const hashedPassword = hashPassword(password, salt).split(':')[1];

  if (storedHash.length !== hashedPassword.length) {
    return false;
  }

  return crypto.timingSafeEqual(
    Buffer.from(storedHash, 'hex'),
    Buffer.from(hashedPassword, 'hex'),
  );
};

const toAuthResponse = (user) => {
  const safeUser = {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role || 'job_seeker',
  };

  return {
    token: createToken(safeUser),
    user: safeUser,
  };
};

const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Email and password are required',
      });
    }

    const [users] = await db.query('SELECT * FROM users WHERE email = ?', [
      email,
    ]);

    const user = users[0];
    const storedPassword = user?.password_hash || user?.password;

    if (!user || !verifyPassword(password, storedPassword)) {
      return res.status(401).json({
        success: false,
        message: 'Invalid email or password',
      });
    }

    return res.status(200).json({
      success: true,
      message: 'Logged in successfully',
      data: toAuthResponse(user),
    });
  } catch (error) {
    return next(error);
  }
};

const register = async (req, res, next) => {
  try {
    const { name, email, password, role = 'job_seeker' } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({
        success: false,
        message: 'Name, email, and password are required',
      });
    }

    const [existingUsers] = await db.query('SELECT id FROM users WHERE email = ?', [
      email,
    ]);

    if (existingUsers.length) {
      return res.status(409).json({
        success: false,
        message: 'A user with this email already exists',
      });
    }

    const hashedPassword = hashPassword(password);
    let result;

    try {
      [result] = await db.query(
        'INSERT INTO users (name, email, password_hash, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role],
      );
    } catch (error) {
      if (error.code !== 'ER_BAD_FIELD_ERROR') {
        throw error;
      }

      [result] = await db.query(
        'INSERT INTO users (name, email, password, role) VALUES (?, ?, ?, ?)',
        [name, email, hashedPassword, role],
      );
    }

    const user = {
      id: result.insertId,
      name,
      email,
      role,
    };

    return res.status(201).json({
      success: true,
      message: 'Account created successfully',
      data: toAuthResponse(user),
    });
  } catch (error) {
    return next(error);
  }
};

module.exports = {
  login,
  register,
};
