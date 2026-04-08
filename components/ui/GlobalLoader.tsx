'use client';

import { useEffect, useState } from 'react';

export default function GlobalLoader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    // Wait until the page is fully loaded + small delay for premium feel
    const hideLoader = () => {
      setVisible(false);
    };

    if (document.readyState === 'complete') {
      // If already loaded (e.g. hot reload), hide after short delay
      setTimeout(hideLoader, 800);
    } else {
      window.addEventListener('load', hideLoader);
    }

    return () => {
      window.removeEventListener('load', hideLoader);
    };
  }, []);

  if (!visible) return null;

  return (
    <div
      className={`fixed inset-0 z-[9999] flex items-center justify-center bg-white transition-all duration-700 ease-out ${visible ? 'opacity-100' : 'opacity-0'
        }`}
    >
      <div className="flex flex-col items-center gap-8">
        {/* Brand Logo + Name */}
        {/* <div className="flex items-center gap-4">
          <div
            className="w-14 h-14 rounded-3xl flex items-center justify-center text-white text-4xl font-bold shadow-xl ring-4 ring-white"
            style={{ backgroundColor: '#25d366' }}
          >
            PC
          </div> 
          <div>
            <span className="text-4xl font-semibold tracking-tighter text-gray-900">
              PrintCraft
            </span>
          </div>
        </div> */}

        {/* Professional Spinner */}
        <div className="relative flex items-center justify-center">
          <div className="w-16 h-16 border-4 border-gray-200 rounded-full"></div>
          <div
            className="absolute w-16 h-16 border-4 border-transparent border-t-[#25d366] rounded-full animate-spin"
          ></div>
        </div>

        {/* Loading Text */}
        <div className="flex flex-col items-center">
          <p className="text-sm font-medium text-gray-500 tracking-[2px]">
            LOADING
          </p>
          <p className="text-xs text-gray-400 mt-1">Preparing your experience...</p>
        </div>
      </div>
    </div>
  );
}