import { useState, useEffect } from "react";

const ProgressBar = () => {
  const [scrollProgress, setScrollProgress] = useState(0);

  const handleScroll = () => {
    // Calculate the scroll percentage
    const scrollHeight = document.documentElement.scrollHeight - window.innerHeight;
    const scrollPosition = window.scrollY;
    const progress = (scrollPosition / scrollHeight) * 100;

    setScrollProgress(progress);
  };

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);

    // Cleanup the event listener when the component is unmounted
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  return (
    <div
      style={{
        position: "fixed",
        top: 0,
        left: 0,
        width: "100%",
        height: "4px",
        background: "#ddd",
        zIndex: 1000,
      }}
    >
      <div
        style={{
          height: "100%",
          width: `${scrollProgress}%`,
          background: "linear-gradient(to right, #ff7f50, #ff6347)",
          transition: "width 0.25s ease-out",
        }}
      />
    </div>
  );
};

export default ProgressBar;
