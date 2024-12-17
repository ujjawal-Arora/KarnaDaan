import { useState, useEffect } from "react";
// import Navbar from "../landingComponents/Navbar";
import Navbar from '../landingComponent/Navbar'
import HeroSection from "../landingComponent/HeroSection";
import FeatureSection from "../landingComponent/FeatureSection";
import Workflow from "../landingComponent/Workflow";
import Footer from "../landingComponent/Footer";
import Testimonials from "../landingComponent/Testimonials";
import ProgressBar from "../landingComponent/ProgressBar";
import PreLoader from "../landingComponent/PreLoader";

const App = () => {
  const [isLoaded, setIsLoaded] = useState(false);

  useEffect(() => {
    document.body.classList.add("no-scroll"); // Prevent scrolling

    const timer = setTimeout(() => {
      setIsLoaded(true);
      document.body.classList.remove("no-scroll"); // Re-enable scrolling
    }, 3000); // Preloader duration

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <PreLoader isLoaded={isLoaded} />
      {isLoaded && (
        <>
          <style>
            {`
              @keyframes fadeIn {
                0% { opacity: 0; }
                100% { opacity: 1; }
              }

              .fade-in {
                animation: fadeIn 1s ease-in-out forwards;
              }
            `}
          </style>
          <div className="fade-in">
            <ProgressBar />
            <Navbar />
            <div className="max-w-7xl mx-auto pt-20 px-6">
              <HeroSection />
              <div id="features">
                <FeatureSection />
              </div>
              <div id="workflow">
                <Workflow />
              </div>
              <div id="testimonials">
                <Testimonials />
              </div>
              <Footer />
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default App;
