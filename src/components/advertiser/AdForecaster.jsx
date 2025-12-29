import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Switch } from "@/components/ui/switch";
import { Checkbox } from "@/components/ui/checkbox";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Badge } from "@/components/ui/badge";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Separator } from "@/components/ui/separator";
import { Check, Target, ArrowRight, Loader2, BarChart3, Users, Clock, Megaphone, ChevronsUpDown, X } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function AdForecaster() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // Forecast State
  const [targetAudiences, setTargetAudiences] = useState([]);
  const [location, setLocation] = useState("");
  const [budget, setBudget] = useState(1000);
  const [openAudience, setOpenAudience] = useState(false);

  const audienceOptions = [
    {
      label: "Demographics",
      items: ["Gen Z (18-24)", "Millennials (25-40)", "Gen X (41-56)", "Boomers (57+)"]
    },
    {
      label: "Occupations",
      items: ["Students", "Office Professionals", "Tradespeople", "Parents / Caregivers", "Retirees"]
    },
    {
      label: "Interests & Lifestyle",
      items: ["Foodies & Dining", "Tech Enthusiasts", "Health & Fitness", "Sports Fans", "Nightlife", "Eco-Conscious"]
    },
    {
      label: "Behavior",
      items: ["Daily Commuters", "Shoppers", "Tourists", "Event Goers"]
    }
  ];

  const toggleAudience = (item) => {
    setTargetAudiences(prev => 
      prev.includes(item) ? prev.filter(i => i !== item) : [...prev, item]
    );
  };

  const removeAudience = (item) => {
    setTargetAudiences(prev => prev.filter(i => i !== item));
  };
  const [autoOptimize, setAutoOptimize] = useState(true);
  const [selectedProducts, setSelectedProducts] = useState([]);

  // Lead Details
  const [leadDetails, setLeadDetails] = useState({
    name: "",
    email: "",
    businessName: "",
    phone: ""
  });

  const products = [
    { id: "cups", label: "Coffee Cups", cpm: 40 },
    { id: "bags", label: "Paper Bags", cpm: 35 },
    { id: "napkins", label: "Napkins", cpm: 25 },
    { id: "boxes", label: "Takeout Boxes", cpm: 45 },
  ];

  // Calculations
  const avgCpm = autoOptimize 
    ? 35 
    : (selectedProducts.length > 0 
        ? selectedProducts.reduce((acc, p) => acc + (products.find(prod => prod.id === p)?.cpm || 35), 0) / selectedProducts.length 
        : 35);

  const estimatedReach = Math.floor((budget / avgCpm) * 1000);
  const estimatedDwellTimeHours = Math.floor((estimatedReach * 15) / 60); // 15 mins per impression

  const toggleProduct = (productId) => {
    setSelectedProducts(prev => 
      prev.includes(productId) ? prev.filter(p => p !== productId) : [...prev, productId]
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      const forecastSummary = `
        Ad Forecast Results:
        - Budget: £${budget}
        - Target: ${targetAudiences.join(", ")} in ${location}
        - Estimated Reach: ${estimatedReach.toLocaleString()} impressions
        - Products: ${autoOptimize ? "Auto-Optimized" : selectedProducts.join(", ")}
      `;

      await base44.entities.AdvertiserEnquiry.create({
        name: leadDetails.name,
        business_name: leadDetails.businessName,
        email: leadDetails.email,
        phone: leadDetails.phone,
        target_audience: targetAudiences.join(", "),
        campaign_budget: `£${budget}`,
        interested_mediums: autoOptimize ? ["Optimized Mix"] : selectedProducts,
        message: forecastSummary
      });

      setStep(3);
      toast({
        title: "Forecast Saved!",
        description: "Our media team will be in touch with a detailed proposal.",
      });
    } catch (error) {
      console.error(error);
      toast({
        title: "Error",
        description: "Something went wrong. Please try again.",
        variant: "destructive"
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  const containerVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };

  return (
    <div className="w-full max-w-5xl mx-auto py-12 px-4" id="ad-forecaster">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-700 rounded-xl mb-4">
          <BarChart3 className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Campaign Reach Forecaster</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          See how far your budget can go. Estimate impressions and engagement with our hyper-local inventory.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side: Form */}
        <Card className="lg:col-span-3 border-slate-200 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 to-indigo-500" />
          <CardHeader>
            <CardTitle>
              {step === 1 && "Step 1: Define Your Campaign"}
              {step === 2 && "Step 2: Secure Your Inventory"}
              {step === 3 && "Forecast Sent"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Select your audience and budget to see estimated performance."}
              {step === 2 && "Enter your details to lock in this pricing and reach."}
              {step === 3 && "Your media plan is being prepared."}
            </CardDescription>
          </CardHeader>
          
          <CardContent>
            <AnimatePresence mode="wait">
              {step === 1 && (
                <motion.div
                  key="step1"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                  className="space-y-6"
                >
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label>Target Audience (Select multiple)</Label>
                      <Popover open={openAudience} onOpenChange={setOpenAudience}>
                        <PopoverTrigger asChild>
                          <Button variant="outline" role="combobox" aria-expanded={openAudience} className="w-full justify-between h-auto min-h-[2.5rem] py-2">
                            {targetAudiences.length > 0 ? (
                              <div className="flex flex-wrap gap-1">
                                {targetAudiences.slice(0, 3).map((item) => (
                                  <Badge key={item} variant="secondary" className="mr-1 text-xs font-normal">
                                    {item}
                                  </Badge>
                                ))}
                                {targetAudiences.length > 3 && (
                                  <span className="text-xs text-muted-foreground self-center">
                                    +{targetAudiences.length - 3} more
                                  </span>
                                )}
                              </div>
                            ) : (
                              <span className="text-muted-foreground">Select demographics, interests...</span>
                            )}
                            <ChevronsUpDown className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                          </Button>
                        </PopoverTrigger>
                        <PopoverContent className="w-[300px] p-0" align="start">
                          <ScrollArea className="h-[300px] p-4">
                            {audienceOptions.map((group, idx) => (
                              <div key={idx} className="mb-4 last:mb-0">
                                <h4 className="mb-2 text-sm font-semibold text-slate-900">{group.label}</h4>
                                <div className="space-y-2">
                                  {group.items.map((item) => (
                                    <div key={item} className="flex items-center space-x-2">
                                      <Checkbox 
                                        id={`aud-${item}`} 
                                        checked={targetAudiences.includes(item)}
                                        onCheckedChange={() => toggleAudience(item)}
                                      />
                                      <label 
                                        htmlFor={`aud-${item}`} 
                                        className="text-sm leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer w-full py-1"
                                      >
                                        {item}
                                      </label>
                                    </div>
                                  ))}
                                </div>
                                {idx < audienceOptions.length - 1 && <Separator className="mt-4" />}
                              </div>
                            ))}
                          </ScrollArea>
                        </PopoverContent>
                      </Popover>
                      
                      {/* Selected tags display below if needed, or just keep them in the trigger as above */}
                      {targetAudiences.length > 0 && (
                         <div className="flex flex-wrap gap-2 mt-2">
                            {targetAudiences.map(item => (
                               <Badge key={item} variant="secondary" className="flex items-center gap-1 bg-teal-50 text-teal-700 border-teal-100">
                                  {item}
                                  <X className="w-3 h-3 cursor-pointer hover:text-teal-900" onClick={(e) => { e.stopPropagation(); removeAudience(item); }} />
                               </Badge>
                            ))}
                         </div>
                      )}
                    </div>
                    <div className="space-y-2">
                      <Label>Region / City</Label>
                      <Select value={location} onValueChange={setLocation}>
                        <SelectTrigger>
                          <SelectValue placeholder="Select Location" />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="London">London</SelectItem>
                          <SelectItem value="Manchester">Manchester</SelectItem>
                          <SelectItem value="Birmingham">Birmingham</SelectItem>
                          <SelectItem value="Nationwide">Nationwide</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>
                  </div>

                  <div className="space-y-4">
                    <div className="flex justify-between items-center">
                      <Label>Monthly Ad Budget</Label>
                      <span className="text-xl font-bold text-teal-700">£{budget.toLocaleString()}</span>
                    </div>
                    <Slider 
                      value={[budget]} 
                      max={20000} 
                      step={100} 
                      min={500}
                      onValueChange={(v) => setBudget(v[0])} 
                      className="py-2"
                    />
                    <div className="flex justify-between text-xs text-slate-500">
                      <span>£500</span>
                      <span>£20k+</span>
                    </div>
                  </div>

                  <div className="space-y-4 pt-2">
                    <div className="flex items-center justify-between">
                      <Label className="text-base">Inventory Selection</Label>
                      <div className="flex items-center space-x-2">
                        <Switch 
                          checked={autoOptimize} 
                          onCheckedChange={setAutoOptimize}
                          id="auto-mode"
                        />
                        <Label htmlFor="auto-mode" className="text-sm text-slate-600 font-normal">
                          Let Cupvertising Optimize
                        </Label>
                      </div>
                    </div>

                    {!autoOptimize && (
                      <motion.div 
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: "auto" }}
                        className="grid grid-cols-2 gap-3"
                      >
                        {products.map(product => (
                          <div key={product.id} className="flex items-center space-x-2 border p-3 rounded-lg hover:bg-slate-50 cursor-pointer" onClick={() => toggleProduct(product.id)}>
                            <Checkbox 
                              id={product.id} 
                              checked={selectedProducts.includes(product.id)}
                              onCheckedChange={() => toggleProduct(product.id)}
                            />
                            <label htmlFor={product.id} className="text-sm font-medium cursor-pointer flex-1">
                              {product.label}
                            </label>
                          </div>
                        ))}
                      </motion.div>
                    )}
                    {autoOptimize && (
                       <div className="bg-amber-50 p-3 rounded-lg text-sm text-amber-800 flex gap-2">
                         <Target className="w-5 h-5 shrink-0" />
                         We will automatically select the best mix of cups, bags, and napkins to maximize reach for your budget.
                       </div>
                    )}
                  </div>

                  <Button 
                    onClick={() => setStep(2)} 
                    disabled={targetAudiences.length === 0 || !location || (!autoOptimize && selectedProducts.length === 0)}
                    className="w-full bg-teal-600 hover:bg-teal-700 text-white mt-4 h-12 text-lg"
                  >
                    View Proposal Details <ArrowRight className="ml-2 w-5 h-5" />
                  </Button>
                </motion.div>
              )}

              {step === 2 && (
                <motion.div
                  key="step2"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  exit={{ opacity: 0, x: -20 }}
                >
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid md:grid-cols-2 gap-4">
                      <div className="space-y-2">
                        <Label>Contact Name</Label>
                        <Input 
                          required 
                          value={leadDetails.name}
                          onChange={(e) => setLeadDetails({...leadDetails, name: e.target.value})}
                          placeholder="Your Name" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Company Name</Label>
                        <Input 
                          required 
                          value={leadDetails.businessName}
                          onChange={(e) => setLeadDetails({...leadDetails, businessName: e.target.value})}
                          placeholder="Company Ltd" 
                        />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <Label>Email Address</Label>
                      <Input 
                        type="email" 
                        required 
                        value={leadDetails.email}
                        onChange={(e) => setLeadDetails({...leadDetails, email: e.target.value})}
                        placeholder="you@company.com" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input 
                        type="tel" 
                        value={leadDetails.phone}
                        onChange={(e) => setLeadDetails({...leadDetails, phone: e.target.value})}
                        placeholder="020 7123 4567" 
                      />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-600 mt-4">
                      <p className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-teal-500" />
                        We will send a formal media kit with these forecast figures to your email.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                      <Button type="submit" disabled={isSubmitting} className="flex-1 bg-slate-900 hover:bg-slate-800 text-white">
                        {isSubmitting ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Request Media Kit"}
                      </Button>
                    </div>
                  </form>
                </motion.div>
              )}

              {step === 3 && (
                <motion.div
                  key="step3"
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="text-center py-8"
                >
                  <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <Megaphone className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Request Received!</h3>
                  <p className="text-slate-600 mb-8">
                    Our ad ops team is reviewing your campaign forecast. Expect a detailed proposal in your inbox shortly.
                  </p>
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Create Another Forecast
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Right Side: Real-time Stats */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl sticky top-24">
            <CardHeader>
              <CardTitle className="flex items-center gap-2 text-teal-400">
                <Target className="w-5 h-5" /> Campaign Forecast
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-wider flex items-center gap-2">
                   <Users className="w-4 h-4" /> Est. Physical Reach
                </div>
                <div className="text-5xl font-bold text-white">
                  {estimatedReach.toLocaleString()}
                </div>
                <div className="text-xs text-slate-500 mt-1">Unique physical impressions</div>
              </div>
              
              <div>
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-wider flex items-center gap-2">
                  <Clock className="w-4 h-4" /> Total Brand Dwell Time
                </div>
                <div className="text-4xl font-bold text-amber-400">
                  {estimatedDwellTimeHours.toLocaleString()} hrs
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  *Aggregate time customers spend holding/viewing your branded items (approx. 15m per item).
                </p>
              </div>

              <div className="pt-8 border-t border-slate-800">
                <h4 className="font-semibold mb-3">Why this works:</h4>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-500 mt-0.5" />
                    <span>100% Viewability (Cannot be skipped)</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-500 mt-0.5" />
                    <span>Tangible Brand Association</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-teal-500 mt-0.5" />
                    <span>Hyper-local Geo-targeting</span>
                  </li>
                </ul>
              </div>
            </CardContent>
          </Card>
        </div>
      </div>
    </div>
  );
}