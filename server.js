const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

// ── CORS — allow both local and deployed frontend ──
const allowedOrigins = [
  'http://localhost:5173',
  'http://localhost:3000',
  process.env.FRONTEND_URL, // set this in Render env vars
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

// ── Routes ──
app.use('/api/auth',             require('./routes/auth'));
app.use('/api/dashboard',        require('./routes/dashboard'));
app.use('/api/flock',            require('./routes/flock'));
app.use('/api/eggs',             require('./routes/eggs'));
app.use('/api/health-records',   require('./routes/healthRecord'));
app.use('/api/mortality-records',require('./routes/mortalityRecord'));
app.use('/api/feed',             require('./routes/feed'));
app.use('/api/feed-consumption', require('./routes/feedConsumption'));
app.use('/api/equipment',        require('./routes/equipment'));
app.use('/api/sales',            require('./routes/salesRecord'));
app.use('/api/expenses',         require('./routes/expensesRecord'));


app.get('/', (req, res) => {
  res.json({ message: '🐔 PoultryBriz API is running!' });
});

app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`🚀 Server running on port ${PORT}`);
});
