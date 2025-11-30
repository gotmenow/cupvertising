import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Users, Palette, Rocket, ArrowRight } from 'lucide-react';

export default function HowItWorks() {
  return (
    <div className="flex flex-col">
      <section className="bg-slate-900 text-white py-20">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">Cupvertising in 3 Simple Steps</h1>
          <p className="text-lg text-slate-300 max-w-2xl mx-auto">
            We've streamlined the process to make cup advertising effortless for everyone involved.
          </p>
        </div>
      </section>

      <section className="py-20 relative overflow-hidden">
        {/* Connecting Line (Desktop) */}
        <div className="hidden md:block absolute top-1/2 left-0 w-full h-1 bg-slate-100 -z-10 -translate-y-1/2"></div>
        
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-12">
            {/* Step 1 */}
            <div className="relative">
              <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 h-full flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  <Users className="w-10 h-10" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white">1</div>
                
                <h3 className="text-xl font-bold mb-4 text-slate-900">Partner Selection</h3>
                <p className="text-slate-600 leading-relaxed">
                  We vet and onboard local distribution partners (cafes, offices, venues) that match our advertiser's target audience perfectly.
                </p>
              </div>
            </div>

            {/* Step 2 */}
            <div className="relative">
               <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 h-full flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 bg-teal-100 text-teal-600 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  <Palette className="w-10 h-10" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white">2</div>

                <h3 className="text-xl font-bold mb-4 text-slate-900">Design & Production</h3>
                <p className="text-slate-600 leading-relaxed">
                  Advertiser supplies the artwork (or we design it). We print the full-wrap, high-quality eco-friendly cups through our trusted manufacturers.
                </p>
              </div>
            </div>

            {/* Step 3 */}
            <div className="relative">
               <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 h-full flex flex-col items-center text-center group hover:-translate-y-2 transition-transform duration-300">
                <div className="w-20 h-20 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center text-3xl font-bold mb-6 shadow-inner group-hover:scale-110 transition-transform">
                  <Rocket className="w-10 h-10" />
                </div>
                <div className="absolute top-0 left-1/2 -translate-x-1/2 -translate-y-1/2 bg-slate-900 text-white w-8 h-8 rounded-full flex items-center justify-center font-bold border-4 border-white">3</div>

                <h3 className="text-xl font-bold mb-4 text-slate-900">Distribution & Exposure</h3>
                <p className="text-slate-600 leading-relaxed">
                  We deliver the free cups to our partners, and the campaign begins! Your message is now a mobile, daily impression across the UK.
                </p>
              </div>
            </div>
          </div>

          <div className="mt-20 text-center">
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800 px-10 rounded-full shadow-xl shadow-slate-900/20">
                Get Started Now <ArrowRight className="ml-2 w-5 h-5" />
              </Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}