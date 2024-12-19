import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { FaArrowLeft } from "react-icons/fa"; // Import the back arrow icon
import Appbar from "../Components/Appbar";
import FrontCards from "../material/FrontCards";
import RequestCards from "../material/RequestCards";

function Home() {
  const location = useLocation();
  const navigate = useNavigate();
  const [selectedPage, setSelectedPage] = useState("FrontCards"); // Default to 'FrontCards'

  // Check for state passed via navigation
  useEffect(() => {
    if (location.state?.selectedPage) {
      setSelectedPage(location.state.selectedPage);
    }
  }, [location.state]);

  return (
    <div className="bg-gray-200 min-h-screen">
      {/* Appbar at the top */}
      <div className="z-50">
        <Appbar />
      </div>

      {/* Navigation Buttons */}
      <div className="fixed top-[64px] gap-2 left-0 right-0 z-10 mt-4 py-2 bg-gray-200 shadow-md flex items-center">
        {/* Back Arrow Button */}
        <button
          className="px-4 py-2 mr-4 text-orange-600 hover:text-orange-800 flex items-center"
          onClick={() => navigate("/")}
        >
          <FaArrowLeft className="mr-2" /> {/* Icon with spacing */}
          Back
        </button>

        {/* Front Cards Button */}
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            selectedPage === "FrontCards"
              ? "bg-orange-600 text-white shadow-lg"
              : "bg-white text-orange-600 border border-orange-600 hover:bg-orange-100"
          }`}
          onClick={() => setSelectedPage("FrontCards")}
        >
          Show Front Cards
        </button>

        {/* Request Cards Button */}
        <button
          className={`px-4 py-2 rounded-full text-sm font-semibold transition-all duration-300 ${
            selectedPage === "RequestCards"
              ? "bg-orange-600 text-white shadow-lg"
              : "bg-white text-orange-600 border border-orange-600 hover:bg-orange-100"
          }`}
          onClick={() => setSelectedPage("RequestCards")}
        >
          Show Request Cards
        </button>
      </div>

      {/* Scrollable container for the cards */}
      <div className="pt-[128px] overflow-y-auto">
        {selectedPage === "FrontCards" ? <FrontCards /> : <RequestCards />}
      </div>
    </div>
  );
}

export default Home;
