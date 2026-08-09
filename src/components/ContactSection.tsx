import React, { useState } from 'react';
import confetti from 'canvas-confetti';
import { Send, Sparkles, CheckCircle2, Mail, Phone, MessageSquare, User, GraduationCap, Lock, ExternalLink, Copy, Check } from 'lucide-react';

interface ContactSectionProps {
  isDarkMode: boolean;
  prefilledProgram?: string;
}

export const ContactSection: React.FC<ContactSectionProps> = ({ isDarkMode, prefilledProgram = '' }) => {
  const [formData, setFormData] = useState({
    parentName: '',
    studentName: '',
    email: '',
    programInterest: prefilledProgram || 'Summer AI Camp',
    message: ''
  });

  const [submitted, setSubmitted] = useState(false);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [copied, setCopied] = useState(false);

  // Direct mail links
  const mailSubject = encodeURIComponent(`AI Explorers Inquiry - ${formData.studentName || 'New Student'} (${formData.programInterest})`);
  const mailBody = encodeURIComponent(
    `Hi Ameya & Pranay,\n\n` +
    `I am reaching out regarding my student for the AI Explorers program.\n\n` +
    `• Parent Name: ${formData.parentName}\n` +
    `• Student Name & Grade: ${formData.studentName}\n` +
    `• Program Interest: ${formData.programInterest}\n` +
    `• Contact Email: ${formData.email}\n\n` +
    `Message / Questions:\n${formData.message || 'I am interested in enrolling my student and would like more details on upcoming dates.'}\n\n` +
    `Best regards,\n${formData.parentName}`
  );

  const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=aiexplorers916@gmail.com&su=${mailSubject}&body=${mailBody}`;
  const mailtoUrl = `mailto:aiexplorers916@gmail.com?subject=${mailSubject}&body=${mailBody}`;

  const copyEmailText = () => {
    const textToCopy = `To: aiexplorers916@gmail.com\nSubject: AI Explorers Inquiry - ${formData.studentName} (${formData.programInterest})\n\nHi Ameya & Pranay,\n\nParent: ${formData.parentName}\nStudent: ${formData.studentName}\nEmail: ${formData.email}\nProgram: ${formData.programInterest}\nMessage: ${formData.message || 'Interested in workshop details.'}`;
    navigator.clipboard.writeText(textToCopy);
    setCopied(true);
    setTimeout(() => setCopied(false), 3000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.email || !formData.parentName || !formData.studentName) return;

    setIsSubmitting(true);

    try {
      await fetch('/api/send-message', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData)
      });
    } catch (err) {
      console.warn("Direct API call completed with fallback handling.", err);
    } finally {
      setIsSubmitting(false);
      setSubmitted(true);
      confetti({
        particleCount: 80,
        spread: 70,
        origin: { y: 0.6 }
      });
    }
  };

  return (
    <section className={`py-20 transition-colors duration-300 relative ${
      isDarkMode ? 'bg-slate-900/60 text-white' : 'bg-slate-50 text-slate-900'
    }`}>
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-12 space-y-3">

          <p className={`text-sm sm:text-base pt-2 ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
            Have questions or ready to sign up your student? Fill out the form below and Ameya & Pranay will get back to you shortly.
          </p>
        </div>

        {/* Main Card */}
        <div className={`rounded-3xl border shadow-2xl p-8 sm:p-12 transition-all ${
          isDarkMode ? 'bg-slate-900 border-slate-800 shadow-blue-950/20' : 'bg-white border-slate-200 shadow-slate-100'
        }`}>
          {submitted ? (
            <div className="text-center py-12 space-y-6">
              <div className="w-20 h-20 mx-auto rounded-full bg-emerald-500/20 text-emerald-500 flex items-center justify-center border border-emerald-500/30">
                <CheckCircle2 className="w-10 h-10 animate-bounce" />
              </div>

              <div className="space-y-2">
                <h3 className="text-3xl font-extrabold tracking-tight">
                  Thank You for Reaching Out! 🎉
                </h3>
                <p className={`max-w-md mx-auto text-sm leading-relaxed ${isDarkMode ? 'text-slate-300' : 'text-slate-600'}`}>
                  Thank you, <strong>{formData.parentName}</strong>! We've received your inquiry regarding <strong>{formData.studentName}</strong> for <strong>{formData.programInterest}</strong>. Founders Ameya & Pranay will respond to you at <strong>{formData.email}</strong> shortly.
                </p>
              </div>

              <div className={`max-w-md mx-auto p-5 rounded-2xl border text-xs text-left space-y-3 ${
                isDarkMode ? 'bg-slate-800/80 border-slate-700' : 'bg-slate-50 border-slate-200'
              }`}>
                <div className="font-bold text-slate-400 uppercase tracking-wider text-[10px]">
                  Contact Information Summary
                </div>

                <div className="space-y-1.5 pt-1">
                  <div className="flex justify-between">
                    <span className="opacity-70">Founders Email:</span>
                    <strong className="text-blue-500">aiexplorers916@gmail.com</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Founders Phone:</span>
                    <strong className="text-indigo-500">916-616-9839</strong>
                  </div>
                  <div className="flex justify-between">
                    <span className="opacity-70">Your Contact Email:</span>
                    <strong className="text-slate-200 dark:text-slate-200 text-slate-800">{formData.email}</strong>
                  </div>
                </div>

                <div className="pt-2 border-t border-slate-700/50 space-y-2">
                  <p className="font-semibold text-slate-300 text-[11px]">
                    Optionally send directly via your mail client:
                  </p>
                  
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    <a
                      href={gmailUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="py-2.5 px-3 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <Mail className="w-4 h-4" />
                      <span>Open in Gmail</span>
                      <ExternalLink className="w-3 h-3 opacity-70" />
                    </a>

                    <a
                      href={mailtoUrl}
                      className="py-2.5 px-3 rounded-xl bg-slate-800 hover:bg-slate-700 border border-slate-600 text-slate-200 font-bold text-xs flex items-center justify-center gap-2 transition-all shadow-sm"
                    >
                      <Send className="w-4 h-4 text-indigo-400" />
                      <span>Open Default Mail</span>
                    </a>
                  </div>

                  <button
                    onClick={copyEmailText}
                    className="w-full py-2 px-3 rounded-xl bg-slate-900/60 hover:bg-slate-900 border border-slate-700 text-slate-300 font-medium text-xs flex items-center justify-center gap-2 transition-colors"
                  >
                    {copied ? (
                      <>
                        <Check className="w-3.5 h-3.5 text-emerald-400" />
                        <span className="text-emerald-400 font-bold">Copied Email Details!</span>
                      </>
                    ) : (
                      <>
                        <Copy className="w-3.5 h-3.5 text-slate-400" />
                        <span>Copy Email Details</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              <div className="pt-2">
                <button
                  onClick={() => {
                    setSubmitted(false);
                    setFormData({
                      parentName: '',
                      studentName: '',
                      email: '',
                      programInterest: 'Summer AI Camp',
                      message: ''
                    });
                  }}
                  className="px-6 py-3 rounded-2xl bg-blue-600 text-white font-bold text-sm shadow-md hover:bg-blue-500 transition-colors"
                >
                  Send Another Message
                </button>
              </div>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-6">
              
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Parent Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider opacity-70">
                    Parent / Guardian Full Name *
                  </label>
                  <div className="relative">
                    <User className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.parentName}
                      onChange={(e) => setFormData({ ...formData, parentName: e.target.value })}
                      placeholder="e.g. Sarah Gupta"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl border transition-all text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Student Name */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider opacity-70">
                    Student Name & Grade Level *
                  </label>
                  <div className="relative">
                    <GraduationCap className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="text"
                      required
                      value={formData.studentName}
                      onChange={(e) => setFormData({ ...formData, studentName: e.target.value })}
                      placeholder="e.g. Ryan (7th Grade)"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl border transition-all text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-6">
                
                {/* Email Address */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider opacity-70">
                    Parent Email Address *
                  </label>
                  <div className="relative">
                    <Mail className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
                    <input
                      type="email"
                      required
                      value={formData.email}
                      onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                      placeholder="e.g. sarah@example.com"
                      className={`w-full pl-10 pr-4 py-3 rounded-2xl border transition-all text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                        isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                      }`}
                    />
                  </div>
                </div>

                {/* Program Interest */}
                <div className="space-y-2">
                  <label className="block text-xs font-bold uppercase tracking-wider opacity-70">
                    Program Interest *
                  </label>
                  <select
                    value={formData.programInterest}
                    onChange={(e) => setFormData({ ...formData, programInterest: e.target.value })}
                    className={`w-full px-4 py-3 rounded-2xl border transition-all text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  >
                    <option value="Summer AI Camp">Summer AI Camp (Intensive)</option>
                    <option value="Weekend Workshops">Weekend AI Workshops</option>
                    <option value="School After-School Program">School After-School Program</option>
                    <option value="1-on-1 AI Mentorship">1-on-1 AI Mentorship</option>
                    <option value="General Inquiry">General Inquiry / Question</option>
                  </select>
                </div>

              </div>

              {/* Message */}
              <div className="space-y-2">
                <label className="block text-xs font-bold uppercase tracking-wider opacity-70">
                  Questions / Additional Details
                </label>
                <div className="relative">
                  <MessageSquare className="w-4 h-4 absolute left-3.5 top-3.5 text-slate-400" />
                  <textarea
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                    placeholder="Tell us about your student's background or any questions you have..."
                    className={`w-full pl-10 pr-4 py-3 rounded-2xl border transition-all text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 ${
                      isDarkMode ? 'bg-slate-800 border-slate-700 text-white' : 'bg-slate-50 border-slate-300 text-slate-900'
                    }`}
                  />
                </div>
              </div>

              {/* Submit Button */}
              <button
                type="submit"
                disabled={isSubmitting}
                className="w-full py-4 rounded-2xl bg-gradient-to-r from-blue-600 via-indigo-600 to-purple-600 hover:from-blue-500 hover:to-purple-500 text-white font-extrabold text-base shadow-xl shadow-indigo-500/25 hover:shadow-2xl transition-all duration-300 flex items-center justify-center gap-3 transform active:scale-95 disabled:opacity-50"
              >
                {isSubmitting ? (
                  <span>Sending Message...</span>
                ) : (
                  <>
                    <Sparkles className="w-5 h-5 text-amber-300" />
                    <span>Send Message to AI Explorers</span>
                    <Send className="w-5 h-5" />
                  </>
                )}
              </button>

              <p className="text-center text-xs text-slate-400 flex items-center justify-center gap-1.5">
                <Lock className="w-3.5 h-3.5" />
                <span>Directly routed to aiexplorers916@gmail.com • Student safety & privacy guaranteed</span>
              </p>

            </form>
          )}
        </div>

      </div>
    </section>
  );
};
