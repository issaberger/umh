import React from 'react';
import { SERVICES } from '../constants';
import { Link } from 'react-router-dom';

const Services: React.FC = () => {
  return (
    <div className="animate-fade-in pb-20">
      {/* Header */}
      <div className="bg-white/30 backdrop-blur-md py-16 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h1 className="text-4xl font-extrabold text-slate-900">Our Services</h1>
          <p className="mt-4 text-xl text-slate-600 max-w-2xl mx-auto">
            Integrative mental health solutions designed to meet you where you are.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 -mt-8">
        <div className="space-y-12">
          {SERVICES.map((service, index) => (
            <div 
              key={service.id} 
              id={service.id}
              className={`flex flex-col md:flex-row ${index % 2 === 1 ? 'md:flex-row-reverse' : ''} bg-white/70 backdrop-blur-md rounded-2xl shadow-sm border border-white/60 overflow-hidden`}
            >
              <div className="md:w-1/3 bg-white/40 p-8 flex flex-col justify-center items-center text-center border-b md:border-b-0 md:border-r border-white/50">
                <div className="p-4 bg-white rounded-full shadow-sm mb-4">
                  {service.icon}
                </div>
                <h3 className="text-2xl font-bold text-slate-800">{service.title}</h3>
              </div>
              <div className="md:w-2/3 p-8 md:p-12 flex flex-col justify-center">
                <p className="text-lg text-slate-600 leading-relaxed mb-6">
                  {service.description}
                </p>
                <div className="prose prose-slate text-slate-500">
                  <p>
                    Our approach to {service.title.toLowerCase()} is patient-centered and evidence-based. 
                    We collaborate with you to ensure that your treatment plan aligns with your personal goals and lifestyle.
                    Whether you are seeking support for the first time or continuing your journey, our team provides a safe, non-judgmental space.
                  </p>
                </div>
                <div className="mt-8">
                  <Link to="/contact" className="text-primary-600 font-semibold hover:text-primary-700 hover:underline">
                    Request {service.title} &rarr;
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Services;