"use client";

import React, { LabelHTMLAttributes } from "react";

// -------- Types --------
interface LabelProps extends LabelHTMLAttributes<HTMLLabelElement> {
  className?: string;
}

// -------- Component --------
export function Label({ className, children, ...props }: LabelProps) {
  return (
    <label
      className={`
        flex items-center gap-1 text-sm font-medium leading-none select-none
        disabled:opacity-50 disabled:pointer-events-none
        ${className}
      `}
      {...props}
    >
      {children}
    </label>
  );
}
