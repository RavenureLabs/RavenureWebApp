'use client';

import { useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface NotificationProps {
  message: string | null;
  type?: 'error' | 'success' | 'info';
  duration?: number;
  onClose?: () => void;
}

export default function Notification({
  message,
  type = 'info',
  duration = 5000,
  onClose,
}: NotificationProps) {
  useEffect(() => {
    if (!message) return;
    const timer = setTimeout(() => {
      onClose?.();
    }, duration);
    return () => clearTimeout(timer);
  }, [message, duration, onClose]);

  const bgColor =
    type === 'error'
      ? 'bg-red-600'
      : type === 'success'
      ? 'bg-green-600'
      : 'bg-blue-600';

  return (
    <AnimatePresence>
      {message && (
        <motion.div
          initial={{ x: 300, opacity: 0 }}
          animate={{ x: 0, opacity: 1 }}
          exit={{ x: 300, opacity: 0 }}
          transition={{ duration: 0.4, type: 'spring' }}
          className={`fixed top-4 right-4 z-50 px-6 py-4 text-white rounded-xl shadow-lg ${bgColor}`}
        >
          <div className="flex items-center gap-3">
            <span className="text-lg">⚠️</span>
            <span>{message}</span>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
