import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, Recycle, Target, DollarSign, Globe, BarChart3, Briefcase, 
  Lightbulb, Users, ArrowRight, CheckCircle2, MapPin, Rocket 
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { motion } from "framer-motion";

export default function PitchDeck() {
  // Financial Data for Charts
  const financialData = [
    { name: 'Year 1 (Pilot)', revenue: 0.75, units: 1.5 },
    { name: 'Year 3 (Scale)', revenue: 15, units: 50 },
    { name: 'Year 5 (Global)', revenue: 45, units: 150 },
  ];

  // Use of Funds Data
  const fundsData = [
    { name: 'Inventory & Production', value: 40, color: '#d97706' }, // amber-600
    { name: 'Sales & Biz Dev', value: 35, color: '#0d9488' }, // teal-600
    { name: 'Logistics Tech', value: 25, color: '#475569' }, // slate-600
  ];

  const fadeInUp = {
    initial: { opacity: 0, y: 20 },
    whileInView: { opacity: 1, y: 0 },
    viewport: { once: true },
    transition: { duration: 0.5 }
  };

  return (
    <div className="min-h-screen bg-slate-50 font-sans">
      
      {/* Slide 1: Title & Vision (Hero Style) */}
      <section className="relative h-screen min-h-[600px] flex items-center justify-center overflow-hidden bg-slate-900 text-white">
        <div className="absolute inset-0 opacity-40">
           <img 
            src="https://images.unsplash.com/photo-1455849318743-b2233052fcff?q=80&w=2069&auto=format&fit=crop" 
            alt="Global Business" 
            className="w-full h-full object-cover"
          />
        </div>
        <div className="absolute inset-0 bg-gradient-to-t from-slate-900 via-slate-900/80 to-transparent" />
        
        <div className="container mx-auto px-4 relative z-10 text-center">
          <motion.div {...fadeInUp}>
            <Badge className="bg-amber-500 hover:bg-amber-600 text-black text-lg py-1 px-6 mb-6 font-bold">
              INVESTOR PRESENTATION
            </Badge>
            <h1 className="text-5xl md:text-7xl font-bold mb-6 tracking-tight">
              The Ad-Cup Model
            </h1>
            <p className="text-2xl md:text-3xl text-slate-300 max-w-4xl mx-auto mb-8 font-light leading-relaxed">
              Turning Waste into Wealth: <br/>
              <span className="text-amber-400 font-semibold">Hyperlocal Media</span> for a <span className="text-teal-400 font-semibold">Sustainable Economy</span>.
            </p>
            <div className="flex items-center justify-center gap-4 text-sm font-medium tracking-widest uppercase text-slate-400">
              <span className="flex items-center"><MapPin className="w-4 h-4 mr-2" /> UK Launch</span>
              <span className="w-1.5 h-1.5 rounded-full bg-slate-600" />
              <span className="flex items-center"><Globe className="w-4 h-4 mr-2" /> Global Scale</span>
            </div>
          </motion.div>
        </div>
      </section>

      <div className="container mx-auto max-w-6xl px-4 py-16 space-y-24">
        
        {/* Slide 2: The Problem & Solution (Visual Split) */}
        <motion.section {...fadeInUp} className="grid md:grid-cols-2 gap-8 items-stretch">
          <Card className="bg-red-50/50 border-red-100 shadow-sm">
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-red-700 text-2xl">
                <TrendingUp className="w-6 h-6" /> The Problem
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6">
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">High Operational Expense</h4>
                <p className="text-slate-600">
                  UK Cafes & Restaurants face massive non-revenue generating costs for disposables.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm">
                <h4 className="font-bold text-slate-900 mb-2">Waste Perception</h4>
                <p className="text-slate-600">
                  Single-use items hurt brand image. Businesses are desperate for sustainable solutions.
                </p>
              </div>
            </CardContent>
          </Card>

          <Card className="bg-teal-50/50 border-teal-100 shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 p-4 opacity-10">
              <Recycle className="w-32 h-32 text-teal-600" />
            </div>
            <CardHeader>
              <CardTitle className="flex items-center gap-3 text-teal-700 text-2xl">
                <CheckCircle2 className="w-6 h-6" /> The Solution
              </CardTitle>
            </CardHeader>
            <CardContent className="space-y-6 relative z-10">
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-teal-500">
                <h4 className="font-bold text-slate-900 mb-2">Zero-Cost Inventory</h4>
                <p className="text-slate-600">
                  We provide 100% of these essential products for <span className="font-bold text-teal-600">FREE</span>.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-teal-500">
                <h4 className="font-bold text-slate-900 mb-2">Direct Profit Impact</h4>
                <p className="text-slate-600">
                  We instantly convert a variable expense into a guaranteed saving for our partners.
                </p>
              </div>
            </CardContent>
          </Card>
        </motion.section>

        {/* Slide 3: Product Portfolio (Image Grid) */}
        <motion.section {...fadeInUp}>
          <div className="flex items-center gap-4 mb-8">
            <div className="h-10 w-2 bg-amber-500 rounded-full" />
            <h2 className="text-3xl font-bold text-slate-900">Physical Media Portfolio</h2>
          </div>
          
          <div className="grid md:grid-cols-4 gap-6">
            {[
              { title: "Core Beverage", img: "https://images.unsplash.com/photo-1577963297123-5e93344b5843?q=80&w=2070&auto=format&fit=crop", desc: "Cups, Sleeves, Napkins" },
              { title: "Packaging", img: "https://images.unsplash.com/photo-1585510667086-a7c827c1917f?q=80&w=2070&auto=format&fit=crop", desc: "Boxes, Bags, Stickers" },
              { title: "Condiments", img: "https://images.unsplash.com/photo-1626132646636-f38b03061266?q=80&w=2070&auto=format&fit=crop", desc: "Sachets, Wipes, Coasters" },
              { title: "Event Utility", img: "https://images.unsplash.com/photo-1533174072545-e8d4aa97edf9?q=80&w=1887&auto=format&fit=crop", desc: "Wristbands, Labels" }
            ].map((item, i) => (
              <div key={i} className="group relative h-64 rounded-2xl overflow-hidden shadow-lg">
                <img src={item.img} alt={item.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110" />
                <div className="absolute inset-0 bg-gradient-to-t from-slate-900/90 to-transparent" />
                <div className="absolute bottom-0 left-0 p-4 text-white">
                  <h3 className="font-bold text-lg">{item.title}</h3>
                  <p className="text-sm text-slate-300">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-8 bg-white p-6 rounded-xl border border-slate-200 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
             <div className="flex-1">
               <h3 className="text-lg font-bold text-slate-900 mb-2">The Ad Mechanic</h3>
               <p className="text-slate-600">
                 <span className="font-bold text-amber-600">80%</span> Distributor Branding (Retention) + <span className="font-bold text-teal-600">20%</span> Targeted Ad Space (Revenue).
               </p>
             </div>
             <div className="flex items-center gap-4 text-sm font-medium text-slate-500">
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Recyclable</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">Compostable</span>
                <span className="px-3 py-1 bg-green-100 text-green-700 rounded-full">High-Quality</span>
             </div>
          </div>
        </motion.section>

        {/* Slide 4: Strategic Roadmap (Timeline) */}
        <motion.section {...fadeInUp} className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <Globe className="w-96 h-96 -mr-20 -mt-20" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Expansion Strategy</h2>
            <p className="text-slate-400 mb-12">From UK Roots to Global Dominance</p>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-700 -z-10" />

              <div className="relative">
                <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl mb-6 shadow-lg shadow-amber-500/20 z-10 mx-auto md:mx-0">
                  UK
                </div>
                <h3 className="text-xl font-bold mb-2">Phase 1: Primary Market</h3>
                <p className="text-sm text-slate-400">
                  Dominate top 5 UK metro areas (London, Manchester, Edinburgh, etc). Establish logistics and prove unit economics.
                </p>
              </div>

              <div className="relative">
                <div className="w-24 h-24 bg-slate-800 border-2 border-amber-500/50 rounded-full flex items-center justify-center text-amber-500 font-bold text-xl mb-6 z-10 mx-auto md:mx-0">
                  EU
                </div>
                <h3 className="text-xl font-bold mb-2">Phase 2: European Hubs</h3>
                <p className="text-sm text-slate-400">
                  Expand to Paris, Berlin, and Amsterdam. Leverage existing multinational brand partnerships.
                </p>
              </div>

              <div className="relative">
                <div className="w-24 h-24 bg-slate-800 border-2 border-slate-600 rounded-full flex items-center justify-center text-slate-400 font-bold text-xl mb-6 z-10 mx-auto md:mx-0">
                  Global
                </div>
                <h3 className="text-xl font-bold mb-2">Phase 3: Global Scale</h3>
                <p className="text-sm text-slate-400">
                  US and Asian market entry. Licensing model for rapid deployment in new territories.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Slide 5: Market Sizing (Pie/Bar) */}
        <motion.section {...fadeInUp}>
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div>
              <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-2 bg-teal-500 rounded-full" />
                <h2 className="text-3xl font-bold text-slate-900">Market Opportunity</h2>
              </div>
              <p className="text-lg text-slate-600 mb-8 leading-relaxed">
                The disposable food service packaging market is massive and recurring. We are intercepting this spend and converting it into media value.
              </p>
              
              <div className="space-y-6">
                <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm">
                  <div className="text-sm text-slate-500 font-bold uppercase mb-1">Total Addressable Market (Global)</div>
                  <div className="text-4xl font-bold text-slate-900">$150 Billion</div>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-slate-300 h-full w-full" />
                  </div>
                </div>
                
                <div className="p-6 bg-white border-l-4 border-amber-500 rounded-xl shadow-sm">
                  <div className="text-sm text-amber-600 font-bold uppercase mb-1">Serviceable Available Market (UK Focus)</div>
                  <div className="text-4xl font-bold text-slate-900">$4 Billion</div>
                   <div className="text-xs text-slate-500 mt-1">Disposable spend in major UK/EU Metro areas.</div>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-amber-500 h-full w-[15%]" />
                  </div>
                </div>

                <div className="p-6 bg-white border-l-4 border-teal-600 rounded-xl shadow-sm">
                  <div className="text-sm text-teal-700 font-bold uppercase mb-1">Serviceable Obtainable Market (Year 3)</div>
                  <div className="text-4xl font-bold text-slate-900">$15 Million</div>
                   <div className="text-xs text-slate-500 mt-1">1% of SAM = 50 Million Units/Year</div>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-teal-600 h-full w-[2%]" />
                  </div>
                </div>
              </div>
            </div>

            <div className="bg-white p-8 rounded-2xl shadow-xl border border-slate-100 h-full flex flex-col justify-center">
               <h3 className="text-xl font-bold text-center mb-6">Why Brands & Businesses Need This</h3>
               <div className="space-y-6">
                 <div className="flex gap-4">
                   <div className="w-12 h-12 bg-blue-100 text-blue-600 rounded-full flex items-center justify-center shrink-0"><Target /></div>
                   <div>
                     <h4 className="font-bold text-slate-900">Hyper-Local Targeting</h4>
                     <p className="text-sm text-slate-600">Reach customers within 1 mile of a point of sale. Perfect for local services.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-12 h-12 bg-purple-100 text-purple-600 rounded-full flex items-center justify-center shrink-0"><Users /></div>
                   <div>
                     <h4 className="font-bold text-slate-900">Guaranteed Engagement</h4>
                     <p className="text-sm text-slate-600">20 minute dwell time per cup. Higher attention than digital ads.</p>
                   </div>
                 </div>
                 <div className="flex gap-4">
                   <div className="w-12 h-12 bg-green-100 text-green-600 rounded-full flex items-center justify-center shrink-0"><Recycle /></div>
                   <div>
                     <h4 className="font-bold text-slate-900">Green Halo Effect</h4>
                     <p className="text-sm text-slate-600">Brands associate themselves with sustainability by sponsoring free eco-products.</p>
                   </div>
                 </div>
               </div>
            </div>
          </div>
        </motion.section>

        {/* Slide 6: Financial Projections (Bar Chart) */}
        <motion.section {...fadeInUp}>
          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Financial Trajectory</h2>
                <p className="text-slate-600">Scaling to $15M Annual Revenue by Year 3</p>
              </div>
              <div className="flex gap-6">
                <div className="text-right">
                  <div className="text-3xl font-bold text-teal-600">40%</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Target Margin</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-600">50M</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Year 3 Units</div>
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                  <YAxis yAxisId="left" orientation="left" stroke="#0d9488" axisLine={false} tickLine={false} label={{ value: 'Revenue ($M)', angle: -90, position: 'insideLeft', fill: '#0d9488' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#d97706" axisLine={false} tickLine={false} label={{ value: 'Units (M)', angle: 90, position: 'insideRight', fill: '#d97706' }} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{fill: '#f1f5f9'}}
                  />
                  <Legend wrapperStyle={{paddingTop: '20px'}} />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue ($M)" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={60} />
                  <Bar yAxisId="right" dataKey="units" name="Units Distributed (M)" fill="#d97706" radius={[6, 6, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        {/* Slide 7: The Ask (Pie Chart) */}
        <motion.section {...fadeInUp} className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 text-center">
          <Badge className="bg-amber-500 text-black mb-8 px-4 py-1 text-base">SEED ROUND</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">The Ask</h2>
          <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-teal-400 mb-8">
            $2,000,000
          </div>
          <p className="text-2xl text-slate-300 mb-16">For 20% Equity</p>

          <div className="grid md:grid-cols-2 gap-12 items-center text-left">
            <div className="h-[300px] w-full flex justify-center">
              <ResponsiveContainer width="100%" height="100%">
                <PieChart>
                  <Pie
                    data={fundsData}
                    cx="50%"
                    cy="50%"
                    innerRadius={60}
                    outerRadius={100}
                    paddingAngle={5}
                    dataKey="value"
                  >
                    {fundsData.map((entry, index) => (
                      <Cell key={`cell-${index}`} fill={entry.color} />
                    ))}
                  </Pie>
                  <RechartsTooltip contentStyle={{ borderRadius: '8px', color: '#000' }} />
                  <Legend verticalAlign="middle" align="right" layout="vertical" iconType="circle" />
                </PieChart>
              </ResponsiveContainer>
            </div>
            <div className="space-y-6">
              <h3 className="text-2xl font-bold mb-4">Use of Funds</h3>
              {fundsData.map((item, i) => (
                <div key={i} className="bg-white/10 p-4 rounded-xl backdrop-blur-sm border border-white/5">
                  <div className="flex justify-between items-center mb-1">
                    <span className="font-bold text-lg" style={{color: item.color}}>{item.name}</span>
                    <span className="font-bold text-white">{item.value}%</span>
                  </div>
                  <p className="text-sm text-slate-400">
                    {i === 0 && "Fund first 6 months of production for 100+ UK partners."}
                    {i === 1 && "Hire dedicated UK sales team & expand network."}
                    {i === 2 && "Develop proprietary logistics & ad-tracking software."}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </motion.section>

      </div>
    </div>
  );
}