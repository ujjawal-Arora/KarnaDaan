import { useState } from "react";
import { Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import { navItems } from "../constants";

const Navbar = () => {
  const [mobileDrawerOpen, setMobileDrawerOpen] = useState(false);

  const toggleNavbar = () => {
    setMobileDrawerOpen(!mobileDrawerOpen);
  };

  const handleScrollToSection = (sectionId) => {
    const section = document.getElementById(sectionId);
    if (section) {
      section.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <nav className="sticky top-0 z-50 bg-zinc-800 py-4 backdrop-blur-md border-b border-neutral-700/80 transition duration-300 ease-in-out">
      <div className="container px-4 mx-auto relative lg:text-sm">
        <div className="flex justify-between items-center">
          <div className="flex items-center flex-shrink-0">
            <img
              className="h-10 w-10 mr-3 transform hover:scale-105 transition-transform duration-200 ease-out"
              src={logo}
              alt="Logo"
            />
            <span className="text-2xl text-orange-500 font-bold tracking-wide">
              कर्ण Daan
            </span>
          </div>
          <ul className="hidden lg:flex ml-14 space-x-12">
            {navItems.map((item, index) => (
              <li key={index} className="group">
                <a
                  href={`#${item.href}`}
                  className="text-neutral-300 hover:text-orange-500 transition-colors duration-200 ease-in-out"
                  onClick={(e) => {
                    e.preventDefault();
                    handleScrollToSection(item.href);
                  }}
                >
                  {item.label}
                </a>
                <div className="h-[2px] bg-orange-500 scale-x-0 group-hover:scale-x-100 transition-transform duration-200 ease-out"></div>
              </li>
            ))}
          </ul>
          <div className="lg:hidden md:flex flex-col justify-end">
            <button
              className="text-orange-500 hover:text-orange-400 transition duration-200"
              onClick={toggleNavbar}
            >
              {mobileDrawerOpen ? <X /> : <Menu />}
            </button>
          </div>
        </div>
        {mobileDrawerOpen && (
          <div className="fixed right-0 z-20 bg-neutral-900 w-full p-8 flex flex-col justify-center items-center lg:hidden">
            <ul className="space-y-4">
              {navItems.map((item, index) => (
                <li key={index}>
                  <a
                    href={`#${item.href}`}
                    className="text-neutral-300 hover:text-orange-500 transition-colors duration-200 ease-in-out"
                    onClick={(e) => {
                      e.preventDefault();
                      handleScrollToSection(item.href);
                    }}
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
