const express = require('express');
const path = require('path');
require('dotenv').config();

const jobRoutes = require('./routes/jobRoutes');
const apiJobRoutes = require('./routes/apiJobRoutes');
const userRoutes = require('./routes/userRoutes');
const authRoutes = require('./routes/authRoutes');
const applicationRoutes = require('./routes/applicationRoutes');
const jobViewController = require('./controllers/jobViewController');
const errorHandler = require('./middleware/errorHandler');
const logger = require('./middleware/logger');

const app = express();
const PORT = process.env.PORT || 3000;

app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));

app.use(logger);

app.use((req, res, next) => {
  const allowedOrigins = [
    process.env.CLIENT_URL,
    'http://127.0.0.1:5173',
    'http://localhost:5173', 
    'https://job-portal-five-orpin-70.vercel.app/'
  ].filter(Boolean);

  const requestOrigin = req.headers.origin;

  if (allowedOrigins.includes(requestOrigin)) {
    res.header('Access-Control-Allow-Origin', requestOrigin);
  }

  res.header('Vary', 'Origin');
  res.header('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, PATCH, DELETE, OPTIONS');

  if (req.method === 'OPTIONS') {
    return res.sendStatus(204);
  }

  next();
});

app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));

app.get('/', jobViewController.renderHomePage);

app.get('/about', (req, res) => {
  res.render('pages/about', { title: 'About' });
});

app.get('/contact', (req, res) => {
  res.render('pages/contact', { title: 'Contact' });
});

app.use('/jobs', jobRoutes);
app.use('/auth', authRoutes);
app.use('/api/jobs', apiJobRoutes);
app.use('/users', userRoutes);
app.use('/applications', applicationRoutes);

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`Server running at http://localhost:${PORT}`);
});