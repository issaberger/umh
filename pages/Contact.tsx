import React from 'react';
import { Phone, Mail, MapPin, Clock } from 'lucide-react';
import { LOCATIONS, PHONE_NUMBER, EMAIL_ADDRESS } from '../constants';
import SimpleMap from '../components/SimpleMap';

const Contact: React.FC = () => {
  return (
    <div className="animate-fade-in">
      <div className="bg-white/30 backdrop-blur-md py-16 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900">Contact Us</h1>
          <p className="mt-4 text-xl text-slate-600">
            We are here to help. Reach out to schedule an appointment or ask questions.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 grid grid-cols-1 lg:grid-cols-2 gap-16">
        
        {/* Contact Info & Form */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Get in Touch</h2>
          
          <div className="space-y-6 mb-12">
            <div className="flex items-start gap-4">
              <div className="bg-primary-100 p-3 rounded-full">
                <Phone className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Phone</h3>
                <p className="text-slate-600">{PHONE_NUMBER}</p>
                <p className="text-xs text-slate-500 mt-1">Mon-Fri: 8am - 6pm</p>
              </div>
            </div>
            <div className="flex items-start gap-4">
               <div className="bg-primary-100 p-3 rounded-full">
                <Mail className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Email</h3>
                <p className="text-slate-600">{EMAIL_ADDRESS}</p>
              </div>
            </div>
             <div className="flex items-start gap-4">
               <div className="bg-primary-100 p-3 rounded-full">
                <Clock className="w-6 h-6 text-primary-700" />
              </div>
              <div>
                <h3 className="font-bold text-slate-900">Hours</h3>
                <p className="text-slate-600">Monday - Friday: 8:00 AM - 6:00 PM</p>
                <p className="text-slate-600">Saturday: By Appointment Only</p>
              </div>
            </div>
          </div>

          <form className="space-y-6 bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-lg border border-white/60">
            <h3 className="text-lg font-bold text-slate-900">Send a Message</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">First Name</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white/80" />
              </div>
              <div>
                <label className="block text-sm font-medium text-slate-700 mb-1">Last Name</label>
                <input type="text" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white/80" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
              <input type="email" className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white/80" />
            </div>
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">Message</label>
              <textarea rows={4} className="w-full px-4 py-2 rounded-lg border border-slate-300 focus:ring-2 focus:ring-primary-500 focus:border-transparent outline-none transition-all bg-white/80"></textarea>
            </div>
            <button type="button" className="w-full bg-primary-600 text-white font-bold py-3 rounded-lg hover:bg-primary-700 transition-colors shadow-md">
              Send Message
            </button>
            <p className="text-xs text-slate-400 text-center">
              Please do not include sensitive medical information in this form.
            </p>
          </form>
        </div>

        {/* Locations */}
        <div>
          <h2 className="text-2xl font-bold text-slate-900 mb-8">Our Locations</h2>
          <div className="space-y-8">
             <div className="rounded-xl overflow-hidden shadow-lg border border-white/60">
                <SimpleMap locations={LOCATIONS} />
             </div>
             
            {LOCATIONS.map((loc, idx) => (
              <div key={idx} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-white/60 hover:border-primary-300 transition-colors shadow-sm">
                <div className="flex items-start gap-4">
                  <MapPin className="w-8 h-8 text-primary-500 flex-shrink-0" />
                  <div>
                    <h3 className="text-xl font-bold text-slate-900">{loc.city}</h3>
                    <p className="text-slate-600 mt-1">{loc.address}</p>
                    <p className="text-slate-600">{loc.city}, {loc.state} {loc.zip}</p>
                    <p className="text-primary-600 font-semibold mt-2">{loc.phone}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>

      </div>
    </div>
  );
};

export default Contact;