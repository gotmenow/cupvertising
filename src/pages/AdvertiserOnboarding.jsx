import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from "@/api/base44Client";
import { ChatMessage, OptionButton, ChatInput } from '@/components/onboarding/ChatComponents';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Loader2, Target, Megaphone, ArrowLeft, ArrowRight, Plus, X } from 'lucide-react';

export default function AdvertiserOnboarding() {
  const navigate = useNavigate();
  const bottomRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState('start');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);
  const [tempAudiences, setTempAudiences] = useState([]);
  const [tempLocations, setTempLocations] = useState([]);
  const [manualLocation, setManualLocation] = useState("");
  const [postcode, setPostcode] = useState("");
  const [radius, setRadius] = useState("5");

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
      addToHistory('system', `Nice to meet you, ${name}. Which cities or regions are you targeting? (Select all that apply)`);
    }, 500);
  };

  const toggleLocation = (loc) => {
    setTempLocations(prev => 
      prev.includes(loc) 
        ? prev.filter(l => l !== loc)
        : [...prev, loc]
    );
  };

  const addManualLocation = () => {
    if (manualLocation.trim()) {
      const loc = manualLocation.trim();
      if (!tempLocations.includes(loc)) {
        setTempLocations(prev => [...prev, loc]);
      }
      setManualLocation("");
    }
  };

  const addPostcodeLocation = () => {
    if (postcode.trim()) {
      const loc = `${postcode.trim().toUpperCase()} (+${radius} miles)`;
      if (!tempLocations.includes(loc)) {
        setTempLocations(prev => [...prev, loc]);
      }
      setPostcode("");
    }
  };

  const confirmLocation = () => {
    if (tempLocations.length === 0) return;
    const locationString = tempLocations.join(", ");
    addToHistory('user', locationString);
    setData(prev => ({ ...prev, location: locationString }));
    setStep('audience');
    setTimeout(() => {
      addToHistory('system', "Got it. And who is your primary target audience?");
    }, 500);
  };

  const toggleAudience = (audience) => {
    setTempAudiences(prev => 
      prev.includes(audience) 
        ? prev.filter(a => a !== audience)
        : [...prev, audience]
    );
  };

  const confirmAudience = () => {
    if (tempAudiences.length === 0) return;
    const audienceString = tempAudiences.join(", ");
    addToHistory('user', audienceString);
    setData(prev => ({ ...prev, audience: audienceString }));
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

  const handleStartRequest = () => {
    addToHistory('user', "Yes, Request Proposal");
    setStep('details_contact');
    setTimeout(() => addToHistory('system', "Perfect. To personalize your proposal, what is your full name?"), 500);
  };

  const handleContactSubmit = (contactName) => {
    addToHistory('user', contactName);
    setData(prev => ({ ...prev, contactName }));
    setStep('details_phone');
    setTimeout(() => addToHistory('system', "And the best phone number to reach you?"), 500);
  };

  const handlePhoneSubmit = (phone) => {
    addToHistory('user', phone);
    setData(prev => ({ ...prev, phone }));
    setStep('details_email');
    setTimeout(() => addToHistory('system', "Finally, your email address?"), 500);
  };

  const handleEmailSubmit = async (email) => {
    addToHistory('user', email);
    setLoading(true);
    
    try {
      await base44.entities.AdvertiserEnquiry.create({
        name: data.contactName,
        email: email,
        business_name: data.name,
        phone: data.phone,
        target_audience: `${data.audience} in ${data.location}`,
        campaign_budget: data.budgetRange,
        interested_mediums: ["Beverage Cups & Napkins"],
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
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-end max-h-[40vh] overflow-y-auto p-1">
                {[
                  "London", "Manchester", "Birmingham", "Leeds", "Liverpool", 
                  "Glasgow", "Edinburgh", "Bristol", "Cardiff", "Newcastle",
                  "Nottingham", "Sheffield", "Southampton", "Nationwide"
                ].map(loc => (
                  <OptionButton 
                    key={loc} 
                    onClick={() => toggleLocation(loc)}
                    selected={tempLocations.includes(loc)}
                  >
                    {loc}
                  </OptionButton>
                ))}
                {tempLocations.filter(l => ![
                  "London", "Manchester", "Birmingham", "Leeds", "Liverpool", 
                  "Glasgow", "Edinburgh", "Bristol", "Cardiff", "Newcastle",
                  "Nottingham", "Sheffield", "Southampton", "Nationwide"
                ].includes(l)).map(loc => (
                  <OptionButton 
                    key={loc} 
                    onClick={() => toggleLocation(loc)}
                    selected={true}
                  >
                    {loc} <X className="ml-2 w-3 h-3 inline" />
                  </OptionButton>
                ))}
              </div>

              {/* Manual & Postcode Entry */}
              <div className="bg-slate-50 p-4 rounded-xl border border-slate-100 space-y-4 ml-auto max-w-[90%] md:max-w-[80%]">
                 <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Add Custom Location</div>
                    <div className="flex gap-2">
                        <Input 
                            placeholder="City, Region, or Area..." 
                            value={manualLocation}
                            onChange={(e) => setManualLocation(e.target.value)}
                            className="bg-white"
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addManualLocation())}
                        />
                        <Button onClick={addManualLocation} size="icon" variant="outline" className="shrink-0 bg-white hover:bg-slate-100">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                 </div>
                 
                 <div className="space-y-2">
                    <div className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Add by Postcode</div>
                    <div className="flex gap-2 items-center">
                        <Input 
                            placeholder="Postcode (e.g. M1)" 
                            value={postcode}
                            onChange={(e) => setPostcode(e.target.value)}
                            className="bg-white"
                            onKeyDown={(e) => e.key === 'Enter' && (e.preventDefault(), addPostcodeLocation())}
                        />
                        <select 
                            className="h-10 rounded-md border border-input bg-white px-3 py-2 text-sm ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
                            value={radius}
                            onChange={(e) => setRadius(e.target.value)}
                        >
                            <option value="1">1 mi</option>
                            <option value="3">3 mi</option>
                            <option value="5">5 mi</option>
                            <option value="10">10 mi</option>
                            <option value="20">20 mi</option>
                        </select>
                        <Button onClick={addPostcodeLocation} size="icon" variant="outline" className="shrink-0 bg-white hover:bg-slate-100">
                            <Plus className="w-4 h-4" />
                        </Button>
                    </div>
                 </div>
              </div>

              <div className="flex justify-end">
                <Button 
                  onClick={confirmLocation}
                  disabled={tempLocations.length === 0}
                  className="rounded-full px-6"
                >
                  Confirm Locations <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
            </div>
          )}

          {step === 'audience' && (
            <div className="space-y-4">
              <div className="flex flex-wrap gap-2 justify-end max-h-[60vh] overflow-y-auto p-1">
                {[
                  "Gen Z (18-24)", "Millennials (25-40)", "Gen X (41-55)", 
                  "Students", "Office Professionals", "Parents", "Tourists",
                  "Foodies", "Tech Enthusiasts", "Fitness & Health", "Nightlife"
                ].map(aud => (
                  <OptionButton 
                    key={aud} 
                    onClick={() => toggleAudience(aud)}
                    selected={tempAudiences.includes(aud)}
                  >
                    {aud}
                  </OptionButton>
                ))}
              </div>
              <div className="flex justify-end">
                <Button 
                  onClick={confirmAudience}
                  disabled={tempAudiences.length === 0}
                  className="rounded-full px-6"
                >
                  Confirm Selection <ArrowRight className="ml-2 w-4 h-4" />
                </Button>
              </div>
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
            <div className="flex justify-center w-full">
              <Button onClick={handleStartRequest} className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg animate-pulse">
                Yes, Request Proposal <Megaphone className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}

          {step === 'details_contact' && (
            <ChatInput onSend={handleContactSubmit} placeholder="Your Full Name..." />
          )}

          {step === 'details_phone' && (
            <ChatInput onSend={handlePhoneSubmit} placeholder="Phone Number..." type="tel" />
          )}

          {step === 'details_email' && (
            <ChatInput onSend={handleEmailSubmit} placeholder="Email Address..." type="email" />
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