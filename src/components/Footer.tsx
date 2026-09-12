import React from 'react';
import { PageTab } from '../types';
import { Sparkles, ArrowUp, Mail, Phone, Heart } from 'lucide-react';

interface FooterProps {
  setActiveTab: (tab: PageTab) => void;
  isDarkMode: boolean;
  onJoinClick: () => void;
}

export const Footer: React.FC<FooterProps> = ({ setActiveTab, isDarkMode, onJoinClick }) => {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <footer className={`border-t transition-colors duration-300 relative z-10 ${
      isDarkMode 
        ? 'bg-slate-950 border-slate-800 text-slate-300' 
        : 'bg-slate-900 border-slate-800 text-slate-300'
    }`}>
      
      {/* Back to top button float */}
      <button
        onClick={scrollToTop}
        id="back-to-top-btn"
        title="Back to top"
        className="absolute -top-6 right-8 p-3 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white shadow-xl hover:scale-110 transition-all duration-300 group"
      >
        <ArrowUp className="w-5 h-5 group-hover:-translate-y-1 transition-transform" />
      </button>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-12 pb-12 border-b border-slate-800">
          
          {/* Col 1: Brand & Mission */}
          <div className="lg:col-span-4 space-y-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-tr from-blue-600 via-indigo-600 to-purple-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="w-5 h-5" />
              </div>
              <span className="text-2xl font-extrabold text-white tracking-tight">
                AI Explorers
              </span>
            </div>

            <p className="text-sm text-slate-400 leading-relaxed max-w-sm">
              A student-led educational non-profit training middle school students to become creative, ethical, and confident AI explorers.
            </p>


          </div>

          {/* Col 2: Quick Links */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Navigation
            </h4>
            <ul className="space-y-2 text-sm">
              {[
                { id: 'home', label: 'Home' },
                { id: 'about', label: 'About' },
                { id: 'impact', label: 'Impact' },
                { id: 'why-us', label: 'Why Us' },
                { id: 'programs', label: 'Programs' },
                { id: 'curriculum', label: 'Curriculum' },
                { id: 'gallery', label: 'Gallery' },
                { id: 'testimonials', label: 'Parent Testimony' },
              ].map((item) => (
                <li key={item.id}>
                  <button
                    onClick={() => {
                      setActiveTab(item.id as PageTab);
                      if (item.id === 'home') {
                        window.scrollTo({ top: 0, behavior: 'smooth' });
                      } else {
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                      }
                    }}
                    className="hover:text-blue-400 transition-colors text-left"
                  >
                    {item.label}
                  </button>
                </li>
              ))}
            </ul>
          </div>

          {/* Col 3: Support & Info */}
          <div className="lg:col-span-2 space-y-3">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Support & Info
            </h4>
            <ul className="space-y-2 text-sm">
              <li>
                <button
                  onClick={() => {
                    setActiveTab('faq');
                    const el = document.getElementById('faq');
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="hover:text-blue-400 transition-colors uppercase text-left text-xs tracking-wider"
                >
                  FAQ
                </button>
              </li>
              <li>
                <button
                  onClick={onJoinClick}
                  className="text-blue-400 font-bold hover:underline"
                >
                  Enroll Now →
                </button>
              </li>
            </ul>
          </div>

          {/* Col 4: Contact Us */}
          <div className="lg:col-span-4 space-y-4">
            <h4 className="text-xs font-bold text-white uppercase tracking-wider">
              Contact Us
            </h4>
            <p className="text-xs text-slate-400">
              Have questions about our programs or enrollment? Reach out directly to our founders.
            </p>

            <div className="space-y-3 pt-1">
              <a 
                href="mailto:aiexplorers916@gmail.com" 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 text-xs font-medium transition-colors"
              >
                <div className="p-2 rounded-lg bg-blue-500/10 text-blue-400">
                  <Mail className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Contact Email</div>
                  <div className="text-sm font-semibold">aiexplorers916@gmail.com</div>
                </div>
              </a>

              <a 
                href="tel:9166169839" 
                className="flex items-center gap-3 p-3 rounded-xl bg-slate-900 border border-slate-800 text-slate-200 hover:text-white hover:border-slate-700 text-xs font-medium transition-colors"
              >
                <div className="p-2 rounded-lg bg-indigo-500/10 text-indigo-400">
                  <Phone className="w-4 h-4" />
                </div>
                <div>
                  <div className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Contact Phone</div>
                  <div className="text-sm font-semibold">916-616-9839</div>
                </div>
              </a>
            </div>
          </div>

        </div>

        {/* Bottom copyright */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between text-xs text-slate-500 gap-4">
          <p>© {new Date().getFullYear()} AI Explorers Educational Org. All rights reserved.</p>
          <p className="flex items-center gap-1">
            <span>Built with passion for middle school explorers</span>
            <Heart className="w-3.5 h-3.5 text-rose-500 fill-current" />
          </p>
        </div>

      </div>
    </footer>
  );
};
