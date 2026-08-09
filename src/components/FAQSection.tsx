import React, { useState } from 'react';
import { FAQ_ITEMS } from '../data/mockData';
import { ChevronDown, HelpCircle } from 'lucide-react';

interface FAQSectionProps {
  isDarkMode: boolean;
}

export const FAQSection: React.FC<FAQSectionProps> = ({ isDarkMode }) => {
  const [openId, setOpenId] = useState<string>('faq-1');

  return (
    <section className={`py-20 transition-colors duration-300 relative ${
      isDarkMode ? 'bg-slate-950 text-white' : 'bg-white text-slate-900'
    }`}>
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center space-y-4 mb-12">
          <h2 className="text-3xl sm:text-4xl font-extrabold tracking-tight">
            Frequently Asked{' '}
            <span className="bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 bg-clip-text text-transparent">
              Questions
            </span>
          </h2>
          <p className={`text-base ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Everything parents and students need to know about joining AI Explorers workshops.
          </p>
        </div>

        {/* Accordion List */}
        <div className="space-y-4">
          {FAQ_ITEMS.map((item) => {
            const isOpen = openId === item.id;
            return (
              <div
                key={item.id}
                className={`rounded-2xl border transition-all duration-200 overflow-hidden ${
                  isOpen
                    ? isDarkMode
                      ? 'bg-slate-900 border-blue-500/50 shadow-md shadow-blue-950/20'
                      : 'bg-blue-50/50 border-blue-200 shadow-md shadow-slate-100'
                    : isDarkMode
                      ? 'bg-slate-900/60 border-slate-800 hover:border-slate-700'
                      : 'bg-slate-50 border-slate-200 hover:bg-white hover:border-slate-300'
                }`}
              >
                <button
                  onClick={() => setOpenId(isOpen ? '' : item.id)}
                  className="w-full p-5 text-left font-bold text-base sm:text-lg flex items-center justify-between gap-4 focus:outline-none"
                >
                  <span className="flex items-center gap-3">
                    <HelpCircle className={`w-5 h-5 shrink-0 ${isOpen ? 'text-blue-500' : 'text-slate-400'}`} />
                    <span>{item.question}</span>
                  </span>
                  <ChevronDown className={`w-5 h-5 shrink-0 transition-transform duration-300 ${
                    isOpen ? 'rotate-180 text-blue-500' : 'text-slate-400'
                  }`} />
                </button>

                {isOpen && (
                  <div className="px-5 pb-5 pt-0 text-sm leading-relaxed border-t border-slate-200/50 dark:border-slate-800/80 mt-2 pt-4">
                    <p className={isDarkMode ? 'text-slate-300' : 'text-slate-700'}>
                      {item.answer}
                    </p>
                  </div>
                )}
              </div>
            );
          })}
        </div>

      </div>
    </section>
  );
};
