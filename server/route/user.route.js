const express = require('express')
const router = express.Router()

const { login, signup , getData } = require('../controller/usercontrol');
const { auth } = require('../middleware/userAuth');

router.post('/login', login) 
router.post('/signup', signup) 
router.get('/getData',getData)


module.exports = router;
