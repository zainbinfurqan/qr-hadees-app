'use client';

import { useState } from "react";
import { XCircleIcon,  } from "lucide-react";

export default function HalfModal({children}) {
  const [open, setOpen] = useState(true);
  const [closing, setClosing] = useState(false);

  const closeModal = () => {
    setClosing(true);
    setTimeout(() => {
      setOpen(false);
      setClosing(false);
    }, 250); // match animation time
  };

  return (
    <div className="">
      {open && (
        <>
          <div
            className="fixed inset-0 bg-black/40"
            onClick={closeModal}
          />
          <div className={`
            fixed bottom-0 left-0 right-0
            h-1/2 bg-white rounded-t-2xl p-6 z-50
            ${closing ? "animate-slideDown" : "animate-slideUp"}
          `}>
            <div className="flex justify-end">
            <button onClick={closeModal}><XCircleIcon className="w-6 h-6 text-gray-500 justify-end" /></button>
            </div>
            {children}
          </div>
        </>
      )}

    </div>
  );
}