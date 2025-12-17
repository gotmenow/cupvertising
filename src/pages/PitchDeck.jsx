import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import { 
  TrendingUp, 
  Recycle, 
  Target, 
  DollarSign, 
  Globe, 
  BarChart3, 
  Briefcase,
  Lightbulb,
  Users,
  PieChart
} from 'lucide-react';

export default function PitchDeck() {
  return (
    <div className="min-h-screen bg-slate-50 py-12 px-4">
      <div className="container mx-auto max-w-5xl">
        {/* Header */}
        <div className="text-center mb-16 space-y-4">
          <Badge className="bg-amber-600 hover:bg-amber-700 text-lg py-1 px-4">Investor Relations</Badge>
          <h1 className="text-4xl md:text-5xl font-bold text-slate-900">The Ad-Cup Model</h1>
          <p className="text-xl text-slate-600 max-w-2xl mx-auto">
            Turning Waste into Wealth: Hyperlocal Media for a Sustainable Economy
          </p>
        </div>

        <div className="space-y-12">
          {/* Slide 1: Vision */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
              <Lightbulb className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold">1. Vision & The Opportunity</h2>
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-12">
              <div className="space-y-6">
                <div>
                  <h3 className="text-lg font-bold text-red-600 mb-2 flex items-center gap-2">
                    <TrendingUp className="w-5 h-5" /> The Problem (Distributors)
                  </h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-2">
                    <li><span className="font-semibold">High Operational Expense:</span> Restaurants & events face huge non-revenue costs for disposables.</li>
                    <li><span className="font-semibold">Waste Perception:</span> Single-use dependence hurts sustainability image.</li>
                  </ul>
                </div>
                <div>
                  <h3 className="text-lg font-bold text-green-600 mb-2 flex items-center gap-2">
                    <Recycle className="w-5 h-5" /> The Solution (Ad-Cup Model)
                  </h3>
                  <ul className="list-disc list-inside text-slate-600 space-y-2 ml-2">
                    <li><span className="font-semibold">Zero-Cost Inventory:</span> 100% free, high-quality, recyclable products.</li>
                    <li><span className="font-semibold">Direct Cost Saving:</span> Converting variable expense into guaranteed savings.</li>
                  </ul>
                </div>
              </div>
              <div className="bg-slate-50 p-6 rounded-xl flex flex-col justify-center border border-slate-200">
                <h3 className="text-xl font-bold text-slate-900 mb-4 text-center">Our Vision</h3>
                <p className="text-slate-600 text-center italic text-lg">
                  "To become the leading provider of sustainable, cost-saving, and hyper-targeted physical media advertising globally."
                </p>
              </div>
            </div>
          </section>

          {/* Slide 2: Product */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
              <Briefcase className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold">2. The Product & Value Proposition</h2>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-8 mb-8">
                <Card>
                  <CardHeader><CardTitle className="text-lg">Sustainability Guarantee</CardTitle></CardHeader>
                  <CardContent className="text-slate-600">All products meet high standards for recyclability/compostability.</CardContent>
                </Card>
                <Card>
                  <CardHeader><CardTitle className="text-lg">Quality Assurance</CardTitle></CardHeader>
                  <CardContent className="text-slate-600">Equal to or better than current sourcing, ensuring premium customer experience.</CardContent>
                </Card>
              </div>

              <h3 className="text-lg font-bold text-slate-900 mb-4">Product Portfolio</h3>
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="border-b border-slate-200 text-sm text-slate-500 uppercase">
                      <th className="py-3 px-2">Category</th>
                      <th className="py-3 px-2">Examples</th>
                      <th className="py-3 px-2">Demographic / Context</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700">
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Core Beverage</td>
                      <td className="py-3 px-2">Cups, Sleeves, Napkins</td>
                      <td className="py-3 px-2">High-frequency, high dwell time.</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Packaging</td>
                      <td className="py-3 px-2">Boxes, Inserts, Stickers</td>
                      <td className="py-3 px-2">Home consumers, guaranteed view.</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-3 px-2 font-medium">Condiments</td>
                      <td className="py-3 px-2">Sugar, Wipes, Coasters</td>
                      <td className="py-3 px-2">Sit-down dining, high volume.</td>
                    </tr>
                    <tr>
                      <td className="py-3 px-2 font-medium">Event & Utility</td>
                      <td className="py-3 px-2">Wristbands, Labels</td>
                      <td className="py-3 px-2">Hyper-targeted by event/location.</td>
                    </tr>
                  </tbody>
                </table>
              </div>
            </div>
          </section>

          {/* Slide 3: Business Model */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
              <DollarSign className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold">3. The Business Model</h2>
            </div>
            <div className="p-8">
              <div className="grid md:grid-cols-2 gap-12 items-center">
                <div className="space-y-6">
                  <div className="p-4 bg-teal-50 border border-teal-100 rounded-lg">
                    <h3 className="font-bold text-teal-800 mb-2">Revenue Stream 1: Advertising Sales</h3>
                    <p className="text-sm text-teal-700">Primary revenue from clients seeking hyperlocal visibility. Pricing based on CPM with premiums for specific targeting.</p>
                  </div>
                  <div className="p-4 bg-amber-50 border border-amber-100 rounded-lg">
                    <h3 className="font-bold text-amber-800 mb-2">Revenue Stream 2: Partner Acquisition</h3>
                    <p className="text-sm text-amber-700">Zero-cost model eliminates acquisition costs, ensuring rapid adoption and high-volume placement.</p>
                  </div>
                </div>
                <div className="text-center p-8 bg-slate-50 rounded-xl border border-slate-200">
                  <h3 className="text-lg text-slate-500 mb-2 uppercase tracking-wide">Key Financial Goal</h3>
                  <div className="text-5xl font-bold text-slate-900 mb-2">40%</div>
                  <p className="text-slate-600 font-medium">Gross Margin Target</p>
                  <p className="text-xs text-slate-400 mt-2">(Ad Revenue minus COGS)</p>
                </div>
              </div>
            </div>
          </section>

          {/* Slide 4: Market Sizing */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
              <Globe className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold">4. Market Sizing & Potential</h2>
            </div>
            <div className="p-8">
              <div className="flex flex-col md:flex-row justify-between items-end gap-6 text-center md:text-left">
                <div className="flex-1">
                  <div className="text-4xl font-bold text-slate-300 mb-1">$150B</div>
                  <div className="text-sm font-bold text-slate-500 uppercase tracking-wide">TAM (Global)</div>
                  <p className="text-xs text-slate-400 mt-1">Disposable food service packaging market.</p>
                </div>
                <div className="hidden md:block w-px h-24 bg-slate-200"></div>
                <div className="flex-1">
                  <div className="text-4xl font-bold text-slate-500 mb-1">$4B</div>
                  <div className="text-sm font-bold text-slate-600 uppercase tracking-wide">SAM (Target Region)</div>
                  <p className="text-xs text-slate-400 mt-1">Top 10 Metro Areas (US/Europe).</p>
                </div>
                <div className="hidden md:block w-px h-24 bg-slate-200"></div>
                <div className="flex-1 bg-amber-50 p-4 rounded-lg border border-amber-100">
                  <div className="text-4xl font-bold text-amber-600 mb-1">$15M</div>
                  <div className="text-sm font-bold text-amber-700 uppercase tracking-wide">SOM (Year 3)</div>
                  <p className="text-xs text-amber-600/70 mt-1">1% of SAM / 50M units distributed.</p>
                </div>
              </div>
            </div>
          </section>

          {/* Slide 5: Strategic Utility */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
              <Target className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold">5. Strategic Utility & Scale</h2>
            </div>
            <div className="p-8 grid md:grid-cols-2 gap-12">
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-4 border-b pb-2">For Local Businesses</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold text-sm">1</div>
                    <div>
                      <span className="font-bold block text-slate-800">Pinpoint Targeting</span>
                      <span className="text-sm text-slate-600">Acquire customers within a 1-mile radius.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold text-sm">2</div>
                    <div>
                      <span className="font-bold block text-slate-800">Measurable ROI</span>
                      <span className="text-sm text-slate-600">QR codes track physical impressions to digital actions.</span>
                    </div>
                  </li>
                </ul>
              </div>
              <div>
                <h3 className="font-bold text-lg text-slate-900 mb-4 border-b pb-2">For Global Brands</h3>
                <ul className="space-y-4">
                  <li className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold text-sm">1</div>
                    <div>
                      <span className="font-bold block text-slate-800">Sustainable Association</span>
                      <span className="text-sm text-slate-600">Align brand image with eco-friendly materials.</span>
                    </div>
                  </li>
                  <li className="flex gap-3">
                    <div className="w-8 h-8 rounded-full bg-slate-100 flex items-center justify-center shrink-0 text-slate-600 font-bold text-sm">2</div>
                    <div>
                      <span className="font-bold block text-slate-800">National Zoning</span>
                      <span className="text-sm text-slate-600">Execute national campaigns with local segmentation.</span>
                    </div>
                  </li>
                </ul>
              </div>
            </div>
          </section>

          {/* Slide 6: Financials */}
          <section className="bg-white rounded-2xl shadow-lg overflow-hidden border border-slate-100">
            <div className="bg-slate-900 p-6 text-white flex items-center gap-3">
              <BarChart3 className="w-6 h-6 text-amber-500" />
              <h2 className="text-2xl font-bold">6. Financial Forecast</h2>
            </div>
            <div className="p-8">
              <div className="overflow-x-auto mb-8">
                <table className="w-full text-center border-collapse">
                  <thead>
                    <tr className="bg-slate-50 text-slate-600 text-sm uppercase">
                      <th className="py-3 px-4 text-left">Metric</th>
                      <th className="py-3 px-4">Year 1 (Pilot)</th>
                      <th className="py-3 px-4">Year 3 (Scale)</th>
                      <th className="py-3 px-4">Year 5 (National)</th>
                    </tr>
                  </thead>
                  <tbody className="text-slate-700 font-medium">
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-4 text-left font-normal text-slate-500">Units Distributed</td>
                      <td className="py-4 px-4">1.5 Million</td>
                      <td className="py-4 px-4 bg-amber-50 text-amber-900">50 Million</td>
                      <td className="py-4 px-4">150 Million</td>
                    </tr>
                    <tr className="border-b border-slate-100">
                      <td className="py-4 px-4 text-left font-normal text-slate-500">Gross Revenue</td>
                      <td className="py-4 px-4">$750,000</td>
                      <td className="py-4 px-4 bg-amber-50 text-amber-900">$15,000,000</td>
                      <td className="py-4 px-4">$45,000,000</td>
                    </tr>
                    <tr>
                      <td className="py-4 px-4 text-left font-normal text-slate-500">Gross Margin</td>
                      <td className="py-4 px-4">40%</td>
                      <td className="py-4 px-4 bg-amber-50 text-amber-900">45%</td>
                      <td className="py-4 px-4">50%</td>
                    </tr>
                  </tbody>
                </table>
              </div>
              <div className="flex flex-wrap gap-4 justify-center">
                 <Badge variant="outline" className="px-3 py-1 text-sm border-slate-300">90% Retention Target</Badge>
                 <Badge variant="outline" className="px-3 py-1 text-sm border-slate-300">High Advertiser LTV</Badge>
                 <Badge variant="outline" className="px-3 py-1 text-sm border-slate-300">Rev per Unit = 2.5x COGS</Badge>
              </div>
            </div>
          </section>

          {/* Slide 7: The Ask */}
          <section className="bg-slate-900 rounded-2xl shadow-xl overflow-hidden text-white">
            <div className="p-8 md:p-12 text-center">
              <h2 className="text-3xl md:text-4xl font-bold mb-4">The Ask</h2>
              <div className="text-5xl md:text-7xl font-bold text-amber-500 mb-6">$2,000,000</div>
              <p className="text-xl text-slate-300 mb-12">Seed Capital for 20% Equity</p>
              
              <div className="grid md:grid-cols-3 gap-8 text-left max-w-4xl mx-auto">
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-amber-400 mb-1">40%</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Inventory</div>
                  <p className="text-sm text-slate-300">Fund first 6 months of production to onboard 100+ partners.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-amber-400 mb-1">35%</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Sales</div>
                  <p className="text-sm text-slate-300">Hire dedicated sales team for recurring ad contracts.</p>
                </div>
                <div className="bg-white/10 p-6 rounded-xl backdrop-blur-sm">
                  <div className="text-2xl font-bold text-amber-400 mb-1">25%</div>
                  <div className="text-sm font-semibold uppercase tracking-wide text-slate-400 mb-3">Tech</div>
                  <p className="text-sm text-slate-300">Develop logistics software and campaign reporting.</p>
                </div>
              </div>
            </div>
          </section>

        </div>
      </div>
    </div>
  );
}