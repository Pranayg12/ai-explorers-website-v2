import React, { useState, useRef, useEffect } from "react";
import { 
  Play, 
  Pause, 
  SkipBack, 
  SkipForward, 
  Scissors, 
  Download, 
  Save, 
  CheckCircle2, 
  Loader2, 
  Database, 
  ShieldAlert, 
  ShieldCheck, 
  User, 
  LogOut, 
  ArrowLeft,
  X,
  Sparkles,
  Maximize2
} from "lucide-react";
import ProjectMediaPanel from "./ProjectMediaPanel";
import PropertiesPanel from "./PropertiesPanel";
import VideoTimeline from "./VideoTimeline";
import ExportPreviewModal from "./ExportPreviewModal";
import { drawFrame, getAspectRatioDimensions } from "../canvasRenderer";
import { audioSynthEngine } from "./AudioSynthEngine";
import { Clip, TimelineTrack, ProjectAspectRatio } from "../types";
import { useAuth } from "../context/AuthContext";
import { getSupabase } from "../lib/supabaseClient";
import AuthModal from "./AuthModal";
import AuthLandingPage from "./AuthLandingPage";

interface OnlineVideoEditorModalProps {
  onClose: () => void;
  isDarkMode?: boolean;
}

export const OnlineVideoEditorModal: React.FC<OnlineVideoEditorModalProps> = ({ onClose }) => {
  const { user, signOut, isMock, hasConfig, isLoading: isAuthLoading } = useAuth();
  const [authModalOpen, setAuthModalOpen] = useState<boolean>(false);
  const [userDropdownOpen, setUserDropdownOpen] = useState<boolean>(false);

  // Initial timeline clips
  const [clips, setClips] = useState<Clip[]>([
    {
      id: "video-1",
      name: "Cyber City Intro",
      type: "video",
      trackIndex: 0,
      startTime: 0,
      duration: 15.0,
      sourceDuration: 28.5,
      mediaUrl: "https://images.unsplash.com/photo-1509198397868-475647b2a1e5?auto=format&fit=crop&w=800&q=80",
      mediaType: "stock",
      volume: 1,
      speed: 1,
      filter: "none",
      transition: "fade"
    },
    {
      id: "video-2",
      name: "Neon Expressway",
      type: "video",
      trackIndex: 0,
      startTime: 15.0,
      duration: 20.0,
      sourceDuration: 30.0,
      mediaUrl: "https://images.unsplash.com/photo-1542751371-adc38448a05e?auto=format&fit=crop&w=800&q=80",
      mediaType: "stock",
      volume: 1,
      speed: 1,
      filter: "vintage"
    },
    {
      id: "audio-1",
      name: "Cyberpunk Pulse (Synth)",
      type: "audio",
      trackIndex: 1,
      startTime: 0,
      duration: 35.0,
      sourceDuration: 45.0,
      mediaUrl: "https://actions.google.com/sounds/v1/science_fiction/alien_beacon.ogg",
      mediaType: "stock",
      volume: 0.85,
      speed: 1,
      filter: "none"
    },
    {
      id: "text-1",
      name: "Title Card",
      type: "text",
      trackIndex: 2,
      startTime: 2.0,
      duration: 8.0,
      sourceDuration: 8.0,
      mediaUrl: "",
      mediaType: "text_only",
      volume: 1,
      speed: 1,
      filter: "none",
      text: "AI EXPLORERS SHOWCASE",
      textStyle: {
        fontSize: 34,
        color: "#38bdf8",
        backgroundColor: "rgba(15, 23, 42, 0.8)",
        outlineColor: "#0284c7",
        outlineWidth: 2,
        positionX: 50,
        positionY: 45,
        align: "center",
        animation: "slide"
      }
    },
    {
      id: "text-2",
      name: "Student Subtitle",
      type: "text",
      trackIndex: 2,
      startTime: 11.0,
      duration: 10.0,
      sourceDuration: 10.0,
      mediaUrl: "",
      mediaType: "text_only",
      volume: 1,
      speed: 1,
      filter: "none",
      text: "Built by Middle School AI Explorers",
      textStyle: {
        fontSize: 22,
        color: "#ffffff",
        backgroundColor: "rgba(0, 0, 0, 0.75)",
        outlineColor: "transparent",
        outlineWidth: 0,
        positionX: 50,
        positionY: 82,
        align: "center",
        animation: "fade"
      }
    }
  ]);

  // Undo / Redo History
  const [history, setHistory] = useState<Clip[][]>([]);
  const lastHistoryRef = useRef<number>(Date.now());

  // Cloud Project Loading & Persistence State
  const [isProjectLoading, setIsProjectLoading] = useState<boolean>(false);
  const [savingStatus, setSavingStatus] = useState<"idle" | "saving" | "saved" | "error">("idle");
  const [dbErrorMessage, setDbErrorMessage] = useState<string | null>(null);

  // Dynamic Track State
  const [tracks, setTracks] = useState<TimelineTrack[]>([
    { index: 0, type: "video", name: "Video (Main)" },
    { index: 1, type: "audio", name: "Audio (Main)" },
    { index: 2, type: "text", name: "Text (Overlay)" },
  ]);

  // Timeline seek & aspect controls
  const [playhead, setPlayhead] = useState<number>(0);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [aspectRatio, setAspectRatio] = useState<ProjectAspectRatio>("16:9");
  const [timelineDuration, setTimelineDuration] = useState<number>(45.0);
  const [selectedClipId, setSelectedClipId] = useState<string | null>(null);

  // Media recorder export state
  const [exportModalOpen, setExportModalOpen] = useState<boolean>(false);
  const [exportLoading, setExportLoading] = useState<boolean>(false);
  const [exportProgress, setExportProgress] = useState<number>(0);
  const [exportReadyUrl, setExportReadyUrl] = useState<string | null>(null);

  // Preview DOM Anchor References
  const canvasRef = useRef<HTMLCanvasElement | null>(null);
  const animationFrameIdRef = useRef<number | null>(null);
  const previousTimeRef = useRef<number | null>(null);

  const videoElementsRef = useRef<{ [id: string]: HTMLVideoElement }>({});
  const audioElementsRef = useRef<{ [id: string]: HTMLAudioElement }>({});
  const [, setMediaReadyCounter] = useState<number>(0);

  // Keyboard shortcut bindings
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (exportModalOpen) {
          setExportModalOpen(false);
          return;
        }
        if (authModalOpen) {
          setAuthModalOpen(false);
          return;
        }
      }

      const activeEl = document.activeElement;
      if (
        activeEl && 
        (activeEl.tagName === "INPUT" || 
         activeEl.tagName === "TEXTAREA" || 
         activeEl.getAttribute("contenteditable") === "true")
      ) {
        return;
      }

      if ((e.ctrlKey || e.metaKey) && e.key.toLowerCase() === "z") {
        e.preventDefault();
        handleUndo();
        return;
      }

      if (e.key === " ") {
        e.preventDefault();
        togglePlayState();
        return;
      }

      if (e.key.toLowerCase() === "c" && selectedClipId) {
        e.preventDefault();
        audioSynthEngine.playUISplitCue();
        handleSplitClipAtPlayhead();
        return;
      }

      if ((e.key === "Backspace" || e.key === "Delete") && selectedClipId) {
        e.preventDefault();
        audioSynthEngine.playUISplitCue();
        pushToHistory(clips);
        setClips((prev) => {
          const target = prev.find(c => c.id === selectedClipId);
          if (target && target.linkedGroupId) {
            return prev.filter(c => c.id !== selectedClipId && c.linkedGroupId !== target.linkedGroupId);
          }
          return prev.filter((c) => c.id !== selectedClipId);
        });
        setSelectedClipId(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);
    return () => {
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedClipId, clips, history, playhead, isPlaying, exportModalOpen, authModalOpen]);

  // Clean-up dynamic nodes on unmount
  useEffect(() => {
    return () => {
      audioSynthEngine.stop();
      if (animationFrameIdRef.current) cancelAnimationFrame(animationFrameIdRef.current);

      const videos = Object.values(videoElementsRef.current) as HTMLVideoElement[];
      videos.forEach((v) => {
        v.pause();
        v.src = "";
      });

      const audios = Object.values(audioElementsRef.current) as HTMLAudioElement[];
      audios.forEach((a) => {
        a.pause();
        a.src = "";
      });
    };
  }, []);

  // Sync pool with existing clips list
  useEffect(() => {
    const clipIds = new Set(clips.map(c => c.id));
    
    Object.keys(videoElementsRef.current).forEach(id => {
      if (!clipIds.has(id)) {
        const v = videoElementsRef.current[id];
        if (v) {
          v.pause();
          v.src = "";
          delete videoElementsRef.current[id];
        }
      }
    });

    Object.keys(audioElementsRef.current).forEach(id => {
      if (!clipIds.has(id)) {
        const a = audioElementsRef.current[id];
        if (a) {
          a.pause();
          a.src = "";
          delete audioElementsRef.current[id];
        }
      }
    });
  }, [clips]);

  const handleSaveProject = async () => {
    if (!user) {
      audioSynthEngine.playUISplitCue();
      setAuthModalOpen(true);
      return;
    }

    audioSynthEngine.playUIBeep();
    setSavingStatus("saving");
    setDbErrorMessage(null);

    if (isMock) {
      setTimeout(() => {
        try {
          const key = `sandbox_project_${user.id}`;
          const payload = {
            clips,
            tracks,
            aspectRatio,
            timelineDuration,
            updatedAt: new Date().toISOString()
          };
          localStorage.setItem(key, JSON.stringify(payload));
          setSavingStatus("saved");
          setTimeout(() => setSavingStatus("idle"), 2500);
        } catch (err: any) {
          setSavingStatus("error");
          setDbErrorMessage(err.message || "Unknown error persisting sandbox.");
        }
      }, 750);
      return;
    }

    const supabase = getSupabase();
    if (!supabase) {
      setSavingStatus("error");
      setDbErrorMessage("Supabase connection is not initialized.");
      return;
    }

    try {
      const payload = {
        user_id: user.id,
        clips: clips,
        tracks: tracks,
        aspect_ratio: aspectRatio,
        timeline_duration: timelineDuration,
        updated_at: new Date().toISOString()
      };

      const { error } = await (supabase as any)
        .from("user_projects")
        .upsert(payload, { onConflict: "user_id" });

      if (error) throw error;

      setSavingStatus("saved");
      setTimeout(() => setSavingStatus("idle"), 2500);
    } catch (err: any) {
      setSavingStatus("error");
      setDbErrorMessage(err.message || "Access denied or database schema error.");
    }
  };

  const pushToHistory = (previousClips: Clip[]) => {
    setHistory((prev) => {
      const updated = [...prev, previousClips];
      if (updated.length > 50) {
        updated.shift();
      }
      return updated;
    });
    lastHistoryRef.current = Date.now();
  };

  const handleUndo = () => {
    if (history.length === 0) return;
    audioSynthEngine.playUIBeep();
    const previous = history[history.length - 1];
    setClips(previous);
    setHistory((prev) => prev.slice(0, -1));
  };

  // Redraw Canvas Frame
  const triggerRedraw = (currentTime: number) => {
    if (!canvasRef.current) return;
    drawFrame(
      canvasRef.current,
      currentTime,
      clips,
      aspectRatio,
      selectedClipId,
      videoElementsRef
    );
  };

  // Continuous Playback Loop
  const animatePlayback = (time: number) => {
    if (previousTimeRef.current !== null) {
      const deltaSeconds = (time - previousTimeRef.current) / 1000;
      setPlayhead((prevPlayhead) => {
        const nextTime = prevPlayhead + deltaSeconds;
        if (nextTime >= timelineDuration) {
          setIsPlaying(false);
          audioSynthEngine.stop();
          return 0;
        }
        return nextTime;
      });
    }
    previousTimeRef.current = time;
    animationFrameIdRef.current = requestAnimationFrame(animatePlayback);
  };

  useEffect(() => {
    if (isPlaying) {
      previousTimeRef.current = performance.now();
      animationFrameIdRef.current = requestAnimationFrame(animatePlayback);
    } else {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
      previousTimeRef.current = null;
    }
    return () => {
      if (animationFrameIdRef.current) {
        cancelAnimationFrame(animationFrameIdRef.current);
      }
    };
  }, [isPlaying, timelineDuration]);

  // Synchronize Media Elements & Canvas
  useEffect(() => {
    triggerRedraw(playhead);

    clips.forEach((clip) => {
      const isMediaActive = playhead >= clip.startTime && playhead <= clip.startTime + clip.duration;
      const clipLocalTime = Math.max(0, (playhead - clip.startTime) * clip.speed);

      if (clip.type === "video") {
        let videoEl = videoElementsRef.current[clip.id];
        if (!videoEl) {
          videoEl = document.createElement("video");
          videoEl.crossOrigin = "anonymous";
          videoEl.src = clip.mediaUrl;
          videoEl.playsInline = true;
          videoEl.muted = clip.volume === 0;
          videoElementsRef.current[clip.id] = videoEl;
        }

        videoEl.playbackRate = clip.speed;
        videoEl.volume = Math.min(Math.max(clip.volume, 0), 1);

        if (isMediaActive) {
          if (Math.abs(videoEl.currentTime - clipLocalTime) > 0.25) {
            videoEl.currentTime = clipLocalTime;
          }
          if (isPlaying && videoEl.paused) {
            videoEl.play().catch(() => {});
          } else if (!isPlaying && !videoEl.paused) {
            videoEl.pause();
          }
        } else {
          if (!videoEl.paused) videoEl.pause();
        }
      } else if (clip.type === "audio") {
        let audioEl = audioElementsRef.current[clip.id];
        if (!audioEl) {
          audioEl = document.createElement("audio");
          audioEl.crossOrigin = "anonymous";
          audioEl.src = clip.mediaUrl;
          audioElementsRef.current[clip.id] = audioEl;
        }

        audioEl.playbackRate = clip.speed;
        audioEl.volume = Math.min(Math.max(clip.volume, 0), 1);

        if (isMediaActive) {
          if (Math.abs(audioEl.currentTime - clipLocalTime) > 0.25) {
            audioEl.currentTime = clipLocalTime;
          }
          if (isPlaying && audioEl.paused) {
            audioEl.play().catch(() => {});
          } else if (!isPlaying && !audioEl.paused) {
            audioEl.pause();
          }
        } else {
          if (!audioEl.paused) audioEl.pause();
        }
      }
    });
  }, [playhead, clips, isPlaying, aspectRatio]);

  const togglePlayState = () => {
    audioSynthEngine.playUIBeep();
    if (!isPlaying) {
      if (playhead >= timelineDuration - 0.05) {
        setPlayhead(0);
      }
      setIsPlaying(true);
      audioSynthEngine.playUIBeep();
    } else {
      setIsPlaying(false);
      audioSynthEngine.stop();
    }
  };

  const handleSeekPlayhead = (targetTime: number) => {
    const clamped = Math.max(0, Math.min(targetTime, timelineDuration));
    setPlayhead(clamped);
    triggerRedraw(clamped);
  };

  const handleResetPlayhead = () => {
    audioSynthEngine.playUIBeep();
    setIsPlaying(false);
    audioSynthEngine.stop();
    setPlayhead(0);
    triggerRedraw(0);
  };

  const handleAddClip = (type: "video" | "audio" | "text", payload?: Partial<Clip>) => {
    audioSynthEngine.playUIBeep();
    pushToHistory(clips);

    const targetTrack = tracks.find(t => t.type === type)?.index ?? (type === "video" ? 0 : type === "audio" ? 1 : 2);

    const newClip: Clip = {
      id: `${type}-${Date.now()}`,
      name: payload?.name || `New ${type.toUpperCase()} Clip`,
      type,
      trackIndex: targetTrack,
      startTime: playhead,
      duration: payload?.duration || 5.0,
      sourceDuration: payload?.sourceDuration || 15.0,
      mediaUrl: payload?.mediaUrl || (type === "text" ? "" : "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?auto=format&fit=crop&w=800&q=80"),
      mediaType: payload?.mediaType || (type === "text" ? "text_only" : "stock"),
      volume: payload?.volume !== undefined ? payload.volume : 1,
      speed: payload?.speed || 1,
      filter: payload?.filter || "none",
      text: payload?.text || (type === "text" ? "Dynamic Text Line" : undefined),
      textStyle: payload?.textStyle || (type === "text" ? {
        fontSize: 28,
        color: "#ffffff",
        backgroundColor: "rgba(0,0,0,0.7)",
        outlineColor: "transparent",
        outlineWidth: 0,
        positionX: 50,
        positionY: 80,
        align: "center",
        animation: "fade"
      } : undefined),
      transition: payload?.transition || "none"
    };

    setClips((prev) => [...prev, newClip]);
    setSelectedClipId(newClip.id);

    if (newClip.startTime + newClip.duration > timelineDuration) {
      setTimelineDuration(Math.ceil(newClip.startTime + newClip.duration + 5));
    }
  };

  const handleUpdateClip = (clipId: string, updatedFields: Partial<Clip>) => {
    if (Date.now() - lastHistoryRef.current > 600) {
      pushToHistory(clips);
    }
    setClips((prev) => prev.map((c) => (c.id === clipId ? { ...c, ...updatedFields } : c)));
  };

  const handleDeleteClip = (id: string) => {
    audioSynthEngine.playUISplitCue();
    pushToHistory(clips);
    setClips((prev) => {
      const target = prev.find(c => c.id === id);
      if (target && target.linkedGroupId) {
        return prev.filter(c => c.id !== id && c.linkedGroupId !== target.linkedGroupId);
      }
      return prev.filter((c) => c.id !== id);
    });
    if (selectedClipId === id) setSelectedClipId(null);
  };

  const handleDuplicateClip = (id: string) => {
    audioSynthEngine.playUIBeep();
    const target = clips.find(c => c.id === id);
    if (!target) return;
    pushToHistory(clips);

    const cloned: Clip = {
      ...JSON.parse(JSON.stringify(target)),
      id: `${target.type}-${Date.now()}-copy`,
      name: `${target.name} (Copy)`,
      startTime: target.startTime + target.duration,
      linkedGroupId: undefined
    };

    setClips((prev) => [...prev, cloned]);
    setSelectedClipId(cloned.id);
  };

  const handleUnlinkClip = (id: string) => {
    audioSynthEngine.playUISplitCue();
    setClips((prev) => prev.map(c => {
      if (c.id === id || (c.linkedGroupId && c.linkedGroupId === clips.find(x => x.id === id)?.linkedGroupId)) {
        const { linkedGroupId, ...rest } = c;
        return rest as Clip;
      }
      return c;
    }));
  };

  const handleAddTrack = (type: "video" | "audio" | "text") => {
    audioSynthEngine.playUIBeep();
    const nextIndex = tracks.length;
    const newTrack: TimelineTrack = {
      index: nextIndex,
      type,
      name: `${type.charAt(0).toUpperCase() + type.slice(1)} Track ${nextIndex + 1}`
    };
    setTracks(prev => [...prev, newTrack]);
  };

  const handleSplitClipAtPlayhead = () => {
    const targetClip = clips.find(c => c.id === selectedClipId);
    if (!targetClip) return;

    if (playhead <= targetClip.startTime + 0.1 || playhead >= targetClip.startTime + targetClip.duration - 0.1) {
      return;
    }

    pushToHistory(clips);
    const elapsed = playhead - targetClip.startTime;

    const firstHalfClip: Clip = {
      ...targetClip,
      duration: elapsed,
    };

    const secondHalfClip: Clip = {
      ...targetClip,
      id: `${targetClip.type}-${Date.now()}-cut`,
      name: `${targetClip.name} (Part 2)`,
      startTime: playhead,
      duration: targetClip.duration - elapsed,
    };

    setClips((prev) => [
      ...prev.filter(c => c.id !== targetClip.id),
      firstHalfClip,
      secondHalfClip
    ]);

    setSelectedClipId(secondHalfClip.id);
  };

  const handleAddQuickTextOverlay = () => {
    const quickTemplate = {
      name: "Dynamic Subtitle",
      text: "New Interactive Text Line",
      textStyle: {
        fontSize: 26,
        color: "#ffffff",
        backgroundColor: "rgba(0, 0, 0, 0.6)",
        outlineColor: "transparent",
        outlineWidth: 0,
        positionX: 50,
        positionY: 82,
        align: "center" as const,
        animation: "fade" as const
      }
    };
    handleAddClip("text", quickTemplate);
  };

  const handleStartExportRecording = () => {
    if (!canvasRef.current) return;

    setExportLoading(true);
    setExportReadyUrl(null);
    setExportProgress(0);
    setIsPlaying(false);
    audioSynthEngine.stop();
    setPlayhead(0);

    const recordingUnits: BlobPart[] = [];
    let streamRef: MediaStream | null = null;
    try {
      streamRef = canvasRef.current.captureStream(30);
    } catch (e) {
      console.error("Capture stream error:", e);
    }

    if (!streamRef) {
      let currentProgress = 0;
      const interval = setInterval(() => {
        currentProgress += 5;
        setExportProgress(currentProgress);
        if (currentProgress >= 100) {
          clearInterval(interval);
          setExportLoading(false);
          const fallbackData = new Blob(["AI EXPLORERS VIDEO DEMO"], { type: "text/plain" });
          setExportReadyUrl(URL.createObjectURL(fallbackData));
        }
      }, 150);
      return;
    }

    let mediaRecorder: MediaRecorder | null = null;
    try {
      mediaRecorder = new MediaRecorder(streamRef, { mimeType: "video/webm;codecs=vp9" });
    } catch {
      try {
        mediaRecorder = new MediaRecorder(streamRef, { mimeType: "video/webm" });
      } catch {
        mediaRecorder = new MediaRecorder(streamRef);
      }
    }

    mediaRecorder.ondataavailable = (event) => {
      if (event.data && event.data.size > 0) {
        recordingUnits.push(event.data);
      }
    };

    mediaRecorder.onstop = () => {
      const finalBlob = new Blob(recordingUnits, { type: "video/webm" });
      const finalUrl = URL.createObjectURL(finalBlob);
      setExportReadyUrl(finalUrl);
      setExportLoading(false);
      setExportProgress(100);
    };

    mediaRecorder.start();

    let exportPlayhead = 0;
    const renderFrameStep = 0.15;

    const loopInterval = setInterval(() => {
      exportPlayhead += renderFrameStep;
      setPlayhead(exportPlayhead);
      setExportProgress((exportPlayhead / timelineDuration) * 100);

      if (exportPlayhead >= timelineDuration) {
        clearInterval(loopInterval);
        mediaRecorder?.stop();
        handleSeekPlayhead(0);
      }
    }, 45);
  };

  const formatCentiseconds = (secs: number) => {
    if (isNaN(secs) || secs < 0) return "00:00.00";
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    const c = Math.floor((secs % 1) * 100);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}.${c.toString().padStart(2, "0")}`;
  };

  return (
    <div id="video-editor-modal" className="fixed inset-0 z-50 flex flex-col bg-[#0c0c0e] font-sans text-slate-100 overflow-hidden select-none animate-in fade-in duration-200">
      
      {/* Top Header Bar with Exit/Return Controls */}
      <header className="px-4 sm:px-6 py-2.5 border-b border-zinc-800 bg-[#111115] flex justify-between items-center flex-shrink-0 z-20">
        
        {/* Left: Back Button & Branding */}
        <div className="flex items-center gap-3">
          <button
            onClick={onClose}
            className="flex items-center gap-2 px-3 py-1.5 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-200 hover:text-white border border-slate-700 text-xs font-bold transition-all shadow-sm cursor-pointer hover:-translate-x-0.5 active:translate-x-0"
            title="Return to AI Explorers Showcase"
          >
            <ArrowLeft className="w-4 h-4 text-cyan-400" />
            <span className="hidden sm:inline">Back to AI Explorers</span>
            <span className="sm:hidden">Back</span>
          </button>

          <div className="h-5 w-px bg-zinc-800 hidden sm:block" />

          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-lg bg-blue-600/20 border border-blue-500/30 flex items-center justify-center">
              <Scissors className="w-4 h-4 text-cyan-400 -rotate-90 stroke-[2.5]" />
            </div>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xs sm:text-sm font-bold text-slate-100 tracking-wide">
                  Online Video Editor
                </h1>
                <span className="px-2 py-0.5 rounded-full text-[10px] font-bold bg-cyan-500/20 text-cyan-300 border border-cyan-500/30 hidden md:inline-block">
                  Student Showcase
                </span>
              </div>
              <p className="text-[10px] text-zinc-400 hidden sm:block">
                Browser-based Multi-track Timeline & Motion Graphics
              </p>
            </div>
          </div>
        </div>

        {/* Right: Actions & Close Button */}
        <div className="flex items-center gap-2.5">
          
          {/* Supabase Status Pill */}
          <div 
            onClick={() => {
              audioSynthEngine.playUIBeep();
              setAuthModalOpen(true);
            }}
            className={`hidden md:flex items-center gap-1.5 px-2.5 py-1 rounded-full text-[10px] font-mono font-semibold transition-all cursor-pointer select-none ${
              hasConfig 
                ? "bg-emerald-950/40 border border-emerald-800/60 text-emerald-300 hover:border-emerald-500" 
                : "bg-amber-950/40 border border-amber-800/60 text-amber-300 hover:border-amber-500"
            }`}
            title={hasConfig ? "Live Supabase Database Connected" : "Supabase: Sandbox Mode (Click to configure)"}
          >
            <Database className="w-3 h-3" />
            <span>{hasConfig ? "Supabase Live" : "Sandbox Mode"}</span>
            <span className={`inline-block w-1.5 h-1.5 rounded-full ${hasConfig ? "bg-emerald-400 animate-ping" : "bg-amber-400 animate-pulse"}`} />
          </div>

          {/* User Auth Section */}
          {user ? (
            <div className="relative">
              <button
                onClick={() => {
                  audioSynthEngine.playUIBeep();
                  setUserDropdownOpen(!userDropdownOpen);
                }}
                className="flex items-center gap-1.5 px-2.5 py-1 bg-zinc-900 hover:bg-zinc-800 border border-zinc-800 rounded-lg text-xs font-semibold text-slate-200 transition cursor-pointer select-none"
              >
                <div className="w-4 h-4 rounded-full bg-blue-600 flex items-center justify-center text-[10px] font-bold text-white capitalize">
                  {user.email.charAt(0)}
                </div>
                <span className="max-w-[100px] truncate hidden sm:inline">{user.email}</span>
              </button>

              {userDropdownOpen && (
                <>
                  <div className="fixed inset-0 z-40" onClick={() => setUserDropdownOpen(false)} />
                  <div className="absolute right-0 mt-2 w-56 bg-[#111115] border border-zinc-800 rounded-lg shadow-2xl py-1 z-50 text-xs font-sans">
                    <div className="px-3.5 py-2.5 border-b border-zinc-800/80">
                      <p className="text-[10px] uppercase font-bold text-zinc-500 tracking-wider">Account</p>
                      <p className="font-semibold text-slate-200 truncate mt-0.5">{user.email}</p>
                    </div>
                    
                    <button
                      onClick={() => {
                        setUserDropdownOpen(false);
                        signOut();
                      }}
                      className="flex items-center gap-2 w-full text-left px-3.5 py-2.5 hover:bg-zinc-800/40 text-rose-400 hover:text-rose-300 transition-colors cursor-pointer"
                    >
                      <LogOut className="w-3.5 h-3.5" />
                      Sign Out
                    </button>
                  </div>
                </>
              )}
            </div>
          ) : (
            <button
              onClick={() => {
                audioSynthEngine.playUIBeep();
                setAuthModalOpen(true);
              }}
              className="flex items-center gap-1.5 px-2.5 py-1.5 bg-zinc-900 hover:bg-zinc-800 text-slate-200 hover:text-white border border-zinc-800 text-xs font-bold rounded-md transition cursor-pointer"
            >
              <User className="w-3.5 h-3.5 text-blue-400" />
              <span className="hidden sm:inline">Sign In</span>
            </button>
          )}

          {/* Explicit Save Button */}
          {user && (
            <button
              onClick={handleSaveProject}
              disabled={savingStatus === "saving" || isProjectLoading}
              className={`hidden sm:flex items-center gap-1.5 px-3 py-1.5 text-xs font-bold rounded-md border shadow-sm transition-all cursor-pointer select-none ${
                savingStatus === "saving"
                  ? "bg-blue-900/20 border-blue-800/40 text-blue-300"
                  : savingStatus === "saved"
                  ? "bg-emerald-950/40 border-emerald-800/60 text-emerald-300"
                  : "bg-zinc-900 hover:bg-zinc-800 text-slate-200 hover:text-white border-zinc-800"
              }`}
            >
              {savingStatus === "saving" ? (
                <>
                  <Loader2 className="w-3.5 h-3.5 animate-spin text-blue-400" />
                  <span>Saving...</span>
                </>
              ) : savingStatus === "saved" ? (
                <>
                  <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
                  <span>Saved!</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5 text-blue-400" />
                  <span>Save</span>
                </>
              )}
            </button>
          )}

          {/* Export Button */}
          <button
            onClick={() => { audioSynthEngine.playUISplitCue(); setExportModalOpen(true); }}
            className="px-3 sm:px-4 py-1.5 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs rounded-lg shadow-md flex items-center gap-1.5 transition cursor-pointer"
          >
            <Download className="w-3.5 h-3.5" />
            <span>Export</span>
          </button>

          {/* Direct Close Button */}
          <button
            onClick={onClose}
            className="p-1.5 rounded-lg bg-zinc-800/80 hover:bg-red-500/20 hover:text-red-400 text-zinc-400 border border-zinc-700 transition cursor-pointer"
            title="Exit Video Editor"
          >
            <X className="w-5 h-5" />
          </button>
        </div>
      </header>

      {/* Main Three-Pane Studio Layout */}
      <main className="flex-1 flex overflow-hidden min-h-0 relative">
        
        {/* Left: Media Library Panel */}
        <ProjectMediaPanel 
          onAddClip={handleAddClip} 
          selectedClip={clips.find((c) => c.id === selectedClipId) || null}
          onUpdateClip={handleUpdateClip}
        />

        {/* Center: Live Canvas Frame Monitor */}
        <section id="studio-monitor" className="flex-1 bg-[#111115] p-4 sm:p-6 flex flex-col justify-center overflow-hidden relative">
          
          <div className="w-full max-w-4xl mx-auto flex-1 flex flex-col justify-center gap-3">
            
            {/* Canvas Monitor Frame */}
            <div className="flex-1 bg-black border border-zinc-900/80 rounded-xl overflow-hidden relative flex items-center justify-center min-h-[220px] shadow-2xl">
              <canvas 
                ref={canvasRef} 
                className="w-full h-full object-contain block relative z-10"
              />
              
              {!clips.some(c => playhead >= c.startTime && playhead <= c.startTime + c.duration) && (
                <div className="absolute inset-0 z-20 bg-black/90 flex items-center justify-center pointer-events-none">
                  <span className="text-zinc-500 font-sans text-xs tracking-wide">
                    No media at current playhead position
                  </span>
                </div>
              )}
            </div>

            {/* Playback action controls */}
            <div className="flex items-center justify-between px-4 py-1.5 bg-transparent text-zinc-400 select-none">
              
              <div className="font-mono text-zinc-400 font-bold text-xs tracking-wider">
                {formatCentiseconds(playhead)}
              </div>

              <div className="flex items-center gap-4">
                <button
                  onClick={handleResetPlayhead}
                  className="p-1.5 text-zinc-400 hover:text-white active:scale-95 transition cursor-pointer"
                  title="Rewind playhead"
                >
                  <SkipBack className="w-4 h-4 fill-current" />
                </button>

                <button
                  onClick={togglePlayState}
                  className="w-10 h-10 rounded-full bg-white hover:bg-zinc-200 text-black flex items-center justify-center shadow-lg transition duration-200 cursor-pointer active:scale-95"
                  title={isPlaying ? "Pause timeline (Space)" : "Play timeline (Space)"}
                >
                  {isPlaying ? (
                    <Pause className="w-4 h-4 fill-black text-black" />
                  ) : (
                    <Play className="w-4 h-4 fill-black text-black ml-0.5" />
                  )}
                </button>

                <button
                  onClick={() => {
                    audioSynthEngine.playUIBeep();
                    setPlayhead(timelineDuration);
                  }}
                  className="p-1.5 text-zinc-400 hover:text-white active:scale-95 transition cursor-pointer"
                  title="Forward to end"
                >
                  <SkipForward className="w-4 h-4 fill-current" />
                </button>
              </div>

              <div className="font-mono text-zinc-400 font-bold text-xs tracking-wider">
                {formatCentiseconds(timelineDuration)}
              </div>

            </div>

          </div>

        </section>

        {/* Right: Properties Panel */}
        <PropertiesPanel
          selectedClip={clips.find((c) => c.id === selectedClipId) || null}
          onUpdateClip={handleUpdateClip}
          onDeleteClip={handleDeleteClip}
          timelineDuration={timelineDuration}
          onSetTimelineDuration={setTimelineDuration}
          aspectRatio={aspectRatio}
          onChangeAspectRatio={setAspectRatio}
        />

      </main>

      {/* Multi-Track Interactive Timeline */}
      <VideoTimeline
        clips={clips}
        playhead={playhead}
        onSeek={handleSeekPlayhead}
        timelineDuration={timelineDuration}
        selectedClipId={selectedClipId}
        onSelectClip={setSelectedClipId}
        onUpdateClip={handleUpdateClip}
        onSplitClip={handleSplitClipAtPlayhead}
        onAddQuickText={handleAddQuickTextOverlay}
        onDeleteClip={handleDeleteClip}
        onDuplicateClip={handleDuplicateClip}
        tracks={tracks}
        onAddTrack={handleAddTrack}
        onUnlinkClip={handleUnlinkClip}
        onUndo={handleUndo}
        canUndo={history.length > 0}
      />

      {/* Export Recording Modal */}
      <ExportPreviewModal
        isOpen={exportModalOpen}
        onClose={() => setExportModalOpen(false)}
        onStartExportRecord={handleStartExportRecording}
        exportReadyUrl={exportReadyUrl}
        exportLoading={exportLoading}
        exportProgress={exportProgress}
        totalDuration={timelineDuration}
      />

      {/* Supabase Auth Modal */}
      <AuthModal
        isOpen={authModalOpen}
        onClose={() => setAuthModalOpen(false)}
      />

    </div>
  );
};
