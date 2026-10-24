require('dotenv').config();
const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const { pool, testConnection } = require('./db.js');

// Routes
const articlesRouter = require('./routes/articleRoute.js');
const topicsRouter = require('./routes/topicsRoute');
const authorsRouter = require('./routes/authorRoute.js');
const authRouter = require('./routes/authroutes.js')
const authorWorks = require ('./routes/authorWorks.js')

const app = express();
const PORT = process.env.PORT || 5000;

// Security middleware
app.use(helmet());
app.use(cors({
  origin: 'http://localhost:5173',  // Vite default
  credentials: true
}));

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100 // limit each IP to 100 requests per windowMs
});
app.use(limiter);

// Body parsing
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Health check
app.get('/health', async (req, res) => {
  try {
    await testConnection();
    res.json({ status: 'OK', timestamp: new Date().toISOString() });
  } catch (err) {
    res.status(500).json({ error: 'DB connection failed' });
  }
});

// API routes
app.use('/articles', articlesRouter);
app.use('/topics', topicsRouter);
app.use('/authors', authorsRouter);
app.use('/auth',authRouter)
app.use('/me',authorWorks)


// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({ error: 'Route not found' });
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something went wrong!' });
});

app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📊 Health: http://localhost:${PORT}/health`);
  console.log(`📖 Articles: http://localhost:${PORT}/api/articles`);
});

