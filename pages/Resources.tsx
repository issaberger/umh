import React, { useState } from 'react';
import { FileText, ExternalLink, HelpCircle, X, ChevronRight, AlertTriangle, CheckCircle, Download, Eye, Maximize2 } from 'lucide-react';
import { 
  PHQ9_QUESTIONS, 
  GAD7_QUESTIONS, 
  ASSESSMENT_OPTIONS, 
  PHONE_NUMBER
} from '../constants';
import { Link } from 'react-router-dom';

const Resources: React.FC = () => {
  // Assessment State
  const [activeAssessment, setActiveAssessment] = useState<'PHQ9' | 'GAD7' | null>(null);
  const [currentStep, setCurrentStep] = useState(0);
  const [answers, setAnswers] = useState<number[]>([]);
  const [showResult, setShowResult] = useState(false);
  
  // PDF Viewer State
  const [viewingDoc, setViewingDoc] = useState<string | null>(null);

  // Defined static files - ensure these exist in public/documents/
  const PATIENT_FORMS = [
    { 
      title: "Patient Registration", 
      filename: "Universality Healthcare Patient-registration-.pdf",
      description: "General intake, insurance details, and medical history."
    },
    { 
      title: "Patients Rights & HIPAA", 
      filename: "Patients Right and Responsibilites HIPPA.pdf",
      description: "Your rights, responsibilities, and privacy information."
    },
    { 
      title: "Release of Information (ROI)", 
      filename: "OMHC Release of Information.pdf",
      description: "Authorization to release or share your medical records."
    },
    { 
      title: "Client Orientation Handbook", 
      filename: "Client Orientation Handbook.pdf",
      description: "Complete guide to clinic policies, services, and ethics."
    }
  ];

  const startAssessment = (type: 'PHQ9' | 'GAD7') => {
    setActiveAssessment(type);
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const closeAssessment = () => {
    setActiveAssessment(null);
    setCurrentStep(0);
    setAnswers([]);
    setShowResult(false);
  };

  const handleAnswer = (value: number) => {
    const newAnswers = [...answers, value];
    setAnswers(newAnswers);

    const questions = activeAssessment === 'PHQ9' ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
    
    if (currentStep < questions.length - 1) {
      setCurrentStep(currentStep + 1);
    } else {
      setShowResult(true);
    }
  };

  const calculateScore = () => {
    return answers.reduce((a, b) => a + b, 0);
  };

  const getResult = () => {
    const score = calculateScore();
    if (activeAssessment === 'PHQ9') {
      if (score <= 4) return { level: 'None-Minimal', color: 'text-green-600', bg: 'bg-green-50', desc: "Symptoms are minimal or absent." };
      if (score <= 9) return { level: 'Mild', color: 'text-yellow-600', bg: 'bg-yellow-50', desc: "Mild symptoms of depression." };
      if (score <= 14) return { level: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50', desc: "Moderate symptoms. A consultation is recommended." };
      if (score <= 19) return { level: 'Moderately Severe', color: 'text-orange-700', bg: 'bg-orange-100', desc: "Symptoms are impacting daily life significantly." };
      return { level: 'Severe', color: 'text-red-700', bg: 'bg-red-50', desc: "Severe symptoms. Professional help is strongly advised." };
    } else {
      // GAD-7
      if (score <= 4) return { level: 'Minimal', color: 'text-green-600', bg: 'bg-green-50', desc: "Anxiety levels are low." };
      if (score <= 9) return { level: 'Mild', color: 'text-yellow-600', bg: 'bg-yellow-50', desc: "Mild anxiety." };
      if (score <= 14) return { level: 'Moderate', color: 'text-orange-600', bg: 'bg-orange-50', desc: "Moderate anxiety. Evaluation recommended." };
      return { level: 'Severe', color: 'text-red-700', bg: 'bg-red-50', desc: "Severe anxiety. Please seek professional support." };
    }
  };

  // Render PDF Viewer Modal
  const renderPdfViewer = () => {
    if (!viewingDoc) return null;

    return (
      <div className="fixed inset-0 z-[120] flex items-center justify-center p-4 sm:p-6 bg-slate-900/90 backdrop-blur-md animate-fade-in">
        <div className="bg-white rounded-xl shadow-2xl w-full max-w-6xl h-full md:h-[90vh] flex flex-col overflow-hidden relative animate-fade-in-down">
          
          <div className="flex justify-between items-center px-4 py-3 border-b border-slate-200 bg-slate-50 flex-shrink-0">
             <h3 className="font-bold text-slate-700 flex items-center gap-2 truncate pr-4">
                <FileText className="w-5 h-5 text-primary-600 shrink-0" />
                <span className="truncate">{PATIENT_FORMS.find(f => f.filename === viewingDoc)?.title || 'Document Viewer'}</span>
             </h3>
             <div className="flex items-center gap-2 shrink-0">
                <a 
                  href={`/documents/${viewingDoc}`} 
                  download
                  className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors hidden sm:block"
                  title="Download PDF"
                >
                  <Download className="w-5 h-5" />
                </a>
                <a 
                  href={`/documents/${viewingDoc}`} 
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2 text-slate-500 hover:text-primary-600 hover:bg-primary-50 rounded-full transition-colors"
                  title="Open in New Tab"
                >
                  <ExternalLink className="w-5 h-5" />
                </a>
                <button 
                  onClick={() => setViewingDoc(null)} 
                  className="p-2 text-slate-500 hover:text-red-600 hover:bg-red-50 rounded-full transition-colors"
                  title="Close Preview"
                >
                  <X className="w-6 h-6" />
                </button>
             </div>
          </div>

          <div className="flex-grow bg-slate-200 relative">
             <iframe 
               src={`/documents/${viewingDoc}`} 
               className="w-full h-full absolute inset-0 block"
               title="PDF Viewer"
             >
                <div className="flex flex-col items-center justify-center h-full text-slate-500 p-8 text-center">
                    <AlertTriangle className="w-12 h-12 text-slate-400 mb-4" />
                    <p className="text-lg font-semibold mb-2">Unable to display PDF directly.</p>
                    <p className="mb-6">Your browser may not support embedded PDFs.</p>
                    <a 
                      href={`/documents/${viewingDoc}`} 
                      target="_blank"
                      rel="noopener noreferrer"
                      className="px-6 py-2 bg-primary-600 text-white rounded-lg hover:bg-primary-700 transition-colors"
                    >
                      Open PDF in New Tab
                    </a>
                </div>
             </iframe>
          </div>

        </div>
      </div>
    );
  };

  // Render Assessment Modal
  const renderAssessmentModal = () => {
    if (!activeAssessment) return null;
    const questions = activeAssessment === 'PHQ9' ? PHQ9_QUESTIONS : GAD7_QUESTIONS;
    const result = getResult();
    const score = calculateScore();

    return (
      <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
        <div className="bg-white rounded-2xl shadow-2xl max-w-lg w-full overflow-hidden flex flex-col max-h-[90vh]">
          {/* Header */}
          <div className="bg-primary-50 px-6 py-4 border-b border-primary-100 flex justify-between items-center">
            <h3 className="font-bold text-slate-900 text-lg">
              {activeAssessment === 'PHQ9' ? 'Depression Screening (PHQ-9)' : 'Anxiety Screening (GAD-7)'}
            </h3>
            <button onClick={closeAssessment} className="text-slate-500 hover:text-slate-800 transition-colors">
              <X className="w-6 h-6" />
            </button>
          </div>

          {/* Body */}
          <div className="p-6 overflow-y-auto">
            {!showResult ? (
              <>
                <div className="mb-6">
                   <div className="flex justify-between text-xs font-semibold text-slate-400 uppercase tracking-wider mb-2">
                     <span>Question {currentStep + 1} of {questions.length}</span>
                     <span>{Math.round(((currentStep) / questions.length) * 100)}%</span>
                   </div>
                   <div className="w-full bg-slate-100 rounded-full h-2">
                     <div 
                        className="bg-primary-600 h-2 rounded-full transition-all duration-300" 
                        style={{ width: `${((currentStep) / questions.length) * 100}%` }}
                     ></div>
                   </div>
                </div>
                
                <h4 className="text-xl font-medium text-slate-800 mb-2 leading-relaxed">
                  Over the last 2 weeks, how often have you been bothered by the following problem?
                </h4>
                <p className="text-lg font-bold text-primary-700 mb-8 p-4 bg-primary-50 rounded-lg border border-primary-100">
                  "{questions[currentStep]}"
                </p>

                <div className="space-y-3">
                  {ASSESSMENT_OPTIONS.map((opt) => (
                    <button
                      key={opt.value}
                      onClick={() => handleAnswer(opt.value)}
                      className="w-full text-left px-5 py-4 rounded-xl border border-slate-200 hover:border-primary-500 hover:bg-primary-50 hover:text-primary-800 transition-all font-medium flex justify-between items-center group"
                    >
                      {opt.label}
                      <ChevronRight className="w-4 h-4 opacity-0 group-hover:opacity-100 transition-opacity text-primary-500" />
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <div className="text-center py-4">
                <div className={`inline-flex items-center justify-center p-4 rounded-full mb-6 ${result.bg}`}>
                  {result.level === 'Severe' || result.level === 'Moderately Severe' ? (
                     <AlertTriangle className={`w-10 h-10 ${result.color}`} />
                  ) : (
                     <CheckCircle className={`w-10 h-10 ${result.color}`} />
                  )}
                </div>
                <h4 className="text-sm uppercase tracking-wide text-slate-500 font-bold mb-2">Your Result</h4>
                <div className="text-4xl font-extrabold text-slate-900 mb-2">{score} / {activeAssessment === 'PHQ9' ? 27 : 21}</div>
                <div className={`text-xl font-bold mb-4 ${result.color}`}>{result.level}</div>
                <p className="text-slate-600 mb-8 leading-relaxed max-w-xs mx-auto">
                  {result.desc}
                </p>
                
                <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-500 mb-8 text-left">
                  <strong>Disclaimer:</strong> This screening tool is for informational purposes only and is not a substitute for professional medical advice, diagnosis, or treatment.
                </div>

                <div className="flex flex-col gap-3">
                  <Link 
                    to="/contact" 
                    onClick={closeAssessment}
                    className="w-full bg-primary-600 text-white font-bold py-3 rounded-xl hover:bg-primary-700 transition-colors shadow-md"
                  >
                    Schedule an Appointment
                  </Link>
                   <a 
                    href={`tel:${PHONE_NUMBER.replace(/\D/g,'')}`}
                    className="w-full bg-white text-slate-700 border border-slate-300 font-bold py-3 rounded-xl hover:bg-slate-50 transition-colors"
                  >
                    Call {PHONE_NUMBER}
                  </a>
                   <button 
                    onClick={closeAssessment}
                    className="w-full text-slate-500 font-medium py-2 hover:text-slate-700"
                  >
                    Close
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    );
  };

  return (
    <div className="animate-fade-in pb-20">
      {renderAssessmentModal()}
      {renderPdfViewer()}
      
      <div className="bg-white/30 backdrop-blur-md py-12 border-b border-white/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <h1 className="text-3xl font-extrabold text-slate-900">Patient Resources</h1>
          <p className="mt-2 text-slate-600">
            Forms, guides, and tools to help you prepare for your visit.
          </p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-12 grid grid-cols-1 lg:grid-cols-3 gap-12">
        
        {/* Main Content Area */}
        <div className="lg:col-span-2 space-y-12">
          
          {/* Intake Section */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-primary-100 rounded-lg">
                <FileText className="w-6 h-6 text-primary-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Patient Forms</h2>
            </div>
            <p className="text-slate-600 mb-6">
              To speed up your check-in process, please review and complete the necessary forms before your first appointment. You can view them directly in your browser or download them for printing.
            </p>
            <div className="grid grid-cols-1 gap-4">
              {PATIENT_FORMS.map((form) => (
                <div 
                  key={form.title} 
                  className="flex flex-col md:flex-row md:items-center justify-between p-5 bg-white/70 backdrop-blur-sm border border-white/60 rounded-xl hover:border-primary-300 hover:bg-white transition-all shadow-sm group gap-4"
                >
                  <div className="flex-grow">
                    <h3 className="text-base font-bold text-slate-800 group-hover:text-primary-700 flex items-center gap-2">
                       <FileText className="w-4 h-4 text-primary-400" />
                       {form.title}
                    </h3>
                    <p className="text-sm text-slate-500 mt-1 pl-6">{form.description}</p>
                  </div>
                  
                  <div className="flex items-center gap-3 shrink-0 pl-6 md:pl-0">
                    <button 
                      onClick={() => setViewingDoc(form.filename)}
                      className="flex items-center justify-center gap-2 px-4 py-2 rounded-lg text-sm font-semibold transition-colors bg-white border border-primary-200 text-primary-700 hover:bg-primary-50 hover:border-primary-300 shadow-sm min-w-[100px]"
                      title="View document"
                    >
                      <Eye className="w-4 h-4" /> View
                    </button>
                    <a 
                      href={`/documents/${form.filename}`}
                      download
                      className="flex items-center justify-center gap-2 px-3 py-2 rounded-lg text-sm font-semibold transition-colors bg-primary-50 text-primary-600 hover:bg-primary-100 shadow-sm border border-transparent hover:border-primary-200"
                      title="Download PDF"
                    >
                      <Download className="w-4 h-4" />
                    </a>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* Screening Tools */}
          <section>
            <div className="flex items-center gap-3 mb-6">
              <div className="p-2 bg-secondary-100 rounded-lg">
                <ExternalLink className="w-6 h-6 text-secondary-700" />
              </div>
              <h2 className="text-2xl font-bold text-slate-900">Self-Screening Tools</h2>
            </div>
            <p className="text-slate-600 mb-6">
              These online assessments can help you determine if you should seek professional help. <em>Note: These are not diagnostic tools.</em>
            </p>
            <ul className="space-y-4">
              <li className="block p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-white/60 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">PHQ-9 (Depression Screening)</h3>
                    <p className="text-slate-500 mt-1 mb-4">A 9-question instrument used to screen for depression severity.</p>
                  </div>
                  <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">~3 Mins</span>
                </div>
                <button 
                  onClick={() => startAssessment('PHQ9')}
                  className="inline-flex items-center text-sm font-bold text-white bg-primary-600 px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Take Assessment &rarr;
                </button>
              </li>
               <li className="block p-6 bg-white/70 backdrop-blur-sm rounded-xl border border-white/60 shadow-sm hover:shadow-md transition-all">
                <div className="flex justify-between items-start">
                  <div>
                    <h3 className="font-bold text-lg text-slate-800">GAD-7 (Anxiety Screening)</h3>
                    <p className="text-slate-500 mt-1 mb-4">A 7-item scale used to measure generalized anxiety disorder.</p>
                  </div>
                   <span className="bg-blue-100 text-blue-700 text-xs font-bold px-2 py-1 rounded">~2 Mins</span>
                </div>
                <button 
                   onClick={() => startAssessment('GAD7')}
                   className="inline-flex items-center text-sm font-bold text-white bg-primary-600 px-4 py-2 rounded-lg hover:bg-primary-700 transition-colors"
                >
                  Take Assessment &rarr;
                </button>
              </li>
            </ul>
          </section>
        </div>

        {/* Sidebar */}
        <div className="space-y-8">
           <div className="bg-white/70 backdrop-blur-sm p-6 rounded-xl shadow-md border border-white/60">
             <h3 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
               <HelpCircle className="w-5 h-5 text-primary-500" />
               FAQ
             </h3>
             <div className="space-y-4">
               <div>
                 <p className="font-semibold text-sm text-slate-800">Do you accept insurance?</p>
                 <p className="text-sm text-slate-500 mt-1">Yes, we accept Maryland Medicaid, Medicare, and most major private commercial plans (BCBS, United, Cigna, Aetna).</p>
               </div>
               <div>
                 <p className="font-semibold text-sm text-slate-800">What is the cancellation policy?</p>
                 <p className="text-sm text-slate-500 mt-1">Please provide at least 24 hours notice to avoid a cancellation fee.</p>
               </div>
             </div>
           </div>

           <div className="bg-slate-900/95 backdrop-blur-sm text-white p-6 rounded-xl shadow-md">
             <h3 className="text-lg font-bold mb-3">Crisis Support</h3>
             <p className="text-sm text-slate-300 mb-4">
               If you are in immediate danger, call 911 or go to the nearest ER.
             </p>
             <div className="space-y-3">
               <div className="block p-3 bg-slate-800 rounded-lg">
                 <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Suicide & Crisis Lifeline</p>
                 <p className="text-xl font-bold text-white">988</p>
               </div>
               <div className="block p-3 bg-slate-800 rounded-lg">
                 <p className="text-xs text-slate-400 uppercase tracking-wider font-bold">Crisis Text Line</p>
                 <p className="text-sm font-medium text-white">Text <span className="text-primary-400">HOME</span> to <span className="text-white font-bold">741741</span></p>
               </div>
             </div>
           </div>
        </div>

      </div>
    </div>
  );
};

export default Resources;