import { Typewriter } from 'react-simple-typewriter';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import imghero from "../assets/imghero1.png";
import imghero2 from "../assets/imghero2.png";

const HeroSection = () => {
  const navigate = useNavigate(); // Initialize navigate

  const handleDonateClick = () => {
    navigate('/home'); // Navigate to the /home route
  };

  const handleRequestClick = () => {
    navigate('/home'); // Navigate to the /home route
  };

  return (
    <div className="flex flex-col items-center mt-6 lg:mt-20">
      <h1 className="text-4xl sm:text-6xl lg:text-7xl text-center tracking-wide">
        <span className="text-gradient">
          <Typewriter
            words={['Join कर्ण  Daan To help the needy']}
            typeSpeed={100}
            deleteSpeed={0}
            cursor
            cursorStyle=">"
          />
        </span>
      </h1>
      <p className="mt-10 text-lg text-center text-neutral-500 max-w-4xl">
        Make a difference today by supporting our mission! With your donation, we can bring innovative solutions to life and help those in need. Join us in turning ideas into impactful change—every contribution counts!
      </p>
      <div className="flex justify-center my-10">
        <div
          className="bg-gradient-to-r from-orange-500 to-orange-800 py-3 px-4 mx-3 rounded-md cursor-pointer"
          onClick={handleDonateClick} // Add onClick handler
        >
          Donate
        </div>
        <div className="py-3 px-4 mx-3 rounded-md border cursor-pointer" onClick={handleRequestClick}>
          Request
        </div>
      </div>
      <div className="flex mt-10 justify-center">
        <img
          src={imghero}
          alt="Descriptive text for the image"
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        />
        <img
          src={imghero2}
          alt="Descriptive text for the image"
          className="rounded-lg w-1/2 border border-orange-700 shadow-sm shadow-orange-400 mx-2 my-4"
        />
      </div>
    </div>
  );
};

export default HeroSection;
