import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faFacebookF, faTwitter, faInstagram } from '@fortawesome/free-brands-svg-icons';
// import img4 from '../assets/img4.jpg';

const Footer = () => {
  return (
    <div className="bg-zinc-800 text-white w-full py-10">
      <div className="container mx-auto px-4 grid grid-cols-2 md:grid-cols-4 gap-8 animate_animated animate_fadeIn">
        <div>
          <h4 className="font-semibold text-lg mb-4" style={{ color: '#FFD700' }}>Popular Locations</h4>
          <ul className="space-y-2">
            <li>Kolkata</li>
            <li>Mumbai</li>
            <li>Chennai</li>
            <li>Pune</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4" style={{ color: '#FFD700' }}>Trending Locations</h4>
          <ul className="space-y-2">
            <li>Bhubaneshwar</li>
            <li>Hyderabad</li>
            <li>Chandigarh</li>
            <li>Nashik</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4" style={{ color: '#FFD700' }}>About Us</h4>
          <ul className="space-y-2">
            <li>Tech@OLX</li>
            <li>Blog</li>
            <li>Help</li>
            <li>Sitemap</li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold text-lg mb-4" style={{ color: '#FFD700' }}>Follow Us</h4>
          <div className="flex space-x-4">
            <a href="https://www.facebook.com" target="blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300 animate_animated animate_pulse animate_infinite">
              <FontAwesomeIcon icon={faFacebookF} className="text-2xl" style={{ color: '#FF6F61' }} />
            </a>
            <a href="https://www.twitter.com" target="blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300 animate_animated animate_pulse animate_infinite">
              <FontAwesomeIcon icon={faTwitter} className="text-2xl" style={{ color: '#FF6F61' }} />
            </a>
            <a href="https://www.instagram.com" target="blank" rel="noopener noreferrer" className="hover:text-gray-400 transition-colors duration-300 animate_animated animate_pulse animate_infinite">
              <FontAwesomeIcon icon={faInstagram} className="text-2xl" style={{ color: '#FF6F61' }} />
            </a>
          </div>
          <div className="mt-4 flex space-x-4 animate_animated animate_zoomIn">
            <a href="#" className="inline-block">
              <img src="\src\assets\img5.jpg" alt="Google Play Store" className="h-10 w-auto" />
            </a>
            <a href="#" className="inline-block">
              <img src="\src\assets\img4.jpg" alt="App Store" className="h-10 w-auto" />
            </a>
          </div>
        </div>
      </div>
      <div className="border-t mt-10 pt-4 text-center text-sm" style={{ borderColor: '#FF5722' }}>
        <div className="flex justify-center space-x-6 mb-4">
          <a href="#" className="hover:text-yellow-500 transition-colors duration-300 animate_animated animate_bounceIn">Help</a>
          <a href="#" className="hover:text-yellow-500 transition-colors duration-300 animate_animated animate_bounceIn">Sitemap</a>
          <a href="#" className="hover:text-yellow-500 transition-colors duration-300 animate_animated animate_bounceIn">Legal & Privacy information</a>
        </div>
        <div className="animate_animated animate_fadeInUp">
          <p>All rights reserved © 2024 Karndaan</p>
        </div>
      </div>
    </div>
  );
}

export default Footer;
