"use client";
import React, { ReactNode, useEffect } from "react";
import { X } from "lucide-react";

// ---------- Types ----------
interface DialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  children: ReactNode;
}

interface SectionProps {
  children: ReactNode;
  className?: string;
}

// ---------- Main Dialog ----------
export function Dialog({ open, onOpenChange, children }: DialogProps) {
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") onOpenChange(false);
    };
    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onOpenChange]);

  if (!open) return null;

  return (
    <div
      className="fixed inset-0 z-50 flex items-center justify-center bg-black/50"
      onClick={() => onOpenChange(false)}
    >
      <div
        className="bg-white rounded-lg w-full max-w-md shadow-lg animate-in fade-in zoom-in-90"
        onClick={(e) => e.stopPropagation()}
      >
        {children}
      </div>
    </div>
  );
}

// ---------- Trigger ----------
export function DialogTrigger({
  children,
  onOpenChange,
}: {
  children: React.ReactElement<{ onClick?: () => void }>; 
  onOpenChange: (open: boolean) => void;
}) {
  return React.cloneElement(children, {
    onClick: () => onOpenChange(true),
  });
}

// ---------- Title ----------
export function DialogTitle({
  children,
  onClose,
  className,
}: {
  children: ReactNode;
  onClose?: () => void;
  className?: string;
}) {
  return (
    <div
      className={`flex items-center justify-between p-4 border-b text-lg font-semibold ${className}`}
    >
      {children}
      {onClose && (
        <button
          onClick={onClose}
          className="text-gray-500 hover:text-gray-900 transition"
        >
          <X size={20} />
        </button>
      )}
    </div>
  );
}

// ---------- Content ----------
export function DialogContent({ children, className }: SectionProps) {
  return <div className={`p-4 ${className}`}>{children}</div>;
}

// ---------- Footer ----------
export function DialogFooter({ children, className }: SectionProps) {
  return (
    <div className={`flex justify-end gap-2 p-4 border-t ${className}`}>
      {children}
    </div>
  );
}

// ---------- Description ----------
export function DialogDescription({ children, className }: SectionProps) {
  return <p className={`text-sm text-gray-600 ${className}`}>{children}</p>;
}
