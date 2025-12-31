"use client";

import React, { InputHTMLAttributes, forwardRef } from "react";

// ------- Component Props -------
interface InputProps extends InputHTMLAttributes<HTMLInputElement> {
  className?: string;
}

// ------- Main Component -------
export const Input = forwardRef<HTMLInputElement, InputProps>(
  ({ type = "text", className, disabled, ...props }, ref) => {
    return (
      <input
        ref={ref}
        type={type}
        disabled={disabled}
        className={`
          w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm 
          focus:border-primary focus:ring-2 focus:ring-primary/30 outline-none
          disabled:opacity-50 disabled:pointer-events-none
          ${className}
        `}
        {...props}
      />
    );
  }
);

Input.displayName = "Input";
