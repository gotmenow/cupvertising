import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { ArrowRight, Coffee, Package, Ticket, Leaf, UtensilsCrossed, Sparkles } from 'lucide-react';
import { motion } from "framer-motion";

export default function Home() {
  return (
    <div className="flex flex-col">
      {/* Hero Section */}
      <section className="relative bg-slate-900 py-20 md:py-32 overflow-hidden">
        <div className="absolute inset-0 opacity-20">
          <img 
            src="https://images.unsplash.com/photo-1556742049-0cfed4f7a07d?q=80&w=2070&auto=format&fit=crop" 
            alt="Busy Cafe and Restaurant" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-b from-slate-900/80 to-slate-900/95" />
        
        <div className="container mx-auto px-4 relative z-10">
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="max-w-4xl mx-auto text-center"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-400 text-sm font-medium mb-6 border border-amber-500/30">
              <Sparkles className="w-4 h-4" /> Revolutionizing Consumables
            </div>
            <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
              Beyond Static Ads: <br/>
              <span className="text-amber-500">Smart Assets & Printed Logic.</span>
            </h1>
            <p className="text-lg md:text-xl text-slate-300 mb-10 max-w-2xl mx-auto leading-relaxed">
              We transform essential consumables into "Smart Assets" using WebAR, Thermochromic Inks, and Blockchain tracking. 
              Restaurants and the NHS get free, sustainable inventory. Brands get digital-level engagement on physical items.
            </p>
            
            <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
              <Link to={createPageUrl('ForBusinesses')}>
                <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white min-w-[240px] h-14 text-lg font-semibold rounded-xl shadow-lg shadow-amber-900/20">
                  Join Network (Free)
                </Button>
              </Link>
              <Link to={createPageUrl('ForAdvertisers')}>
                <Button size="lg" variant="outline" className="bg-white/10 border-white/20 text-white hover:bg-white/20 min-w-[240px] h-14 text-lg font-semibold rounded-xl backdrop-blur-sm">
                  Advertise With Us
                </Button>
              </Link>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Product Categories Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Our Core Product Categories</h2>
            <p className="text-slate-600">High-quality, recyclable inventory available for partners and advertisers.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            <Card className="border-slate-100 shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-amber-100 text-amber-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <UtensilsCrossed className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">Food & Hospitality</h3>
                <p className="text-slate-600 text-sm">
                  Cups, boxes, bags, cutlery, and napkins. The daily high-volume essentials.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Package className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">Corporate & Education</h3>
                <p className="text-slate-600 text-sm">
                  Printer paper, notepads, exam sheets, and stationery for offices and schools.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Leaf className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">Hygiene & Operations</h3>
                <p className="text-slate-600 text-sm">
                  Bin liners, paper towels, wipes, and receipt rolls. The hidden recurring costs.
                </p>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-md hover:shadow-xl transition-all">
              <CardContent className="p-6 text-center">
                <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Sparkles className="w-7 h-7" />
                </div>
                <h3 className="text-lg font-bold mb-2">Smart Tech Layers</h3>
                <p className="text-slate-600 text-sm">
                  AR Portals, Heat-Reveal Inks, and GS1 Digital Links for dynamic engagement.
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Mission Section */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center gap-12">
            <div className="flex-1">
              <img 
                src="https://images.unsplash.com/photo-1532614338840-ab30cf10ed36?q=80&w=2070&auto=format&fit=crop" 
                alt="Sustainability" 
                className="rounded-2xl shadow-2xl w-full h-auto object-cover"
              />
            </div>
            <div className="flex-1 space-y-6">
              <div className="inline-block p-2 bg-green-100 rounded-lg text-green-700 font-semibold">
                <Leaf className="w-5 h-5 inline mr-2" />
                Sustainability First
              </div>
              <h2 className="text-3xl md:text-4xl font-bold text-slate-900">
                Bridging Visibility & Value
              </h2>
              <p className="text-lg text-slate-600 leading-relaxed">
                Our mission is simple: to bridge the gap between businesses needing hyperlocal visibility and distribution partners needing to reduce operational costs.
              </p>
              <p className="text-lg text-slate-600 leading-relaxed">
                All our products are guaranteed to meet high standards for durability and recyclability, providing an environmental benefit to our partners.
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