const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');

dotenv.config();
connectDB();

const app = express();

app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));
app.use(express.json());

// ── Auth & Dashboard ──
app.use('/api/auth',      require('./routes/auth'));
app.use('/api/dashboard', require('./routes/dashboard'));

// ── Records ──
app.use('/api/flock',            require('./routes/flock'));
app.use('/api/eggs',             require('./routes/eggs'));
app.use('/api/health-records',   require('./routes/healthRecord'));
app.use('/api/mortality-records',require('./routes/mortalityRecord'));

// ── Inventory ──
app.use('/api/feed',              require('./routes/feed'));
app.use('/api/feed-consumption',  require('./routes/feedConsumption'));
app.use('/api/equipment',         require('./routes/equipment'));

// ── Sales & Transactions ──
app.use('/api/sales',             require('./routes/salesRecord'));
app.use('/api/expenses',          require('./routes/expensesRecord'));


// Health check
app.get('/', (req, res) => {
  res.json({ message: 'PoultryBriz API is running!' });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ success: false, message: 'Route not found' });
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
