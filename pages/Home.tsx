import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, CheckCircle, Star, Phone, Quote } from 'lucide-react';
import { SERVICES, CONDITIONS_TREATED, PHONE_NUMBER, TESTIMONIALS } from '../constants';

const HERO_SLIDES = [
  {
    image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?q=80&w=800&auto=format&fit=crop",
    title: "Compassionate Professionals",
    subtitle: "Expert care tailored to your needs"
  },
  {
    image: "https://images.unsplash.com/photo-1600585154340-be6161a56a0c?q=80&w=800&auto=format&fit=crop",
    title: "Safe Environments",
    subtitle: "Modern, comfortable clinics in Salisbury & Baltimore"
  },
  {
    image: "https://images.unsplash.com/photo-1529156069898-49953e39b3ac?q=80&w=800&auto=format&fit=crop",
    title: "Healing Together",
    subtitle: "Support for individuals, families, and community"
  }
];

const Home: React.FC = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % HERO_SLIDES.length);
    }, 5000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative pt-16 pb-20 lg:pt-24 lg:pb-28 overflow-hidden">
        {/* Subtle pattern overlay */}
        <div className="absolute inset-0 z-0 opacity-10" style={{ backgroundImage: 'radial-gradient(circle at 2px 2px, #6d28d9 1px, transparent 0)', backgroundSize: '32px 32px' }}></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="lg:grid lg:grid-cols-12 lg:gap-8 items-center">
            <div className="sm:text-center md:max-w-2xl md:mx-auto lg:col-span-6 lg:text-left">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-white/60 backdrop-blur-sm border border-primary-200 text-primary-700 text-xs font-semibold uppercase tracking-wide mb-6 shadow-sm">
                <span className="w-2 h-2 rounded-full bg-primary-500"></span>
                Accepting New Patients in Maryland
              </div>
              <h1 className="text-4xl tracking-tight font-extrabold text-slate-900 sm:text-5xl md:text-6xl lg:text-5xl xl:text-6xl">
                <span className="block xl:inline">Your journey to</span>{' '}
                <span className="block text-transparent bg-clip-text bg-gradient-to-r from-primary-600 to-secondary-600 xl:inline">mental wellness</span> starts here.
              </h1>
              <p className="mt-3 text-base text-slate-600 sm:mt-5 sm:text-lg sm:max-w-xl sm:mx-auto md:mt-5 md:text-xl lg:mx-0 font-light leading-relaxed">
                Compassionate, evidence-based behavioral health care for adults, teens, and families. From therapy to medication management, we are here to support you.
              </p>
              <div className="mt-8 sm:max-w-lg sm:mx-auto sm:text-center lg:text-left lg:mx-0 flex flex-col sm:flex-row gap-4">
                <Link
                  to="/contact"
                  className="inline-flex items-center justify-center px-8 py-3 border border-transparent text-base font-medium rounded-full text-white bg-primary-600 hover:bg-primary-700 md:py-4 md:text-lg shadow-lg hover:shadow-xl transition-all"
                >
                  Book Appointment
                </Link>
                <a
                  href={`tel:${PHONE_NUMBER.replace(/\D/g,'')}`}
                  className="inline-flex items-center justify-center px-8 py-3 border border-slate-300 text-base font-medium rounded-full text-slate-700 bg-white/80 hover:bg-white md:py-4 md:text-lg shadow-sm hover:shadow-md transition-all backdrop-blur-sm"
                >
                  <Phone className="w-5 h-5 mr-2 text-primary-600" />
                  Call Now
                </a>
              </div>
              <p className="mt-4 text-xs text-slate-500 font-medium">
                * Offering In-Person & Telehealth Appointments
              </p>
            </div>
            
            {/* Slideshow Image */}
            <div className="mt-12 relative sm:max-w-lg sm:mx-auto lg:mt-0 lg:max-w-none lg:mx-0 lg:col-span-6 lg:flex lg:items-center">
              <div className="relative mx-auto w-full rounded-2xl shadow-xl lg:max-w-md overflow-hidden transform rotate-1 hover:rotate-0 transition-transform duration-500 border-4 border-white/50 aspect-[4/5] bg-slate-100">
                {HERO_SLIDES.map((slide, index) => (
                  <div 
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentSlide ? 'opacity-100' : 'opacity-0'}`}
                  >
                    <img
                      className="w-full h-full object-cover"
                      src={slide.image}
                      alt={slide.title}
                    />
                     {/* Overlay Gradient */}
                    <div className="absolute inset-0 bg-gradient-to-t from-primary-900/70 via-transparent to-transparent"></div>
                    <div className="absolute bottom-0 left-0 p-6 text-white w-full">
                      <p className="font-bold text-xl mb-1">{slide.title}</p>
                      <p className="text-sm opacity-90 font-medium">{slide.subtitle}</p>
                    </div>
                  </div>
                ))}

                {/* Navigation Dots */}
                <div className="absolute bottom-6 right-6 flex gap-2 z-10">
                    {HERO_SLIDES.map((_, index) => (
                        <button 
                          key={index}
                          onClick={() => setCurrentSlide(index)}
                          className={`h-2 rounded-full transition-all duration-300 ${index === currentSlide ? 'bg-white w-6' : 'bg-white/50 w-2 hover:bg-white/80'}`}
                          aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Trust Indicators */}
      <section className="bg-white/60 backdrop-blur-md py-10 border-y border-white/50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 gap-8 md:grid-cols-4 lg:grid-cols-4 text-center">
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="bg-primary-50/80 p-3 rounded-full">
                <Star className="w-6 h-6 text-primary-600" />
              </div>
              <span className="font-semibold text-slate-700">Experienced Team</span>
            </div>
            <div className="flex flex-col items-center justify-center gap-2">
              <div className="bg-secondary-50/80 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-secondary-600" />
              </div>
              <span className="font-semibold text-slate-700">Telehealth Available</span>
            </div>
             <div className="flex flex-col items-center justify-center gap-2">
              <div className="bg-primary-50/80 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-primary-600" />
              </div>
              <span className="font-semibold text-slate-700">Sliding Scale Options</span>
            </div>
             <div className="flex flex-col items-center justify-center gap-2">
              <div className="bg-secondary-50/80 p-3 rounded-full">
                <CheckCircle className="w-6 h-6 text-secondary-600" />
              </div>
              <span className="font-semibold text-slate-700">Ages 5+ Served</span>
            </div>
          </div>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-3xl mx-auto mb-16">
            <h2 className="text-base text-primary-600 font-semibold tracking-wide uppercase">Our Services</h2>
            <p className="mt-2 text-3xl leading-8 font-extrabold tracking-tight text-slate-900 sm:text-4xl">
              Comprehensive Behavioral Health
            </p>
            <p className="mt-4 max-w-2xl text-xl text-slate-500 mx-auto">
              We treat the whole person, not just the symptoms. Our multidisciplinary team works together to support your recovery.
            </p>
          </div>
          <div className="grid grid-cols-1 gap-8 sm:grid-cols-2 lg:grid-cols-3">
            {SERVICES.slice(0, 6).map((service) => (
              <div key={service.id} className="relative group bg-white/70 backdrop-blur-sm p-8 rounded-2xl shadow-sm hover:shadow-xl hover:bg-white/90 transition-all duration-300 border border-white/60">
                <div className="absolute -top-6 left-6 bg-white p-3 rounded-xl shadow-md border border-slate-100 group-hover:scale-110 transition-transform">
                  {service.icon}
                </div>
                <h3 className="mt-6 text-xl font-bold text-slate-900 group-hover:text-primary-600 transition-colors">{service.title}</h3>
                <p className="mt-4 text-base text-slate-500 leading-relaxed min-h-[80px]">
                  {service.description}
                </p>
                <div className="mt-6">
                  <Link to="/services" className="text-sm font-semibold text-primary-600 hover:text-primary-700 flex items-center gap-1">
                    Learn more <ArrowRight className="w-4 h-4" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-12 text-center">
            <Link to="/services" className="inline-flex items-center px-6 py-3 border border-slate-300 shadow-sm text-base font-medium rounded-full text-slate-700 bg-white/80 hover:bg-white backdrop-blur-sm">
              View All Services
            </Link>
          </div>
        </div>
      </section>

      {/* How to Get Started */}
      <section className="py-20 bg-white/40 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
           <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold text-slate-900">How to Get Started</h2>
            <p className="mt-4 text-lg text-slate-500">Starting therapy shouldn't be stressful. We make it simple.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-12 relative">
            {/* Connecting line for desktop */}
            <div className="hidden md:block absolute top-12 left-[16%] right-[16%] h-0.5 bg-slate-300/50 -z-10"></div>

            <div className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-6 backdrop-blur-sm">
                <span className="text-3xl font-bold text-primary-600">1</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Contact Us</h3>
              <p className="text-slate-500">Fill out our online form or give us a call to request an intake appointment.</p>
            </div>
             <div className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-6 backdrop-blur-sm">
                <span className="text-3xl font-bold text-primary-600">2</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Initial Intake</h3>
              <p className="text-slate-500">Meet with a provider (virtually or in-person) to discuss your history and goals.</p>
            </div>
             <div className="relative flex flex-col items-center text-center">
              <div className="w-24 h-24 bg-white/80 rounded-full flex items-center justify-center border-4 border-white shadow-lg mb-6 backdrop-blur-sm">
                <span className="text-3xl font-bold text-primary-600">3</span>
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-2">Begin Care</h3>
              <p className="text-slate-500">Receive a personalized plan including therapy, medication, or support services.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-primary-900/95 backdrop-blur-sm text-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-extrabold">Patient Stories</h2>
            <p className="mt-4 text-lg text-primary-200">Hear from those who have walked the path to recovery with us.</p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {TESTIMONIALS.map((testimonial) => (
              <div key={testimonial.id} className="bg-white/10 p-8 rounded-2xl relative border border-white/10 shadow-lg backdrop-blur-md">
                <Quote className="w-10 h-10 text-primary-400 absolute top-6 left-6 opacity-50" />
                <p className="relative z-10 text-primary-50 italic leading-relaxed mb-6 pt-6">
                  "{testimonial.quote}"
                </p>
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-primary-600 rounded-full flex items-center justify-center font-bold text-white border border-primary-400">
                    {testimonial.author.charAt(0)}
                  </div>
                  <div>
                    <p className="font-bold text-white text-sm">{testimonial.author}</p>
                    <p className="text-xs text-primary-300">{testimonial.location}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Conditions Preview */}
      <section className="py-20 bg-transparent">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="md:flex md:justify-between md:items-end mb-12">
            <div>
              <h2 className="text-3xl font-bold text-slate-900">Conditions We Treat</h2>
              <p className="mt-2 text-slate-500 max-w-xl">We provide specialized care for a wide range of behavioral health challenges.</p>
            </div>
            <div className="mt-4 md:mt-0">
               <Link to="/conditions" className="text-primary-600 hover:text-primary-700 font-medium flex items-center gap-2">
                 See full list <ArrowRight className="w-4 h-4" />
               </Link>
            </div>
          </div>
          <div className="flex flex-wrap gap-3">
            {CONDITIONS_TREATED.slice(0, 8).map((condition) => (
              <span key={condition} className="px-4 py-2 rounded-full bg-white/60 backdrop-blur-sm text-slate-700 border border-white text-sm font-medium hover:bg-white transition-colors cursor-default shadow-sm">
                {condition}
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="bg-gradient-to-r from-primary-600 to-secondary-600 py-16">
        <div className="max-w-4xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold text-white mb-6">Ready to take the first step?</h2>
          <p className="text-white/90 text-lg mb-8">
            Our compassionate team is ready to listen. Book an appointment online or call us today to get started.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link to="/contact" className="px-8 py-3 bg-white text-primary-700 font-bold rounded-full shadow-lg hover:bg-slate-50 transition-colors">
              Book Appointment
            </Link>
             <Link to="/contact" className="px-8 py-3 bg-transparent text-white font-bold rounded-full shadow-lg hover:bg-white/10 transition-colors border-2 border-white">
              Contact Us
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
};

export default Home;