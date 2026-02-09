"use client";

import React, { InputHTMLAttributes, forwardRef, ReactNode } from "react";

// ------- Component Props -------
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
  label?: string;
  startIcon?: ReactNode; // icon can be any React element
}

// ------- Main Component -------
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", className, disabled, label, startIcon, ...props }, ref) => {
    return (
      <div className="flex flex-col w-full mb-2">
        {label && <label className="text-sm font-medium mb-1">{label}</label>}
        <div className="flex items-center border border-gray-300 rounded-md bg-white px-3 py-3 focus-within:ring-2 focus-within:ring-primary/30 focus-within:border-primary">
          {startIcon && <span className="mr-2 flex-shrink-0">{startIcon}</span>}
          <input
            ref={ref}
            type={type}
            disabled={disabled}
            className={`flex-1 text-sm text-gray-700 outline-none bg-transparent placeholder-gray-400 ${className}`}
            {...props}
          />
        </div>
      </div>
    );
  }
);

Input.displayName = "Input";
