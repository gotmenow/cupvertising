import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Card, CardContent, CardHeader, CardTitle, CardDescription, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Check, Calculator, ArrowRight, Loader2, TrendingDown, PoundSterling, PieChart } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useToast } from "@/components/ui/use-toast";

export default function ExpenseAuditor() {
  const { toast } = useToast();
  const [step, setStep] = useState(1);
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  // State for the audit
  const [businessType, setBusinessType] = useState("");
  const [expenses, setExpenses] = useState({
    cups: 200,
    packaging: 150,
    hygiene: 50,
    stationery: 30,
    other: 0
  });
  const [leadDetails, setLeadDetails] = useState({
    name: "",
    email: "",
    businessName: "",
    phone: ""
  });

  const totalMonthly = Object.values(expenses).reduce((a, b) => a + b, 0);
  const totalYearly = totalMonthly * 12;

  const handleExpenseChange = (key, value) => {
    setExpenses(prev => ({ ...prev, [key]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    
    try {
      // Prepare message with audit details
      const auditSummary = `
        Expense Audit Results:
        - Monthly Savings Potential: £${totalMonthly}
        - Yearly Savings Potential: £${totalYearly}
        - Breakdown: Cups £${expenses.cups}, Packaging £${expenses.packaging}, Hygiene £${expenses.hygiene}, Stationery £${expenses.stationery}
      `;

      await base44.entities.DistributorEnquiry.create({
        name: leadDetails.name,
        business_name: leadDetails.businessName,
        email: leadDetails.email,
        phone: leadDetails.phone,
        business_type: businessType || "Other",
        message: auditSummary,
        // Default values for required fields not in this specific form
        weekly_volume: "Medium (500 - 2,000 items)", 
        interested_products: ["Core Beverage (Cups, Sleeves, Napkins)"] 
      });

      setStep(3); // Success step
      toast({
        title: "Audit Report Sent!",
        description: "Check your email for your detailed savings breakdown.",
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
    <div className="w-full max-w-4xl mx-auto py-12 px-4" id="expense-auditor">
      <div className="text-center mb-10">
        <div className="inline-flex items-center justify-center p-3 bg-teal-100 text-teal-700 rounded-xl mb-4">
          <Calculator className="w-8 h-8" />
        </div>
        <h2 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">SME Expense Auditor</h2>
        <p className="text-lg text-slate-600 max-w-2xl mx-auto">
          Calculate exactly how much "dead capital" you're spending on consumables and see what you could save with Cupvertising.
        </p>
      </div>

      <div className="grid lg:grid-cols-5 gap-8">
        {/* Left Side: Calculator / Form */}
        <Card className="lg:col-span-3 border-slate-200 shadow-xl overflow-hidden relative">
          <div className="absolute top-0 left-0 w-full h-2 bg-gradient-to-r from-teal-500 to-amber-500" />
          <CardHeader>
            <CardTitle>
              {step === 1 && "Step 1: Estimate Monthly Spend"}
              {step === 2 && "Step 2: Get Your Full Report"}
              {step === 3 && "Audit Complete"}
            </CardTitle>
            <CardDescription>
              {step === 1 && "Drag the sliders to match your current approximate monthly costs."}
              {step === 2 && "Enter your details to receive the official saving proposal."}
              {step === 3 && "Your savings potential has been identified."}
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
                  <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select value={businessType} onValueChange={setBusinessType}>
                      <SelectTrigger>
                        <SelectValue placeholder="Select your business type" />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cafe">Cafe / Coffee Shop</SelectItem>
                        <SelectItem value="Restaurant">Restaurant</SelectItem>
                        <SelectItem value="Food Truck">Food Truck / Street Food</SelectItem>
                        <SelectItem value="Office">Corporate Office</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  <div className="space-y-4">
                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Cups & Beverage Supplies</Label>
                        <span className="font-bold text-slate-700">£{expenses.cups}</span>
                      </div>
                      <Slider 
                        value={[expenses.cups]} 
                        max={2000} 
                        step={10} 
                        onValueChange={(v) => handleExpenseChange('cups', v[0])} 
                        className="py-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Packaging (Boxes, Bags)</Label>
                        <span className="font-bold text-slate-700">£{expenses.packaging}</span>
                      </div>
                      <Slider 
                        value={[expenses.packaging]} 
                        max={2000} 
                        step={10} 
                        onValueChange={(v) => handleExpenseChange('packaging', v[0])}
                        className="py-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Hygiene & Cleaning</Label>
                        <span className="font-bold text-slate-700">£{expenses.hygiene}</span>
                      </div>
                      <Slider 
                        value={[expenses.hygiene]} 
                        max={1000} 
                        step={10} 
                        onValueChange={(v) => handleExpenseChange('hygiene', v[0])}
                        className="py-2"
                      />
                    </div>

                    <div className="space-y-2">
                      <div className="flex justify-between">
                        <Label>Stationery & Admin</Label>
                        <span className="font-bold text-slate-700">£{expenses.stationery}</span>
                      </div>
                      <Slider 
                        value={[expenses.stationery]} 
                        max={500} 
                        step={5} 
                        onValueChange={(v) => handleExpenseChange('stationery', v[0])}
                        className="py-2"
                      />
                    </div>
                  </div>

                  <Button onClick={() => setStep(2)} className="w-full bg-slate-900 hover:bg-slate-800 text-white mt-4">
                    Calculate Savings <ArrowRight className="ml-2 w-4 h-4" />
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
                        <Label>Full Name</Label>
                        <Input 
                          required 
                          value={leadDetails.name}
                          onChange={(e) => setLeadDetails({...leadDetails, name: e.target.value})}
                          placeholder="John Doe" 
                        />
                      </div>
                      <div className="space-y-2">
                        <Label>Business Name</Label>
                        <Input 
                          required 
                          value={leadDetails.businessName}
                          onChange={(e) => setLeadDetails({...leadDetails, businessName: e.target.value})}
                          placeholder="Tasty Cafe Ltd" 
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
                        placeholder="john@example.com" 
                      />
                    </div>
                    <div className="space-y-2">
                      <Label>Phone Number</Label>
                      <Input 
                        type="tel" 
                        value={leadDetails.phone}
                        onChange={(e) => setLeadDetails({...leadDetails, phone: e.target.value})}
                        placeholder="07700 900000" 
                      />
                    </div>

                    <div className="bg-slate-50 p-4 rounded-lg border border-slate-100 text-sm text-slate-600 mt-4">
                      <p className="flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        We'll send a full breakdown of your <strong>£{totalYearly.toLocaleString()}</strong> yearly savings potential.
                      </p>
                    </div>

                    <div className="flex gap-3 pt-2">
                      <Button type="button" variant="outline" onClick={() => setStep(1)}>Back</Button>
                      <Button type="submit" disabled={isSubmitting} className="flex-1 bg-teal-600 hover:bg-teal-700">
                        {isSubmitting ? <Loader2 className="animate-spin w-4 h-4 mr-2" /> : "Get Free Audit Report"}
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
                  <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <TrendingDown className="w-10 h-10" />
                  </div>
                  <h3 className="text-2xl font-bold text-slate-900 mb-2">Audit Complete!</h3>
                  <p className="text-slate-600 mb-8">
                    We've identified <strong>£{totalYearly.toLocaleString()}</strong> in potential yearly savings. One of our specialists will be in touch shortly to help you reclaim this capital.
                  </p>
                  <Button onClick={() => window.location.reload()} variant="outline">
                    Start New Audit
                  </Button>
                </motion.div>
              )}
            </AnimatePresence>
          </CardContent>
        </Card>

        {/* Right Side: Real-time Stats */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="bg-slate-900 text-white border-none shadow-xl">
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <PieChart className="w-5 h-5 text-amber-400" /> Potential Savings
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-8">
              <div>
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-wider">Monthly Savings</div>
                <div className="text-5xl font-bold text-amber-400">
                  £{totalMonthly.toLocaleString()}
                </div>
              </div>
              
              <div>
                <div className="text-sm text-slate-400 mb-1 uppercase tracking-wider">Yearly Savings</div>
                <div className="text-4xl font-bold text-teal-400">
                  £{totalYearly.toLocaleString()}
                </div>
                <p className="text-xs text-slate-500 mt-2">
                  *Based on replacing paid inventory with Cupvertising's free ad-supported alternatives.
                </p>
              </div>

              <div className="pt-8 border-t border-slate-800">
                <h4 className="font-semibold mb-3">What you could buy instead:</h4>
                <ul className="space-y-3 text-sm text-slate-300">
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Hire a part-time staff member</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Upgrade kitchen equipment</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <Check className="w-4 h-4 text-green-500 mt-0.5" />
                    <span>Increase marketing budget</span>
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