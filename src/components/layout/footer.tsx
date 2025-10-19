
import Link from "next/link";
import { Facebook, Instagram, Twitter, Linkedin, MapPin, Phone, Mail } from "lucide-react";

export default function Footer() {
  return (
    <footer className="bg-gradient-to-r from-gray-900 to-gray-800 text-white">
      <div className="container mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          <div>
            <h3 className="text-lg font-semibold mb-4">Contact</h3>
            <div className="space-y-3">
              <div className="flex items-start space-x-3">
                <MapPin className="w-5 h-5 text-blue-400 mt-1 flex-shrink-0" />
                <p className="text-gray-300 text-sm font-semibold">
                  FLAT NO 303, RAJNANDINI HEIGHT, BANPHOOL PATH, <br />
                  HATIGAON ROAD, GUWAHATI
                  <br />
                  ASSAM
                </p>
              </div>
              <div className="flex items-center space-x-3">
                <Phone className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300 text-sm">+91 361 2345678</p>
              </div>
              <div className="flex items-center space-x-3">
                <Mail className="w-5 h-5 text-blue-400" />
                <p className="text-gray-300 text-sm">
                  office@luitkumarbarman.org
                </p>
              </div>
            </div>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Services</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/services/appointment-booking" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Appointment Booking
                </Link>
              </li>
              <li>
                <Link href="/services/grievance-system" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Public Grievance
                </Link>
              </li>
              <li>
                <Link href="/services/health-support" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Health Support
                </Link>
              </li>
              <li>
                <Link href="/services/education-support" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Education Support
                </Link>
              </li>
              <li>
                <Link href="/services/invitation-request" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Invitation Request
                </Link>
              </li>
              <li>
                <Link href="/services/real-estate-consultancy" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Real Estate Consultancy
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Quick Links</h3>
            <ul className="space-y-2">
              <li>
                <Link href="/" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Home
                </Link>
              </li>
              <li>
                <Link href="/gallery" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Gallery
                </Link>
              </li>
              <li>
                <Link href="/resources" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  Resources
                </Link>
              </li>
              <li>
                <Link href="/about" className="text-gray-300 hover:text-blue-400 transition-colors text-sm">
                  About
                </Link>
              </li>
            </ul>
          </div>
          <div>
            <h3 className="text-lg font-semibold mb-4">Follow Us</h3>
            <div className="flex space-x-3">
              <a
                href="https://www.instagram.com/luit_kumar_barman_?igsh=OWF4Mno0NnpwemIy"
                className="w-10 h-10 bg-blue-600 hover:bg-blue-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="https://www.instagram.com/luit_kumar_barman_?igsh=OWF4Mno0NnpwemIy"
                className="w-10 h-10 bg-pink-600 hover:bg-pink-700 rounded-full flex items-center justify-center transition-colors"
              >
                <Instagram className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-sky-500 hover:bg-sky-600 rounded-full flex items-center justify-center transition-colors"
              >
                <Twitter className="w-5 h-5" />
              </a>
              <a
                href="#"
                className="w-10 h-10 bg-blue-700 hover:bg-blue-800 rounded-full flex items-center justify-center transition-colors"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
            <p className="text-gray-400 text-xs mt-4">
              Stay connected for latest updates and announcements
            </p>
          </div>
        </div>
        <div className="border-t border-gray-700 mt-8 pt-8">
          <div className="flex flex-col md:flex-row justify-between items-center">
            <p className="text-gray-400 text-sm">
              &copy; {new Date().getFullYear()} LKB. All rights reserved.
            </p>
            <div className="flex space-x-4 mt-4 md:mt-0">
              <Link href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Privacy Policy
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Terms of Service
              </Link>
              <Link href="#" className="text-gray-400 hover:text-blue-400 text-sm transition-colors">
                Accessibility
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
}
