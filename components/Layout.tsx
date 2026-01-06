import React, { useState, useEffect } from 'react';
import { NavLink, Link, Outlet, useLocation } from 'react-router-dom';
import { Menu, X, Phone, MapPin } from 'lucide-react';
import { BRAND_NAME, NAV_LINKS, PHONE_NUMBER } from '../constants';
import ChatWidget from './ChatWidget';

const Layout: React.FC = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu on route change
  useEffect(() => {
    setIsMobileMenuOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen flex flex-col font-sans">
      {/* Top Bar - Hidden on small mobile to save space, visible on md+ */}
      <div className="bg-primary-700 text-white py-2 px-4 hidden md:block">
        <div className="max-w-7xl mx-auto flex justify-between items-center text-sm font-medium">
          <div className="flex items-center space-x-6">
            <span className="flex items-center gap-2"><Phone className="w-4 h-4" /> {PHONE_NUMBER}</span>
            <span className="flex items-center gap-2"><MapPin className="w-4 h-4" /> Salisbury & Baltimore, MD</span>
          </div>
          <div className="flex items-center space-x-4">
            <span>Accepting New Patients</span>
            <Link to="/contact" className="hover:text-primary-100 transition-colors underline decoration-secondary-500">Request Appointment</Link>
          </div>
        </div>
      </div>

      {/* Main Header */}
      <header className="sticky top-0 z-50 bg-white/70 backdrop-blur-md border-b border-white/50 shadow-sm transition-all">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-24">
            {/* Logo */}
            <Link to="/" className="flex items-center gap-3 group">
              {/* 
                 IMPORTANT: Ensure 'logo.png' is placed in your public folder. 
                 The image tag below expects the file at the root.
              */}
              <img 
                src="/logo.png" 
                alt={BRAND_NAME} 
                className="h-20 w-auto object-contain py-1"
                onError={(e) => {
                  // Fallback if image not found during dev
                  e.currentTarget.style.display = 'none';
                  e.currentTarget.nextElementSibling?.classList.remove('hidden');
                }}
              />
              <div className="hidden flex-col justify-center">
                <h1 className="text-xl font-bold text-primary-700 leading-tight">Universality</h1>
                <p className="text-xs text-secondary-600 font-bold tracking-wider uppercase">Mental Health Clinic</p>
              </div>
            </Link>

            {/* Desktop Nav */}
            <nav className="hidden lg:flex items-center space-x-8">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `text-sm font-medium transition-colors hover:text-primary-600 ${
                      isActive ? 'text-primary-700' : 'text-slate-600'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <Link
                to="/contact"
                className="bg-primary-600 text-white px-5 py-2.5 rounded-full text-sm font-semibold hover:bg-primary-700 transition-colors shadow-md hover:shadow-lg transform hover:-translate-y-0.5 duration-200"
              >
                Book Now
              </Link>
            </nav>

            {/* Mobile Menu Button */}
            <div className="lg:hidden flex items-center gap-4">
              <a href={`tel:${PHONE_NUMBER.replace(/\D/g,'')}`} className="text-primary-600 p-2 bg-primary-50/50 rounded-full">
                <Phone className="w-5 h-5" />
              </a>
              <button
                onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                className="text-slate-600 hover:text-primary-600 focus:outline-none p-2"
              >
                {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
              </button>
            </div>
          </div>
        </div>

        {/* Mobile Navigation Dropdown */}
        {isMobileMenuOpen && (
          <div className="lg:hidden bg-white/95 backdrop-blur-md border-t border-slate-100 shadow-xl absolute w-full left-0 animate-fade-in-down">
            <div className="px-4 pt-2 pb-6 space-y-2">
              {NAV_LINKS.map((link) => (
                <NavLink
                  key={link.path}
                  to={link.path}
                  className={({ isActive }) =>
                    `block px-3 py-3 rounded-md text-base font-medium ${
                      isActive ? 'bg-primary-50 text-primary-700' : 'text-slate-600 hover:bg-slate-50 hover:text-primary-600'
                    }`
                  }
                >
                  {link.label}
                </NavLink>
              ))}
              <div className="pt-4 mt-4 border-t border-slate-100">
                <Link
                  to="/contact"
                  className="block w-full text-center bg-primary-600 text-white px-4 py-3 rounded-lg font-semibold shadow-sm active:bg-primary-800"
                >
                  Book Appointment
                </Link>
              </div>
            </div>
          </div>
        )}
      </header>

      {/* Page Content */}
      <main className="flex-grow">
        <Outlet />
      </main>

      {/* Global Chat Widget */}
      <ChatWidget />

      {/* Footer */}
      <footer className="bg-slate-900/95 backdrop-blur-md text-slate-300 py-12 border-t border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="col-span-1 md:col-span-1">
            <h3 className="text-white text-lg font-bold mb-4">{BRAND_NAME}</h3>
            <p className="text-sm leading-relaxed mb-6">
              Compassionate, accessible mental health care for Maryland families. We believe in universal access to wellness.
            </p>
            <div className="flex gap-4">
               {/* Social placeholders */}
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer">
                 <span className="font-bold text-xs">FB</span>
               </div>
               <div className="w-8 h-8 bg-slate-800 rounded-full flex items-center justify-center hover:bg-primary-600 transition-colors cursor-pointer">
                 <span className="font-bold text-xs">IG</span>
               </div>
            </div>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Services</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/services" className="hover:text-white transition-colors">Psychiatric Evaluation</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Medication Management</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">Therapy</Link></li>
              <li><Link to="/services" className="hover:text-white transition-colors">PRP & IOP</Link></li>
              <li><Link to="/telehealth" className="hover:text-white transition-colors">Telehealth</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Patient Center</h4>
            <ul className="space-y-2 text-sm">
              <li><Link to="/resources" className="hover:text-white transition-colors">Patient Forms</Link></li>
              <li><Link to="/sliding-scale" className="hover:text-white transition-colors">Sliding Scale & Fees</Link></li>
              <li><Link to="/contact" className="hover:text-white transition-colors">Locations</Link></li>
              <li><Link to="/resources" className="hover:text-white transition-colors">Crisis Resources</Link></li>
            </ul>
          </div>

          <div>
            <h4 className="text-white font-semibold mb-4">Contact</h4>
            <ul className="space-y-3 text-sm">
              <li className="flex items-start gap-3">
                <Phone className="w-5 h-5 text-primary-500 shrink-0" />
                <span>{PHONE_NUMBER}</span>
              </li>
              <li className="flex items-start gap-3">
                <MapPin className="w-5 h-5 text-primary-500 shrink-0" />
                <span>Salisbury & Baltimore, MD</span>
              </li>
              <li className="mt-4 pt-4 border-t border-slate-800 text-xs text-slate-500">
                In case of a life-threatening emergency, please dial 911 or go to your nearest emergency room.
              </li>
            </ul>
          </div>
        </div>
        <div className="max-w-7xl mx-auto px-4 mt-12 pt-8 border-t border-slate-800 text-center text-xs text-slate-500">
          © {new Date().getFullYear()} {BRAND_NAME}. All rights reserved. Demo Concept.
        </div>
      </footer>
    </div>
  );
};

export default Layout;