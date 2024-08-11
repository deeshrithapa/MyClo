import React from 'react';

const ToastNotification = ({ message, onClose }) => {
  if (!message) return null;

  return (
    <div className="fixed bottom-4 right-4 bg-green-500 text-white px-4 py-2 rounded-lg shadow-lg">
      <p>{message}</p>
      <button onClick={onClose} className="ml-4 bg-gray-800 text-white px-2 py-1 rounded">
        Close
      </button>
    </div>
  );
};

export default ToastNotification;
