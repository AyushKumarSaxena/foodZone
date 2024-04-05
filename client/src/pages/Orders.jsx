import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import cookie from 'js-cookie';
function Orders() {
  const [orders, setOrders] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedbackSubmitted, setFeedbackSubmitted] = useState(false);
  const [selectedOrderId, setSelectedOrderId] = useState(null);
  const [feedbackText, setFeedbackText] = useState("");
  const userId = cookie.get("userId") || null;
  useEffect(() => {
    // Fetch orders data from an API or any other data source
    // Example:
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // Simulated orders data
    const data = await fetch("http://localhost:3000/get-user-order",{
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ userId })
    })
    const orders = await data.json()
    console.log(orders)
    setOrders(orders.data.orders)
    // const dummyOrders = [
    //   { id: 1, total: 25.99, date: "2024-04-01", status: "Delivered" },
    //   { id: 2, total: 19.99, date: "2024-03-28", status: "Pending" },
    //   { id: 3, total: 32.99, date: "2024-03-25", status: "On the way" },
    // ];
    // setOrders(dummyOrders);
  };

  const handleFeedbackButtonClick = (orderId) => {
    setSelectedOrderId(orderId);
    setShowModal(true);
  };

  const handleSubmitFeedback = () => {
    // Perform submission of feedback here
    // For demonstration purposes, just setting feedbackSubmitted to true
    setFeedbackSubmitted(true);
    const updateFeedBack = async () => {
      const data = await fetch(`http://localhost:3000/add-feeback`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({ feedback:feedbackText,orderId:selectedOrderId })
      })
      const response = await data.json()
      console.log(response)
    }
    updateFeedBack()
    // Close the modal
    setShowModal(false);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <header className="bg-red-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Welcome to Domino's Pizza</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/orders" className="hover:text-gray-300">Orders</Link></li>
              {/* Add more links as needed */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Order History */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Order History</h1>
        {orders.length === 0 ? (
          <p>No orders found.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
            {orders.map(order => (
              <div key={order.orderId} className="bg-white rounded shadow p-4">
                <h2 className="text-xl font-semibold mb-2">Order ID: {order.orderId.split("-")[0]}...</h2>
                <p className="text-gray-600 mb-2">Total: ₹{order.totalPrice.toFixed(2)}</p>
                <p className="text-gray-600 mb-2">Date: {order.timestamp.split("T")[0]}</p>
                <p className={`text-sm font-semibold ${
                  order.status === "pending" ? "text-yellow-500" :
                  order.status === "on the way" ? "text-blue-500" :
                  order.status === "delivered" ? "text-green-500" : ""
                }`}>Status: {order.status}</p>
                {(order.status === "delivered" && !feedbackSubmitted) && !order.feedback ? (
                  <button className="bg-blue-500 text-white py-2 px-4 mt-2 rounded" onClick={() => handleFeedbackButtonClick(order.orderId)}>
                    Give Feedback
                  </button>
                ) : feedbackSubmitted && selectedOrderId === order.orderId ? (
                  <p className="text-green-500">Feedback submitted!</p>
                ) : null}
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Feedback Modal */}
      {showModal && (
        <div className="fixed inset-0 bg-gray-700 bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white rounded shadow p-4">
            <h2 className="text-lg font-semibold mb-2">Provide Feedback for Order ID: {selectedOrderId}</h2>
            <textarea className="w-full h-24 border border-gray-300 rounded mb-2" value={feedbackText} onChange={(e)=>{setFeedbackText(e.target.value)}} placeholder="Enter your feedback here"></textarea>
            <div className="flex justify-end">
              <button className="bg-blue-500 text-white py-2 px-4 rounded mr-2" onClick={() => setShowModal(false)}>Cancel</button>
              <button className="bg-green-500 text-white py-2 px-4 rounded" onClick={handleSubmitFeedback}>Submit</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}

export default Orders;
