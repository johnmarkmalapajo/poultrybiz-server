const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ── CORS ──
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL,
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
}));

app.use(express.json());

// ── API Version ──
const VERSION = process.env.API_VERSION || 'v1';
const BASE    = `/api/${VERSION}`;

// ── Routes ──
app.use(`${BASE}/auth`,             require('./routes/auth'));
app.use(`${BASE}/dashboard`,        require('./routes/dashboard'));
app.use(`${BASE}/flock`,            require('./routes/flock'));
app.use(`${BASE}/eggs`,             require('./routes/eggs'));
app.use(`${BASE}/health-records`,   require('./routes/healthRecord'));
app.use(`${BASE}/mortality-records`,require('./routes/mortalityRecord'));
app.use(`${BASE}/feed`,             require('./routes/feed'));
app.use(`${BASE}/feed-consumption`, require('./routes/feedConsumption'));
app.use(`${BASE}/equipment`,        require('./routes/equipment'));
app.use(`${BASE}/sales`,            require('./routes/salesRecord'));
app.use(`${BASE}/expenses`,         require('./routes/expensesrecord'));

// ── Health check ──
app.get('/', (req, res) => {
  res.json({
    message: 'PoultryBriz API is running!',
    version: VERSION,
    baseUrl: `/api/${VERSION}`,
  });
});

// ── 404 ──
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
  console.log(`📌 API Version: ${VERSION}`);
  console.log(`🔗 Base URL: http://localhost:${PORT}/api/${VERSION}`);
});