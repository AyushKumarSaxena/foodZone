const express = require('express')
const router = express.Router()

const {getFood} = require('../controller/food.controller');
router.get('/get-foods', getFood) 



module.exports = router;
