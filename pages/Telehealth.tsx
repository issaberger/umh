import React from 'react';
import { Video, Wifi, Calendar, Laptop } from 'lucide-react';
import { Link } from 'react-router-dom';

const Telehealth: React.FC = () => {
  return (
    <div className="animate-fade-in pb-20">
      <div className="relative bg-slate-900 py-24 px-4 sm:px-6 lg:px-8 flex flex-col items-center justify-center overflow-hidden">
        {/* Abstract background shapes */}
        <div className="absolute top-0 left-0 w-full h-full opacity-10">
            <div className="absolute right-0 top-0 bg-primary-500 w-96 h-96 rounded-full blur-3xl transform translate-x-1/2 -translate-y-1/2"></div>
            <div className="absolute left-0 bottom-0 bg-secondary-500 w-96 h-96 rounded-full blur-3xl transform -translate-x-1/2 translate-y-1/2"></div>
        </div>
        
        <div className="relative z-10 text-center max-w-3xl">
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-800 border border-slate-700 text-primary-400 text-sm font-medium mb-8">
            <Video className="w-4 h-4" />
            <span>Secure & Private</span>
          </div>
          <h1 className="text-4xl md:text-5xl font-extrabold text-white tracking-tight mb-6">
            Quality Care, From the Comfort of Home
          </h1>
          <p className="text-xl text-slate-300 leading-relaxed">
            Access our psychiatric and therapy services through our secure, HIPAA-compliant telehealth platform. Available to all residents of Maryland.
          </p>
        </div>
      </div>

      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8 -mt-16 relative z-20">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-primary-500">
            <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Laptop className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Easy Access</h3>
            <p className="text-slate-500">
              Join appointments from your smartphone, tablet, or computer. No complicated software installation required.
            </p>
          </div>
          <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-secondary-500">
            <div className="bg-secondary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Wifi className="w-6 h-6 text-secondary-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Convenient</h3>
            <p className="text-slate-500">
              Save travel time and fit appointments into your busy schedule. Perfect for professionals and parents.
            </p>
          </div>
           <div className="bg-white p-8 rounded-2xl shadow-lg border-t-4 border-primary-500">
            <div className="bg-primary-50 w-12 h-12 rounded-lg flex items-center justify-center mb-6">
              <Calendar className="w-6 h-6 text-primary-600" />
            </div>
            <h3 className="text-xl font-bold text-slate-900 mb-3">Same Quality</h3>
            <p className="text-slate-500">
              Receive the exact same level of care, diagnosis, and medication management as in-person visits.
            </p>
          </div>
        </div>
      </div>

      <div className="max-w-4xl mx-auto px-4 mt-24">
        <h2 className="text-3xl font-bold text-slate-900 mb-8 text-center">How It Works</h2>
        <div className="space-y-8">
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-300">1</div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Book Your Appointment</h4>
              <p className="text-slate-600 mt-1">Request a telehealth slot when booking online or over the phone.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-300">2</div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Receive Your Link</h4>
              <p className="text-slate-600 mt-1">We will email or text you a secure link 15 minutes before your session begins.</p>
            </div>
          </div>
          <div className="flex gap-6">
            <div className="flex-shrink-0 w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center font-bold text-slate-600 border border-slate-300">3</div>
            <div>
              <h4 className="text-lg font-bold text-slate-900">Connect with Your Provider</h4>
              <p className="text-slate-600 mt-1">Click the link, ensure your camera and mic are on, and start your session.</p>
            </div>
          </div>
        </div>
        
        <div className="mt-12 p-6 bg-yellow-50 rounded-xl border border-yellow-100 text-sm text-yellow-800">
          <strong>Note:</strong> Some controlled substances may require an initial in-person visit depending on current state and federal regulations.
        </div>

        <div className="mt-12 text-center">
            <Link to="/contact" className="inline-block bg-primary-600 text-white px-8 py-3 rounded-full font-bold hover:bg-primary-700 transition-colors shadow-md">
                Schedule Telehealth Visit
            </Link>
        </div>
      </div>
    </div>
  );
};

export default Telehealth;