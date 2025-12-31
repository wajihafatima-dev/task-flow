import React, { useState, ReactNode } from "react";
import { Check, ChevronDown, ChevronUp } from "lucide-react";
import { Label } from "./Label";

interface SelectProps {
  label?: string;
  value: string;
  onChange: (value: string) => void;
  children: ReactNode;
  size?: "sm" | "default";
  className?: string;
}

export function Select({ label, value, onChange, children, size = "default", className }: SelectProps) {
  const [open, setOpen] = useState(false);

  return (
    <div className={`relative w-full ${className}`}>
      {label && <Label className="mb-1">{label}</Label>}
      <button
        type="button"
        onClick={() => setOpen(!open)}
        className={`w-full flex justify-between items-center border rounded px-3 py-2 bg-white ${
          size === "sm" ? "text-sm h-8" : "text-base h-9"
        }`}
      >
        <span>{value || "Select..."}</span>
        <ChevronDown size={20} />
      </button>

      {open && (
        <div className="absolute z-50 w-full mt-1 border rounded bg-white shadow-lg max-h-60 overflow-auto">
          {React.Children.map(children, (child) => {
            if (!React.isValidElement(child)) return null;
            return React.cloneElement(child, {
              onSelect: (val: string) => {
                onChange(val);
                setOpen(false);
              },
              currentValue: value,
            });
          })}
        </div>
      )}
    </div>
  );
}

// ----------- Select Group -----------
interface SelectGroupProps {
  label: string;
  children: ReactNode;
}

export function SelectGroup({ label, children }: SelectGroupProps) {
  return (
    <div>
      <div className="px-2 py-1 text-xs font-medium text-gray-700">{label}</div>
      {children}
    </div>
  );
}

// ----------- Select Item -----------
interface SelectItemProps {
  value: string;
  currentValue?: string;
  onSelect?: (value: string) => void;
  children: ReactNode;
  className?: string;
}

export function SelectItem({ value, currentValue, onSelect, children, className }: SelectItemProps) {
  const isSelected = value === currentValue;

  return (
    <button
      type="button"
      onClick={() => onSelect?.(value)}
      className={`w-full text-left px-3 py-2 flex justify-between items-center hover:bg-gray-100 ${
        isSelected ? "bg-gray-200 font-medium" : ""
      } ${className}`}
    >
      {children}
      {isSelected && <Check size={16} />}
    </button>
  );
}

// ----------- Select Separator -----------
interface SelectSeparatorProps {
  className?: string;
}

export function SelectSeparator({ className }: SelectSeparatorProps) {
  return <div className={`h-px bg-gray-300 my-1 w-full ${className}`} />;
}

// ----------- Scroll Buttons -----------
interface ScrollButtonProps {
  onClick?: () => void;
  className?: string;
}

export function SelectScrollUpButton({ onClick, className }: ScrollButtonProps) {
  return (
    <button type="button" onClick={onClick} className={`flex mx-auto py-1 ${className}`}>
      <ChevronUp size={20} />
    </button>
  );
}

export function SelectScrollDownButton({ onClick, className }: ScrollButtonProps) {
  return (
    <button type="button" onClick={onClick} className={`flex mx-auto py-1 ${className}`}>
      <ChevronDown size={20} />
    </button>
  );
}
