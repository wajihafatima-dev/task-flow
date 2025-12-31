import React, { ReactNode } from "react";
import clsx from "clsx";

// ----------- Variant Types -----------
type Variant = "default" | "destructive" | "outline" | "secondary" | "ghost" | "link";
type Size = "default" | "sm" | "lg" | "icon";

// ----------- Base Styles -----------
const baseStyles =
  "inline-flex items-center justify-center rounded-md font-medium transition-colors focus:outline-none disabled:opacity-50 disabled:pointer-events-none";

// ----------- Variant Styles -----------
const variantStyles: Record<Variant, string> = {
  default: "bg-primary text-white hover:bg-primary/90",
  destructive: "bg-red-600 text-white hover:bg-red-700",
  outline: "border border-gray-300 text-gray-900 hover:bg-gray-100",
  secondary: "bg-gray-200 text-gray-900 hover:bg-gray-300",
  ghost: "bg-transparent hover:bg-gray-100",
  link: "text-primary underline-offset-4 hover:underline bg-transparent",
};

// ----------- Size Styles -----------
const sizeStyles: Record<Size, string> = {
  default: "h-10 px-4 py-2 text-sm",
  sm: "h-8 px-3 text-xs",
  lg: "h-12 px-6 text-base",
  icon: "h-10 w-10 p-0",
};

// ----------- Component Props -----------
interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: Variant;
  size?: Size;
  children: ReactNode;
  startIcon?: ReactNode;
  endIcon?: ReactNode;
}

// ----------- Component -----------
const Button: React.FC<ButtonProps> = ({
  variant = "default",
  size = "default",
  children,
  startIcon,
  endIcon,
  className,
  ...props
}) => {
  return (
    <button
      className={clsx(
        baseStyles,
        variantStyles[variant],
        sizeStyles[size],
        className
      )}
      {...props}
    >
      {startIcon && <span className="mr-2">{startIcon}</span>}
      {children}
      {endIcon && <span className="ml-2">{endIcon}</span>}
    </button>
  );
};

export { Button };
