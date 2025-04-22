const router = require('express').Router();
const Transaction = require('../models/Transaction');
const auth = require('../middleware/auth');

// Get all transactions for a user
router.get('/', auth, async (req, res) => {
    try {
        const transactions = await Transaction.find({ user: req.user.userId })
            .sort({ date: -1 });
        res.json(transactions);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching transactions', error: error.message });
    }
});

// Add new transaction
router.post('/', auth, async (req, res) => {
    try {
        const { type, category, amount, description, date } = req.body;

        const transaction = new Transaction({
            user: req.user.userId,
            type,
            category,
            amount,
            description,
            date: date || Date.now()
        });

        await transaction.save();
        res.status(201).json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error creating transaction', error: error.message });
    }
});

// Update transaction
router.put('/:id', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findOne({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        const { type, category, amount, description, date } = req.body;
        
        transaction.type = type || transaction.type;
        transaction.category = category || transaction.category;
        transaction.amount = amount || transaction.amount;
        transaction.description = description || transaction.description;
        transaction.date = date || transaction.date;

        await transaction.save();
        res.json(transaction);
    } catch (error) {
        res.status(500).json({ message: 'Error updating transaction', error: error.message });
    }
});

// Delete transaction
router.delete('/:id', auth, async (req, res) => {
    try {
        const transaction = await Transaction.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!transaction) {
            return res.status(404).json({ message: 'Transaction not found' });
        }

        res.json({ message: 'Transaction deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting transaction', error: error.message });
    }
});

// Get transaction statistics
router.get('/stats', auth, async (req, res) => {
    try {
        const income = await Transaction.aggregate([
            { $match: { user: req.user.userId, type: 'income' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        const expenses = await Transaction.aggregate([
            { $match: { user: req.user.userId, type: 'expense' } },
            { $group: { _id: null, total: { $sum: '$amount' } } }
        ]);

        res.json({
            income: income[0]?.total || 0,
            expenses: expenses[0]?.total || 0,
            balance: (income[0]?.total || 0) - (expenses[0]?.total || 0)
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching statistics', error: error.message });
    }
});

module.exports = router; 