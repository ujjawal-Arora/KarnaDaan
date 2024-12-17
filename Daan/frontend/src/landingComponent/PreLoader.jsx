import React, { useEffect } from "react";
import "./preloader.css";

const PreLoader = ({ isLoaded }) => {
  return (
    <div className={`preloader ${isLoaded ? "hidden" : ""}`}>
      <div className="image-container">
        <img src="src/assets/logo.png" alt="Logo" className="preloader-image" />
      </div>
      <div className="texts-container">
        <span>Together,</span>
        <span>We,</span>
        <span>Can</span>
      </div>
    </div>
  );
};

export default PreLoader;
