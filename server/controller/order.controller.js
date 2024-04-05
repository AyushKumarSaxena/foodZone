
const Order = require('../model/orderModel');

exports.checkOut = async (req, res) => {
    try {
        const order = await Order.create(req.body);
        res.status(201).json({
            status: 'success',
            data: {
                order
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getAllOrders = async (req, res) => {
    try {
        const orders = await Order.find().populate('user');
        res.status(200).json({
            status: 'success',
            data: {
                orders
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.changeOrderStatus = async (req, res) => {
    try {
        const {_id} = await Order.findOne({orderId:req.body.orderId})
        const order = await Order.findByIdAndUpdate(_id, { status: req.body.newStatus }, { new: true });
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getOrderByUserId = async (req, res) => {
    try {
        console.log(req.body.userId)
        const orders = await Order.find({ user: req.body.userId }).populate('user');
        res.status(200).json({
            status: 'success',
            data: {
                orders
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.AddFeedback = async (req, res) => {
    try {
        const {_id} = await Order.findOne({orderId:req.body.orderId})
        const order = await Order.findByIdAndUpdate(_id, { feedback: req.body.feedback }, { new: true });
        res.status(200).json({
            status: 'success',
            data: {
                order
            }
        })
    }
    catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}

exports.getAllFeebacks = async (req, res) => {
    try {
        const orders = await Order.find({ feedback: { $ne: null } });
        res.status(200).json({
            status: 'success',
            data: {
                orders
            }
        })
    } catch (err) {
        res.status(400).json({
            status: 'fail',
            message: err
        })
    }
}