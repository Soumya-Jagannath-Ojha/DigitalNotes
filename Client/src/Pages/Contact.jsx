
import React from 'react';
import { useRef } from 'react';
import { MapContainer, TileLayer, Marker, Popup, ZoomControl } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import { FaPhone, FaEnvelope, FaMapMarkerAlt } from 'react-icons/fa';
import emailjs from '@emailjs/browser';
import { toast } from 'sonner';

const Contact = () => {
  const position = [20.56273, 85.99068]; // Example coordinates (London)
  const form = useRef();

  // EmailJs
  const sendEmail = (e) => {
    e.preventDefault();
    
    emailjs
      .sendForm(import.meta.env.VITE_SERVICE_ID, import.meta.env.VITE_TEMPLATE_ID, form.current, {
        publicKey: import.meta.env.VITE_PUBLIC_KEY,
      })
      .then(
        () => {
          toast.success('Email is send sucessfuly!')
          form.current.reset(); 
        },
        (error) => {
          toast.error('FAILED to send email...', error.text)
        },
      );
  };;



  return (
    <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8 pt-20 bg-gradient-to-br from-blue-50 to-indigo-100">
      <h1 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-center text-gray-800">Get in Touch</h1>
      <p className="text-center text-gray-600 mb-8">We'd love to hear from you. Please fill out this form or use our contact information below.</p>
      <div className="flex flex-col lg:flex-row gap-6 sm:gap-12">
        <div className="w-full lg:w-1/2">
          <form ref={form} onSubmit={sendEmail} className="space-y-4 bg-white shadow-md rounded-lg p-6">
            <div>
              <label htmlFor="name" className="block mb-1 font-medium text-gray-700">Name</label>
              <input type="text" id="name" name="name" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="email" className="block mb-1 font-medium text-gray-700">Email</label>
              <input type="email" id="email" name="email" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="subject" className="block mb-1 font-medium text-gray-700">Subject</label>
              <input type="text" id="subject" name="subject" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required />
            </div>
            <div>
              <label htmlFor="message" className="block mb-1 font-medium text-gray-700">Message</label>
              <textarea id="message" name="message" rows="4" className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500" required></textarea>
            </div>

            <button type="submit" className="w-full bg-blue-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 transition duration-300">Send Message</button>
          </form>
        </div>
        <div className="w-full lg:w-1/2">
          <div className="bg-white shadow-md rounded-lg p-6 mb-6">
            <h2 className="text-2xl font-bold mb-4 text-gray-800">Contact Information</h2>
            <ul className="space-y-4">
              <li className="flex items-center">
                <FaPhone className="text-green-500 mr-3 transform rotate-90" />
                <span>+91 1234567890</span>
              </li>
              <li className="flex items-center">
                <FaEnvelope className="text-red-500 mr-3" />
                <span>info@driems.ac.in</span>
              </li>
              <li className="flex items-center">
                <FaMapMarkerAlt className="text-blue-500 mr-3" />
                <span>DRIEMS University, Tangi, Cuttack, Odisha 754022</span>
              </li>
            </ul>
          </div>
          <MapContainer center={position} zoom={13} style={{ height: '400px', width: '100%' }} className="rounded-lg shadow-md" zoomControl={false}>
            <TileLayer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              attribution='© <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            />
            <Marker position={position}
              eventHandlers={{
                mouseover: (event) => event.target.openPopup(),
                mouseout: (event) => event.target.closePopup(),
              }}
            >
              <Popup>
                <h3 className="font-bold">DRIEMS University</h3>
                <p>Tangi, Cuttack, Odisha 754022</p>
                <p>Welcome to our campus!</p>
              </Popup>
            </Marker>
            <ZoomControl position="bottomright" />
          </MapContainer>
        </div>
      </div>
    </div>
  );
};

export default Contact;
