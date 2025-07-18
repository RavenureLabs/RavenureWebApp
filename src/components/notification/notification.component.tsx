'use client';

import { useState } from 'react';

export type NotificationComponentProps = {
  iconPath: string;
  message: string;
};

export default function NotificationComponent({ iconPath, message }: NotificationComponentProps) {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in">
      <div className="flex flex-col p-4 bg-white shadow-md hover:shadow-lg rounded-2xl border border-blue-100">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="w-12 h-12 rounded-xl p-2 border border-blue-100 text-blue-400 bg-blue-50"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path d={iconPath} />
            </svg>
            <p className="ml-3 text-gray-800">{message}</p>
          </div>
          <button
            onClick={() => setIsVisible(false)}
            className="ml-4 text-gray-500 hover:text-gray-800 text-xl font-bold"
          >
            &times;
          </button>
        </div>
      </div>
    </div>
  );
}
