
function ItemCard({ item, addToCart }) {

  const { id, name, price,description,image } = item;
  return (
    
          <div className="bg-white rounded-lg shadow-lg overflow-hidden w-60">
      <img className="w-full  object-cover h-48 object-center" src={`https://images.dominos.co.in/${image}`}  />
      <div className="p-4">
        <h3 className="text-xl font-semibold text-gray-800">{name}</h3>
        <p className="text-gray-600 mt-2"> ₹{price}</p>
        <p className="text-gray-700 mt-2">{description.slice(0,30)} ...</p>
        <div className="mt-4">
          <button onClick={() => addToCart(item)} className="bg-red-700 text-white py-2 px-4 rounded-full font-semibold hover:bg-red-600 transition duration-300">Add to Cart</button>
        </div>
      </div>
    </div>
        
  )
}

export default ItemCard