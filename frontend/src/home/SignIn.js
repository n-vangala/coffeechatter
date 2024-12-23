import React from "react";
import { auth } from "../App.js";
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";

const SignIn = () => {
  const handleGoogleSignIn = async () => {
    const provider = new GoogleAuthProvider();

    try {
      const result = await signInWithPopup(auth, provider);
      // Get user info
      const user = result.user;
      console.log("User Info:", user);
      alert(`Welcome, ${user.displayName}!`);
    } catch (error) {
      console.error("Error during sign-in:", error);
      alert("Sign-in failed. Please try again.");
    }
  };

  return (
    <div className="flex items-center justify-center h-screen">
      <button
        onClick={handleGoogleSignIn}
        className="px-6 py-3 bg-blue-500 text-white rounded shadow-md hover:bg-blue-600"
      >
        Sign in with Google
      </button>
    </div>
  );
};

export default SignIn;
