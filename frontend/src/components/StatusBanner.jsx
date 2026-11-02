import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { RefreshCw, WifiOff } from 'lucide-react';

export default function StatusBanner({ backendStatus, onRetry, isRetrying }) {
  if (backendStatus.online || !backendStatus.checked) return null;

  return (
    <AnimatePresence>
      <motion.div
        initial={{ opacity: 0, y: -10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -10 }}
        className="mx-4 sm:mx-6 lg:mx-auto max-w-7xl mt-2"
      >
        <div className="flex items-center justify-between gap-3 px-4 py-3 rounded-2xl bg-[#FFF1E5] border border-[#FFD9B3]/40 text-sm">
          <div className="flex items-center gap-2.5 text-amber-800">
            <WifiOff className="w-4 h-4 text-amber-600 shrink-0" />
            <span className="text-xs font-medium">
              Express backend is offline — showing cached portfolio data. All sections remain fully viewable.
            </span>
          </div>
          <button
            onClick={onRetry}
            disabled={isRetrying}
            className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full text-xs font-semibold bg-white text-amber-800 border border-amber-200 hover:bg-amber-50 transition-colors shrink-0 disabled:opacity-50 cursor-pointer"
          >
            <RefreshCw className={`w-3 h-3 ${isRetrying ? 'animate-spin' : ''}`} />
            Retry
          </button>
        </div>
      </motion.div>
    </AnimatePresence>
  );
}
