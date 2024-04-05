import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

function FeedbackPage() {
  const [feedbacks, setFeedbacks] = useState([]);

  useEffect(() => {
    // Fetch feedbacks data from an API or any other data source
    // Example:
    fetchFeedbacks();
  }, []);

  const fetchFeedbacks = async () => {
    // Simulated feedbacks data
    const feedbacks = await fetch("http://localhost:3000/get-feedback")
    const data = await feedbacks.json()
    console.log(data)
    setFeedbacks(data.data.orders)
    // const dummyFeedbacks = [
    //   { id: 1, userId: 1, content: "Great service!", date: "2024-04-05" },
    //   { id: 2, userId: 2, content: "The pizza was amazing!", date: "2024-04-04" },
    //   { id: 3, userId: 3, content: "Fast delivery, will order again.", date: "2024-04-03" },
    // ];
    // setFeedbacks(dummyFeedbacks);
  };

  return (
    <div className="bg-gray-100 min-h-screen">
      {/* Navbar */}
      <header className="bg-red-700 text-white py-4">
        <div className="container mx-auto flex justify-between items-center px-4">
          <h1 className="text-2xl font-bold">Feedback Page</h1>
          <nav>
            <ul className="flex space-x-4">
              <li><Link to="/" className="hover:text-gray-300">Home</Link></li>
              <li><Link to="/orders" className="hover:text-gray-300">Orders</Link></li>
              {/* Add more links as needed */}
            </ul>
          </nav>
        </div>
      </header>

      {/* Feedback List */}
      <div className="container mx-auto py-8">
        <h1 className="text-3xl font-semibold mb-4">Feedbacks</h1>
        <div className="divide-y divide-gray-200">
          {feedbacks.map(feedback => (
            <div key={feedback.id} className="py-4">
              <p className="text-gray-800 mb-1"><strong>User ID:</strong> {feedback._id}</p>
              <p className="text-gray-600 mb-1"><strong>Date:</strong> {feedback.timestamp.split("T")[0]}</p>
              <p className="text-gray-700"><strong>Feedback:</strong> {feedback.feedback}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default FeedbackPage;
