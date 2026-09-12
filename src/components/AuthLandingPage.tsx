import React, { useState, FormEvent } from "react";
import { useAuth } from "../context/AuthContext";
import { 
  Mail, 
  Lock, 
  LogIn, 
  UserPlus, 
  Info, 
  CheckCircle2, 
  ShieldAlert, 
  Eye, 
  EyeOff, 
  Scissors, 
  Database,
  Sparkles,
  ArrowRight,
  Tv,
  Film,
  Music,
  ALargeSmall,
  Workflow
} from "lucide-react";
import { motion, AnimatePresence } from "motion/react";
import { audioSynthEngine } from "./AudioSynthEngine";

export default function AuthLandingPage() {
  const { signIn, signUp, isMock, hasConfig, isLoading } = useAuth();
  const [isSignUp, setIsSignUp] = useState<boolean>(false);
  const [email, setEmail] = useState<string>("");
  const [password, setPassword] = useState<string>("");
  const [showPassword, setShowPassword] = useState<boolean>(false);
  const [actionLoading, setActionLoading] = useState<boolean>(false);
  const [errorMsg, setErrorMsg] = useState<string | null>(null);
  const [infoMsg, setInfoMsg] = useState<string | null>(null);

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    if (!email || !password) {
      audioSynthEngine.playUISplitCue();
      setErrorMsg("Please provide both dynamic email and security password.");
      return;
    }

    setActionLoading(true);
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
            setInfoMsg("Welcome to Chroma Editor! Dynamic profile registered and active.");
          }
        } else {
          audioSynthEngine.playUISplitCue();
          setErrorMsg(res.error || "Signup refused by auth gate.");
        }
      } else {
        const res = await signIn(email, password);
        if (res.success) {
          audioSynthEngine.playUIBeep();
          setInfoMsg("Access granted. Entering studio...");
        } else {
          audioSynthEngine.playUISplitCue();
          setErrorMsg(res.error || "Login refused. Incorrect credentials.");
        }
      }
    } catch (err: any) {
      audioSynthEngine.playUISplitCue();
      setErrorMsg(err.message || "An unexpected gate error occurred.");
    } finally {
      setActionLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#07070a] text-slate-100 flex flex-col md:flex-row relative overflow-hidden font-sans select-none">
      
      {/* Decorative ambient blurred spots */}
      <div className="absolute top-[-20%] left-[-10%] w-[50%] h-[50%] rounded-full bg-blue-900/15 blur-[120px] pointer-events-none" />
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[50%] rounded-full bg-violet-950/20 blur-[130px] pointer-events-none" />

      {/* LEFT PANEL: Dynamic aesthetic studio info & preview banner */}
      <div className="flex-1 p-8 md:p-16 flex flex-col justify-between border-b md:border-b-0 md:border-r border-zinc-900 bg-gradient-to-br from-[#0c0c11] to-[#08080c] relative">
        
        {/* Branding header */}
        <div className="flex items-center gap-3">
          <div className="p-2.5 bg-blue-600/10 border border-blue-500/30 rounded-xl">
            <Scissors className="w-6 h-6 text-blue-500 -rotate-90 stroke-[2.5]" />
          </div>
          <div>
            <h1 className="text-base font-extrabold tracking-wide text-slate-200">
              Web Video Editor
            </h1>
            <p className="text-[10px] text-zinc-500 font-semibold font-mono uppercase tracking-widest mt-0.5">
              Chrono Studio Suite
            </p>
          </div>
        </div>

        {/* Feature showcase list */}
        <div className="my-12 md:my-0 space-y-8 max-w-lg">
          <div className="space-y-2">
            <div className="inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full bg-blue-500/10 text-blue-400 font-semibold text-[10px] uppercase font-mono tracking-wider border border-blue-500/15">
              <Sparkles className="w-3 h-3 text-blue-400" />
              Next-Gen Dynamic Rendering
            </div>
            <h2 className="text-2xl md:text-3xl font-extrabold text-slate-150 tracking-tight leading-heading">
              Produce High-Fidelity Interactive Videos Right in Your Browser.
            </h2>
            <p className="text-zinc-400 text-xs leading-relaxed">
              Synthesize high-performance tracks, overlay micro-timed text clips, apply custom parameters, and render seamlessly in record speeds.
            </p>
          </div>

          <div className="grid grid-cols-2 gap-4">
            <div className="p-4 rounded-xl border border-zinc-800/60 bg-zinc-950/20 space-y-1.5 hover:border-zinc-800 transition">
              <div className="flex items-center gap-2 text-blue-400">
                <Film className="w-4 h-4 text-blue-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Multi-Track Lane</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Organize video, background audio, and text layers cleanly with real-time snap-locked precision edit controls.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800/60 bg-zinc-950/20 space-y-1.5 hover:border-zinc-800 transition">
              <div className="flex items-center gap-2 text-blue-400">
                <Music className="w-4 h-4 text-violet-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Audio Synth</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Enjoy sound feedback, synthesized oscillators, volume control, and custom lowpass/highpass filter modules.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800/60 bg-zinc-950/20 space-y-1.5 hover:border-zinc-800 transition">
              <div className="flex items-center gap-2 text-blue-400">
                <ALargeSmall className="w-4 h-4 text-emerald-400" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Text Overlays</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Overlay gorgeous styled subtitle streams, customized positions, colors, shadows, and smooth entrances.
              </p>
            </div>

            <div className="p-4 rounded-xl border border-zinc-800/60 bg-zinc-950/20 space-y-1.5 hover:border-zinc-800 transition">
              <div className="flex items-center gap-2 text-blue-400">
                <Workflow className="w-4 h-4 text-amber-500" />
                <span className="text-xs font-bold uppercase tracking-wider text-slate-300">Cut & Splice</span>
              </div>
              <p className="text-[11px] text-zinc-500 leading-normal">
                Easily cut any media at the active playhead with keyboard hotkeys (C key) or right-click interactive options.
              </p>
            </div>
          </div>
        </div>

        {/* Footer dynamic metadata info */}
        <div className="text-[10px] text-zinc-500 font-mono tracking-wider flex items-center gap-2">
          <span>RUNNING PROTOCOL v4.51</span>
          <span>•</span>
          <span>100% OFFLINE CAPABLE</span>
        </div>
      </div>

      {/* RIGHT PANEL: The beautiful Sign-In / Sign-Up Form Hub */}
      <div className="flex-1 flex flex-col justify-center items-center p-6 md:p-16 bg-[#040407]">
        
        <div className="w-full max-w-md space-y-6">
          
          {/* Supabase connection status indicator pill banner */}
          <div className={`p-4 rounded-xl border flex items-start gap-3.5 text-xs ${
            hasConfig 
              ? "bg-emerald-950/15 border-emerald-900/40 text-emerald-300" 
              : "bg-amber-950/15 border-amber-900/40 text-amber-300"
          }`}>
            {hasConfig ? (
              <CheckCircle2 className="w-5 h-5 text-emerald-400 flex-shrink-0 mt-0.5 animate-pulse" />
            ) : (
              <ShieldAlert className="w-5 h-5 text-amber-400 flex-shrink-0 mt-0.5" />
            )}
            <div>
              <div className="font-bold flex items-center gap-1.5 uppercase tracking-wide text-[10px]">
                {hasConfig ? "LIVE SUPABASE ACTIVE" : "DATABASE LANDING IN SANDBOX MODE"}
              </div>
              <p className="mt-0.5 text-zinc-400 leading-normal text-[11px]">
                {hasConfig 
                  ? "Connected! Live Supabase client ready. Your user profiles and cloud sync sessions are fully authenticated."
                  : "Database config missing under variables. You are operating in Simulated Sandbox mode automatically. Create any mock email/password to start editing!"
                }
              </p>
            </div>
          </div>

          {/* Core Sign-In / Sign-Up Card */}
          <div className="bg-[#0b0b10] border border-zinc-900 rounded-2xl shadow-xl overflow-hidden">
            
            {/* Header Tabs */}
            <div className="grid grid-cols-2 border-b border-zinc-900">
              <button
                type="button"
                onClick={() => {
                  audioSynthEngine.playUIBeep();
                  setIsSignUp(false);
                  setErrorMsg(null);
                  setInfoMsg(null);
                }}
                className={`py-4 font-bold text-xs uppercase tracking-wider text-center transition cursor-pointer ${
                  !isSignUp 
                    ? "text-blue-400 bg-zinc-900/40 border-b-2 border-blue-500" 
                    : "text-zinc-500 hover:text-zinc-350 hover:bg-zinc-900/10"
                }`}
              >
                Sign In
              </button>
              <button
                type="button"
                onClick={() => {
                  audioSynthEngine.playUIBeep();
                  setIsSignUp(true);
                  setErrorMsg(null);
                  setInfoMsg(null);
                }}
                className={`py-4 font-bold text-xs uppercase tracking-wider text-center transition cursor-pointer ${
                  isSignUp 
                    ? "text-blue-400 bg-zinc-900/40 border-b-2 border-blue-500" 
                    : "text-zinc-500 hover:text-zinc-350 hover:bg-zinc-900/10"
                }`}
              >
                Register Account
              </button>
            </div>

            {/* Form body */}
            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              
              <div className="space-y-1">
                <h3 className="text-sm font-bold text-slate-200">
                  {isSignUp ? "Create your workspace account" : "Welcome back to Chroma"}
                </h3>
                <p className="text-[11px] text-zinc-400">
                  {isSignUp 
                    ? "Register below to secure your custom project timelines."
                    : "Provide your credentials to immediately resume editing tracks."
                  }
                </p>
              </div>

              {/* Status Alert Panels */}
              <AnimatePresence mode="wait">
                {errorMsg && (
                  <motion.div
                    initial={{ opacity: 0, y: -5 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -5 }}
                    className="p-3 bg-red-950/20 border border-red-900/50 rounded-lg text-red-300 text-xs leading-relaxed flex items-start gap-2.5"
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
                    className="p-3 bg-emerald-950/20 border border-emerald-900/50 rounded-lg text-emerald-300 text-xs leading-relaxed flex items-start gap-2.5"
                  >
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 flex-shrink-0 mt-0.5" />
                    <span>{infoMsg}</span>
                  </motion.div>
                )}
              </AnimatePresence>

              {/* Email Address */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                  Email Address <span className="text-blue-500">*</span>
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
                    placeholder="name@domain.com"
                    className="w-full pl-9 pr-4 py-2.5 bg-[#050508] border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-slate-100 placeholder-zinc-600 text-xs transition duration-200"
                  />
                </div>
              </div>

              {/* Secret password */}
              <div className="space-y-1.5">
                <label className="text-[10px] font-bold uppercase tracking-wider text-zinc-400 flex items-center gap-1">
                  Secret Password <span className="text-blue-500">*</span>
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
                    className="w-full pl-9 pr-10 py-2.5 bg-[#050508] border border-zinc-800 rounded-lg focus:outline-none focus:border-blue-500 text-slate-100 placeholder-zinc-600 text-xs transition duration-200"
                  />
                  <button
                    type="button"
                    onClick={() => {
                      audioSynthEngine.playUIBeep();
                      setShowPassword(!showPassword);
                    }}
                    className="absolute inset-y-0 right-0 pr-3 flex items-center text-zinc-500 hover:text-zinc-300 transition cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              {/* Submit Buttons */}
              <button
                type="submit"
                disabled={actionLoading}
                className="w-full py-3 mt-4 bg-blue-600 hover:bg-blue-500 text-white text-xs font-bold rounded-lg shadow-lg flex items-center justify-center gap-2 transition cursor-pointer disabled:bg-zinc-800 disabled:text-zinc-500"
              >
                {actionLoading ? (
                  <span className="flex items-center gap-2">
                    <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                    Connecting...
                  </span>
                ) : (
                  <>
                    <span>{isSignUp ? "Generate Studio Account" : "Access Video Workstation"}</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </>
                )}
              </button>

            </form>
          </div>

          {/* Setup Help Explainer Banner */}
          <div className="p-4 bg-zinc-950 border border-zinc-900 rounded-xl space-y-2 text-[11px] leading-relaxed">
            <div className="flex items-center gap-1.5 text-zinc-400 font-bold font-mono text-[10px]">
              <Info className="w-3.5 h-3.5 text-blue-400" />
              HOW TO CONNECT YOUT SUPABASE CREDENTIALS
            </div>
            <p className="text-zinc-500">
              When creating a fresh database project, locate your API settings on the Supabase dashboard. Copy the <code className="text-slate-350 bg-zinc-900 px-1 py-0.5 rounded">Project URL</code> and <code className="text-slate-350 bg-zinc-900 px-1 py-0.5 rounded">Anon public Key</code>. Look for the Settings panel on the right sidebar of Google AI Studio, add these as user environment secrets and reload the page!
            </p>
          </div>

        </div>

      </div>

    </div>
  );
}
