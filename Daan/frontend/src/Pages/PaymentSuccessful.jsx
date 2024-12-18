import React from 'react';
import { 
  CheckCircle, 
  Share2, 
  Heart, 
  ArrowLeft
} from 'lucide-react';
import { useNavigate } from 'react-router-dom';

function App() {
  const navigate = useNavigate(); 

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-orange-50 via-orange-100 to-orange-50">
      <div className="max-w-4xl w-full mx-auto px-4">
        <button 
          onClick={() => navigate('/home')} 
          className="flex items-center text-gray-600 hover:text-gray-800 transition-colors mb-8"
        >
          <ArrowLeft className="w-5 h-5 mr-2" />
          Return to Homepage
        </button>

        <div className="flex flex-col justify-center items-center">
          <div className="bg-white rounded-2xl shadow-xl p-8 mb-8 text-center">
            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-16 h-16 bg-green-100 rounded-full mb-4">
                <CheckCircle className="w-8 h-8 text-green-500" />
              </div>
              <h1 className="text-3xl font-bold text-gray-800 mb-2">
                Thank You for Your Donation!
              </h1>
              <p className="text-gray-600">
                Your generosity makes a real difference in the world.
              </p>
            </div>

            <div className="mb-8">
              <div className="inline-flex items-center justify-center w-12 h-12 bg-red-100 rounded-full mb-4">
                <Heart className="w-6 h-6 text-red-500" />
              </div>
              <h2 className="text-xl font-semibold text-gray-800 mb-2">Your Impact</h2>
              <p className="text-gray-600 max-w-2xl mx-auto">
                Your donation will help provide essential resources to those in need. 
                We'll send you updates about how your contribution is making a difference.
              </p>
            </div>
          </div>

          <div className="text-center text-gray-500 text-sm">
            A receipt has been sent to your email address.
            <br />
            Please check your inbox for detailed transaction information.
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
