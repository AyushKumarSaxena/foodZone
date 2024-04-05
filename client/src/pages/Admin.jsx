import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function AdminPage() {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    // Fetch orders data from an API or any other data source
    // Example:
    fetchOrders();
  }, []);

  const fetchOrders = async () => {
    // Simulated orders data
    const data = await fetch("http://localhost:3000/orders")
    const orders = await data.json()
    console.log(orders)
    setOrders(orders.data.orders)
    
  };

  const handleStatusChange = (orderId, currentStatus) => {
    let newStatus;
    switch (currentStatus) {
      case "pending":
        newStatus = "on the way";
        break;
      case "on the way":
        newStatus = "delivered";
        break;
      default:
        // If the current status is "Delivered", do not change status
        return;
    }
    
    // Update the status of the order in the backend
    // For demonstration purposes, updating the status locally
    setOrders(prevOrders =>
      prevOrders.map(order =>
        order.orderId === orderId ? { ...order, status: newStatus } : order
      )
    );
    const updateStatus = async () => {
      const response = await fetch("http://localhost:3000/update-status",{
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({orderId,newStatus})
      })
      const data = await response.json()
      console.log(data)
    }
    updateStatus()
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <header className="bg-red-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Admin Dashboard</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/admin/feedback" className="hover:text-gray-300">Feedback</Link></li>
              {/* Add more links as needed */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Order Cards */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Orders</h1>
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
          {orders.map(order => (
            <div key={order.orderId} className="bg-white rounded shadow p-4">
              <h2 className="text-xl font-semibold mb-2">Order ID: {order.orderId.split("-")[0]}...</h2>
              <p className="text-gray-600 mb-2">User Name: {order.user?.name}</p>
              <p className="text-gray-600 mb-2">Total: ₹{order.totalPrice.toFixed(2)}</p>
              <p className="text-gray-600 mb-2">Date: {order.timestamp.split("T")[0]}</p>
              <p className="text-gray-600 mb-2">Status: {order.status}</p>
              {order.status !== "Delivered" && (
                <div>
                  <button className="bg-blue-500 text-white py-1 px-2 rounded mr-1" onClick={() => handleStatusChange(order.orderId, order.status)}>
                    {order.status === "pending" ? "on the way" : "delivered"}
                  </button>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default AdminPage;
