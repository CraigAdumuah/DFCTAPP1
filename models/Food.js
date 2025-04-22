const mongoose = require('mongoose');

const foodSchema = new mongoose.Schema({
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    name: {
        type: String,
        required: true,
        trim: true
    },
    calories: {
        type: Number,
        required: true
    },
    imageUrl: {
        type: String,
        required: true
    },
    date: {
        type: Date,
        default: Date.now
    },
    mealType: {
        type: String,
        enum: ['breakfast', 'lunch', 'dinner', 'snack'],
        required: true
    },
    nutritionInfo: {
        protein: Number,
        carbs: Number,
        fat: Number,
        fiber: Number
    },
    portionSize: {
        value: Number,
        unit: String
    }
});

// Add indexes for better query performance
foodSchema.index({ user: 1, date: -1 });
foodSchema.index({ user: 1, mealType: 1 });

module.exports = mongoose.model('Food', foodSchema); 