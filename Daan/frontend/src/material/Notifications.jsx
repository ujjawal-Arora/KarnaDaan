import React, { useState } from 'react';
import { FaBell } from 'react-icons/fa';

const Notifications = () => {
  const [isOpen, setIsOpen] = useState(false);
  const notifications = [
    { id: 1, text: "You have a new message" },
    { id: 2, text: "Your order has been shipped" },
    { id: 3, text: "You have a new friend request" },
    // Add more notifications as needed
  ];

  const toggleNotifications = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative mt-1 inline-block">
      <div 
        className="text-4xl cursor-pointer  text-yellow-400 hover:text-yellow-600 " 
        onClick={toggleNotifications}
      >
        <FaBell />
      </div>

      {isOpen && (
        <div 
          className="absolute right-0 mt-2 w-64 h-64 bg-white border border-gray-300 rounded-lg shadow-lg overflow-y-auto z-50"
        >
          <div className="p-4 border-b border-gray-300">
            <h2 className="text-xl font-semibold">Notifications</h2>
          </div>
          <div className="p-4">
            {notifications.length ? (
              notifications.map((notification) => (
                <div key={notification.id} className="border-b border-gray-300 py-2">
                  {notification.text}
                </div>
              ))
            ) : (
              <p>No notifications</p>
            )}
          </div>
        </div>
      )}

      {isOpen && (
        <div 
          className="fixed inset-0"
          onClick={toggleNotifications}
        ></div>
      )}
    </div>
  );
};

export default Notifications;
