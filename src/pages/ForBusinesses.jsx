import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Truck, ShieldCheck, Heart, Coffee } from 'lucide-react';
import { motion } from "framer-motion";

export default function ForBusinesses() {
  return (
    <div className="flex flex-col">
      {/* Hero */}
      <section className="bg-amber-50 py-20">
        <div className="container mx-auto px-4 text-center">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
          >
            <div className="w-16 h-16 bg-amber-600 rounded-full flex items-center justify-center mx-auto mb-6 text-white shadow-lg shadow-amber-600/30">
              <Coffee className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Stop Buying Cups. <br/>Start Saving Money.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Edinburgh's smartest supply chain. Join hundreds of local cafes and businesses getting their essential supplies for free.
            </p>
            <Link to={createPageUrl('Contact') + "?tab=partner"}>
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 h-12 rounded-full">
                Apply for Free Cup Delivery
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
            <Card className="border-slate-100 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center">
                  <Truck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">FREE, Reliable Supply</h3>
                  <p className="text-slate-600">
                    Never pay for cups again. We set up a recurring delivery schedule based on your usage, ensuring you never run out of stock.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Zero-Risk Partnership</h3>
                  <p className="text-slate-600">
                    We manage everything - the advertising clients, the printing, and the logistics. You just brew the coffee and serve.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-red-100 text-red-600 rounded-lg flex items-center justify-center">
                  <Heart className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Support Local Ecosystem</h3>
                  <p className="text-slate-600">
                    Help fund other local, non-competing businesses. Be part of a network that helps Edinburgh thrive.
                  </p>
                </div>
              </CardContent>
            </Card>

            <Card className="border-slate-100 shadow-lg hover:shadow-xl transition-all">
              <CardContent className="p-8 flex gap-5">
                <div className="shrink-0 w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center">
                  <Check className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-2">Quality Guaranteed</h3>
                  <p className="text-slate-600">
                    We only provide high-quality, double-walled, compostable cups that keep drinks hot and hands cool. Premium feel, zero cost.
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Image Break */}
      <section className="h-64 md:h-96 relative overflow-hidden">
         <img 
            src="https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?q=80&w=2070&auto=format&fit=crop" 
            alt="Busy Cafe" 
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-slate-900/50 flex items-center justify-center">
            <h2 className="text-3xl md:text-4xl font-bold text-white text-center px-4">
              Join 50+ Edinburgh Businesses Saving £1000s Annually
            </h2>
          </div>
      </section>
    </div>
  );
}