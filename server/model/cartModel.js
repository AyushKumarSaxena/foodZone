const mongoose = require('mongoose')

const cartSchema = new mongoose.Schema({
    cart:[
          {
            foodid:{
                type: String,
                required: true
            }
        }
    ]
})

module.exports = mongoose.model("Cart", cartSchema)