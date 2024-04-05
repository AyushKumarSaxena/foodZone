// import { useState, useEffect } from "react";
import { useNavigate } from 'react-router-dom';
// import axios from 'axios';
import cookie from 'js-cookie';

function LogOut() {
    // const [email, setEmail] = useState('');
    // const [password, setPassword] = useState('');
    const navigate = useNavigate();

    const handleLogout = () => {
        cookie.remove('token');
        cookie.remove('username');
        cookie.remove('userId');
        // Optionally, redirect to login page after logout
        navigate('/');
    };
}



    // const handleSubmit = async (e) => {
    //     e.preventDefault();
    //     console.log("Login credentials:", { email, password });

    //     try {
    //         const res = await axios.post("http://localhost:3000/login", {
    //             email,
    //             password,
    //         }, {
    //             headers: {
    //                 "Content-Type": "application/json",
    //             },
    //         });

    //         cookie.set("token", res.data.token);
    //         cookie.set("username", res.data.user.name);
    //         cookie.set("userId", res.data.user._id);

    //         setTimeout(() => {
    //             navigate("/");
    //         }, 2000);
    //     } catch (error) {
    //         console.error("Login error:", error);
    //         // Handle error
    //     }
    // };

    // // Check for existing login on component mount (optional)
    // useEffect(() => {
    //     const isLoggedIn = cookie.get('token');
    //     if (isLoggedIn) {
    //         // Redirect to a protected route or display appropriate content if logged in
    //         navigate('/protected-route'); // Replace with your protected route path
    //     }
    // }, []);

    // return (
    //     <div className="min-h-screen flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
    //         <div className="max-w-md w-full space-y-8">
    //             <div>
    //                 <h2 className="mt-6 text-center text-3xl font-extrabold text-gray-900">Sign in to your account</h2>
    //             </div>
    //             <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
    //                 <div className="rounded-md shadow-sm -space-y-px">
    //                     <div>
    //                         <label htmlFor="email-address" className="sr-only">Email address</label>
    //                         <input id="email-address" name="email" type="email" autoComplete="email" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Email address" value={email} onChange={(e) => setEmail(e.target.value)} />
    //                     </div>
    //                     <div>
    //                         <label htmlFor="password" className="sr-only">Password</label>
    //                         <input id="password" name="password" type="password" autoComplete="current-password" required className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-b-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
    //                     </div>
    //                 </div>

    //                 <div className="flex items-center justify-between">
    //                     <div className="flex items-center">
    //                         <input id="remember-me" name="remember-me" type="checkbox" className="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded" />
    //                         <label htmlFor="remember-me" className="ml-2 block text-sm text-gray-900">Remember me</label>
    //                     </div>
    //                     <div className="text-sm">
    //                         <a href="#" className="font-medium text-indigo-600
