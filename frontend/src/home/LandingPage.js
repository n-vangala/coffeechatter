import React from "react";
import { Link } from "react-router-dom";

const LandingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">Welcome to Coffeechatter</h1>
        <p className="text-lg mb-6">
          Schedule meaningful coffee chats with ease.
        </p>
        <Link
          to="/signin"
          className="px-6 py-3 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
        >
          Get Started
        </Link>
      </div>
    </div>
  );
};

export default LandingPage;
