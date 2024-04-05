const data = require("./data.json")
// console.log(data.data[0].data[0])
const fs = require("fs")

const arr = []
for(const item of data.data[6].data){
    const food = {
        name:item.name,
        description:item.description,
        price:item.defaultCrustPrice,
        image:item.image
    }
    arr.push(food)
}

fs.writeFileSync("PIZZA MANIA.json",JSON.stringify(arr,null,2))