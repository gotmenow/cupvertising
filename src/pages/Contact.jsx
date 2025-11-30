import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { base44 } from "@/api/base44Client";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { useToast } from "@/components/ui/use-toast";
import { Loader2, Coffee, Megaphone } from "lucide-react";

export default function Contact() {
  const [searchParams] = useSearchParams();
  const { toast } = useToast();
  
  // Determine default tab from URL query param 'tab' (partner vs advertiser)
  const defaultTab = searchParams.get('tab') === 'partner' ? 'partner' : 'advertiser';
  
  // Pre-fill plan if provided
  const prefillPlan = searchParams.get('plan') ? `Edinburgh ${searchParams.get('plan')}` : '';

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  // Forms State
  const [partnerForm, setPartnerForm] = useState({
    name: '', business_name: '', business_type: '', weekly_usage: '', email: '', phone: '', message: ''
  });
  
  const [advertiserForm, setAdvertiserForm] = useState({
    name: '', business_name: '', target_audience: '', estimated_plan: prefillPlan, email: '', phone: '', message: ''
  });

  // Handlers
  const handlePartnerSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    try {
      await base44.entities.DistributorEnquiry.create(partnerForm);
      setSubmitted(true);
      toast({ title: "Application Received!", description: "We'll be in touch shortly to schedule your cup delivery." });
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

  if (submitted) {
    return (
      <div className="min-h-[60vh] flex items-center justify-center bg-slate-50 p-4">
        <Card className="max-w-md w-full text-center p-8">
          <div className="w-16 h-16 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
            <Megaphone className="w-8 h-8" />
          </div>
          <h2 className="text-2xl font-bold text-slate-900 mb-2">Thank You!</h2>
          <p className="text-slate-600 mb-6">
            We've received your details and are excited to explore a partnership with you. One of our team members will be in touch within 24 hours.
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
          <h1 className="text-3xl md:text-4xl font-bold text-slate-900 mb-4">Ready to Start?</h1>
          <p className="text-lg text-slate-600">Tell us what you need and let's get moving.</p>
        </div>

        <Card className="shadow-xl border-none bg-white">
          <Tabs defaultValue={defaultTab} className="w-full">
            <TabsList className="grid w-full grid-cols-2 h-16 p-1 bg-slate-100 rounded-t-xl">
              <TabsTrigger value="partner" className="h-full text-base font-medium data-[state=active]:bg-amber-600 data-[state=active]:text-white transition-all">
                <Coffee className="w-5 h-5 mr-2" /> I Want FREE Cups (Distributor)
              </TabsTrigger>
              <TabsTrigger value="advertiser" className="h-full text-base font-medium data-[state=active]:bg-teal-600 data-[state=active]:text-white transition-all">
                <Megaphone className="w-5 h-5 mr-2" /> I Want to Advertise (Client)
              </TabsTrigger>
            </TabsList>

            {/* Partner Form Content */}
            <TabsContent value="partner" className="p-6 md:p-8">
              <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Partner Application</h2>
                <p className="text-slate-500">Join our network of cafes and offices receiving free premium cups.</p>
              </div>
              <form onSubmit={handlePartnerSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="p_name">Your Name</Label>
                    <Input id="p_name" required placeholder="John Doe" value={partnerForm.name} onChange={e => setPartnerForm({...partnerForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p_business">Business Name</Label>
                    <Input id="p_business" required placeholder="The Daily Grind Cafe" value={partnerForm.business_name} onChange={e => setPartnerForm({...partnerForm, business_name: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <Label htmlFor="p_type">Business Type</Label>
                    <Select value={partnerForm.business_type} onValueChange={v => setPartnerForm({...partnerForm, business_type: v})}>
                      <SelectTrigger><SelectValue placeholder="Select type" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Cafe">Cafe</SelectItem>
                        <SelectItem value="Restaurant">Restaurant</SelectItem>
                        <SelectItem value="Office">Office</SelectItem>
                        <SelectItem value="Event Organiser">Event Organiser</SelectItem>
                        <SelectItem value="Other">Other</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p_usage">Weekly Cup Usage</Label>
                     <Select value={partnerForm.weekly_usage} onValueChange={v => setPartnerForm({...partnerForm, weekly_usage: v})}>
                      <SelectTrigger><SelectValue placeholder="Estimated usage" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="Less than 500">Less than 500</SelectItem>
                        <SelectItem value="500 - 1,000">500 - 1,000</SelectItem>
                        <SelectItem value="1,000 - 5,000">1,000 - 5,000</SelectItem>
                        <SelectItem value="5,000+">5,000+</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="p_email">Email Address</Label>
                    <Input id="p_email" type="email" required placeholder="john@example.com" value={partnerForm.email} onChange={e => setPartnerForm({...partnerForm, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="p_phone">Phone Number</Label>
                    <Input id="p_phone" type="tel" placeholder="0131 123 4567" value={partnerForm.phone} onChange={e => setPartnerForm({...partnerForm, phone: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="p_msg">Additional Details (Optional)</Label>
                  <Textarea id="p_msg" placeholder="Any specific requirements or questions?" value={partnerForm.message} onChange={e => setPartnerForm({...partnerForm, message: e.target.value})} />
                </div>

                <Button type="submit" className="w-full bg-amber-600 hover:bg-amber-700 text-lg h-12" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Apply for Free Cups'}
                </Button>
              </form>
            </TabsContent>

            {/* Advertiser Form Content */}
            <TabsContent value="advertiser" className="p-6 md:p-8">
               <div className="mb-6">
                <h2 className="text-2xl font-bold text-slate-900">Advertiser Enquiry</h2>
                <p className="text-slate-500">Connect with your audience through our unique medium.</p>
              </div>
              <form onSubmit={handleAdvertiserSubmit} className="space-y-6">
                 <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="a_name">Your Name</Label>
                    <Input id="a_name" required placeholder="Jane Smith" value={advertiserForm.name} onChange={e => setAdvertiserForm({...advertiserForm, name: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="a_business">Business Name</Label>
                    <Input id="a_business" required placeholder="Tech Solutions Ltd" value={advertiserForm.business_name} onChange={e => setAdvertiserForm({...advertiserForm, business_name: e.target.value})} />
                  </div>
                </div>

                <div className="grid md:grid-cols-2 gap-6">
                   <div className="space-y-2">
                    <Label htmlFor="a_target">Target Audience / Industry</Label>
                    <Input id="a_target" placeholder="e.g. Students, Tech Workers..." value={advertiserForm.target_audience} onChange={e => setAdvertiserForm({...advertiserForm, target_audience: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="a_plan">Estimated Plan</Label>
                     <Select value={advertiserForm.estimated_plan} onValueChange={v => setAdvertiserForm({...advertiserForm, estimated_plan: v})}>
                      <SelectTrigger><SelectValue placeholder="Select a plan" /></SelectTrigger>
                      <SelectContent>
                        <SelectItem value="City Explorer">City Explorer</SelectItem>
                        <SelectItem value="Regional Connect">Regional Connect</SelectItem>
                        <SelectItem value="National Impact">National Impact</SelectItem>
                        <SelectItem value="Unsure">Unsure / Need Advice</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>
                </div>

                 <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <Label htmlFor="a_email">Email Address</Label>
                    <Input id="a_email" type="email" required placeholder="jane@example.com" value={advertiserForm.email} onChange={e => setAdvertiserForm({...advertiserForm, email: e.target.value})} />
                  </div>
                  <div className="space-y-2">
                    <Label htmlFor="a_phone">Phone Number</Label>
                    <Input id="a_phone" type="tel" placeholder="0131 123 4567" value={advertiserForm.phone} onChange={e => setAdvertiserForm({...advertiserForm, phone: e.target.value})} />
                  </div>
                </div>
                
                <div className="space-y-2">
                  <Label htmlFor="a_msg">Campaign Goals / Message</Label>
                  <Textarea id="a_msg" placeholder="Tell us about your campaign goals..." value={advertiserForm.message} onChange={e => setAdvertiserForm({...advertiserForm, message: e.target.value})} />
                </div>

                <Button type="submit" className="w-full bg-teal-600 hover:bg-teal-700 text-lg h-12" disabled={isSubmitting}>
                  {isSubmitting ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : 'Request Media Kit'}
                </Button>
              </form>
            </TabsContent>
          </Tabs>
        </Card>
      </div>
    </div>
  );
}