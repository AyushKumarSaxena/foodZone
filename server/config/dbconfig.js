const mongoose = require('mongoose')
require('dotenv').config()

const port = process.env.URI || 4000

exports.dbconnect = () => {
    mongoose.connect(port)
    .then(console.log("Databse Connected Successfully"))
    .catch((err)=>{
        console.log('Error in db connection')
        console.error(err.message)
        process.exit(1)
    })
} 