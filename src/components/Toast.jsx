import React, { useEffect } from 'react';

const Toast = ({ message, type = 'success', onClose }) => {
  useEffect(() => {
    const timer = setTimeout(() => {
      onClose();
    }, 4000);
    return () => clearTimeout(timer);
  }, [onClose]);

  const bgClass = type === 'success' ? 'bg-secondary' : 'bg-primary';

  return (
    <div className={`fixed bottom-8 left-1/2 -translate-x-1/2 z-[100] ${bgClass} text-white px-8 py-4 rounded-2xl shadow-2xl flex items-center gap-4 animate-bounce-in`}>
      <span className="material-symbols-outlined">
        {type === 'success' ? 'verified' : 'bolt'}
      </span>
      <span className="font-headline font-bold">{message}</span>
    </div>
  );
};

export default Toast;
