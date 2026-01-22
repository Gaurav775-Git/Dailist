import React from "react";
import { Plus } from "lucide-react";

export default function Header({
  title = "Page",
  showAction = false,
  onAction = () => {},
}) {
  return (
    <header className="w-full sticky top-0 z-50 bg-black text-white border-b border-gray-800">
      <div className="flex items-center justify-between px-4 py-3 max-w-7xl mx-auto">
        {/* Left */}
        <div className="flex items-center gap-3">
          <div className="font-bold text-xl">X</div>
          <span className="font-semibold text-lg">{title}</span>
        </div>

        {/* Right */}
        {showAction && (
          <button
            onClick={onAction}
            className="bg-blue-500 hover:bg-blue-600 p-2 rounded-full"
          >
            <Plus size={18} />
          </button>
        )}
      </div>
    </header>
  );
}
