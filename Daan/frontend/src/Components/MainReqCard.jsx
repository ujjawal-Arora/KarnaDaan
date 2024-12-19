
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa6";
import { Link } from "react-router-dom";
import MapComponent from "./MainCardCompo/MapComponent";

const MainReqCard = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const data = location.state;
  const finalLocalation=data.location;

  const description = data?.description || "No description available.";

  if (!data) {
    return <p className="text-center text-red-500 font-semibold">Card not found</p>;
  }

  const handleBackClick = () => {
    navigate('/home', { state: { selectedPage: 'RequestCards' } });

  };
  const handleDonorchatClick = () => {
    navigate(`/chat/${data.user}`);
  };


  const latitude = data.latitude || 0; // Ensure latitude is available
  const longitude = data.longitude || 0; // Ensure longitude is available
  const locationName = data.locationName || "Unknown Location";
  const name = data.name || "Unknown Name";
  const title = data.title || "Untitled";

  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-100 p-4">
      <div className="max-w-5xl w-full p-8 bg-white rounded-3xl shadow-xl">
        {/* Back Button */}
        <div className="mb-6">
          <button
            className="flex items-center text-gray-700 hover:text-gray-900 font-medium transition-transform hover:scale-105"
            onClick={handleBackClick}
          >
            <FaArrowLeft className="mr-2" /> Back
          </button>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Left Section */}
          <div>
            <h1 className="text-3xl font-bold text-gray-800 mb-6">{title}</h1>

            <div className="mb-8">
              <h3 className="text-xl font-semibold text-gray-700 mb-2">Description</h3>
              <p className="text-gray-600 leading-relaxed">{description}</p>
            </div>

            <div className="flex justify-center mt-8">
                <button onClick={handleDonorchatClick} className="px-6 py-3 text-lg font-medium text-white bg-gradient-to-r from-teal-500 to-green-500 rounded-full shadow-md hover:shadow-lg hover:scale-105 transition-transform duration-300">
                  Chat with Donor
                </button>
            </div>
          </div>

          {/* Right Section */}
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-semibold text-gray-800">{name}</h2>
            </div>

            <div className="bg-gray-50 p-6 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300">
              <h3 className="text-lg font-medium text-blue-600 mb-4">{finalLocalation}</h3>

              <div className="rounded-lg overflow-hidden shadow-sm">
              <MapComponent locationName={finalLocalation}  />
              </div>

              <div className="mt-4 text-gray-600 text-sm flex justify-between">
                <span>
                  <strong>Latitude:</strong> {latitude.toFixed(5)}
                </span>
                <span>
                  <strong>Longitude:</strong> {longitude.toFixed(5)}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MainReqCard;



