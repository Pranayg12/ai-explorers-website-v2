/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState } from "react";
import { Upload, Video, Music, Type, Plus, Sparkles, AlertCircle, Check } from "lucide-react";
import { Clip } from "../types";
import { audioSynthEngine } from "./AudioSynthEngine";

interface ProjectMediaPanelProps {
  onAddClip: (type: "video" | "audio" | "text", asset: any) => void;
  selectedClip: Clip | null;
  onUpdateClip: (clipId: string, updatedFields: Partial<Clip>) => void;
}

const TEXT_PRESETS = [
  {
    id: "text-preset-basic",
    name: "Classic Subtitle Overlay",
    description: "Elegant transparent text for video annotations.",
    text: "Your overlay subtitle segment here...",
    textStyle: {
      fontSize: 22,
      color: "#ffffff",
      backgroundColor: "rgba(0,0,0,0.5)",
      outlineColor: "transparent",
      outlineWidth: 0,
      positionX: 50,
      positionY: 82,
      align: "center" as const,
      animation: "fade" as const
    }
  },
  {
    id: "text-preset-retro",
    name: "Retro Glow Synthwave",
    description: "Cyberpunk typewriter style text with hot glow.",
    text: "NEON SYNTH RUNNER",
    textStyle: {
      fontSize: 32,
      color: "#ec4899",
      backgroundColor: "rgba(12,10,15,0.85)",
      outlineColor: "#06b6d4",
      outlineWidth: 2,
      positionX: 50,
      positionY: 50,
      align: "center" as const,
      animation: "typewriter" as const
    }
  },
  {
    id: "text-preset-minimal",
    name: "Cinema Title Card",
    description: "Fad-in card suitable for narrative chapters.",
    text: "Chapter I: Discovery",
    textStyle: {
      fontSize: 28,
      color: "#ffffff",
      backgroundColor: "transparent",
      outlineColor: "transparent",
      outlineWidth: 0,
      positionX: 50,
      positionY: 45,
      align: "center" as const,
      animation: "fade" as const
    }
  },
  {
    id: "text-preset-lowerthird",
    name: "Anchor Lower Third",
    description: "Bottom-left banner naming presenter or source.",
    text: "DR. ELIZABETH CHEN\nPrincipal AI Architect",
    textStyle: {
      fontSize: 18,
      color: "#ffffff",
      backgroundColor: "rgba(15,23,42,0.85)",
      outlineColor: "transparent",
      outlineWidth: 0,
      positionX: 15,
      positionY: 80,
      align: "left" as const,
      animation: "slide" as const
    }
  },
  {
    id: "text-preset-alert",
    name: "Warning System Alert",
    description: "Bright yellow backdrop caution caption banner.",
    text: "⚠️ BUFFER LIMIT CRITICAL ⚠️",
    textStyle: {
      fontSize: 24,
      color: "#facc15",
      backgroundColor: "#000000",
      outlineColor: "#f43f5e",
      outlineWidth: 1.5,
      positionX: 50,
      positionY: 18,
      align: "center" as const,
      animation: "scale" as const
    }
  },
  {
    id: "text-preset-impact",
    name: "Social Impact Block",
    description: "High impact yellow slider capturing focus.",
    text: "STAY FOCUSSED",
    textStyle: {
      fontSize: 38,
      color: "#000000",
      backgroundColor: "#facc15",
      outlineColor: "transparent",
      outlineWidth: 0,
      positionX: 50,
      positionY: 50,
      align: "center" as const,
      animation: "slide" as const
    }
  },
  {
    id: "text-preset-glass",
    name: "Cosmic Sky Glow",
    description: "Dreamy cyan display lettering with scale bounce.",
    text: "THE DEEP COSMOS",
    textStyle: {
      fontSize: 32,
      color: "#60a5fa",
      backgroundColor: "rgba(30,41,59,0.5)",
      outlineColor: "transparent",
      outlineWidth: 0,
      positionX: 50,
      positionY: 50,
      align: "center" as const,
      animation: "scale" as const
    }
  }
];

const TRANSITION_PRESETS = [
  { id: "fade_in", name: "Cinematic Fade In", desc: "Smooth overlay opacity fade-in from transparent over 1.0s" },
  { id: "cross_dissolve", name: "Dissolve Blend", desc: "Aesthetic cross blend dissolve rendering sequence" },
  { id: "slide_up", name: "Slide Up Transition", desc: "Translates the visual screen up from the bottom boundary" },
  { id: "slide_down", name: "Slide Down Transition", desc: "Moves the visual screen down from the top boundary" },
  { id: "wipe_left", name: "Horizontal Linear Wipe", desc: "Linear wipe scan clearing frame from right to left" },
  { id: "zoom_in", name: "Grow Zoom Centered", desc: "Expands the next track outward from centered focal point" },
  { id: "blur_flash", name: "Cosmic Blur Flash", desc: "An intense white radial light flash that de-blurs" },
  { id: "dip_black", name: "Dip to Pure Black", desc: "Dips the entire scene into deep cinema black" },
  { id: "dip_white", name: "Dip to Ambient White", desc: "Fades into solid white before returning to normal visual" },
  { id: "spin_cut", name: "Rotate Spin Cue", desc: "Spins and enlarges the frame in a dynamic pivot roll" }
];

export default function ProjectMediaPanel({ 
  onAddClip, 
  selectedClip, 
  onUpdateClip 
}: ProjectMediaPanelProps) {
  const [activeTab, setActiveTab] = useState<"media" | "text" | "transitions">("media");
  
  // Pre-seed the movie file asset layout from the attached image reference
  const [uploadedFiles, setUploadedFiles] = useState<any[]>([]);
  const [dragActive, setDragActive] = useState(false);

  // Triggering visual/audio alerts
  const handleAddMedia = (trackType: "video" | "audio" | "text", asset: any) => {
    audioSynthEngine.playUIBeep();
    onAddClip(trackType, {
      name: asset.name,
      duration: asset.duration,
      mediaUrl: asset.mediaUrl,
      thumbnailUrl: asset.thumbnailUrl
    });
  };

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    if (e.dataTransfer.files && e.dataTransfer.files[0]) {
      handleUploadedFiles(e.dataTransfer.files);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      handleUploadedFiles(e.target.files);
    }
  };

  const handleUploadedFiles = (files: FileList) => {
    audioSynthEngine.playUISplitCue();
    for (let i = 0; i < files.length; i++) {
      const file = files[i];
      const objectUrl = URL.createObjectURL(file);
      const isVideo = file.type.startsWith("video/");
      const isAudio = file.type.startsWith("audio/");
      const assetType = isVideo ? "video" : isAudio ? "audio" : "text";

      if (assetType === "text") {
        const newAsset = {
          id: `user-upload-${Date.now()}-${i}`,
          name: file.name,
          type: "text",
          category: "User Text",
          mediaUrl: "",
          thumbnailUrl: "",
          duration: 5,
          artist: "Document text"
        };
        setUploadedFiles(prev => [newAsset, ...prev]);
        onAddClip("text", newAsset);
        continue;
      }

      // Live measurement of file duration
      const tempMedia = document.createElement(isVideo ? "video" : "audio");
      tempMedia.src = objectUrl;
      tempMedia.preload = "metadata";

      const handleLoadedMetadata = () => {
        const durationValue = tempMedia.duration && isFinite(tempMedia.duration) ? tempMedia.duration : (isVideo ? 15 : 45);
        const newAsset = {
          id: `user-upload-${Date.now()}-${i}-${Math.floor(Math.random() * 1000)}`,
          name: file.name,
          type: assetType,
          category: "User Upload",
          mediaUrl: objectUrl,
          thumbnailUrl: isVideo 
            ? "https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?w=150&auto=format&fit=crop&q=60"
            : "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=150&auto=format&fit=crop&q=60",
          duration: Math.round(durationValue * 10) / 10,
          artist: `${Math.round(durationValue * 10) / 10}s`
        };

        setUploadedFiles(prev => [newAsset, ...prev]);
        onAddClip(assetType, newAsset);
      };

      tempMedia.onloadedmetadata = handleLoadedMetadata;
    }
  };

  return (
    <div id="media-library-panel" className="w-80 border-r border-zinc-805 bg-[#16161a] flex flex-col h-full select-none text-slate-250">
      
      {/* 1. Global Tab-switching System bar */}
      <div className="flex border-b border-zinc-900 bg-[#111115] px-2 py-1.5 gap-1 select-none flex-shrink-0">
        <button
          onClick={() => { audioSynthEngine.playUIBeep(); setActiveTab("media"); }}
          className={`flex-1 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase transition flex items-center justify-center gap-1 border ${
            activeTab === "media"
              ? "bg-[#1f1f26] border-zinc-800 text-white"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Video className="w-3 h-3 text-blue-400" />
          Media
        </button>
        <button
          onClick={() => { audioSynthEngine.playUIBeep(); setActiveTab("text"); }}
          className={`flex-1 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase transition flex items-center justify-center gap-1 border ${
            activeTab === "text"
              ? "bg-[#1f1f26] border-zinc-800 text-white"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Type className="w-3 h-3 text-violet-400" />
          Text
        </button>
        <button
          onClick={() => { audioSynthEngine.playUIBeep(); setActiveTab("transitions"); }}
          className={`flex-1 py-1.5 rounded text-[10px] font-bold tracking-wider uppercase transition flex items-center justify-center gap-1 border ${
            activeTab === "transitions"
              ? "bg-[#1f1f26] border-zinc-800 text-white"
              : "border-transparent text-slate-400 hover:text-white"
          }`}
        >
          <Sparkles className="w-3 h-3 text-amber-400" />
          Transitions
        </button>
      </div>

      {/* 2. Tab Contents Router view */}
      {activeTab === "media" && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="flex items-center justify-between px-4 py-2.5 border-b border-zinc-900 bg-zinc-950/20">
            <span className="text-[9px] text-zinc-500 uppercase font-mono font-bold tracking-wider">Asset Library</span>
            <label className="p-1 px-2 border border-blue-900/40 bg-blue-950/20 hover:bg-blue-900/30 transition text-blue-400 rounded text-[9px] font-semibold flex items-center gap-1 cursor-pointer">
              <Upload className="w-3 h-3" />
              Upload Files
              <input 
                type="file" 
                multiple 
                accept="video/*,audio/*" 
                className="hidden" 
                onChange={handleFileChange} 
              />
            </label>
          </div>

          <div 
            className={`flex-1 overflow-y-auto p-3 flex flex-col gap-2.5 transition-all duration-200 ${
              dragActive ? "bg-blue-500/5 border border-dashed border-blue-500/50" : ""
            }`}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="flex flex-col gap-2">
              {uploadedFiles.map((asset) => (
                <div 
                  key={asset.id}
                  onClick={() => handleAddMedia(asset.type as "video"|"audio"|"text", asset)}
                  className="flex items-center gap-2.5 p-2 bg-[#1b1b22] hover:bg-[#20202a] rounded border border-zinc-850 hover:border-blue-500/50 transition-all cursor-pointer group"
                >
                  <div className="w-10 h-10 rounded overflow-hidden flex-shrink-0 bg-stone-900 border border-zinc-900/60 relative flex items-center justify-center">
                    {asset.thumbnailUrl ? (
                      <img 
                        src={asset.thumbnailUrl} 
                        alt="" 
                        referrerPolicy="no-referrer"
                        className="w-full h-full object-cover"
                      />
                    ) : asset.type === "audio" ? (
                      <Music className="w-4.5 h-4.5 text-emerald-500" />
                    ) : (
                      <Type className="w-4.5 h-4.5 text-violet-500" />
                    )}
                    <div className="absolute inset-0 bg-black/15 group-hover:bg-black/0 transition-all flex items-center justify-center">
                      <Plus className="w-3.5 h-3.5 text-white/70 opacity-0 group-hover:opacity-100 transition-all pointer-events-none" />
                    </div>
                  </div>

                  <div className="flex-1 min-w-0">
                    <p className="text-[11px] font-semibold text-slate-200 truncate">{asset.name}</p>
                    <p className="text-[9px] text-zinc-500 font-mono mt-0.5">{asset.artist}</p>
                  </div>
                </div>
              ))}
            </div>

            <div className="mt-auto p-3.5 border border-dashed border-zinc-850 rounded text-center bg-[#131116]/30 pointer-events-none">
              <p className="text-[9.5px] text-zinc-500 font-sans leading-relaxed">
                Drop custom MP4 videos or mp3 audios right over this list to import them into your track sequencer.
              </p>
            </div>
          </div>
        </div>
      )}

      {activeTab === "text" && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-4 py-2.5 bg-zinc-950/20 border-b border-zinc-900">
            <span className="text-[9px] text-zinc-500 uppercase font-mono font-bold tracking-wider">Dynamic Styled Text Cards</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-3">
            <p className="text-[10px] text-slate-400 mb-1 leading-relaxed">
              Inject custom styled overlays. Click any card preset to insert the text at the active playhead index.
            </p>

            <div className="flex flex-col gap-2">
              {TEXT_PRESETS.map((preset) => (
                <div
                  key={preset.id}
                  onClick={() => {
                    audioSynthEngine.playUISplitCue();
                    onAddClip("text", {
                      name: preset.name,
                      duration: 5.0,
                      text: preset.text,
                      textStyle: preset.textStyle
                    });
                  }}
                  className="p-3 bg-[#1b1b22] hover:bg-[#20202a] rounded border border-zinc-850 hover:border-purple-500/50 transition-all cursor-pointer group flex flex-col gap-1"
                >
                  <div className="flex justify-between items-center">
                    <span className="text-[11px] font-bold text-slate-205 group-hover:text-purple-400 transition">
                      {preset.name}
                    </span>
                    <span className="text-[7.5px] uppercase font-mono tracking-widest px-1.5 py-0.5 bg-purple-950/45 border border-purple-900/30 rounded text-purple-300 font-bold">
                      {preset.textStyle.animation}
                    </span>
                  </div>
                  <span className="text-[9.5px] text-slate-400 italic max-w-[245px] truncate">
                    "{preset.text}"
                  </span>
                  <span className="text-[9px] text-zinc-500 leading-normal">
                    {preset.description}
                  </span>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {activeTab === "transitions" && (
        <div className="flex-1 flex flex-col h-full overflow-hidden">
          <div className="px-4 py-2.5 bg-zinc-950/20 border-b border-zinc-900">
            <span className="text-[9px] text-zinc-500 uppercase font-mono font-bold tracking-wider">Visual Transition FX</span>
          </div>

          <div className="flex-1 overflow-y-auto p-3.5 flex flex-col gap-3">
            {/* Context Selector notice alert */}
            {selectedClip ? (
              <div className="p-2.5 rounded bg-blue-950/30 border border-blue-900/30 flex items-start gap-2">
                <div className="px-1 py-0.5 bg-blue-500 text-white rounded text-[8px] font-mono leading-none flex items-center justify-center font-bold mt-0.5">
                  ACTIVE
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-[10px] font-black text-white truncate max-w-[200px] leading-tight">
                    {selectedClip.name}
                  </p>
                  <p className="text-[9.5px] text-slate-350 mt-0.5 leading-normal">
                    {selectedClip.type === "video" 
                      ? "Choose a preset below to instantly modify its start transition." 
                      : "Note: Transitions are applied specifically to active visual video elements."}
                  </p>
                </div>
              </div>
            ) : (
              <div id="no-clip-alert" className="p-3 bg-zinc-900/30 border border-zinc-850 rounded flex items-start gap-2 text-slate-400 text-[10px] leading-normal select-none">
                <AlertCircle className="w-3.5 h-3.5 text-amber-500 shrink-0 mt-0.5" />
                <div>
                  <span className="font-bold text-white block mb-0.5">No Track Segment Selected</span>
                  First click on any video clip on the tracks below, then select any of the visual transition behaviors below.
                </div>
              </div>
            )}

            <div className="flex flex-col gap-2">
              {TRANSITION_PRESETS.map((preset) => {
                const isApplied = selectedClip?.type === "video" && selectedClip.transition === preset.id;
                const canApply = selectedClip?.type === "video";

                return (
                  <div
                    key={preset.id}
                    onClick={() => {
                      if (!canApply) {
                        audioSynthEngine.playUIBeep();
                        return;
                      }
                      audioSynthEngine.playUISplitCue();
                      onUpdateClip(selectedClip.id, { transition: preset.id });
                    }}
                    className={`p-2.5 rounded border flex flex-col gap-0.5 transition-all ${
                      isApplied
                        ? "bg-blue-600/10 border-blue-500 text-blue-200"
                        : canApply
                          ? "bg-[#1b1b22] hover:bg-[#20202a] border-zinc-850 hover:border-blue-500/40 cursor-pointer text-slate-300"
                          : "bg-[#131116]/40 border-zinc-900 text-zinc-600 opacity-50 cursor-not-allowed"
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <span className="text-[11px] font-bold font-sans">
                        {preset.name}
                      </span>
                      {isApplied && (
                        <span className="text-[8px] font-bold text-blue-400 font-mono flex items-center gap-0.5 bg-blue-950/80 px-1.5 py-0.5 border border-blue-800/20 rounded">
                          <Check className="w-2.5 h-2.5" />
                          Applied
                        </span>
                      )}
                    </div>
                    <span className="text-[9.5px] text-zinc-500 font-normal leading-relaxed">
                      {preset.desc}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      )}

    </div>
  );
}
