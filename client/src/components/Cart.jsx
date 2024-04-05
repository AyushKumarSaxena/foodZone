import React from 'react';
import {useNavigate} from 'react-router-dom'
import cookie from 'js-cookie'
function Cart({ cartItems, increaseQuantity, decreaseQuantity }) {
  // Calculate total price
  const totalPrice = cartItems.reduce((total, item) => total + (item.price * item.quantity), 0);
  const navigate = useNavigate()
  const handleCheckout = async () => {
    const username = cookie.get("username") || null;
    const userId = cookie.get("userId") || null;
    if(!username){
      alert("Please login to checkout")
      navigate("/login")
      return
    }
    const response = await fetch("http://localhost:3000/checkout",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({cartItems,totalPrice,user:userId})
    
    })
    const data = await response.json()
    console.log(data)
    navigate('/orders')
  }

  return (
    <div className="fixed top-0 right-0 h-full w-64 bg-white shadow p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold mb-4">Your Cart</h2>
      <ul className="max-h-48 overflow-y-auto">
        {cartItems.map((item, index) => (
          <li key={index} className="border-b border-gray-300 py-2 flex justify-between items-center">
            <div className="flex items-center">
              <img src={`https://images.dominos.co.in/${item.image}`} alt={item.name} className="w-10 h-10 object-cover mr-2" />
              <div>
                <span className="font-semibold">{item.name}</span>
                <p className="text-gray-500 text-sm">{item.description}</p>
              </div>
            </div>
            <div>
              <button onClick={() => decreaseQuantity(item)} className="bg-gray-200 px-2 py-1 rounded-full">-</button>
              <span className="mx-2">{item.quantity}</span>
              <button onClick={() => increaseQuantity(item)} className="bg-gray-200 px-2 py-1 rounded-full">+</button>
            </div>
          </li>
        ))}
      </ul>
      <div className="mt-4">
        <hr className="border-t border-gray-300" />
        <div className="flex justify-between mt-2">
          <span className="font-semibold">Total:</span>
          <span>₹{totalPrice.toFixed(2)}</span>
        </div>
        <button onClick={handleCheckout} className="bg-red-700 text-white py-2 px-4 mt-4 w-full rounded hover:bg-red-600">
          Checkout
        </button>
      </div>
    </div>
  );
}

export default Cart;
