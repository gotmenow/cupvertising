import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Check, Truck, Coins, Leaf, ArrowRight } from 'lucide-react';
import { motion } from "framer-motion";

export default function ForBusinesses() {
  const products = [
    {
      category: "Core Beverage",
      items: ["Paper Coffee Cups (4oz - 16oz)", "Cup Sleeves", "Napkins"]
    },
    {
      category: "Packaging & Delivery",
      items: ["Takeout Containers (Clamshells)", "Paper Bags", "Cutlery Wrappers", "Pizza Box Inserts", "Tamper-Proof Stickers"]
    },
    {
      category: "Condiments & Accessories",
      items: ["Sugar/Sweetener Packets", "Condiment Sachets", "Wet Wipes", "Cardboard Coasters"]
    },
    {
      category: "Event & Utility",
      items: ["Tyvek Event Wristbands", "Water Bottle Labels"]
    }
  ];

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
              <Coins className="w-8 h-8" />
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-slate-900 mb-6">
              Reduce Your Overheads. <br/>Zero Cost Inventory.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              We provide restaurants, cafes, and event organizers with high-quality, essential supplies completely free of charge.
            </p>
            <Link to={createPageUrl('Contact') + "?tab=partner"}>
              <Button size="lg" className="bg-amber-600 hover:bg-amber-700 text-white text-lg px-8 h-12 rounded-full">
                Apply for Free Inventory
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* Available Products */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl font-bold text-slate-900">What You Get</h2>
            <p className="text-slate-600 mt-2">Customizable, recyclable products to run your business.</p>
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
            {products.map((cat, idx) => (
              <Card key={idx} className="bg-slate-50 border-none shadow-sm h-full">
                <CardHeader>
                  <CardTitle className="text-lg font-bold text-slate-900">{cat.category}</CardTitle>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {cat.items.map((item, i) => (
                      <li key={i} className="flex items-start gap-2 text-sm text-slate-600">
                        <Check className="w-4 h-4 text-amber-600 shrink-0 mt-0.5" />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Benefits Grid */}
      <section className="py-20 bg-slate-100">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-3 gap-8 max-w-5xl mx-auto">
            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-green-100 text-green-600 rounded-lg flex items-center justify-center mb-4">
                <Coins className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Direct Cost Savings</h3>
              <p className="text-slate-600">
                Eliminate the cost of purchasing disposables. Keep that money in your business to invest in growth or staff.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-lg flex items-center justify-center mb-4">
                <Leaf className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Sustainability</h3>
              <p className="text-slate-600">
                All our products meet high standards for durability and recyclability or compostability, boosting your green credentials.
              </p>
            </div>

            <div className="bg-white p-8 rounded-xl shadow-sm">
              <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-lg flex items-center justify-center mb-4">
                <Truck className="w-6 h-6" />
              </div>
              <h3 className="text-xl font-bold text-slate-900 mb-3">Reliable Supply</h3>
              <p className="text-slate-600">
                Scheduled deliveries ensure you never run out of the essentials. We handle the logistics; you handle the service.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-6">Ready to stop paying for supplies?</h2>
          <Link to={createPageUrl('Contact') + "?tab=partner"}>
            <Button size="lg" className="bg-slate-900 hover:bg-slate-800 text-white px-8">
              Join as a Distribution Partner <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}