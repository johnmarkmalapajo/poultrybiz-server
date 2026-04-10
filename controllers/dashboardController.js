const Flock          = require('../models/Flock');
const EggHarvest     = require('../models/EggHarvest');
const SalesRecord    = require('../models/SalesRecord');
const ExpensesRecord = require('../models/ExpensesRecord');
const FeedStock      = require('../models/FeedStock');
const MortalityRecord= require('../models/MortalityRecord');

const getDashboard = async (req, res) => {
  try {
    const isAdmin = req.user.role === 'Admin';
    const now     = new Date();

    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const startOfToday = new Date();
    startOfToday.setHours(0, 0, 0, 0);

    // ── 1. FLOCK STATS — all flocks (centralized) ──
    const flocks = await Flock.find({ isActive: true });
    const currentFlockSize = flocks.reduce((sum, f) => sum + (f.currentQty || 0), 0);
    const avgProductiveRate = flocks.length
      ? (flocks.reduce((sum, f) => sum + (f.productiveRate || 0), 0) / flocks.length).toFixed(1)
      : 0;

    // ── 2. MORTALITY — all records this month ──
    const mortalityRecords = await MortalityRecord.find({
      date: { $gte: startOfMonth },
    });
    const totalDeadThisMonth = mortalityRecords.reduce(
      (sum, m) => sum + (m.numberOfDeadHens || 0), 0
    );
    const mortalityRate = currentFlockSize > 0
      ? ((totalDeadThisMonth / (currentFlockSize + totalDeadThisMonth)) * 100).toFixed(1)
      : 0;

    // ── 3. EGGS TODAY — all harvests ──
    const todayHarvests = await EggHarvest.find({
      date: { $gte: startOfToday },
    });
    const totalEggsToday = todayHarvests.reduce((sum, h) => sum + (h.totalEggs || 0), 0);

    // ── 4. EGG SIZE DISTRIBUTION (this month) ──
    const monthlyHarvests = await EggHarvest.find({
      date: { $gte: startOfMonth },
    });
    const totalMonthEggs = monthlyHarvests.reduce((sum, h) => sum + (h.totalEggs || 0), 0);
    const sizeKeys = ['large', 'extraLarge', 'medium', 'jumbo', 'small', 'peewee', 'crack'];
    const eggSizeDistribution = {};
    sizeKeys.forEach((key) => {
      const total = monthlyHarvests.reduce((sum, h) => sum + (h.eggSizes?.[key] || 0), 0);
      eggSizeDistribution[key] = totalMonthEggs > 0
        ? ((total / totalMonthEggs) * 100).toFixed(1)
        : 0;
    });

    // ── 5. DAILY EGG TREND (last 7 days) ──
    const last7Days = [];
    for (let i = 6; i >= 0; i--) {
      const dayStart = new Date();
      dayStart.setDate(dayStart.getDate() - i);
      dayStart.setHours(0, 0, 0, 0);
      const dayEnd = new Date(dayStart);
      dayEnd.setDate(dayEnd.getDate() + 1);
      const dayHarvests = await EggHarvest.find({
        date: { $gte: dayStart, $lt: dayEnd },
      });
      const count = dayHarvests.reduce((sum, h) => sum + (h.totalEggs || 0), 0);
      last7Days.push({ date: dayStart.toISOString().split('T')[0], count });
    }

    // ── 6. FINANCIALS — Admin only ──
    let salesRevenue  = 0;
    let totalExpenses = 0;
    let netProfitLoss = 0;

    if (isAdmin) {
      const salesRecords = await SalesRecord.find({
        date: { $gte: startOfMonth },
      });
      salesRevenue = salesRecords.reduce((sum, s) => sum + (s.totalAmount || 0), 0);

      const expensesRecords = await ExpensesRecord.find({
        expenseDate: { $gte: startOfMonth },
      });
      totalExpenses = expensesRecords.reduce((sum, e) => sum + (e.amount || 0), 0);
      netProfitLoss = salesRevenue - totalExpenses;
    }

    // ── 7. FEED STOCK — all ──
    const feedStocks  = await FeedStock.find({});
    const totalFeedKg = feedStocks.reduce((sum, f) => sum + (f.quantityKg || 0), 0);

    // ── 8. ALERTS ──
    const alerts = [];
    if (parseFloat(mortalityRate) > 5) {
      alerts.push({ type: 'danger', message: 'High Mortality' });
    }
    const hasLowFeed = feedStocks.some((f) => f.quantityKg < (f.lowStockThreshold || 50));
    if (hasLowFeed || totalFeedKg === 0) {
      alerts.push({ type: 'warning', message: 'Low Feed' });
    }

    res.status(200).json({
      success: true,
      data: {
        flock: {
          currentFlockSize,
          productiveRate: parseFloat(avgProductiveRate),
          mortalityRate:  parseFloat(mortalityRate),
        },
        eggs: {
          totalEggsToday,
          sizeDistribution: eggSizeDistribution,
          dailyTrend:       last7Days,
        },
        financials: {
          salesRevenue,
          totalExpenses,
          netProfitLoss,
        },
        feedStockKg: totalFeedKg,
        tasks:  [],
        alerts,
      },
    });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

module.exports = { getDashboard };
