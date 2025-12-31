import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { History, Award, Users, Building2 } from 'lucide-react';

export default function About() {
  return (
    <div className="flex flex-col min-h-screen bg-white">
      {/* Hero */}
      <section className="bg-slate-900 py-20 text-center text-white">
        <div className="container mx-auto px-4">
          <h1 className="text-4xl md:text-5xl font-bold mb-6">About Vertising UK</h1>
          <p className="text-xl text-slate-300 max-w-2xl mx-auto">
            Innovating the intersection of sustainability, marketing, and local business support.
          </p>
        </div>
      </section>

      {/* Company Info */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-12 items-center max-w-5xl mx-auto">
            <div className="space-y-6">
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-100 text-amber-800 text-sm font-medium">
                <Building2 className="w-4 h-4" /> Parent Company
              </div>
              <h2 className="text-3xl font-bold text-slate-900">Backed by Experience</h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Vertising UK is a proud venture of <span className="font-bold text-slate-900">Gotmenow LTD</span>.
              </p>
              <p className="text-slate-600 leading-relaxed">
                With over <span className="font-bold">10 years of market experience</span>, Gotmenow LTD has a proven track record of delivering innovative business solutions and operational excellence. Our decade-long journey has been defined by a commitment to quality, reliability, and sustainable growth.
              </p>
              <div className="flex gap-6 pt-4">
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-amber-600">
                    <History className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">10+ Years</div>
                    <div className="text-sm text-slate-500">In Market</div>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                  <div className="w-10 h-10 rounded-full bg-slate-100 flex items-center justify-center text-amber-600">
                    <Award className="w-5 h-5" />
                  </div>
                  <div>
                    <div className="font-bold text-slate-900">Proven</div>
                    <div className="text-sm text-slate-500">Track Record</div>
                  </div>
                </div>
              </div>

              <div className="mt-8 border-t pt-8">
                <h3 className="text-xl font-bold text-slate-900 mb-3">Supporting the UK Economy</h3>
                <p className="text-slate-600 text-sm leading-relaxed mb-4">
                  We are committed to strengthening the local economy by prioritizing <strong>UK-based manufacturers</strong>. 
                  Currently outsourcing production to trusted local vendors, our roadmap includes a transition to <strong>in-house manufacturing</strong> after year 1, creating more jobs and infrastructure.
                </p>
                <p className="text-slate-600 text-sm leading-relaxed">
                  Look out for our upcoming <strong>Web & Mobile Marketplace</strong>, a dedicated platform for businesses and individuals to purchase sustainable products directly.
                </p>
              </div>
            </div>
            <div className="relative">
              <div className="absolute -inset-4 bg-amber-100 rounded-2xl transform rotate-3 -z-10"></div>
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=2070&auto=format&fit=crop" 
                alt="Team Meeting" 
                className="rounded-2xl shadow-xl w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mission */}
      <section className="bg-slate-50 py-20">
        <div className="container mx-auto px-4 text-center max-w-4xl">
          <Users className="w-12 h-12 text-slate-400 mx-auto mb-6" />
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Our Mission</h2>
          <p className="text-xl text-slate-600 leading-relaxed italic">
            "To bridge the gap between businesses needing hyperlocal visibility and distribution partners needing to reduce operational costs, all while promoting recyclable product usage."
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-2xl font-bold text-slate-900 mb-6">Want to learn more about our vision?</h2>
          <div className="flex justify-center gap-4">
             <Link to={createPageUrl('PitchDeck')}>
              <Button variant="outline" size="lg">View Investor Deck</Button>
            </Link>
            <Link to={createPageUrl('Contact')}>
              <Button size="lg" className="bg-slate-900 text-white hover:bg-slate-800">Contact Us</Button>
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}