import React from 'react';
import { HeartHandshake, AlertCircle } from 'lucide-react';
import { Link } from 'react-router-dom';

function PageNotFound() {
  return (
    <div>
      <div className="min-h-screen bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50 flex items-center justify-center p-4">
        <div className="max-w-2xl w-full text-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 md:p-12 relative overflow-hidden">
            {/* Decorative circles */}
            <div className="absolute top-0 left-0 w-40 h-40 bg-orange-100 rounded-full -translate-x-1/2 -translate-y-1/2 opacity-50"></div>
            <div className="absolute bottom-0 right-0 w-32 h-32 bg-orange-100 rounded-full translate-x-1/2 translate-y-1/2 opacity-50"></div>

            {/* Main content */}
            <div className="relative">
              <div className="flex justify-center mb-6">
                <div className="bg-orange-100 p-4 rounded-full">
                  <AlertCircle className="w-16 h-16 text-orange-500" />
                </div>
              </div>

              <h1 className="text-6xl font-bold text-orange-500 mb-4">404</h1>
              <h2 className="text-2xl font-semibold text-gray-800 mb-4">Page Not Found</h2>
              <p className="text-gray-600 mb-8 max-w-md mx-auto">
                Oops! The page you're looking for seems to have wandered off. But don't worry, you can still make a difference!
              </p>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Link to="/home">
                  <button
                    className="inline-flex items-center px-6 py-3 rounded-lg bg-orange-500 text-white font-semibold hover:bg-orange-600 transition-colors duration-200"
                  >
                    <HeartHandshake className="w-5 h-5 mr-2" />
                    Donate Now
                  </button>
                </Link>
              </div>
            </div>
          </div>

          {/* Footer text */}
          <p className="mt-8 text-gray-600">
            Need help? <a href="#" className="text-orange-500 hover:underline">Contact our support team</a>
          </p>
        </div>
      </div>
    </div>
  );
}

export default PageNotFound;
