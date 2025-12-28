import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from "@/api/base44Client";
import { ChatMessage, OptionButton, ChatInput } from '@/components/onboarding/ChatComponents';
import { Button } from "@/components/ui/button";
import { Loader2, Target, Megaphone, ArrowLeft } from 'lucide-react';

export default function AdvertiserOnboarding() {
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState('start');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  useEffect(() => {
    addToHistory('system', "Hello! 👋 Welcome to the future of hyperlocal advertising.");
    setTimeout(() => {
      addToHistory('system', "To give you an accurate reach forecast, I need a few details. First, what is your business name?");
      setStep('name');
    }, 800);
  }, []);

  const addToHistory = (role, content) => {
    setHistory(prev => [...prev, { id: Date.now(), role, content }]);
  };

  const handleNameSubmit = (name) => {
    addToHistory('user', name);
    setData(prev => ({ ...prev, name }));
    setStep('location');
    setTimeout(() => {
      addToHistory('system', `Nice to meet you, ${name}. Which city or region are you targeting?`);
    }, 500);
  };

  const handleLocationSubmit = (location) => {
    addToHistory('user', location);
    setData(prev => ({ ...prev, location }));
    setStep('audience');
    setTimeout(() => {
      addToHistory('system', "Got it. And who is your primary target audience?");
    }, 500);
  };

  const handleAudienceSelect = (audience) => {
    addToHistory('user', audience);
    setData(prev => ({ ...prev, audience }));
    setStep('budget');
    setTimeout(() => {
      addToHistory('system', "Excellent. Lastly, what is your estimated monthly campaign budget?");
    }, 500);
  };

  const handleBudgetSelect = (budgetRange, value) => {
    addToHistory('user', budgetRange);
    setData(prev => ({ ...prev, budgetRange, budgetValue: value }));
    setStep('calculating');

    setTimeout(() => {
      addToHistory('system', "Analysing our network inventory in that region...");
      setLoading(true);
      
      setTimeout(() => {
        setLoading(false);
        // Calculate estimated reach: ~£0.04 per impression (conservative)
        const minReach = Math.floor((value * 0.8) / 0.04); 
        const maxReach = Math.floor((value * 1.2) / 0.03); 
        
        setStep('results');
        addToHistory('system', (
          <div className="space-y-4">
            <p className="text-lg">Here is your campaign forecast:</p>
            <div className="bg-teal-50 p-6 rounded-xl border border-teal-100 text-center">
              <div className="text-sm text-teal-600 font-bold uppercase tracking-wider mb-1">Estimated Monthly Reach</div>
              <div className="text-4xl font-bold text-teal-800">{minReach.toLocaleString()} - {maxReach.toLocaleString()}</div>
              <p className="text-sm text-teal-600 mt-2">Physical impressions with {data.audience} in {data.location}</p>
            </div>
            <div className="grid grid-cols-2 gap-2 text-sm">
               <div className="bg-white p-3 rounded border text-center">
                 <span className="block font-bold text-slate-700">~15 mins</span>
                 <span className="text-slate-500">Dwell Time</span>
               </div>
               <div className="bg-white p-3 rounded border text-center">
                 <span className="block font-bold text-slate-700">100%</span>
                 <span className="text-slate-500">Viewability</span>
               </div>
            </div>
            <p className="font-medium">Shall we secure this inventory for you?</p>
          </div>
        ));
      }, 1500);
    }, 500);
  };

  const handleEmailSubmit = async (email) => {
    addToHistory('user', email);
    setLoading(true);
    
    try {
      await base44.entities.AdvertiserEnquiry.create({
        name: "Onboarding User",
        email: email,
        business_name: data.name,
        target_audience: `${data.audience} in ${data.location}`,
        campaign_budget: data.budgetRange,
        interested_mediums: ["Beverage Cups & Napkins"], // Default
        message: `Chat Onboarding: Budget £${data.budgetValue}`
      });

      setLoading(false);
      setStep('completed');
      addToHistory('system', "Proposal request sent! 🚀 Our ad operations team will send you a detailed media plan within 24 hours.");
    } catch (error) {
      console.error(error);
      setLoading(false);
      addToHistory('system', "Something went wrong saving your enquiry. Please try again.");
    }
  };

  return (
    <div className="min-h-screen bg-slate-50 flex flex-col">
      <header className="bg-white border-b sticky top-0 z-10 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
           <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="font-bold text-lg flex items-center gap-2">
            <Megaphone className="w-5 h-5 text-teal-600" />
            <span>Campaign Planner</span>
          </div>
        </div>
      </header>

      <main className="flex-1 max-w-2xl mx-auto w-full p-4 pb-32">
        {history.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role}>
            {msg.content}
          </ChatMessage>
        ))}
        {loading && (
          <ChatMessage role="system">
             <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Processing...</span>
            </div>
          </ChatMessage>
        )}
        <div ref={bottomRef} />
      </main>

      <div className="fixed bottom-0 left-0 right-0 bg-white border-t p-4 pb-8 z-20">
        <div className="max-w-2xl mx-auto">
          {step === 'name' && (
            <ChatInput onSend={handleNameSubmit} placeholder="E.g. Joe's Burgers / TechStart Inc" />
          )}

          {step === 'location' && (
            <ChatInput onSend={handleLocationSubmit} placeholder="E.g. London, Manchester, Nationwide" />
          )}

          {step === 'audience' && (
            <div className="flex flex-wrap gap-2 justify-end">
              {['Students / Gen Z', 'Office Workers', 'Families', 'Event Goers', 'High Net Worth'].map(aud => (
                <OptionButton key={aud} onClick={() => handleAudienceSelect(aud)}>
                  {aud}
                </OptionButton>
              ))}
            </div>
          )}

          {step === 'budget' && (
            <div className="flex flex-wrap gap-2 justify-end">
              <OptionButton onClick={() => handleBudgetSelect('Starter (< £1k)', 1000)}>Starter (&lt; £1k)</OptionButton>
              <OptionButton onClick={() => handleBudgetSelect('Growth (£1k - £5k)', 3000)}>£1k - £5k</OptionButton>
              <OptionButton onClick={() => handleBudgetSelect('Scale (£5k - £20k)', 10000)}>£5k - £20k</OptionButton>
              <OptionButton onClick={() => handleBudgetSelect('Enterprise (£20k+)', 25000)}>£20k+</OptionButton>
            </div>
          )}

          {step === 'results' && (
            <ChatInput onSend={handleEmailSubmit} placeholder="Enter email to get media kit..." type="email" />
          )}

          {step === 'completed' && (
             <div className="flex justify-center">
               <Button onClick={() => navigate(createPageUrl('Home'))} className="bg-slate-900 text-white">
                 Back to Home
               </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}