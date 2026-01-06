import React from 'react';
import { DollarSign, Heart, ShieldCheck } from 'lucide-react';
import { Link } from 'react-router-dom';

const SlidingScale: React.FC = () => {
  return (
    <div className="animate-fade-in pb-20">
      <div className="bg-white/30 backdrop-blur-md py-16 text-center border-b border-white/40">
        <div className="max-w-3xl mx-auto px-4">
          <div className="inline-flex items-center justify-center p-3 bg-green-50 rounded-full mb-6 shadow-sm">
            <DollarSign className="w-8 h-8 text-green-600" />
          </div>
          <h1 className="text-4xl font-extrabold text-slate-900 mb-4">Affordable Care for Everyone</h1>
          <p className="text-xl text-slate-600">
            We believe mental health care is a right, not a privilege. Our financial policies are designed to remove barriers to access.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 items-center">
          <div>
            <h2 className="text-2xl font-bold text-slate-900 mb-4">Sliding Scale Fee Program</h2>
            <p className="text-slate-600 mb-6 leading-relaxed">
              For patients who are uninsured or underinsured, Universality Health Care offers a sliding fee scale based on household income and family size. This ensures that our services remain affordable regardless of your financial situation.
            </p>
            <ul className="space-y-4 mb-8">
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-500 mt-1" />
                <span className="text-slate-700">Fees adjusted based on federal poverty guidelines.</span>
              </li>
              <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-500 mt-1" />
                <span className="text-slate-700">No one is denied access to services due to inability to pay.</span>
              </li>
               <li className="flex items-start gap-3">
                <Heart className="w-5 h-5 text-red-500 mt-1" />
                <span className="text-slate-700">Flexible payment plans available.</span>
              </li>
            </ul>
            <Link to="/contact" className="text-primary-600 font-bold hover:underline">
              Contact our billing department to apply &rarr;
            </Link>
          </div>
          <div className="bg-white/60 backdrop-blur-md p-8 rounded-2xl border border-white/60 shadow-sm">
            <h3 className="text-xl font-bold text-slate-900 mb-6">Insurances Accepted</h3>
            <div className="grid grid-cols-2 gap-4">
              {['Medicare', 'Maryland Medicaid', 'BlueCross BlueShield', 'United Healthcare', 'Cigna', 'Aetna', 'CareFirst', 'Tricare'].map(ins => (
                <div key={ins} className="flex items-center gap-2 text-sm text-slate-600">
                  <ShieldCheck className="w-4 h-4 text-green-600" />
                  {ins}
                </div>
              ))}
            </div>
            <p className="mt-6 text-xs text-slate-500 italic">
              * Verification of benefits is required prior to your first appointment. Please have your insurance card ready when you call.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SlidingScale;