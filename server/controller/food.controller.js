const Food = require('../model/foodModel');


exports.getFood = async (req, res) => {
    try {
        const food = await Food.find();
        res.status(200).json({
            status: 'success',
            data: {
                food
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

// exports.checkOut = async (req, res) => {
