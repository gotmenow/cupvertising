import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { base44 } from "@/api/base44Client";
import { ChatMessage, OptionButton, ChatInput } from '@/components/onboarding/ChatComponents';
import { Button } from "@/components/ui/button";
import { Loader2, Sparkles, Coins, ArrowLeft, ArrowRight, Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function BusinessOnboarding() {
  const navigate = useNavigate();
  const mainRef = useRef(null);
  const bottomRef = useRef(null);
  const [history, setHistory] = useState([]);
  const [step, setStep] = useState('start');
  const [data, setData] = useState({});
  const [loading, setLoading] = useState(false);

  // Auto-scroll logic
  useEffect(() => {
    if (mainRef.current) {
        // Scroll container to bottom
        mainRef.current.scrollTo({
            top: mainRef.current.scrollHeight,
            behavior: 'smooth'
        });
    }
  }, [history, step]); // Re-scroll when step changes (input area might change height)

  // Initial greeting
  useEffect(() => {
    addToHistory('system', "Hi there! 👋 I'm your Cupvertising assistant.");
    setTimeout(() => {
      addToHistory('system', "To get started, what is your full name?");
      setStep('intro_name');
    }, 800);
  }, []);

  const addToHistory = (role, content, component = null) => {
    setHistory(prev => [...prev, { id: Date.now(), role, content, component }]);
  };

  const handleIntroName = (name) => {
    addToHistory('user', name);
    setData(prev => ({ ...prev, name }));
    setStep('intro_email');
    setTimeout(() => {
      addToHistory('system', `Nice to meet you, ${name.split(' ')[0]}! What is your email address?`);
    }, 500);
  };

  const handleIntroEmail = (email) => {
    addToHistory('user', email);
    setData(prev => ({ ...prev, email }));
    setStep('intro_phone');
    setTimeout(() => {
        addToHistory('system', "And the best phone number to reach you?");
    }, 500);
  };

  const handleIntroPhone = (phone) => {
    addToHistory('user', phone);
    setData(prev => ({ ...prev, phone }));
    setStep('type');
    setTimeout(() => {
        addToHistory('system', "Thanks! Now, let's identify your savings. What type of business do you run?");
    }, 500);
  };

  const handleTypeSelect = (type) => {
    addToHistory('user', type);
    setData(prev => ({ ...prev, type }));
    setStep('products');
    setTimeout(() => {
      addToHistory('system', `Great! For a ${type}, we typically replace these items. Which ones do you buy regularly? (Select all that apply)`);
    }, 500);
  };

  const handleProductSelect = (products) => {
    const productList = products.join(', ');
    addToHistory('user', productList);
    setData(prev => ({ ...prev, products }));
    setStep('volume');
    setTimeout(() => {
      addToHistory('system', "Got it. Roughly how much do you spend monthly on these disposables?");
    }, 500);
  };

  const handleVolumeSelect = (volume, amount) => {
    addToHistory('user', volume);
    setData(prev => ({ ...prev, volume, amount }));
    setStep('calculating');
    
    setTimeout(() => {
      addToHistory('system', "Crunching the numbers...");
      setLoading(true);
      setTimeout(() => {
        setLoading(false);
        const annualSavings = amount * 12;
        setStep('results');
        addToHistory('system', (
          <div className="space-y-4">
            <p className="text-lg">Here's what you could save:</p>
            <div className="bg-green-50 p-6 rounded-xl border border-green-100 text-center">
              <div className="text-sm text-green-600 font-bold uppercase tracking-wider mb-1">Estimated Annual Savings</div>
              <div className="text-4xl font-bold text-green-700">£{annualSavings.toLocaleString()}</div>
              <p className="text-sm text-green-600 mt-2">That's £{amount} back in your pocket every month!</p>
            </div>
            <p>We can supply your {data.products?.slice(0, 3).join(', ')} completely free of charge, funded by non-intrusive ads.</p>
            <p className="font-medium">Ready to claim your free inventory?</p>
          </div>
        ));
      }, 1500);
    }, 500);
  };

  const handleStartEnrollment = () => {
    addToHistory('user', "Yes, claim my free inventory");
    setStep('details_name');
    setTimeout(() => addToHistory('system', "Fantastic! Let's get your account set up. What is your full name?"), 500);
  };

  const handleNameSubmit = (name) => {
    addToHistory('user', name);
    setData(prev => ({ ...prev, name }));
    setStep('details_business');
    setTimeout(() => addToHistory('system', "And what is the name of your business?"), 500);
  };

  const handleBusinessSubmit = (business_name) => {
    addToHistory('user', business_name);
    setData(prev => ({ ...prev, business_name }));
    setStep('details_phone');
    setTimeout(() => addToHistory('system', "What is the best phone number to reach you?"), 500);
  };

  const handlePhoneSubmit = (phone) => {
    addToHistory('user', phone);
    setData(prev => ({ ...prev, phone }));
    setStep('details_address');
    setTimeout(() => addToHistory('system', "Where are you located? (City or full address)"), 500);
  };

  const handleAddressSubmit = (address) => {
    addToHistory('user', address);
    setData(prev => ({ ...prev, address }));
    setStep('details_email');
    setTimeout(() => addToHistory('system', "Finally, what is your email address?"), 500);
  };

  const handleEmailSubmit = async (email) => {
    addToHistory('user', email);
    setLoading(true);
    
    try {
      // Save to database
      await base44.entities.BusinessEnquiry.create({
        name: data.name,
        email: email,
        business_name: data.business_name,
        phone: data.phone,
        address: data.address,
        business_type: data.type,
        interested_products: data.products || [],
        weekly_volume: data.amount > 2000 ? "Enterprise (10,000+ items)" : "Medium (500 - 2,000 items)",
        message: `Chat Onboarding: Estimated monthly spend £${data.amount}`
      });

      setLoading(false);
      setStep('completed');
      addToHistory('system', "Perfect! 🎉 Your application has been logged. Our team will contact you within 24 hours to set up your first free delivery.");
    } catch (error) {
      console.error(error);
      setLoading(false);
      addToHistory('system', "Oops, something went wrong saving your details. Please try again or contact us directly.");
    }
  };

  return (
    <div className="h-screen bg-slate-50 flex flex-col overflow-hidden">
      {/* Header */}
      <header className="bg-white border-b flex-none z-10 px-4 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <Button variant="ghost" size="icon" onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5" />
          </Button>
          <div className="font-bold text-lg flex items-center gap-2">
            <Coins className="w-5 h-5 text-amber-600" />
            <span>Savings Calculator</span>
          </div>
        </div>
      </header>

      {/* Chat Area */}
      <main ref={mainRef} className="flex-1 w-full max-w-2xl mx-auto p-4 overflow-y-auto scroll-smooth">
        {history.map((msg) => (
          <ChatMessage key={msg.id} role={msg.role}>
            {msg.content}
          </ChatMessage>
        ))}
        {loading && (
          <ChatMessage role="system">
            <div className="flex items-center gap-2 text-slate-500">
              <Loader2 className="w-4 h-4 animate-spin" />
              <span>Analysing...</span>
            </div>
          </ChatMessage>
        )}
        <div ref={bottomRef} className="h-4" />
      </main>

      {/* Input Area */}
      <div className="flex-none bg-white border-t p-4 pb-8 z-20">
        <div className="max-w-2xl mx-auto">
          {step === 'type' && (
            <div className="space-y-4">
                <div className="flex flex-wrap gap-2 justify-end">
                  {['Cafe / Coffee Shop', 'Restaurant / Takeaway', 'Office / Corporate', 'Event Organiser', 'School / Education'].map(type => (
                    <OptionButton key={type} onClick={() => handleTypeSelect(type)}>
                      {type}
                    </OptionButton>
                  ))}
                </div>
                <div className="flex justify-end">
                    <div className="w-full max-w-sm">
                        <div className="text-xs text-right text-slate-400 mb-2 uppercase tracking-wide">Or enter manually</div>
                        <ChatInput onSend={handleTypeSelect} placeholder="Other Business Type..." />
                    </div>
                </div>
            </div>
          )}

          {step === 'products' && (
            <ProductSelector onSelect={handleProductSelect} businessType={data.type} />
          )}

          {step === 'volume' && (
            <div className="flex flex-col gap-3 items-end">
               <div className="text-xs font-semibold text-amber-600 uppercase tracking-wide">
                  Typical spend for {data.type}
               </div>
               <div className="flex flex-wrap gap-3 justify-end">
                  {[
                    { label: 'Under £200', val: 'Low (< £200)', amt: 200 },
                    { label: '£200 - £800', val: 'Medium (£200 - £800)', amt: 500 },
                    { label: '£800 - £2,000', val: 'High (£800 - £2k)', amt: 1400 },
                    { label: '£2,000+', val: 'Enterprise (£2k+)', amt: 3000 }
                  ].map(opt => {
                     const isRecommended = (
                        (data.type?.includes('Cafe') && opt.amt === 1400) ||
                        (data.type?.includes('Restaurant') && opt.amt === 1400) ||
                        (data.type?.includes('Event') && opt.amt === 3000) ||
                        (data.type?.includes('Office') && opt.amt === 500) ||
                        (data.type?.includes('School') && opt.amt === 500)
                     );
                     
                     return (
                        <div key={opt.val} className="relative">
                            {isRecommended && (
                                <span className="absolute -top-2.5 -right-1 bg-amber-500 text-white text-[10px] font-bold px-2 py-0.5 rounded-full z-10 shadow-sm animate-bounce">
                                    Recommended
                                </span>
                            )}
                            <OptionButton 
                                onClick={() => handleVolumeSelect(opt.val, opt.amt)} 
                                selected={false} // Don't pre-select visually as "active", just badge it
                            >
                                {opt.label}
                            </OptionButton>
                        </div>
                     );
                  })}
               </div>
            </div>
          )}

          {step === 'results' && (
            <div className="flex justify-center w-full">
              <Button onClick={handleStartEnrollment} className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 py-6 h-auto rounded-full shadow-lg animate-pulse">
                Yes, Claim Free Inventory <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </div>
          )}

          {step === 'details_name' && (
            <ChatInput onSend={handleNameSubmit} placeholder="Your Full Name..." />
          )}

          {step === 'details_business' && (
            <ChatInput onSend={handleBusinessSubmit} placeholder="Business Name..." />
          )}

          {step === 'details_phone' && (
            <ChatInput onSend={handlePhoneSubmit} placeholder="Phone Number..." type="tel" />
          )}

          {step === 'details_address' && (
            <ChatInput onSend={handleAddressSubmit} placeholder="Full Address or City..." />
          )}

          {step === 'details_email' && (
            <ChatInput onSend={handleEmailSubmit} placeholder="Email Address..." type="email" />
          )}
          
           {step === 'completed' && (
            <div className="flex justify-center">
               <Button onClick={() => navigate(createPageUrl('Home'))} className="bg-slate-900 text-white">
                 Return Home
               </Button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

function ProductSelector({ onSelect, businessType }) {
  const [selected, setSelected] = useState([]);
  
  const getRecommendations = () => {
    const all = [
      'Coffee Cups', 'Napkins', 'Takeaway Boxes', 'Paper Bags', 'Cutlery',
      'Printer Paper', 'Notepads', 'Pens', 'Envelopes',
      'Wristbands', 'Event Cups', 'Tickets', 'Lanyards',
      'Bin Liners', 'Cleaning Wipes', 'Receipt Rolls'
    ];

    let recommended = [];
    if (businessType?.includes('Cafe') || businessType?.includes('Restaurant')) {
      recommended = ['Coffee Cups', 'Napkins', 'Takeaway Boxes', 'Paper Bags', 'Cutlery', 'Receipt Rolls'];
    } else if (businessType?.includes('Office')) {
      recommended = ['Printer Paper', 'Notepads', 'Pens', 'Envelopes', 'Bin Liners'];
    } else if (businessType?.includes('Event')) {
      recommended = ['Wristbands', 'Event Cups', 'Tickets', 'Lanyards', 'Napkins'];
    } else {
      recommended = ['Coffee Cups', 'Printer Paper', 'Bin Liners'];
    }

    const others = all.filter(x => !recommended.includes(x));
    return { recommended, others };
  };

  const { recommended, others } = getRecommendations();
  const [showOthers, setShowOthers] = useState(false);

  // Pre-select first 3 recommended items on load if empty
  useEffect(() => {
    if (selected.length === 0 && recommended.length > 0) {
      // Optional: pre-select items. 
      // setSelected(recommended.slice(0, 3)); 
      // The user might prefer to choose, let's just show them as recommended.
    }
  }, []);

  const toggle = (item) => {
    if (selected.includes(item)) setSelected(s => s.filter(i => i !== item));
    else setSelected(s => [...s, item]);
  };

  return (
    <div className="space-y-4">
      <div className="flex flex-col items-end gap-4">
        <div className="text-right">
             <div className="text-xs font-semibold text-amber-600 mb-2 uppercase tracking-wide">Recommended for {businessType}</div>
             <div className="flex flex-wrap gap-2 justify-end">
                {recommended.map(item => (
                <OptionButton key={item} onClick={() => toggle(item)} selected={selected.includes(item)}>
                    {item} {selected.includes(item) && <Check className="w-4 h-4 inline ml-1" />}
                </OptionButton>
                ))}
             </div>
        </div>

        {showOthers ? (
            <div className="text-right animate-in fade-in slide-in-from-top-2">
                <div className="text-xs font-semibold text-slate-400 mb-2 uppercase tracking-wide">Other Items</div>
                <div className="flex flex-wrap gap-2 justify-end">
                    {others.map(item => (
                    <OptionButton key={item} onClick={() => toggle(item)} selected={selected.includes(item)}>
                        {item} {selected.includes(item) && <Check className="w-4 h-4 inline ml-1" />}
                    </OptionButton>
                    ))}
                </div>
            </div>
        ) : (
            <button onClick={() => setShowOthers(true)} className="text-xs text-slate-500 hover:text-amber-600 underline underline-offset-4">
                Show more options
            </button>
        )}
      </div>
      <div className="flex justify-end">
         <Button 
           disabled={selected.length === 0} 
           onClick={() => onSelect(selected)}
           className="bg-amber-600 hover:bg-amber-700 text-white rounded-full"
         >
           Confirm Selection <ArrowRight className="w-4 h-4 ml-2" />
         </Button>
      </div>
    </div>
  );
}