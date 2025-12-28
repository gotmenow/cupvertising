import React, { useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Checkbox } from "@/components/ui/checkbox";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Package, Megaphone, CheckCircle2, Briefcase } from "lucide-react";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  const validTabs = ['partner', 'advertiser', 'franchise'];
  const queryTab = searchParams.get('tab');
  const defaultTab = validTabs.includes(queryTab) ? queryTab : 'advertiser';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Partner Form State
  const [partnerForm, setPartnerForm] = useState({
    name: '', business_name: '', business_type: '', weekly_volume: '', email: '', phone: '', address: '', message: '',
    interested_products: []
  });
  
  // Advertiser Form State
  const [advertiserForm, setAdvertiserForm] = useState({
    name: '', business_name: '', target_audience: '', campaign_budget: '', email: '', phone: '', message: '',
    interested_mediums: []
  });

  // Franchise Form State
  const [franchiseForm, setFranchiseForm] = useState({
    name: '', email: '', phone: '', city: '', investment_capital: '', experience: '', linkedin_profile: ''
  });

  const productOptions = [
    "Food & Hospitality (Cups, Boxes, Cutlery)",
    "Cleaning & Hygiene (Bin Liners, Wipes)",
    "Office & Retail (Paper, Notepads, Receipts)",
    "Schools & Education (Notebooks, Lanyards)",
    "Events & Festivals (Wristbands, Cups)",
    "Healthcare & Community (Pharmacy Bags)"
  ];

  const mediumOptions = [
    "Consumer & Takeaway (High Frequency)",
    "Corporate & B2B (Offices, Retail)",
    "Youth & Education (Schools, Colleges)",
    "Community & Public (Healthcare, Councils)",
    "Events & Festivals (High Engagement)"
  ];

  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await base44.entities.DistributorEnquiry.create(partnerForm);
      setSubmitted(true);
      toast({ title: "Application Received!", description: "We'll be in touch regarding your free inventory." });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleAdvertiserSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await base44.entities.AdvertiserEnquiry.create(advertiserForm);
      setSubmitted(true);
      toast({ title: "Enquiry Sent!", description: "Our team will contact you to discuss your campaign." });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleFranchiseSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await base44.entities.FranchiseEnquiry.create(franchiseForm);
      setSubmitted(true);
      toast({ title: "Application Received!", description: "Our franchise development team will review your profile shortly." });
    } catch (error) {
      console.error(error);
      toast({ title: "Error", description: "Something went wrong. Please try again.", variant: "destructive" });
    } finally {
      setIsSubmitting(false);
    }
  };

  const toggleProduct = (item) => {
    setPartnerForm(prev => {
      const current = prev.interested_products || [];
      if (current.includes(item)) return { ...prev, interested_products: current.filter(i => i !== item) };
      return { ...prev, interested_products: [...current, item] };
    });
  };

  const toggleMedium = (item) => {
    setAdvertiserForm(prev => {
      const current = prev.interested_mediums || [];
      if (current.includes(item)) return { ...prev, interested_mediums: current.filter(i => i !== item) };
      return { ...prev, interested_mediums: [...current, item] };
    });
  };

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <CheckCircle2 className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h2>
          <p className="text-slate-600 mb-6">
            We've received your details. One of our team members will be in touch within 24 hours to discuss the next steps.
          </p>
          <Button onClick={() => setSubmitted(false)} variant="outline">Send Another Message</Button>
        </Card>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-4xl">
        <div className="text-center mb-12">
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Let's Connect</h1>
          <p className="text-lg text-slate-600">Whether you need free supplies or effective advertising, we're here.</p>
        </div>

        <Card className="shadow-xl border-none bg-white">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-3 h-16 p-1 bg-slate-100 rounded-t-xl">
              <TabsTrigger value="partner" className="h-full text-sm md:text-base font-medium data-[state=active]:bg-amber-600 data-[state=active]:text-white transition-all">
                <Package className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Free Supplies
              </TabsTrigger>
              <TabsTrigger value="advertiser" className="h-full text-sm md:text-base font-medium data-[state=active]:bg-teal-600 data-[state=active]:text-white transition-all">
                <Megaphone className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Advertise
              </TabsTrigger>
              <TabsTrigger value="franchise" className="h-full text-sm md:text-base font-medium data-[state=active]:bg-slate-900 data-[state=active]:text-white transition-all">
                <Briefcase className="w-4 h-4 md:w-5 md:h-5 mr-2" /> Franchising
              </TabsTrigger>
            </TabsList>

            {/* Partner Form */}
            <TabsContent value="partner" className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Partner Application</h2>
                <p className="text-slate-500">Apply to receive free, high-quality inventory for your business.</p>
              </div>
              <form onSubmit={handlePartnerSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="p_name">Contact Name</Label>
                    <Input id="p_name" required value={partnerForm.name} onChange={e => setPartnerForm({...partnerForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p_business">Business/Event Name</Label>
                    <Input id="p_business" required value={partnerForm.business_name} onChange={e => setPartnerForm({...partnerForm, business_name: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label>Business Type</Label>
                    <Select value={partnerForm.business_type} onValueChange={v => setPartnerForm({...partnerForm, business_type: v})}>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cafe">Cafe</SelectItem>
                        <SelectItem value="Restaurant">Restaurant</SelectItem>
                        <SelectItem value="Food Truck">Food Truck</SelectItem>
                        <SelectItem value="Event Organiser">Event Organiser</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Weekly Volume</Label>
                      <Select value={partnerForm.weekly_volume} onValueChange={v => setPartnerForm({...partnerForm, weekly_volume: v})}>
                      <SelectTrigger><SelectValue placeholder="Select volume" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Low (< 500 items)">Low (&lt; 500 items)</SelectItem>
                        <SelectItem value="Medium (500 - 2,000 items)">Medium (500 - 2,000 items)</SelectItem>
                        <SelectItem value="High (2,000 - 10,000 items)">High (2,000 - 10,000 items)</SelectItem>
                        <SelectItem value="Enterprise (10,000+ items)">Enterprise (10,000+ items)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Products of Interest</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {productOptions.map(item => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox id={`prod-${item}`} checked={partnerForm.interested_products?.includes(item)} onCheckedChange={() => toggleProduct(item)} />
                        <label htmlFor={`prod-${item}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="p_email">Email</Label>
                    <Input id="p_email" type="email" required value={partnerForm.email} onChange={e => setPartnerForm({...partnerForm, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p_phone">Phone</Label>
                    <Input id="p_phone" type="tel" value={partnerForm.phone} onChange={e => setPartnerForm({...partnerForm, phone: e.target.value})} />
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="p_address">Delivery Address / Location</Label>
                  <Input id="p_address" value={partnerForm.address} onChange={e => setPartnerForm({...partnerForm, address: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="p_msg">Additional Details</Label>
                  <Textarea id="p_msg" placeholder="Any specific requirements?" value={partnerForm.message} onChange={e => setPartnerForm({...partnerForm, message: e.target.value})} />
                </div>

                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-lg h-12" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Apply for Free Supplies'}
                </Button>
              </form>
            </TabsContent>

            {/* Advertiser Form */}
            <TabsContent value="advertiser" className="p-6 md:p-8">
                <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Advertiser Enquiry</h2>
                <p className="text-slate-500">Connect with your audience through our unique physical mediums.</p>
              </div>
              <form onSubmit={handleAdvertiserSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="a_name">Contact Name</Label>
                    <Input id="a_name" required value={advertiserForm.name} onChange={e => setAdvertiserForm({...advertiserForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="a_business">Business Name</Label>
                    <Input id="a_business" required value={advertiserForm.business_name} onChange={e => setAdvertiserForm({...advertiserForm, business_name: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label htmlFor="a_target">Target Audience / Industry</Label>
                    <Input id="a_target" placeholder="e.g. Students, Tech..." value={advertiserForm.target_audience} onChange={e => setAdvertiserForm({...advertiserForm, target_audience: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Estimated Budget</Label>
                      <Select value={advertiserForm.campaign_budget} onValueChange={v => setAdvertiserForm({...advertiserForm, campaign_budget: v})}>
                      <SelectTrigger><SelectValue placeholder="Select budget" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Starter (< £1k)">Starter (&lt; £1k)</SelectItem>
                        <SelectItem value="Growth (£1k - £5k)">Growth (£1k - £5k)</SelectItem>
                        <SelectItem value="Scale (£5k - £20k)">Scale (£5k - £20k)</SelectItem>
                        <SelectItem value="Enterprise (£20k+)">Enterprise (£20k+)</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-3">
                  <Label>Mediums of Interest</Label>
                  <div className="grid md:grid-cols-2 gap-3">
                    {mediumOptions.map(item => (
                      <div key={item} className="flex items-center space-x-2">
                        <Checkbox id={`med-${item}`} checked={advertiserForm.interested_mediums?.includes(item)} onCheckedChange={() => toggleMedium(item)} />
                        <label htmlFor={`med-${item}`} className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70">
                          {item}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>

                  <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="a_email">Email</Label>
                    <Input id="a_email" type="email" required value={advertiserForm.email} onChange={e => setAdvertiserForm({...advertiserForm, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="a_phone">Phone</Label>
                    <Input id="a_phone" type="tel" value={advertiserForm.phone} onChange={e => setAdvertiserForm({...advertiserForm, phone: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="a_msg">Campaign Goals / Message</Label>
                  <Textarea id="a_msg" placeholder="Tell us about your campaign goals..." value={advertiserForm.message} onChange={e => setAdvertiserForm({...advertiserForm, message: e.target.value})} />
                </div>

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-lg h-12" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Request Quote'}
                </Button>
              </form>
            </TabsContent>

            {/* Franchise Form */}
            <TabsContent value="franchise" className="p-6 md:p-8">
                <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Franchise Application</h2>
                <p className="text-slate-500">Apply to own a Cupvertising territory in your city.</p>
              </div>
              <form onSubmit={handleFranchiseSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="f_name">Full Name</Label>
                    <Input id="f_name" required value={franchiseForm.name} onChange={e => setFranchiseForm({...franchiseForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="f_email">Email Address</Label>
                    <Input id="f_email" type="email" required value={franchiseForm.email} onChange={e => setFranchiseForm({...franchiseForm, email: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                    <div className="space-y-2">
                    <Label htmlFor="f_city">Territory / City of Interest</Label>
                    <Input id="f_city" placeholder="e.g. Manchester, Leeds..." required value={franchiseForm.city} onChange={e => setFranchiseForm({...franchiseForm, city: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label>Available Investment Capital</Label>
                      <Select value={franchiseForm.investment_capital} onValueChange={v => setFranchiseForm({...franchiseForm, investment_capital: v})}>
                      <SelectTrigger><SelectValue placeholder="Select capital range" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Under £10k">Under £10k</SelectItem>
                        <SelectItem value="£10k - £25k">£10k - £25k</SelectItem>
                        <SelectItem value="£25k - £50k">£25k - £50k</SelectItem>
                        <SelectItem value="£50k+">£50k+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="space-y-2">
                  <Label htmlFor="f_linkedin">LinkedIn Profile (Optional)</Label>
                  <Input id="f_linkedin" placeholder="https://linkedin.com/in/..." value={franchiseForm.linkedin_profile} onChange={e => setFranchiseForm({...franchiseForm, linkedin_profile: e.target.value})} />
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="f_exp">Relevant Experience</Label>
                  <Textarea id="f_exp" placeholder="Briefly describe your business or sales experience..." value={franchiseForm.experience} onChange={e => setFranchiseForm({...franchiseForm, experience: e.target.value})} />
                </div>

                <Button type="submit" className="w-full bg-slate-900 hover:bg-slate-800 text-lg h-12" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Submit Application'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}