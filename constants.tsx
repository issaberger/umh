import React from 'react';
import { 
  Brain, 
  Pill, 
  Users, 
  Home, 
  Activity, 
  HeartHandshake, 
  Monitor,
  FileText,
  DollarSign
} from 'lucide-react';

export const BRAND_NAME = "Universality Mental Health Clinic";
export const PHONE_NUMBER = "(410) 555-0199";
export const EMAIL_ADDRESS = "care@universalityhealth.com";

export const NAV_LINKS = [
  { path: "/", label: "Home" },
  { path: "/services", label: "Services" },
  { path: "/conditions", label: "Conditions" },
  { path: "/telehealth", label: "Telehealth" },
  { path: "/resources", label: "Resources" },
  { path: "/sliding-scale", label: "Sliding Scale" },
  { path: "/contact", label: "Contact" },
];

export const LOCATIONS = [
  {
    city: "Salisbury",
    address: "123 Healing Way, Suite 100",
    state: "MD",
    zip: "21801",
    phone: "(410) 555-0199",
    lat: 38.3607,
    lng: -75.5994
  },
  {
    city: "Baltimore (Dundalk)",
    address: "456 Recovery Blvd, Floor 2",
    state: "MD",
    zip: "21222",
    phone: "(410) 555-0198",
    lat: 39.2643,
    lng: -76.5205
  }
];

export const TESTIMONIALS = [
  {
    id: 1,
    quote: "I finally feel heard. The staff at Universality actually took the time to understand my history before suggesting medication. It’s been a life-changing experience.",
    author: "Sarah M.",
    location: "Baltimore, MD"
  },
  {
    id: 2,
    quote: "The telehealth options made it so easy for me to stick to my therapy sessions despite my busy work schedule. Highly recommend their professional team.",
    author: "James D.",
    location: "Salisbury, MD"
  },
  {
    id: 3,
    quote: "Finding a provider for my son was a nightmare until we found this clinic. They are patient, kind, and truly skilled with children.",
    author: "Elena R.",
    location: "Parent"
  }
];

export const SERVICES = [
  {
    id: 'psych-eval',
    title: "Psychiatric Evaluation",
    description: "Comprehensive assessments to understand your unique mental health needs and formulate a personalized care plan.",
    icon: <Brain className="w-8 h-8 text-primary-600" />
  },
  {
    id: 'med-management',
    title: "Medication Management",
    description: "Ongoing support and monitoring to ensure your medication is effective, safe, and adjusted to your progress.",
    icon: <Pill className="w-8 h-8 text-primary-600" />
  },
  {
    id: 'therapy',
    title: "Therapy (Individual & Group)",
    description: "Evidence-based therapy sessions for individuals, families, and groups to build coping skills and resilience.",
    icon: <Users className="w-8 h-8 text-primary-600" />
  },
  {
    id: 'prp',
    title: "Psychiatric Rehabilitation (PRP)",
    description: "Community-based support to help adults and minors build independent living and social skills.",
    icon: <Home className="w-8 h-8 text-primary-600" />
  },
  {
    id: 'iop',
    title: "Intensive Outpatient (IOP)",
    description: "Structured therapy programs providing a higher level of care while allowing you to live at home.",
    icon: <Activity className="w-8 h-8 text-primary-600" />
  },
  {
    id: 'mat',
    title: "Medication-Assisted Treatment",
    description: "Holistic recovery support combining medication with counseling for substance use disorders.",
    icon: <HeartHandshake className="w-8 h-8 text-primary-600" />
  },
  {
    id: 'telehealth',
    title: "Telehealth Services",
    description: "Secure, HIPAA-compliant video appointments available throughout Maryland.",
    icon: <Monitor className="w-8 h-8 text-primary-600" />
  }
];

export const CONDITIONS_TREATED = [
  "Depression (MDD)",
  "Anxiety Disorders",
  "ADHD / ADD",
  "Bipolar Disorder",
  "PTSD & Trauma",
  "Schizophrenia",
  "Substance Use Disorders",
  "Behavioral Issues in Children",
  "Grief & Loss",
  "Obsessive-Compulsive Disorder (OCD)"
];

// Assessment Data
export const ASSESSMENT_OPTIONS = [
  { label: "Not at all", value: 0 },
  { label: "Several days", value: 1 },
  { label: "More than half the days", value: 2 },
  { label: "Nearly every day", value: 3 },
];

export const PHQ9_QUESTIONS = [
  "Little interest or pleasure in doing things",
  "Feeling down, depressed, or hopeless",
  "Trouble falling or staying asleep, or sleeping too much",
  "Feeling tired or having little energy",
  "Poor appetite or overeating",
  "Feeling bad about yourself — or that you are a failure or have let yourself or your family down",
  "Trouble concentrating on things, such as reading the newspaper or watching television",
  "Moving or speaking so slowly that other people could have noticed? Or the opposite — being so fidgety or restless that you have been moving around a lot more than usual",
  "Thoughts that you would be better off dead or of hurting yourself in some way"
];

export const GAD7_QUESTIONS = [
  "Feeling nervous, anxious, or on edge",
  "Not being able to stop or control worrying",
  "Worrying too much about different things",
  "Trouble relaxing",
  "Being so restless that it is hard to sit still",
  "Becoming easily annoyed or irritable",
  "Feeling afraid as if something awful might happen"
];