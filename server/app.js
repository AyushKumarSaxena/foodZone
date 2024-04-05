const express = require('express')
const app = express()
const cookieParser = require('cookie-parser')
const route = require('./route/user.route')
const foodRoute = require('./route/food.route')
const orderRoute = require('./route/order.route')
const cors = require("cors")

app.use(cors({
    origin:"*",
    credentials: true,
}))
require('dotenv').config()
const port = process.env.PORT

require('./config/dbconfig').dbconnect()

app.use(express.json())
app.use(cookieParser())
app.set('view engine', 'ejs')
app.use(foodRoute)
app.use(orderRoute)
app.use('/', route)
app.get('/', (req, res) => {

    res.send('Hello World')
})
app.listen(port, () => {
    console.log(`Server started at http://localhost:${port}`)
})
