import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  Briefcase, Globe, TrendingUp, Users, ShieldCheck, 
  Rocket, ArrowRight, MapPin, GraduationCap 
} from 'lucide-react';
import { motion } from "framer-motion";

export default function Franchise() {
  const benefits = [
    {
      title: "Exclusive Territory",
      icon: MapPin,
      desc: "Own the rights to Cupvertising in your city or region. No competition from other franchisees."
    },
    {
      title: "Recurring Revenue",
      icon: TrendingUp,
      desc: "Build a stable income stream through long-term ad campaigns and subscription-based supply drops."
    },
    {
      title: "Turnkey Tech Stack",
      icon: Rocket,
      desc: "Access our proprietary ad-tracking software, inventory management system, and sales CRM."
    },
    {
      title: "Comprehensive Training",
      icon: GraduationCap,
      desc: "Full onboarding on sales, logistics, and operations. We teach you how to close big ad deals."
    },
    {
      title: "National Ad Network",
      icon: Globe,
      desc: "Benefit from national campaigns sold by HQ that are deployed in your local territory."
    },
    {
      title: "Low Overhead",
      icon: ShieldCheck,
      desc: "No need for expensive retail space. This is a high-margin, logistics-light business model."
    }
  ];

  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?q=80&w=2032&auto=format&fit=crop" 
            alt="Business Meeting" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-r from-slate-900 via-slate-900/90 to-slate-900/50" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl"
          >
            <Badge className="bg-amber-500 text-black mb-6 px-4 py-1 text-sm font-bold">FRANCHISE OPPORTUNITY</Badge>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Own a <span className="text-amber-500">Cupvertising</span> Territory.
            </h1>
            <p className="text-xl text-slate-300 mb-10 max-w-2xl leading-relaxed">
              Launch a high-growth media business in your city. Connect local businesses with free supplies and help brands reach their audience. 
            </p>
            
            <div className="flex flex-col sm:flex-row gap-4">
              <Link to={createPageUrl('Contact') + "?tab=franchise"}>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white min-w-[200px] h-14 text-lg font-semibold rounded-xl">
                  Apply Now
                </Button>
              </Link>
              <Link to={createPageUrl('PitchDeck')}>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 min-w-[200px] h-14 text-lg font-semibold rounded-xl">
                  View Business Model
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Why Join Us */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Franchise With Us?</h2>
            <p className="text-slate-600 max-w-2xl mx-auto">
              We've built the model, the technology, and the brand. You bring the local hustle.
            </p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {benefits.map((item, idx) => (
              <Card key={idx} className="border-slate-100 shadow-lg hover:shadow-xl transition-all group">
                <CardContent className="p-8">
                  <div className="w-14 h-14 bg-slate-50 text-amber-600 rounded-xl flex items-center justify-center mb-6 group-hover:bg-amber-600 group-hover:text-white transition-colors">
                    <item.icon className="w-7 h-7" />
                  </div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3">{item.title}</h3>
                  <p className="text-slate-600 leading-relaxed">
                    {item.desc}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* The Process */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Your Path to Ownership</h2>
          
          <div className="relative max-w-4xl mx-auto">
            {/* Line */}
            <div className="absolute top-[28px] left-0 w-full h-1 bg-slate-200 hidden md:block" />

            <div className="grid md:grid-cols-4 gap-8">
              {[
                { step: "1", title: "Apply", desc: "Submit your interest and tell us about your background." },
                { step: "2", title: "Discovery", desc: "Meet with our team to review the FDD and territory map." },
                { step: "3", title: "Training", desc: "Intensive 2-week program on operations and sales." },
                { step: "4", title: "Launch", desc: "Grand opening of your territory with HQ support." }
              ].map((item, i) => (
                <div key={i} className="relative flex flex-col items-center text-center z-10">
                  <div className="w-14 h-14 bg-slate-900 text-white rounded-full flex items-center justify-center font-bold text-xl mb-4 border-4 border-slate-50 shadow-sm">
                    {item.step}
                  </div>
                  <h3 className="font-bold text-lg mb-2">{item.title}</h3>
                  <p className="text-sm text-slate-600">{item.desc}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* CTA Box */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <div className="bg-slate-900 rounded-3xl p-8 md:p-16 text-center text-white relative overflow-hidden">
            <div className="absolute top-0 right-0 p-12 opacity-5">
              <Briefcase className="w-64 h-64" />
            </div>
            
            <div className="relative z-10 max-w-2xl mx-auto">
              <h2 className="text-3xl md:text-4xl font-bold mb-6">Ready to Lead?</h2>
              <p className="text-lg text-slate-300 mb-8">
                Territories are limited. Secure your city today and start building a sustainable media empire.
              </p>
              <Link to={createPageUrl('Contact') + "?tab=franchise"}>
                <Button size="lg" className="bg-amber-500 hover:bg-amber-600 text-black font-bold px-8 h-12 text-lg">
                  Inquire About Franchising
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}