import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { 
  TrendingUp, Recycle, Globe, 
  CheckCircle2, MapPin
} from 'lucide-react';
import { 
  BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip as RechartsTooltip, ResponsiveContainer, 
  PieChart, Pie, Cell, Legend 
} from 'recharts';
import { motion } from "framer-motion";

export default function PitchDeck() {
  // Financial Data for Charts (Revised for Pre-Seed Realism)
  const financialData = [
    { name: 'Year 1 (Pilot)', revenue: 0.25, units: 0.5 },
    { name: 'Year 3 (Scale)', revenue: 3.5, units: 12 },
    { name: 'Year 5 (National)', revenue: 15, units: 50 },
  ];

  // Use of Funds Data (Focused on Pilot Execution)
  const fundsData = [
    { name: 'Pilot Inventory', value: 45, color: '#d97706' }, // amber-600
    { name: 'Founder Sales Ops', value: 35, color: '#0d9488' }, // teal-600
    { name: 'Legal & Admin', value: 20, color: '#475569' }, // slate-600
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
                <h4 className="font-bold text-slate-900 mb-2">Zero-Cost Smart Assets</h4>
                <p className="text-slate-600">
                  We provide free, tech-enabled inventory to SMEs, <span className="font-bold text-teal-600">NHS Hospitals</span>, and <span className="font-bold text-teal-600">Councils</span>—saving taxpayer money.
                </p>
              </div>
              <div className="bg-white p-6 rounded-xl shadow-sm border-l-4 border-teal-500">
                <h4 className="font-bold text-slate-900 mb-2">Scalable Franchise Model</h4>
                <p className="text-slate-600">
                  Franchisees manage physical distribution while we provide the AR technology and ad-sales platform.
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
              { title: "Food & Hospitality", img: "https://images.unsplash.com/photo-1517256064527-09c73fc73e38?q=80&w=800&auto=format&fit=crop", desc: "Cups, Boxes, Bags, Cutlery" },
              { title: "Cleaning & Hygiene", img: "https://images.unsplash.com/photo-1584622650111-993a426fbf0a?q=80&w=800&auto=format&fit=crop", desc: "Bin Liners, Towels, Wipes" },
              { title: "Logistics & Ops", img: "https://images.unsplash.com/photo-1586528116311-ad8dd3c8310d?q=80&w=800&auto=format&fit=crop", desc: "Inserts, Stickers, Receipts" },
              { title: "Office & Retail", img: "https://images.unsplash.com/photo-1497215728101-856f4ea42174?q=80&w=800&auto=format&fit=crop", desc: "Paper, Stationery, Tape" },
              { title: "Schools & Edu", img: "https://images.unsplash.com/photo-1503676260728-1c00da094a0b?q=80&w=800&auto=format&fit=crop", desc: "Notebooks, Exam Sheets" },
              { title: "Events & Festivals", img: "https://images.unsplash.com/photo-1492684223066-81342ee5ff30?q=80&w=800&auto=format&fit=crop", desc: "Wristbands, Cups, Tickets" },
              { title: "Healthcare", img: "https://images.unsplash.com/photo-1519494026892-80bbd2d6fd0d?q=80&w=800&auto=format&fit=crop", desc: "Pharmacy Bags, Cups" },
              { title: "Council & Public", img: "https://images.unsplash.com/photo-1493723843689-d20b49635984?q=80&w=800&auto=format&fit=crop", desc: "Litter Bags, Newsletters" }
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
                <span className="px-3 py-1 bg-blue-100 text-blue-700 rounded-full">Tech-Enabled</span>
                <span className="px-3 py-1 bg-amber-100 text-amber-700 rounded-full">Subscription Ready</span>
             </div>
             </div>

             {/* Tech Differentiation - "Printed Logic" */}
             <div className="mb-8">
               <h3 className="text-lg font-bold text-slate-900 mb-4">Innovator Tech Stack: "Printed-Logic"</h3>
               <div className="grid md:grid-cols-5 gap-4">
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="text-indigo-600 font-bold text-xs uppercase mb-1">WebAR</div>
                    <div className="font-bold text-slate-800 text-sm">AR Portals</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="text-orange-600 font-bold text-xs uppercase mb-1">Ink Tech</div>
                    <div className="font-bold text-slate-800 text-sm">Heat Reveal</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="text-blue-600 font-bold text-xs uppercase mb-1">Dynamic</div>
                    <div className="font-bold text-slate-800 text-sm">GS1 Digital Links</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="text-purple-600 font-bold text-xs uppercase mb-1">Gamification</div>
                    <div className="font-bold text-slate-800 text-sm">Scratch & Win</div>
                </div>
                <div className="bg-white p-4 rounded-xl border border-slate-200 shadow-sm text-center">
                    <div className="text-green-600 font-bold text-xs uppercase mb-1">Trust</div>
                    <div className="font-bold text-slate-800 text-sm">Blockchain Track</div>
                </div>
               </div>
             </div>
             </motion.section>

        {/* Slide 4: Go-To-Market Strategy (Revised) */}
        <motion.section {...fadeInUp} className="bg-slate-900 rounded-3xl p-8 md:p-12 text-white overflow-hidden relative">
          <div className="absolute top-0 right-0 opacity-10 pointer-events-none">
            <MapPin className="w-96 h-96 -mr-20 -mt-20" />
          </div>
          
          <div className="relative z-10">
            <h2 className="text-3xl font-bold mb-2">Go-To-Market Strategy</h2>
            <p className="text-slate-400 mb-12">Proving Density & Unit Economics First</p>

            <div className="grid md:grid-cols-3 gap-8 relative">
              {/* Connecting Line */}
              <div className="hidden md:block absolute top-12 left-0 w-full h-0.5 bg-slate-700 -z-10" />

              <div className="relative">
                <div className="w-24 h-24 bg-amber-500 rounded-full flex items-center justify-center text-black font-bold text-xl mb-6 shadow-lg shadow-amber-500/20 z-10 mx-auto md:mx-0">
                  0-6m
                </div>
                <h3 className="text-xl font-bold mb-2">Phase 1: Hyper-Local Pilot</h3>
                <p className="text-sm text-slate-400">
                  Focus on <strong>ONE</strong> high-density university town or business district. Secure 50 independent coffee shops. Prove 100% ad inventory sell-through.
                </p>
              </div>

              <div className="relative">
                <div className="w-24 h-24 bg-slate-800 border-2 border-amber-500/50 rounded-full flex items-center justify-center text-amber-500 font-bold text-xl mb-6 z-10 mx-auto md:mx-0">
                  6-18m
                </div>
                <h3 className="text-xl font-bold mb-2">Phase 2: City-Wide Rollout</h3>
                <p className="text-sm text-slate-400">
                  Replicate the high-density model across 3 major UK cities. Introduce "takeaway food" packaging network.
                </p>
              </div>

              <div className="relative">
                <div className="w-24 h-24 bg-slate-800 border-2 border-slate-600 rounded-full flex items-center justify-center text-slate-400 font-bold text-xl mb-6 z-10 mx-auto md:mx-0">
                  18m+
                </div>
                <h3 className="text-xl font-bold mb-2">Phase 3: Franchise Scale</h3>
                <p className="text-sm text-slate-400">
                  Launch franchise model. Standardized SOPs, branding, and tech stack to scale rapidly across new territories.
                </p>
              </div>
            </div>
          </div>
        </motion.section>

        {/* Slide 5: Market Analysis (Detailed) */}
        <motion.section {...fadeInUp}>
          <div className="mb-12">
             <div className="flex items-center gap-4 mb-6">
                <div className="h-10 w-2 bg-teal-500 rounded-full" />
                <h2 className="text-3xl font-bold text-slate-900">Market Analysis: The Realistic Opportunity</h2>
              </div>
          </div>

          <div className="grid lg:grid-cols-2 gap-12">
            {/* Left Column: Visuals (TAM/SAM/SOM) */}
            <div className="space-y-6">
                <div className="p-6 bg-white border border-slate-200 rounded-xl shadow-sm opacity-70">
                  <div className="flex justify-between">
                    <div className="text-sm text-slate-500 font-bold uppercase mb-1">TAM (Context Only)</div>
                    <Badge variant="outline" className="text-slate-400 border-slate-200">Too Broad</Badge>
                  </div>
                  <div className="text-3xl font-bold text-slate-900">£42.6 Billion</div>
                  <div className="text-xs text-slate-500 mt-1">Total UK Ad Spend (TV, Digital, OOH).</div>
                </div>
                
                <div className="p-6 bg-white border-l-4 border-amber-500 rounded-xl shadow-sm">
                  <div className="text-sm text-amber-600 font-bold uppercase mb-1">SAM (Volume Capacity)</div>
                  <div className="text-3xl font-bold text-slate-900">£2 Billion</div>
                   <div className="text-xs text-slate-500 mt-1">UK Disposable Packaging Market (Sales Value).</div>
                  <div className="w-full bg-slate-100 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-amber-500 h-full w-[30%]" />
                  </div>
                </div>

                <div className="p-6 bg-teal-50 border-l-4 border-teal-600 rounded-xl shadow-md ring-1 ring-teal-100">
                  <div className="flex justify-between items-start">
                    <div className="text-sm text-teal-800 font-bold uppercase mb-1">SOM (Target Niche)</div>
                    <Badge className="bg-teal-600 hover:bg-teal-700">Primary Focus</Badge>
                  </div>
                  <div className="text-4xl font-bold text-teal-900">£35M - £75M</div>
                   <div className="text-sm text-teal-700 mt-2 font-medium">High-Dwell-Time Experiential Media</div>
                   <div className="text-xs text-teal-600 mt-3 pt-3 border-t border-teal-200">
                     <span className="font-bold">Global Potential:</span> £200M - £400M
                   </div>
                  <div className="w-full bg-teal-200 h-2 rounded-full mt-3 overflow-hidden">
                    <div className="bg-teal-600 h-full w-[80%]" />
                  </div>
                </div>
            </div>

            {/* Right Column: Narrative Analysis */}
            <div className="flex flex-col justify-center space-y-8 bg-white p-8 rounded-3xl border border-slate-200 shadow-sm">
                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="bg-red-100 text-red-600 p-1.5 rounded-lg text-sm">⚠️</span> Addressing the "Unbelievable"
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    The market size presented is often based on inflated TAM figures like the £42.6bn UK Ad Spend. These are misleading as they rely heavily on digital/TV budgets. The realistic revenue comes from a specific, defensible niche.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="bg-teal-100 text-teal-600 p-1.5 rounded-lg text-sm">🎯</span> The Defensible Niche (SOM)
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    This represents advertising budgets allocated to <strong>highly targeted, high-dwell-time OOH media</strong>. It captures localized spend (e.g., bus shelters) but with superior engagement. Packaging includes cups, burger boxes, and bags—maximizing surface area for premium impressions.
                  </p>
                </div>

                <div>
                  <h3 className="text-xl font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <span className="bg-blue-100 text-blue-600 p-1.5 rounded-lg text-sm">🛡️</span> Antidote to Digital Fatigue
                  </h3>
                  <p className="text-slate-600 leading-relaxed text-sm">
                    As online channels become saturated, brands are seeking tangible, real-world connections. We offer guaranteed 5-15 minute dwell times during consumption moments—something digital ads cannot match.
                  </p>
                </div>
            </div>
          </div>
        </motion.section>

        {/* Slide 6: Financial Projections (Bar Chart) */}
        <motion.section {...fadeInUp}>
          {/* Unit Economics Section */}
          <div className="mb-12">
            <div className="flex items-center gap-4 mb-8">
              <div className="h-10 w-2 bg-amber-500 rounded-full" />
              <h2 className="text-3xl font-bold text-slate-900">Unit Economics</h2>
            </div>
            
            <Card className="bg-white border-none shadow-lg overflow-hidden">
              <div className="grid md:grid-cols-3 divide-y md:divide-y-0 md:divide-x divide-slate-100">
                <div className="p-8 text-center bg-teal-50/30">
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Average Revenue</div>
                  <div className="text-5xl font-bold text-teal-600 mb-2">£0.10</div>
                  <div className="text-sm text-slate-600 px-4">Per Packaging Item</div>
                  <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                    Justified by guaranteed <strong>5-15 min dwell time</strong> and geo-targeting (e.g., offices, events). clear ROI advantage over fleeting OOH.
                  </p>
                </div>
                
                <div className="p-8 text-center relative">
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 font-bold z-10 hidden md:flex">-</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Cost of Goods (CoGS)</div>
                  <div className="text-5xl font-bold text-red-500 mb-2">£0.07</div>
                  <div className="text-sm text-slate-600 px-4">Per Packaging Item</div>
                  <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                    Includes water-based barrier coatings, flexographic printing, warehousing, and nationwide distribution.
                  </p>
                </div>

                <div className="p-8 text-center bg-amber-50/30 relative">
                  <div className="absolute top-1/2 -left-3 -translate-y-1/2 w-6 h-6 bg-white rounded-full border border-slate-200 flex items-center justify-center text-slate-400 font-bold z-10 hidden md:flex">=</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wider mb-2">Gross Profit</div>
                  <div className="text-5xl font-bold text-amber-600 mb-2">£0.03</div>
                  <div className="text-sm text-slate-600 px-4">Per Packaging Item</div>
                  <p className="mt-4 text-xs text-slate-500 leading-relaxed">
                    Consistent margin covers overheads, ensuring scalability without relying on product sales.
                  </p>
                </div>
              </div>
            </Card>
          </div>

          <div className="bg-white p-8 md:p-12 rounded-3xl shadow-lg border border-slate-200">
            <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 gap-6">
              <div>
                <h2 className="text-3xl font-bold text-slate-900 mb-2">Conservative Projections</h2>
                <p className="text-slate-600">Focus on sustainable growth and unit profitability.</p>
              </div>
              <div className="flex gap-6">
                <div className="text-right">
                  <div className="text-3xl font-bold text-teal-600">30%</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Target Margin</div>
                </div>
                <div className="text-right">
                  <div className="text-3xl font-bold text-amber-600">12M</div>
                  <div className="text-xs font-bold uppercase text-slate-400">Year 3 Units</div>
                </div>
              </div>
            </div>

            <div className="h-[400px] w-full">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={financialData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                  <CartesianGrid strokeDasharray="3 3" vertical={false} />
                  <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{fill: '#64748b'}} dy={10} />
                  <YAxis yAxisId="left" orientation="left" stroke="#0d9488" axisLine={false} tickLine={false} label={{ value: 'Revenue (£M)', angle: -90, position: 'insideLeft', fill: '#0d9488' }} />
                  <YAxis yAxisId="right" orientation="right" stroke="#d97706" axisLine={false} tickLine={false} label={{ value: 'Units (M)', angle: 90, position: 'insideRight', fill: '#d97706' }} />
                  <RechartsTooltip 
                    contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 4px 6px -1px rgb(0 0 0 / 0.1)' }}
                    cursor={{fill: '#f1f5f9'}}
                  />
                  <Legend wrapperStyle={{paddingTop: '20px'}} />
                  <Bar yAxisId="left" dataKey="revenue" name="Revenue (£M)" fill="#0d9488" radius={[6, 6, 0, 0]} barSize={60} />
                  <Bar yAxisId="right" dataKey="units" name="Units Distributed (M)" fill="#d97706" radius={[6, 6, 0, 0]} barSize={60} />
                </BarChart>
              </ResponsiveContainer>
            </div>
          </div>
        </motion.section>

        {/* Slide 7: The Ask (Pie Chart) */}
        <motion.section {...fadeInUp} className="bg-slate-900 text-white rounded-3xl p-8 md:p-16 text-center">
          <Badge className="bg-amber-500 text-black mb-8 px-4 py-1 text-base">PRE-SEED ROUND</Badge>
          <h2 className="text-4xl md:text-6xl font-bold mb-4">The Ask</h2>
          <div className="text-6xl md:text-8xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-amber-400 to-teal-400 mb-8">
            £350,000
          </div>
          <p className="text-2xl text-slate-300 mb-16">To Fund 12-Month Pilot & MVP</p>

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
                      <Cell key={'cell-' + index} fill={entry.color} />
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
                    {i === 0 && "Secure inventory for initial 50-venue pilot."}
                    {i === 1 && "Founder-led sales + 1 Key Hire to secure ad partners."}
                    {i === 2 && "Basic MVP tracking tools and legal setup."}
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