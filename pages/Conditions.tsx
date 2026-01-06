import React from 'react';
import { CONDITIONS_TREATED } from '../constants';
import { Check } from 'lucide-react';

const Conditions: React.FC = () => {
  return (
    <div className="animate-fade-in pb-20">
      <div className="bg-white/30 backdrop-blur-md py-16 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-4xl font-extrabold text-slate-900 mb-6">Conditions We Treat</h1>
          <p className="text-xl text-slate-600 max-w-3xl leading-relaxed">
            Mental health affects everyone differently. At Universality Health Care, we have experience treating a diverse spectrum of behavioral health conditions using evidence-based practices.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {CONDITIONS_TREATED.map((condition) => (
            <div key={condition} className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-sm flex items-start gap-4 hover:bg-white hover:border-primary-200 hover:shadow-md transition-all">
              <div className="mt-1 bg-primary-100 p-1 rounded-full">
                <Check className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">{condition}</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Comprehensive care and management plans available.
                </p>
              </div>
            </div>
          ))}
           {/* Add a few more generic ones to fill the grid if needed */}
           <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-sm flex items-start gap-4 hover:bg-white hover:border-primary-200 hover:shadow-md transition-all">
              <div className="mt-1 bg-primary-100 p-1 rounded-full">
                <Check className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Life Transitions</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Support during divorce, career changes, or grief.
                </p>
              </div>
            </div>
             <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl border border-white/60 shadow-sm flex items-start gap-4 hover:bg-white hover:border-primary-200 hover:shadow-md transition-all">
              <div className="mt-1 bg-primary-100 p-1 rounded-full">
                <Check className="w-4 h-4 text-primary-600" />
              </div>
              <div>
                <h3 className="text-lg font-bold text-slate-800">Anger Management</h3>
                <p className="text-sm text-slate-500 mt-2">
                  Tools and techniques for emotional regulation.
                </p>
              </div>
            </div>
        </div>

        <div className="mt-16 bg-blue-50/60 backdrop-blur-md rounded-2xl p-8 md:p-12 text-center border border-blue-100">
          <h3 className="text-2xl font-bold text-slate-900 mb-4">Don't see your specific concern?</h3>
          <p className="text-slate-600 mb-8 max-w-2xl mx-auto">
            This list is not exhaustive. Our experienced clinicians are trained to handle a wide variety of mental health challenges. Please reach out to discuss your specific situation.
          </p>
          <button className="bg-white text-primary-700 px-8 py-3 rounded-full font-semibold shadow-sm hover:shadow-md transition-all border border-primary-100">
            Contact for Consultation
          </button>
        </div>
      </div>
    </div>
  );
};

export default Conditions;