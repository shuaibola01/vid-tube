import React from "react";
import { Link } from "react-router-dom";
import * as SC from "../../style";
import logo from "/logo.png";

export default function NotFound() {
  return (
    <SC.Main8 className="min-h-screen bg-background text-white flex flex-col justify-center items-center px-4">
      <div className="w-full max-w-4xl text-center py-12">
        {/* Header + Logo */}
        <div className="flex justify-center items-center gap-4 mb-6">
          <img src={logo} alt="Logo" className="h-16" />
          <h1 className="text-6xl font-extrabold text-red-600">404</h1>
        </div>

        {/* Main Text */}
        <h2 className="text-2xl md:text-4xl font-bold mb-4">Page Not Found</h2>
        <p className="text-gray-300 text-base md:text-lg mb-8 max-w-2xl mx-auto">
          Sorry, we couldn’t find the page you’re looking for. It might have been moved or deleted.
        </p>

        {/* Action Button */}
        <Link
          to="/"
          className="inline-block bg-red-700 hover:bg-red-800 text-white font-semibold px-6 py-3 rounded-lg transition"
        >
          Back to Home
        </Link>
      </div>

      {/* Footer */}
      <footer className="py-4 text-sm text-gray-500 text-center w-full mt-auto">
        &copy; {new Date().getFullYear()} VidTube. All rights reserved.
      </footer>
    </SC.Main8>
  );
}
