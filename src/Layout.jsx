import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { createPageUrl } from './utils';
import { Menu, X, Coffee, Megaphone, Info, Mail, Home, Presentation, Users, Briefcase, Bot } from 'lucide-react';
import { Button } from "@/components/ui/button";
import { base44 } from "@/api/base44Client";

export default function Layout({ children }) {
  const [isMenuOpen, setIsMenuOpen] = React.useState(false);
  const [user, setUser] = React.useState(null);

  React.useEffect(() => {
    base44.auth.me().then(setUser).catch(() => setUser(null));
  }, []);
  const location = useLocation();

  const isActive = (path) => location.pathname === path;

  const navItems = [
        { name: 'Home', path: '/', icon: Home },
        { name: 'For Businesses', path: '/ForBusinesses', icon: Coffee },
        { name: 'For Advertisers', path: '/ForAdvertisers', icon: Megaphone },
        { name: 'Franchise', path: '/Franchise', icon: Briefcase },
        { name: 'Pitch Deck', path: '/PitchDeck', icon: Presentation },
        { name: 'Social Agent', path: '/SocialAgent', icon: Bot },
        { name: 'About Us', path: '/About', icon: Users },
        { name: 'Contact', path: '/Contact', icon: Mail },
      ];

  if (user?.role === 'admin') {
     navItems.push({ name: 'Finance', path: '/Finance', icon: Briefcase });
  }

  // Check for standalone pages (onboarding flows)
  const isStandalonePage = ['/BusinessOnboarding', '/AdvertiserOnboarding'].includes(location.pathname);
  if (isStandalonePage) {
      return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white font-sans text-slate-900">
      {/* Header */}
      <header className="sticky top-0 z-50 w-full border-b bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/60">
        <div className="container mx-auto px-4 h-20 flex items-center justify-between">
          {/* Logo */}
          <Link to={createPageUrl('Home')} className="flex items-center gap-2 group">
            <img 
              src="https://qtrypzzcjebvfcihiynt.supabase.co/storage/v1/object/public/base44-prod/public/692cc2f66d83ac4c3986cd4f/878d6e009_Logo.png" 
              alt="Vertising Logo" 
              className="h-20 w-auto object-contain"
            />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            {navItems.map((item) => (
              <Link
                key={item.path}
                to={createPageUrl(item.name === 'Home' ? 'Home' : item.name.replace(/\s+/g, ''))}
                className={`text-sm font-medium transition-colors hover:text-blue-700 ${
                  isActive('/' + (item.name === 'Home' ? '' : item.name.replace(/\s+/g, ''))) 
                    ? 'text-blue-700' 
                    : 'text-slate-600'
                }`}
              >
                {item.name}
              </Link>
            ))}
            <Link to={createPageUrl('Contact')}>
              <Button className="bg-teal-600 hover:bg-teal-700 text-white font-medium">
                Get Started
              </Button>
            </Link>
          </nav>

          {/* Mobile Menu Button */}
          <button
            className="md:hidden p-2 text-slate-600"
            onClick={() => setIsMenuOpen(!isMenuOpen)}
          >
            {isMenuOpen ? <X /> : <Menu />}
          </button>
        </div>

        {/* Mobile Nav */}
        {isMenuOpen && (
          <div className="md:hidden border-t p-4 bg-white">
            <nav className="flex flex-col gap-4">
              {navItems.map((item) => (
                <Link
                  key={item.path}
                  to={createPageUrl(item.name === 'Home' ? 'Home' : item.name.replace(/\s+/g, ''))}
                  className="flex items-center gap-2 text-lg font-medium text-slate-600 hover:text-blue-700"
                  onClick={() => setIsMenuOpen(false)}
                >
                  <item.icon className="h-5 w-5" />
                  {item.name}
                </Link>
              ))}
            </nav>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-300 py-12">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-4 gap-8">
            <div className="col-span-2">
              <div className="flex items-center gap-2 mb-4 text-white">
                <Coffee className="h-6 w-6" />
                <span className="text-xl font-bold">Vertising</span>
              </div>
              <p className="text-slate-400 max-w-sm">
                The UK's premier physical media network. Connecting local businesses with free inventory and brands with hands-on exposure.
              </p>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Company</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl('Home')} className="hover:text-blue-500 transition-colors">Home</Link></li>
                <li><Link to={createPageUrl('About')} className="hover:text-blue-500 transition-colors">About Us</Link></li>
                <li><Link to={createPageUrl('Contact')} className="hover:text-blue-500 transition-colors">Contact</Link></li>
              </ul>
            </div>
            <div>
              <h3 className="font-bold text-white mb-4">Services</h3>
              <ul className="space-y-2">
                <li><Link to={createPageUrl('ForBusinesses')} className="hover:text-blue-500 transition-colors">For Distribution Partners</Link></li>
                <li><Link to={createPageUrl('ForAdvertisers')} className="hover:text-blue-500 transition-colors">For Advertisers</Link></li>
                <li><Link to={createPageUrl('HowItWorks')} className="hover:text-blue-500 transition-colors">How It Works</Link></li>
                <li><Link to={createPageUrl('SocialAgent')} className="hover:text-blue-500 transition-colors">AI Social Manager</Link></li>
              </ul>
            </div>
          </div>
          <div className="border-t border-slate-800 mt-12 pt-8 text-center text-sm text-slate-500">
            © {new Date().getFullYear()} Vertising UK. All rights reserved.
          </div>
        </div>
      </footer>
    </div>
  );
}