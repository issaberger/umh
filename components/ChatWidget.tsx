import React, { useState, useRef, useEffect } from 'react';
import { MessageCircle, X, Send, Loader2, Minimize2 } from 'lucide-react';
import { GoogleGenAI, Chat, GenerateContentResponse } from "@google/genai";
import { SERVICES, LOCATIONS, PHONE_NUMBER, CONDITIONS_TREATED, EMAIL_ADDRESS } from '../constants';

// Build the context string from the application constants
const SYSTEM_INSTRUCTION = `You are a warm, professional, and calming AI support agent for "Universality Health Care", a mental health clinic in Maryland.

YOUR KNOWLEDGE BASE:
1. Contact Info:
   - Phone: ${PHONE_NUMBER}
   - Email: ${EMAIL_ADDRESS}
   - Emergency: Call 911 or 988 (Suicide & Crisis Lifeline).

2. Locations:
   ${LOCATIONS.map(l => `- ${l.city}: ${l.address}, ${l.state} ${l.zip}`).join('\n   ')}

3. Services Offered:
   ${SERVICES.map(s => `- ${s.title}: ${s.description}`).join('\n   ')}

4. Conditions Treated:
   ${CONDITIONS_TREATED.join(', ')}

5. Insurance/Payment:
   - Accepted: Medicare, Maryland Medicaid, BCBS, United, Cigna, Aetna, CareFirst, Tricare.
   - Sliding scale available for uninsured based on income.

GUIDELINES:
- Tone: Empathetic, professional, calm, and concise.
- Goal: Help users find information about services, locations, and booking.
- IMPORTANT: You are NOT a doctor. Do not give medical diagnosis or specific treatment advice. If a user describes severe symptoms, gently suggest they seek professional help or contact emergency services if urgent.
- Call to Action: Encourage booking an appointment via the "Book Now" button or calling the office.
- Length: Keep responses short (1-3 sentences) unless a detailed list is requested.
`;

interface Message {
  role: 'user' | 'model';
  text: string;
}

const ChatWidget: React.FC = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'model', text: "Hello! I'm the Universality Health Care virtual assistant. How can I help you today?" }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  
  // Ref to hold the Chat session instance
  const chatSessionRef = useRef<Chat | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const initChat = () => {
    if (!chatSessionRef.current) {
      try {
        const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
        chatSessionRef.current = ai.chats.create({
          model: 'gemini-3-flash-preview',
          config: {
            systemInstruction: SYSTEM_INSTRUCTION,
          },
        });
      } catch (error) {
        console.error("Failed to initialize chat", error);
      }
    }
  };

  // Initialize chat when opened
  useEffect(() => {
    if (isOpen) {
      initChat();
    }
  }, [isOpen]);

  const handleSend = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg = input.trim();
    setInput('');
    setMessages(prev => [...prev, { role: 'user', text: userMsg }]);
    setIsLoading(true);

    try {
      if (!chatSessionRef.current) initChat();
      
      if (chatSessionRef.current) {
        const result: GenerateContentResponse = await chatSessionRef.current.sendMessage({ 
          message: userMsg 
        });
        
        const responseText = result.text || "I apologize, I'm having trouble connecting right now. Please call our office.";
        
        setMessages(prev => [...prev, { role: 'model', text: responseText }]);
      }
    } catch (error) {
      console.error("Chat error:", error);
      setMessages(prev => [...prev, { role: 'model', text: "I'm sorry, I'm having technical difficulties. Please call us at " + PHONE_NUMBER + "." }]);
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="fixed bottom-6 right-6 z-50 font-sans">
      {/* Chat Window */}
      {isOpen && (
        <div className="absolute bottom-16 right-0 w-[350px] sm:w-[380px] bg-white rounded-2xl shadow-2xl border border-slate-200 overflow-hidden flex flex-col animate-fade-in origin-bottom-right mb-2 max-h-[600px] h-[70vh]">
          
          {/* Header */}
          <div className="bg-primary-700 p-4 flex justify-between items-center text-white">
            <div className="flex items-center gap-3">
              <div className="w-2 h-2 rounded-full bg-green-400 animate-pulse"></div>
              <div>
                <h3 className="font-bold text-sm">Patient Support</h3>
                <p className="text-xs text-primary-200">Online</p>
              </div>
            </div>
            <button 
              onClick={() => setIsOpen(false)} 
              className="text-primary-100 hover:text-white transition-colors"
            >
              <Minimize2 className="w-5 h-5" />
            </button>
          </div>

          {/* Messages */}
          <div className="flex-1 overflow-y-auto p-4 space-y-4 bg-slate-50">
            {messages.map((msg, idx) => (
              <div 
                key={idx} 
                className={`flex ${msg.role === 'user' ? 'justify-end' : 'justify-start'}`}
              >
                <div 
                  className={`max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed ${
                    msg.role === 'user' 
                      ? 'bg-primary-600 text-white rounded-br-none' 
                      : 'bg-white border border-slate-200 text-slate-700 rounded-bl-none shadow-sm'
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {isLoading && (
              <div className="flex justify-start">
                <div className="bg-white border border-slate-200 p-3 rounded-2xl rounded-bl-none shadow-sm">
                  <Loader2 className="w-5 h-5 text-primary-500 animate-spin" />
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          {/* Input Area */}
          <div className="p-4 bg-white border-t border-slate-100">
            <div className="flex items-center gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyPress}
                placeholder="Type a message..."
                className="flex-1 bg-slate-50 border border-slate-200 rounded-full px-4 py-2 text-sm focus:outline-none focus:border-primary-500 focus:ring-1 focus:ring-primary-500 transition-all text-slate-800"
              />
              <button
                onClick={handleSend}
                disabled={!input.trim() || isLoading}
                className="bg-primary-600 text-white p-2 rounded-full hover:bg-primary-700 disabled:opacity-50 disabled:cursor-not-allowed transition-colors shadow-sm"
              >
                <Send className="w-4 h-4" />
              </button>
            </div>
            <div className="text-center mt-2">
               <p className="text-[10px] text-slate-400">
                 AI-generated responses. For emergencies, call 911.
               </p>
            </div>
          </div>
        </div>
      )}

      {/* Toggle Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="bg-primary-600 hover:bg-primary-700 text-white p-4 rounded-full shadow-lg hover:shadow-xl transition-all transform hover:-translate-y-1"
      >
        {isOpen ? <X className="w-6 h-6" /> : <MessageCircle className="w-6 h-6" />}
      </button>
    </div>
  );
};

export default ChatWidget;