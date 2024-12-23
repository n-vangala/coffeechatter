import React from "react";
import { getAuth, signOut } from "firebase/auth";

const Home = () => {
  const auth = getAuth();

  const handleSignOut = () => {
    signOut(auth)
      .then(() => alert("Signed out successfully"))
      .catch((error) => console.error("Sign out error:", error));
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <div className="text-center">
        <h1 className="text-2xl font-bold mb-4">Welcome to Coffeechatter!</h1>
        <button
          onClick={handleSignOut}
          className="px-6 py-3 bg-red-500 text-white rounded shadow-md hover:bg-red-600"
        >
          Sign Out
        </button>
      </div>
    </div>
  );
};

export default Home;
