import React from 'react';
import { Link } from 'react-router-dom';
import { createPageUrl } from '../utils';
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Eye, Target, HandMetal, Coffee, Pizza, Megaphone, ArrowRight, Briefcase, GraduationCap, Globe, Truck } from 'lucide-react';
import { motion } from "framer-motion";

export default function ForAdvertisers() {
  const mediums = [
    {
      title: "High-Frequency Consumer",
      icon: Coffee,
      items: ["Cups", "Takeout Boxes", "Napkins", "Receipts"],
      desc: "Daily visibility in cafes, restaurants, and food delivery. High repetition impressions."
    },
    {
      title: "Corporate & Professional",
      icon: Briefcase,
      items: ["Printer Paper", "Notepads", "Pens", "Visitor Badges"],
      desc: "Target offices and retail spaces. Ideal for B2B services and tech solutions."
    },
    {
      title: "Youth & Education",
      icon: GraduationCap,
      items: ["Notebooks", "Exam Sheets", "Lanyards"],
      desc: "Direct access to students in schools, colleges, and training centres."
    },
    {
      title: "Community & Public",
      icon: Globe,
      items: ["Pharmacy Bags", "Ticket Stubs", "Dog Waste Bags"],
      desc: "Reach local communities through councils, healthcare, and public spaces."
    },
    {
      title: "Events & Festivals",
      icon: HandMetal,
      items: ["Wristbands", "Event Cups", "Program Booklets"],
      desc: "Capture attention during high-engagement moments at festivals and concerts."
    },
    {
      title: "Logistics & Hygiene",
      icon: Truck,
      items: ["Delivery Inserts", "Bin Liners", "Hygiene Wipes"],
      desc: "Subtle but impactful placement in operational and private spaces."
    }
  ];

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
              Hyper-Local. Tangible. <br/>Unmissable.
            </h1>
            <p className="text-xl text-slate-600 max-w-2xl mx-auto mb-8">
              Engage your target audience through the items they use, hold, and carry every day.
            </p>
            <Link to={createPageUrl('Contact') + "?tab=advertiser"}>
              <Button size="lg" className="bg-teal-600 hover:bg-teal-700 text-white text-lg px-8 h-12 rounded-full">
                Start Your Campaign
              </Button>
            </Link>
          </motion.div>
        </div>
      </section>

      {/* The Concept */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl font-bold text-slate-900 mb-4">Why Physical Media?</h2>
            <p className="text-slate-600">In a digital world, physical presence creates a lasting impression.</p>
          </div>

          <div className="grid md:grid-cols-4 gap-8">
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
              <Target className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Hyper-Targeting</h3>
            <p className="text-sm text-slate-600">
              Match venues to demographics. Tech hubs, universities, or festivals.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
              <Eye className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">High Dwell Time</h3>
            <p className="text-sm text-slate-600">
              20+ mins of exposure per item. Uninterrupted engagement.
            </p>
          </div>
          <div className="text-center p-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
              <HandMetal className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Digital Bridge</h3>
            <p className="text-sm text-slate-600">
              QR & NFC integration for instant digital conversion and tracking.
            </p>
          </div>
           <div className="text-center p-6">
            <div className="w-16 h-16 bg-slate-100 rounded-full flex items-center justify-center mx-auto mb-6 text-slate-700">
              <Megaphone className="w-8 h-8" />
            </div>
            <h3 className="text-xl font-bold mb-3">Data Analytics</h3>
            <p className="text-sm text-slate-600">
              Comprehensive campaign reports and engagement metrics.
            </p>
          </div>
          </div>
        </div>
      </section>

      {/* Media Options */}
      <section className="py-20 bg-slate-50">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-slate-900 mb-12 text-center">Choose Your Medium</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {mediums.map((m, idx) => (
              <Card key={idx} className="hover:shadow-lg transition-all border-none bg-white">
                <CardHeader>
                  <div className={`w-12 h-12 ${idx === 0 ? 'bg-amber-100 text-amber-600' : idx === 1 ? 'bg-orange-100 text-orange-600' : 'bg-purple-100 text-purple-600'} rounded-lg flex items-center justify-center mb-4`}>
                    <m.icon className="w-6 h-6" />
                  </div>
                  <CardTitle className="text-xl">{m.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <p className="text-slate-600 mb-4">{m.desc}</p>
                  <div className="flex flex-wrap gap-2">
                    {m.items.map(item => (
                      <Badge key={item} variant="secondary" className="bg-slate-100 text-slate-700">
                        {item}
                      </Badge>
                    ))}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 bg-teal-600 text-white text-center">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold mb-6">Ready to reach your audience?</h2>
          <Link to={createPageUrl('Contact') + "?tab=advertiser"}>
            <Button size="lg" className="bg-white text-teal-700 hover:bg-teal-50 px-8 h-12 text-lg">
              Get A Quote <ArrowRight className="ml-2 w-4 h-4" />
            </Button>
          </Link>
        </div>
      </section>
    </div>
  );
}