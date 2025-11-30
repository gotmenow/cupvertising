import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Coffee, TrendingUp, Leaf, Building2, HandCoins, MapPin } from 'lucide-react';
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1526403646408-57b94dc15399?q=80&w=2070&auto=format&fit=crop" 
            alt="City Skyline" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/95" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-3xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium mb-6 border border-amber-500/30">
              <MapPin className="w-4 h-4" /> Proudly Supporting UK Businesses
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Marketing That Moves: <br/>
              <span className="text-amber-500">Eliminate Your Cup Costs</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              We supply local cafes, venues, and offices with premium paper cups, completely FREE. 
              In return, we transform them into hyper-local, high-impact advertisements.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={createPageUrl('ForBusinesses')}>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white min-w-[240px] h-14 text-lg font-semibold rounded-xl shadow-lg shadow-amber-900/20">
                  I Want FREE Cups!
                </Button>
              </Link>
              <Link to={createPageUrl('ForAdvertisers')}>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 min-w-[240px] h-14 text-lg font-semibold rounded-xl backdrop-blur-sm">
                  I Want to Advertise!
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Join the Revolution?</h2>
            <p className="text-slate-600">Creating value for everyone in the business ecosystem</p>
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            {/* Benefit 1 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-slate-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-teal-100 text-teal-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <HandCoins className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Massive Cost Savings</h3>
                <p className="text-slate-600 leading-relaxed">
                  <span className="font-semibold text-teal-700 block mb-2">For Distributors</span>
                  Eliminate your biggest consumable cost instantly. Stop paying for cups and put that money back into your business.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 2 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-slate-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-green-100 text-green-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <Leaf className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">Eco-Friendly Choice</h3>
                <p className="text-slate-600 leading-relaxed">
                  <span className="font-semibold text-green-700 block mb-2">For Everyone</span>
                  Our cups are fully recyclable and compostable. Promote a sustainable brand image while reducing waste.
                </p>
              </CardContent>
            </Card>

            {/* Benefit 3 */}
            <Card className="border-none shadow-lg hover:shadow-xl transition-shadow bg-slate-50">
              <CardContent className="p-8 text-center">
                <div className="w-16 h-16 bg-amber-100 text-amber-600 rounded-2xl flex items-center justify-center mx-auto mb-6">
                  <TrendingUp className="w-8 h-8" />
                </div>
                <h3 className="text-xl font-bold mb-3 text-slate-900">High-Value Impressions</h3>
                <p className="text-slate-600 leading-relaxed">
                  <span className="font-semibold text-amber-700 block mb-2">For Advertisers</span>
                  5+ minutes of guaranteed, direct-to-hand engagement. It's marketing that people literally hold onto.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Edinburgh Focus Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1506377295352-e3154d43ea9e?q=80&w=2070&auto=format&fit=crop" 
                alt="Coffee cup in the city" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover aspect-video"
              />
            </div>
            <div className="flex-1 space-y-6">
              <div className="inline-block p-2 bg-amber-100 rounded-lg text-amber-700 font-semibold">
                <Building2 className="w-5 h-5 inline mr-2" />
                Local Focus
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Deeply Rooted in the UK
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                We're not just a cup company; we're a community builder. 
                By connecting local advertisers with local cafes and offices, we create a micro-economy that supports small business growth across the nation.
              </p>
              <div className="pt-4">
                <Link to={createPageUrl('Contact')}>
                  <Button className="bg-slate-900 text-white hover:bg-slate-800 px-8">
                    Join the Network <ArrowRight className="ml-2 w-4 h-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}