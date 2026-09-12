import React, { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { Mail, Lock, LogIn, UserPlus, Info, CheckCircle2, ShieldAlert, X, Eye, EyeOff } from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { audioSynthEngine } from "./AudioSynthEngine";

interface AuthModalProps {
  isOpen: boolean;
  onClose: () => void;
}

export default function AuthModal({ isOpen, onClose }: AuthModalProps) {
  const { signIn, signUp, isMock, hasConfig } = useAuth();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      audioSynthEngine.playUISplitCue();
      setErrorMsg("Please fill in both email and password.");
      return;
    }

    setIsLoading(true);
    setErrorMsg(null);
    setInfoMsg(null);

    try {
      if (isSignUp) {
        const res = await signUp(email, password);
        if (res.success) {
          audioSynthEngine.playUIBeep();
          if (res.info) {
            setInfoMsg(res.info);
          } else {
            setInfoMsg("Registration and login successful! Custom sandbox user created.");
            setTimeout(() => {
              onClose();
            }, 2000);
          }
        } else {
          audioSynthEngine.playUISplitCue();
          setErrorMsg(res.error || "Signup failed");
        }
      } else {
        const res = await signIn(email, password);
        if (res.success) {
          audioSynthEngine.playUIBeep();
          setInfoMsg("Logged in successfully!");
          setTimeout(() => {
            onClose();
          }, 1500);
        } else {
          audioSynthEngine.playUISplitCue();
          setErrorMsg(res.error || "Login failed");
        }
      }
    } catch (err: any) {
      audioSynthEngine.playUISplitCue();
      setErrorMsg(err.message || "An error occurred");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        onClick={onClose}
        className="absolute inset-0 bg-[#060608]/85 backdrop-blur-md"
      />

      {/* Frame Container */}
      <motion.div
        initial={{ scale: 0.95, y: 15, opacity: 0 }}
        animate={{ scale: 1, y: 0, opacity: 1 }}
        exit={{ scale: 0.95, y: 15, opacity: 0 }}
        transition={{ type: "spring", duration: 0.4 }}
        className="relative w-full max-w-md bg-[#111115] border border-zinc-800 rounded-xl shadow-2xl overflow-hidden z-10 font-sans"
      >
        {/* Header Ribbon */}
        <div className="px-5 py-4 border-b border-zinc-800 bg-[#16161c] flex justify-between items-center">
          <div className="flex items-center gap-2">
            <span className="flex h-2.5 w-2.5 rounded-full bg-blue-500 animate-pulse" />
            <h2 className="text-xs font-bold uppercase tracking-wider text-slate-200">
              Supabase Authentication
            </h2>
          </div>
          <button
            onClick={() => {
              audioSynthEngine.playUISplitCue();
              onClose();
            }}
            className="p-1 hover:bg-zinc-800 rounded-md transition text-zinc-400 hover:text-white cursor-pointer"
          >
            <X className="w-4 h-4" />
          </button>
        </div>

        {/* Database Credentials Warning/Status Strip */}
        <div className={`px-5 py-3 border-b flex items-start gap-3.5 text-xs ${
          hasConfig 
            ? "bg-emerald-950/20 border-emerald-900/40 text-emerald-300" 
            : "bg-amber-950/20 border-amber-900/40 text-amber-300"
        }`}>
          {hasConfig ? (
            <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5" />
          ) : (
            <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
          )}
          <div>
            <div className="font-bold flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
              {hasConfig ? "LIVE SUPABASE STATUS: CONNECTED" : "SANDBOX SIMULATION MODE"}
            </div>
            <p className="mt-0.5 text-zinc-300 leading-normal text-[11px]">
              {hasConfig 
                ? "Excellent! Live Supabase client initialized. User sessions, registrations, and accounts will be securely managed on your cloud database."
                : "Credentials missing. To tie this app to your live database, add VITE_SUPABASE_URL and VITE_SUPABASE_ANON_KEY to your Secrets / Environment config. For now, enjoy full simulator sign-up and logins!"
              }
            </p>
          </div>
        </div>

        {/* Tabs for Sign In vs Sign Up */}
        <div className="grid grid-cols-2 border-b border-zinc-800 text-xs">
          <button
            onClick={() => {
              audioSynthEngine.playUIBeep();
              setIsSignUp(false);
              setErrorMsg(null);
              setInfoMsg(null);
            }}
            className={`py-3 font-semibold transition cursor-pointer text-center ${
              !isSignUp
                ? "text-blue-400 border-b-2 border-blue-500 bg-zinc-900/30"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/10"
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <LogIn className="w-3.5 h-3.5" />
              Sign In
            </span>
          </button>
          <button
            onClick={() => {
              audioSynthEngine.playUIBeep();
              setIsSignUp(true);
              setErrorMsg(null);
              setInfoMsg(null);
            }}
            className={`py-3 font-semibold transition cursor-pointer text-center ${
              isSignUp
                ? "text-blue-400 border-b-2 border-blue-500 bg-zinc-900/30"
                : "text-zinc-500 hover:text-zinc-300 hover:bg-zinc-900/10"
            }`}
          >
            <span className="flex items-center justify-center gap-1.5">
              <UserPlus className="w-3.5 h-3.5" />
              Sign Up
            </span>
          </button>
        </div>

        {/* Form Body */}
        <form onSubmit={handleSubmit} className="p-6 space-y-4">
          <AnimatePresence mode="wait">
            {errorMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-3 bg-red-950/30 border border-red-900/50 rounded-lg text-red-300 text-xs leading-relaxed flex items-start gap-2"
              >
                <ShieldAlert className="w-4 h-4 text-red-400 flex-shrink-0 mt-0.5" />
                <span>{errorMsg}</span>
              </motion.div>
            )}

            {infoMsg && (
              <motion.div
                initial={{ opacity: 0, y: -5 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -5 }}
                className="p-3 bg-emerald-950/35 border border-emerald-900/50 rounded-lg text-emerald-300 text-xs leading-relaxed flex items-start gap-2"
              >
                <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                <span>{infoMsg}</span>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Email input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              Email Address <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <Mail className="w-4 h-4" />
              </span>
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                className="w-full pl-9 pr-4 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-slate-100 placeholder-zinc-500 text-xs transition duration-200"
              />
            </div>
          </div>

          {/* Password input field */}
          <div className="space-y-1.5">
            <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
              Secret Password <span className="text-red-500">*</span>
            </label>
            <div className="relative">
              <span className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-zinc-500">
                <Lock className="w-4 h-4" />
              </span>
              <input
                type={showPassword ? "text" : "password"}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full pl-9 pr-10 py-2 bg-zinc-900 border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-slate-100 placeholder-zinc-500 text-xs transition duration-200 uppercase-control"
              />
              <button
                type="button"
                onClick={() => {
                  audioSynthEngine.playUIBeep();
                  setShowPassword(!showPassword);
                }}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-350 transition cursor-pointer"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* Form Action Buttons */}
          <button
            type="submit"
            disabled={isLoading}
            className="w-full py-2.5 mt-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-500"
          >
            {isLoading ? (
              <span className="flex items-center gap-2">
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Processing request...
              </span>
            ) : (
              <>
                {isSignUp ? <UserPlus className="w-4 h-4" /> : <LogIn className="w-4 h-4" />}
                {isSignUp ? "Generate Live Account" : "Access Live Session"}
              </>
            )}
          </button>
        </form>

        {/* Footer info explaining secrets Setup */}
        <div className="px-5 py-4 border-t border-zinc-800 bg-[#0d0d10] text-[10px] text-zinc-500 leading-normal font-mono flex gap-2">
          <Info className="w-4 h-4 text-zinc-400 flex-shrink-0" />
          <div>
            To verify credentials variables in AI Studio: Open the Settings panel on the right side of the editor, add your Supabase credentials, and reload developer applet.
          </div>
        </div>
      </motion.div>
    </div>
  );
}
