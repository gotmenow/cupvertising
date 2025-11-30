import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardFooter } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Target, User, Leaf, Megaphone } from 'lucide-react';
import { motion } from "framer-motion";

export default function ForAdvertisers() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-teal-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-teal-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-teal-600/30">
              <Megaphone className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6 leading-tight">
              The Hyper-Local, Tangible Ad Channel <br/> Your Brand Needs.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Put your brand directly in the hands of your customers. 20 minutes of focused attention in Edinburgh's busiest spots.
            </p>
            <Link to={createPageUrl('Contact') + "?tab=advertiser"}>
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 h-12 rounded-full">
                Start Your Campaign
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Value Props */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700">
                <Eye className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Unmissable Engagement</h3>
              <p className="text-slate-600 text-sm">Your ad is held and seen for up to 20 minutes—not scrolled past like digital ads.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700">
                <Target className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Pinpoint Targeting</h3>
              <p className="text-slate-600 text-sm">Choose distribution based on audience: Tech offices, Universities, or Family Cafes.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700">
                <User className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Mobile Billboards</h3>
              <p className="text-slate-600 text-sm">Customers walk your ad through the busiest parts of Edinburgh, extending reach.</p>
            </div>
            <div className="text-center p-6">
              <div className="w-14 h-14 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-4 text-slate-700">
                <Leaf className="w-7 h-7" />
              </div>
              <h3 className="text-lg font-bold mb-2">Eco-Friendly</h3>
              <p className="text-slate-600 text-sm">Associate your brand with a sustainable, responsible medium. 100% Compostable.</p>
            </div>
          </div>
        </div>
      </section>

      {/* Pricing Plans */}
      <section className="py-20 bg-slate-50" id="pricing">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Campaign Packages</h2>
            <p className="text-slate-600">Simple, transparent pricing based on reach and impact.</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Plan 1 */}
            <Card className="border border-slate-200 bg-white hover:shadow-xl transition-all flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Edinburgh Explorer</CardTitle>
                <Badge variant="secondary" className="w-fit mt-2 bg-teal-100 text-teal-700 hover:bg-teal-100">Starter</Badge>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="text-4xl font-bold text-slate-900">1,000 <span className="text-sm font-normal text-slate-500">Cups</span></div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><CheckIcon /> ~20,000 Impressions</li>
                  <li className="flex gap-2"><CheckIcon /> 5 Distribution Locations</li>
                  <li className="flex gap-2"><CheckIcon /> Standard Design Support</li>
                  <li className="flex gap-2"><CheckIcon /> 2 Week Campaign Duration</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to={createPageUrl('Contact') + "?plan=Explorer"} className="w-full">
                  <Button variant="outline" className="w-full border-teal-600 text-teal-600 hover:bg-teal-50">Select Explorer</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plan 2 */}
            <Card className="border-2 border-teal-600 bg-white shadow-xl scale-105 z-10 flex flex-col relative">
              <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-teal-600 text-white text-xs font-bold px-3 py-1 rounded-full uppercase tracking-wide">
                Most Popular
              </div>
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Edinburgh Connect</CardTitle>
                <Badge variant="secondary" className="w-fit mt-2 bg-teal-600 text-white hover:bg-teal-700">Growth</Badge>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="text-4xl font-bold text-slate-900">5,000 <span className="text-sm font-normal text-slate-500">Cups</span></div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><CheckIcon /> ~100,000 Impressions</li>
                  <li className="flex gap-2"><CheckIcon /> 15 Distribution Locations</li>
                  <li className="flex gap-2"><CheckIcon /> Premium Design Service</li>
                  <li className="flex gap-2"><CheckIcon /> 4 Week Campaign Duration</li>
                  <li className="flex gap-2"><CheckIcon /> Targeted Location Selection</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to={createPageUrl('Contact') + "?plan=Connect"} className="w-full">
                  <Button className="w-full bg-teal-600 hover:bg-teal-700 text-white shadow-lg shadow-teal-600/20">Select Connect</Button>
                </Link>
              </CardFooter>
            </Card>

            {/* Plan 3 */}
            <Card className="border border-slate-200 bg-white hover:shadow-xl transition-all flex flex-col">
              <CardHeader>
                <CardTitle className="text-xl font-bold text-slate-900">Edinburgh Impact</CardTitle>
                <Badge variant="secondary" className="w-fit mt-2 bg-slate-100 text-slate-700 hover:bg-slate-100">Enterprise</Badge>
              </CardHeader>
              <CardContent className="flex-1 space-y-6">
                <div className="text-4xl font-bold text-slate-900">20,000+ <span className="text-sm font-normal text-slate-500">Cups</span></div>
                <ul className="space-y-3 text-sm text-slate-600">
                  <li className="flex gap-2"><CheckIcon /> ~400,000+ Impressions</li>
                  <li className="flex gap-2"><CheckIcon /> City-Wide Distribution</li>
                  <li className="flex gap-2"><CheckIcon /> Full Creative Agency Support</li>
                  <li className="flex gap-2"><CheckIcon /> Multi-Month Campaign</li>
                  <li className="flex gap-2"><CheckIcon /> Impact Reporting & Analytics</li>
                </ul>
              </CardContent>
              <CardFooter>
                <Link to={createPageUrl('Contact') + "?plan=Impact"} className="w-full">
                  <Button variant="outline" className="w-full border-slate-400 text-slate-700 hover:bg-slate-50">Contact Sales</Button>
                </Link>
              </CardFooter>
            </Card>
          </div>
        </div>
      </section>
    </div>
  );
}

function CheckIcon() {
  return <div className="w-5 h-5 rounded-full bg-teal-50 text-teal-600 flex items-center justify-center shrink-0 text-[10px]">✔</div>
}