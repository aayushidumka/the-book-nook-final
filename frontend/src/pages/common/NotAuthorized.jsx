import React from "react";
import { Link } from "react-router-dom";

const NotAuthorized = () => {
  return (
    <div className="flex flex-col items-center justify-center h-screen bg-[#FBF7F4] text-center px-4">
      <h1 className="text-5xl font-bold text-[#A1683A] mb-6">🚫 Access Denied</h1>
      <p className="text-lg text-gray-700 mb-8">
        You don’t have permission to view this page.
      </p>
      <Link
        to="/"
        className="px-6 py-3 rounded-2xl bg-[#E8998D] text-white text-lg font-semibold shadow hover:bg-[#d87c72] transition"
      >
        Go Back Home
      </Link>
    </div>
  );
};

export default NotAuthorized;
