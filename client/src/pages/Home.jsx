import React, { useState,useEffect } from 'react';
import ItemCard from "../components/ItemCard";
import Cart from "../components/Cart";
import cookie from 'js-cookie';
import {useNavigate} from 'react-router-dom'

function Home() {

  const [food, setFood] = useState([])
  async function getFood(){
    const response = await fetch("http://localhost:3000/get-foods")
    const data = await response.json()
    setFood(data.data.food)
  }
  useEffect(() => {
    getFood()
  }, [])
  
  const [cartItems, setCartItems] = useState([]);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const username = cookie.get("username") || null;
  const addToCart = (item) => {
    const isItemInCart = cartItems.find((cartItem) => cartItem._id === item._id);
    if (isItemInCart) {
      const updatedCartItems = cartItems.map((cartItem) =>
        cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
      );
      setCartItems(updatedCartItems);
    } else {
      setCartItems([...cartItems, { ...item, quantity: 1 }]);
    }
  };

  const increaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity + 1 } : cartItem
    );
    setCartItems(updatedCartItems);
  };

  const decreaseQuantity = (item) => {
    const updatedCartItems = cartItems.map((cartItem) =>
      cartItem._id === item._id ? { ...cartItem, quantity: cartItem.quantity - 1 } : cartItem
    ).filter((cartItem) => cartItem.quantity > 0); // Remove items with quantity 0
    setCartItems(updatedCartItems);
  };


  const toggleCart = () => {
    setIsCartOpen(!isCartOpen);
  };

  const handleClick = () => {
    console.log('Button clicked!');
    cookie.remove('token');
        cookie.remove('username');
        cookie.remove('userId');
        // Optionally, redirect to login page after logout
        useNavigate('/');
  };

  return (
    <>
      <div className="bg-gray-100">
        <header className="bg-orange-700 text-white py-4">
          <div className="container mx-auto flex justify-between items-center px-4">
            <h1 className="text-2xl font-bold">Welcome to foodZone</h1>
            <nav>
              <ul className="flex space-x-4">
                <li><a href="#menu" className="hover:text-gray-300">Menu</a></li>
                {username ? (<>
                  <li><a href="/profile" className="hover:text-gray-300">Hello, {username}</a></li>
                  <li><a href="/orders" className="hover:text-gray-300">Orders</a></li>
                  <li><button onClick={handleClick}>LogOut</button></li>
                </>                 
                ) : (
                  <li><a href="/signup" className="hover:text-gray-300">Signup</a></li>
                )}
              </ul>
            </nav>
          </div>
        </header>

        <section className="bg-green-700 text-white py-20">
          <div className="container mx-auto px-4 text-center">
            <h2 className="text-4xl font-bold mb-4">Order Delicious Pizza Online</h2>
            <p className="text-lg mb-8">Choose from our wide range of pizzas and enjoy hot and fresh delivery to your doorstep!</p>
            <a href="#menu" className="bg-white text-red-700 py-2 px-6 rounded-full font-semibold text-lg hover:bg-gray-200 transition duration-300">Order Now</a>
          </div>
        </section>
        
        <section id="menu" className="py-20 min-h-screen">
          <div className="container mx-auto px-4">
            <h2 className="text-3xl font-bold mb-8 text-center">Our Menu</h2>
            <div className="container mx-auto px-4 grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {food.map((item) => (
              <ItemCard key={item._id} item={item} addToCart={addToCart} />
            ))}
            </div>
          </div>
        </section>

        {isCartOpen && <Cart cartItems={cartItems} increaseQuantity={increaseQuantity} decreaseQuantity={decreaseQuantity} />}
        <button onClick={toggleCart} className="fixed bottom-4 right-4 bg-red-700 text-white py-2 px-4 rounded-full hover:bg-red-600 flex items-center">
        <span>{isCartOpen ? 'Close Cart' : 'Open Cart'}</span>
        {isCartOpen ? (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
         </svg>
         ) : (
          <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 ml-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
         <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 15l7-7 7 7" />
         </svg>
         )}
        </button>

        <footer className="bg-orange-700 text-white py-8">
          <div className="container mx-auto text-center">
            <p>Thanks for visiting foodZone !!!</p>
          </div>
        </footer>
      </div>
    </>
  )
}

export default Home;
