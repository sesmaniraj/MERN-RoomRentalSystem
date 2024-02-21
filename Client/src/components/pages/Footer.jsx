import React from "react";
import { FaFacebook, FaTwitter, FaInstagram, FaLinkedin } from "react-icons/fa";

const Footer = () => {
  return (
    <footer className="bg-gray-800 text-white py-8">
      <div className="container mx-auto px-4">
        <div className="md:flex md:justify-between">
          <div className="mb-4 md:w-1/2 md:pr-8">
            <h4 className="text-lg font-semibold mb-4">Contact Information</h4>
            <p>Lalitpur Muncipality-13 ,imadol</p>
            <p>Phone:+977 9866520000</p>
            <p>Email:roomrental7@gmail.com</p>
          </div>
          <div className="mb-4 md:w-1/2 md:pl-8">
            <h4 className="text-lg font-semibold mb-4">Quick Links</h4>
            <ul>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Home
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Listings
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  About Us
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Terms of Service
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  Privacy Policy
                </a>
              </li>
              <li>
                <a href="#" className="hover:text-gray-400">
                  FAQs
                </a>
              </li>
            </ul>
          </div>
        </div>
        <div className="md:flex md:justify-between">
          <div className="md:w-1/2">
            <h4 className="text-lg font-semibold mb-4">Follow Us</h4>
            <div className="flex">
              <a href="#" className="mr-4">
                <FaFacebook size={24} />
              </a>
              <a href="#" className="mr-4">
                <FaTwitter size={24} />
              </a>
              <a href="#" className="mr-4">
                <FaInstagram size={24} />
              </a>
              <a href="#">
                <FaLinkedin size={24} />
              </a>
            </div>
          </div>
          <div className="md:w-1/2 text-right">
            <p>
              © {new Date().getFullYear()} Room Rental System. All rights
              reserved.
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
