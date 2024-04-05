const express = require('express')
const router = express.Router()

const {checkOut,getAllOrders,changeOrderStatus,getOrderByUserId,AddFeedback,getAllFeebacks} = require('../controller/Order.controller');

router.post('/checkout', checkOut)
router.get('/orders', getAllOrders) 
router.post('/update-status', changeOrderStatus) 
router.post('/get-user-order', getOrderByUserId) 
router.post('/add-feeback', AddFeedback) 
router.get('/get-feedback', getAllFeebacks) 



module.exports = router;
