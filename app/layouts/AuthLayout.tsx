"use client";
import React from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  return (
    <div className="h-screen flex px-8 md:px-28 items-center justify-center bg-gray-50 overflow-hidden">
      <div
        className="
          bg-white
          rounded-2xl
          shadow-lg
          flex
          flex-col
          md:flex-row
          w-full
          max-w-7xl
          min-h-[80vh]
          md:min-h-[90vh]
          overflow-hidden
          md:mx-auto
        "
      >
        <div className="hidden lg:flex flex-1 relative overflow-hidden bg-gray-100 items-center justify-center">
          <img
            src="/images/team-img.png"
            alt="Task Management"
            className="max-w-[90%] max-h-[90%] object-contain object-center"
          />

          {/* Optional overlay */}
          <div className="absolute top-6 left-6 flex items-center">
            <img
              src="/icons/pic.png"
              alt="TaskFlow Logo"
              className="w-15 h-15 object-contain"
            />
            <p className="text-sm italic text-red-400 font-mono">Taskflow</p>
          </div>
        </div>
        {children}
      </div>
    </div>
  );
};

export default AuthLayout;
