const router = require('express').Router();
const Food = require('../models/Food');
const auth = require('../middleware/auth');
const multer = require('multer');
const path = require('path');
const axios = require('axios');

// Configure multer for image upload
const storage = multer.diskStorage({
    destination: './public/uploads/',
    filename: function(req, file, cb) {
        cb(null, 'food-' + Date.now() + path.extname(file.originalname));
    }
});

const upload = multer({
    storage: storage,
    limits: { fileSize: 10000000 }, // 10MB limit
    fileFilter: function(req, file, cb) {
        checkFileType(file, cb);
    }
});

// Check file type
function checkFileType(file, cb) {
    const filetypes = /jpeg|jpg|png/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
        return cb(null, true);
    } else {
        cb('Error: Images Only!');
    }
}

// Upload food image and get calorie information
router.post('/upload', auth, upload.single('image'), async (req, res) => {
    try {
        if (!req.file) {
            return res.status(400).json({ message: 'No image uploaded' });
        }

        // The image file path that would be accessible from the frontend
        const imageUrl = `/uploads/${req.file.filename}`;

        // Here you would integrate with a food recognition API
        // This is a placeholder for the API call
        // const foodData = await recognizeFoodFromImage(req.file.path);
        
        // For demonstration, returning mock data
        // In production, this would come from the AI/ML API
        const mockFoodData = {
            name: 'Sample Food',
            calories: 250,
            nutritionInfo: {
                protein: 10,
                carbs: 30,
                fat: 12,
                fiber: 4
            }
        };

        const food = new Food({
            user: req.user.userId,
            name: mockFoodData.name,
            calories: mockFoodData.calories,
            imageUrl: imageUrl,
            mealType: req.body.mealType || 'snack',
            nutritionInfo: mockFoodData.nutritionInfo,
            portionSize: {
                value: 1,
                unit: 'serving'
            }
        });

        await food.save();
        res.status(201).json(food);
    } catch (error) {
        res.status(500).json({ message: 'Error processing food image', error: error.message });
    }
});

// Get all food entries for a user
router.get('/', auth, async (req, res) => {
    try {
        const { startDate, endDate, mealType } = req.query;
        let query = { user: req.user.userId };

        if (startDate && endDate) {
            query.date = {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            };
        }

        if (mealType) {
            query.mealType = mealType;
        }

        const foods = await Food.find(query)
            .sort({ date: -1 });
        res.json(foods);
    } catch (error) {
        res.status(500).json({ message: 'Error fetching food entries', error: error.message });
    }
});

// Get daily calorie summary
router.get('/summary/daily', auth, async (req, res) => {
    try {
        const today = new Date();
        today.setHours(0, 0, 0, 0);
        
        const summary = await Food.aggregate([
            {
                $match: {
                    user: req.user.userId,
                    date: {
                        $gte: today,
                        $lt: new Date(today.getTime() + 24 * 60 * 60 * 1000)
                    }
                }
            },
            {
                $group: {
                    _id: '$mealType',
                    totalCalories: { $sum: '$calories' },
                    count: { $sum: 1 }
                }
            }
        ]);

        const totalCalories = summary.reduce((acc, meal) => acc + meal.totalCalories, 0);

        res.json({
            date: today,
            meals: summary,
            totalCalories
        });
    } catch (error) {
        res.status(500).json({ message: 'Error fetching daily summary', error: error.message });
    }
});

// Delete food entry
router.delete('/:id', auth, async (req, res) => {
    try {
        const food = await Food.findOneAndDelete({
            _id: req.params.id,
            user: req.user.userId
        });

        if (!food) {
            return res.status(404).json({ message: 'Food entry not found' });
        }

        res.json({ message: 'Food entry deleted successfully' });
    } catch (error) {
        res.status(500).json({ message: 'Error deleting food entry', error: error.message });
    }
});

module.exports = router; 