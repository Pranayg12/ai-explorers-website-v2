/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useRef, useEffect } from "react";
import { 
  Scissors, 
  ChevronLeft, 
  ChevronRight, 
  Plus, 
  Maximize2, 
  Minimize2,
  Trash2,
  Video,
  Music,
  Type,
  Film,
  Copy,
  Unlink,
  ArrowUpDown,
  Magnet,
  Undo
} from "lucide-react";
import { Clip, TimelineTrack } from "../types";
import { audioSynthEngine } from "./AudioSynthEngine";

interface VideoTimelineProps {
  clips: Clip[];
  playhead: number;
  onSeek: (time: number) => void;
  timelineDuration: number;
  selectedClipId: string | null;
  onSelectClip: (clipId: string | null) => void;
  onUpdateClip: (clipId: string, updatedFields: Partial<Clip>) => void;
  onSplitClip: () => void;
  onAddQuickText: () => void;
  onDeleteClip: (clipId: string) => void;
  onDuplicateClip: (clipId: string) => void;
  tracks: TimelineTrack[];
  onAddTrack: (type: "video" | "audio" | "text") => void;
  onUnlinkClip: (clipId: string) => void;
  onUndo?: () => void;
  canUndo?: boolean;
}

export default function VideoTimeline({
  clips,
  playhead,
  onSeek,
  timelineDuration,
  selectedClipId,
  onSelectClip,
  onUpdateClip,
  onSplitClip,
  onAddQuickText,
  onDeleteClip,
  onDuplicateClip,
  tracks,
  onAddTrack,
  onUnlinkClip,
  onUndo,
  canUndo = false,
}: VideoTimelineProps) {
  // Timeline horizontal density zoom: pixels per second, default is 25px/sec
  const [zoom, setZoom] = React.useState(35);
  const [magnetActive, setMagnetActive] = React.useState(true);
  const [contextMenu, setContextMenu] = React.useState<{
    x: number;
    y: number;
    clipId: string;
  } | null>(null);
  const timelineRulerRef = useRef<HTMLDivElement>(null);

  // Zoom on Cmd/Ctrl key + Wheel scroll
  React.useEffect(() => {
    const el = timelineRulerRef.current;
    if (!el) return;

    const handleWheelZoom = (e: WheelEvent) => {
      if (e.ctrlKey || e.metaKey) {
        e.preventDefault();
        const zoomDelta = -e.deltaY * 0.15;
        setZoom((prevZoom) => {
          const next = prevZoom + zoomDelta;
          return Math.max(20, Math.min(120, next));
        });
      }
    };

    el.addEventListener("wheel", handleWheelZoom, { passive: false });
    return () => {
      el.removeEventListener("wheel", handleWheelZoom);
    };
  }, []);

  const pixelWidth = timelineDuration * zoom + 48;

  const formatRulerTime = (secs: number) => {
    const m = Math.floor(secs / 60);
    const s = Math.floor(secs % 60);
    return `${m.toString().padStart(2, "0")}:${s.toString().padStart(2, "0")}`;
  };

  // Render horizontal timeline markers at regular tick indices
  const renderRulerTicks = () => {
    const ticks = [];
    // Dynamic interval steps based on how zoomed out/in we are
    const step = zoom < 20 ? 10 : zoom < 60 ? 5 : zoom < 100 ? 1 : 0.5;

    for (let sec = 0; sec <= timelineDuration; sec += step) {
      const left = sec * zoom + 48;
      ticks.push(
        <div key={sec} className="absolute top-0 bottom-0 flex flex-col justify-between select-none" style={{ left }}>
          <span className="text-[10px] font-mono font-semibold text-zinc-500 bg-[#0c0c0e] px-1 rounded -translate-x-1/2">
            {formatRulerTime(sec)}
          </span>
          <div className="w-[1px] h-2 bg-zinc-800 -translate-x-1/2" />
        </div>
      );
    }
    return ticks;
  };

  // Seek selection based on clicking coordinates on the timeline ruler
  const handleRulerClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (!timelineRulerRef.current) return;
    const rect = timelineRulerRef.current.getBoundingClientRect();
    const clickX = e.clientX - rect.left - 48 + timelineRulerRef.current.scrollLeft;
    const targetSec = clickX / zoom;
    const boundedTime = Math.min(timelineDuration, Math.max(0, targetSec));
    onSeek(boundedTime);
  };

  // Setup click drag to scrub timeline effortlessly
  const handleRulerMouseDown = (e: React.MouseEvent<HTMLDivElement>) => {
    const handleMouseMove = (mouseEvent: MouseEvent) => {
      if (!timelineRulerRef.current) return;
      const rect = timelineRulerRef.current.getBoundingClientRect();
      const relativeX = mouseEvent.clientX - rect.left - 48 + timelineRulerRef.current.scrollLeft;
      const targetSec = relativeX / zoom;
      const boundedTime = Math.min(timelineDuration, Math.max(0, targetSec));
      onSeek(boundedTime);
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
    handleRulerClick(e); // scrub instantly
  };

  // Adjust clip starting boundary by nudge increments (fine tuning)
  const handleNudgeClip = (clip: Clip, dir: "left" | "right", amount: number = 0.5) => {
    audioSynthEngine.playUIBeep();
    let newStart = clip.startTime;
    if (dir === "left") {
      newStart = Math.max(0, clip.startTime - amount);
    } else {
      newStart = Math.min(timelineDuration - clip.duration, clip.startTime + amount);
    }
    onUpdateClip(clip.id, { startTime: newStart });
  };

  // Adjust clips duration length dynamically (trim handles fine tuning)
  const handleTrimClip = (clip: Clip, dir: "shrink" | "expand", amount: number = 0.5) => {
    audioSynthEngine.playUIBeep();
    let newDuration = clip.duration;
    if (dir === "shrink") {
      newDuration = Math.max(0.5, clip.duration - amount);
    } else {
      newDuration = Math.min(timelineDuration - clip.startTime, clip.duration + amount);
    }
    onUpdateClip(clip.id, { duration: newDuration });
  };

  const handleClipMouseDown = (e: React.MouseEvent<HTMLDivElement>, clip: Clip) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    onSelectClip(clip.id);
    audioSynthEngine.playUIBeep();

    const startX = e.clientX;
    const initialStartTime = clip.startTime;
    let hasMoved = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      hasMoved = true;
      const deltaX = moveEvent.clientX - startX;
      const deltaSeconds = deltaX / zoom;
      let newStartTime = initialStartTime + deltaSeconds;

      // Bound within limits initial
      newStartTime = Math.max(0, Math.min(timelineDuration - clip.duration, newStartTime));

      if (magnetActive) {
        const threshold = 0.35; // Snap threshold in seconds
        let bestSnap = null;
        let minDiff = threshold;

        // Snappy nodes: timeline start/end, playhead position
        const candidates = [0, timelineDuration, playhead];
        
        // Find other clips' starting point and termination point on the timeline
        clips.forEach((c) => {
          if (c.id !== clip.id) {
            candidates.push(c.startTime);
            candidates.push(c.startTime + c.duration);
          }
        });

        candidates.forEach((pt) => {
          // 1. If left boundary is close to a snap candidate
          const diffStart = Math.abs(newStartTime - pt);
          if (diffStart < minDiff) {
            minDiff = diffStart;
            bestSnap = pt;
          }

          // 2. If right boundary is close to a snap candidate
          const diffEnd = Math.abs((newStartTime + clip.duration) - pt);
          if (diffEnd < minDiff) {
            minDiff = diffEnd;
            bestSnap = pt - clip.duration;
          }
        });

        if (bestSnap !== null) {
          newStartTime = bestSnap;
        }
      }

      // Final bound constraints and snap-to-precision rounding
      newStartTime = Math.max(0, Math.min(timelineDuration - clip.duration, newStartTime));
      newStartTime = Math.round(newStartTime * 10) / 10;

      onUpdateClip(clip.id, { startTime: newStartTime });
    };

    const handleMouseUp = () => {
      if (hasMoved) {
        audioSynthEngine.playUISplitCue();
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleLeftTrimMouseDown = (e: React.MouseEvent<HTMLDivElement>, clip: Clip) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    onSelectClip(clip.id);
    audioSynthEngine.playUIBeep();

    const startX = e.clientX;
    const initialStartTime = clip.startTime;
    const initialDuration = clip.duration;
    const initialEndTime = initialStartTime + initialDuration;
    let hasMoved = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      hasMoved = true;
      const deltaX = moveEvent.clientX - startX;
      const deltaSeconds = deltaX / zoom;
      
      let newStartTime = initialStartTime + deltaSeconds;
      if (newStartTime < 0) {
        newStartTime = 0;
      }
      
      // Keep a minimum duration of 0.5s
      const maxStartTime = initialEndTime - 0.5;
      if (newStartTime > maxStartTime) {
        newStartTime = maxStartTime;
      }

      if (magnetActive) {
        const threshold = 0.35;
        let bestSnap = null;
        let minDiff = threshold;

        const candidates = [0, timelineDuration, playhead];
        clips.forEach((c) => {
          if (c.id !== clip.id) {
            candidates.push(c.startTime);
            candidates.push(c.startTime + c.duration);
          }
        });

        candidates.forEach((pt) => {
          const diff = Math.abs(newStartTime - pt);
          if (diff < minDiff) {
            minDiff = diff;
            bestSnap = pt;
          }
        });

        if (bestSnap !== null) {
          newStartTime = bestSnap;
        }
      }

      newStartTime = Math.max(0, Math.min(maxStartTime, newStartTime));
      newStartTime = Math.round(newStartTime * 10) / 10;
      const newDuration = Math.round((initialEndTime - newStartTime) * 10) / 10;

      onUpdateClip(clip.id, { 
        startTime: newStartTime, 
        duration: newDuration 
      });
    };

    const handleMouseUp = () => {
      if (hasMoved) {
        audioSynthEngine.playUISplitCue();
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const handleRightTrimMouseDown = (e: React.MouseEvent<HTMLDivElement>, clip: Clip) => {
    if (e.button !== 0) return;
    e.stopPropagation();
    onSelectClip(clip.id);
    audioSynthEngine.playUIBeep();

    const startX = e.clientX;
    const initialDuration = clip.duration;
    let hasMoved = false;

    const handleMouseMove = (moveEvent: MouseEvent) => {
      hasMoved = true;
      const deltaX = moveEvent.clientX - startX;
      const deltaSeconds = deltaX / zoom;

      let newDuration = initialDuration + deltaSeconds;
      if (newDuration < 0.5) {
        newDuration = 0.5;
      }
      
      if (clip.startTime + newDuration > timelineDuration) {
        newDuration = timelineDuration - clip.startTime;
      }

      let newEndTime = clip.startTime + newDuration;

      if (magnetActive) {
        const threshold = 0.35;
        let bestSnap = null;
        let minDiff = threshold;

        const candidates = [0, timelineDuration, playhead];
        clips.forEach((c) => {
          if (c.id !== clip.id) {
            candidates.push(c.startTime);
            candidates.push(c.startTime + c.duration);
          }
        });

        candidates.forEach((pt) => {
          const diff = Math.abs(newEndTime - pt);
          if (diff < minDiff) {
            minDiff = diff;
            bestSnap = pt;
          }
        });

        if (bestSnap !== null) {
          newEndTime = bestSnap;
          newDuration = newEndTime - clip.startTime;
        }
      }

      if (newDuration < 0.5) {
        newDuration = 0.5;
      }
      if (clip.startTime + newDuration > timelineDuration) {
        newDuration = timelineDuration - clip.startTime;
      }

      newDuration = Math.round(newDuration * 10) / 10;

      onUpdateClip(clip.id, { duration: newDuration });
    };

    const handleMouseUp = () => {
      if (hasMoved) {
        audioSynthEngine.playUISplitCue();
      }
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  const selectedClip = clips.find(c => c.id === selectedClipId) || null;

  return (
    <div id="timeline" className="bg-slate-950 border-t border-slate-800 flex flex-col select-none relative h-64 flex-shrink-0">
      
      {/* TIMELINE ACTION FLOATING PANEL BAR */}
      <div className="px-4 py-2 bg-slate-900/90 border-b border-slate-800 flex flex-wrap justify-between items-center gap-2">
        
        {/* Playback action cutters */}
        <div className="flex items-center gap-2">
          <button
            onClick={() => { audioSynthEngine.playUISplitCue(); onSplitClip(); }}
            disabled={!selectedClip || playhead <= selectedClip.startTime || playhead >= selectedClip.startTime + selectedClip.duration}
            className="flex items-center gap-1.5 px-3 py-1.5 bg-blue-600 hover:bg-blue-500 disabled:bg-slate-800/80 disabled:text-slate-500 text-white text-xs font-bold rounded-lg shadow transition cursor-pointer"
            title="Split selected track clip into two clips at active playhead position"
          >
            <Scissors className="w-3.5 h-3.5" />
            Split Clip (Cut)
          </button>

          <button
            onClick={() => { audioSynthEngine.playUIBeep(); onAddQuickText(); }}
            className="flex items-center gap-1 px-3 py-1.5 bg-purple-600 hover:bg-purple-500 text-white text-xs font-bold rounded-lg shadow transition"
            title="Insert a custom text subtitle bar at current playhead spot"
          >
            <Plus className="w-3.5 h-3.5" />
            Add Subtitle Overlay
          </button>
        </div>

        {/* Dynamic Track Addition Controls */}
        <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Add Lane:</span>
          <button
            onClick={() => onAddTrack("video")}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#1e293b] hover:bg-slate-700 text-slate-200 text-xs font-semibold rounded-lg border border-slate-700 hover:border-slate-500 transition cursor-pointer shadow-sm"
            title="Add a new Video track lane"
          >
            <Plus className="w-3 h-3 text-blue-400" />
            Video
          </button>
          <button
            onClick={() => onAddTrack("audio")}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#064e3b]/30 hover:bg-emerald-900/60 text-emerald-300 text-xs font-semibold rounded-lg border border-emerald-850/60 hover:border-emerald-700 transition cursor-pointer shadow-sm"
            title="Add a new Audio track lane"
          >
            <Plus className="w-3 h-3 text-emerald-400" />
            Audio
          </button>
          <button
            onClick={() => onAddTrack("text")}
            className="flex items-center gap-1 px-2.5 py-1.5 bg-[#581c87]/30 hover:bg-purple-900/60 text-purple-300 text-xs font-semibold rounded-lg border border-purple-850/60 hover:border-purple-800 transition cursor-pointer shadow-sm"
            title="Add a new Text/Subtitle track lane"
          >
            <Plus className="w-3 h-3 text-purple-400" />
            Text
          </button>
        </div>

        {/* Timeline Toolkit: Snapping & History */}
        <div className="flex items-center gap-2 border-l border-slate-800 pl-3">
          <button
            onClick={() => {
              setMagnetActive(!magnetActive);
              audioSynthEngine.playUIBeep();
            }}
            className={`flex items-center gap-1.5 px-2.5 py-1.5 rounded-lg border transition cursor-pointer shadow-sm text-xs font-semibold ${
              magnetActive 
                ? "bg-cyan-950/40 border-cyan-550/60 text-cyan-300 hover:bg-cyan-900/60" 
                : "bg-slate-900 border-slate-800 text-slate-400 hover:text-slate-200 hover:bg-slate-850"
            }`}
            title={magnetActive ? "Snapping enabled (Aligns clips to playhead, ends, and edit borders)" : "Snapping disabled"}
          >
            <Magnet className={`w-3.5 h-3.5 ${magnetActive ? "text-cyan-400" : ""}`} />
            Snap
          </button>

          <button
            onClick={onUndo}
            disabled={!canUndo}
            className="flex items-center gap-1.5 px-2.5 py-1.5 bg-slate-900 hover:bg-slate-850 disabled:bg-slate-950/55 disabled:border-transparent disabled:text-slate-600 border border-slate-800 text-slate-250 text-xs font-semibold rounded-lg shadow-sm transition-colors cursor-pointer"
            title="Undo last action (Ctrl+Z)"
          >
            <Undo className="w-3.5 h-3.5 text-slate-400 group-hover:text-slate-200" />
            Undo
          </button>
        </div>

        {/* Selected fine-tuning nudge panel */}
        {selectedClip && (
          <div className="flex items-center gap-3 bg-slate-950/80 px-3 py-1 border border-slate-800 rounded-lg text-xs leading-none">
            <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wide">
              Selected: <strong className="text-purple-400 truncate inline-block max-w-[80px] align-bottom">{selectedClip.name}</strong>
            </span>
            
            {/* Shift keys */}
            <div className="flex items-center gap-1.5">
              <span className="text-[10px] text-slate-500">Shift Start:</span>
              <button 
                onClick={() => handleNudgeClip(selectedClip, "left")} 
                title="Shift back 0.5s"
                className="p-1 hover:bg-slate-850 border border-slate-800 text-slate-350 rounded transition"
              >
                <ChevronLeft className="w-3 h-3" />
              </button>
              <button 
                onClick={() => handleNudgeClip(selectedClip, "right")} 
                title="Shift forward 0.5s"
                className="p-1 hover:bg-slate-850 border border-slate-800 text-slate-350 rounded transition"
              >
                <ChevronRight className="w-3 h-3" />
              </button>
            </div>

            {/* Scale keys */}
            <div className="flex items-center gap-1.5 border-l border-slate-800 pl-3">
              <span className="text-[10px] text-slate-500">Trim Length:</span>
              <button 
                onClick={() => handleTrimClip(selectedClip, "shrink")} 
                title="-0.5s duration"
                className="p-1 hover:bg-slate-850 border border-slate-800 text-red-400/80 rounded transition font-bold text-[10px] min-w-5 text-center leading-none"
              >
                -s
              </button>
              <button 
                onClick={() => handleTrimClip(selectedClip, "expand")} 
                title="+0.5s duration"
                className="p-1 hover:bg-slate-850 border border-slate-800 text-green-400/80 rounded transition font-bold text-[10px] min-w-5 text-center leading-none"
              >
                +s
              </button>
            </div>

            {/* Delete shortcut */}
            <button
              onClick={() => onDeleteClip(selectedClip.id)}
              className="p-1 hover:bg-red-950/20 text-red-450 hover:text-red-400 rounded border border-transparent hover:border-red-900/60 pl-2 ml-1 border-l border-slate-800"
              title="Delete Selected Clip"
            >
              <Trash2 className="w-3.5 h-3.5" />
            </button>
          </div>
        )}

        {/* Zoom scaling buttons */}
        <div className="flex items-center gap-2">
          <Minimize2 className="w-3.5 h-3.5 text-slate-500" />
          <input
            type="range"
            min="20"
            max="120"
            value={zoom}
            title="Zoom Timeline scale width"
            onChange={(e) => setZoom(parseInt(e.target.value))}
            className="w-24 accent-purple-500 bg-slate-800 h-1 rounded-sm appearance-none cursor-pointer"
          />
          <Maximize2 className="w-3.5 h-3.5 text-slate-500" />
          <span className="text-[10px] font-mono text-slate-500 font-bold bg-slate-950 px-1.5 py-0.5 border border-slate-850 rounded">
            {zoom}px/s
          </span>
        </div>

      </div>

      {/* TRACK BOARD CHRONO SYSTEM CONTAINER */}
      <div 
        ref={timelineRulerRef}
        className="flex-1 overflow-x-auto overflow-y-auto relative bg-[#0c0c0e] scrollbar-thin flex flex-col cursor-crosshair"
        onMouseDown={handleRulerMouseDown}
      >
        {/* Timeline Horizontal Ruler background scale */}
        <div 
          className="h-8 border-b border-zinc-900 bg-[#0c0c0e] sticky top-0 relative select-none flex-shrink-0"
          style={{ width: `${pixelWidth}px` }}
        >
          {/* Top-left corners matching layout icon and music icon stack inside the photo */}
          <div className="sticky left-0 top-0 bottom-0 w-12 h-8 bg-[#111115] border-r border-zinc-900 border-b border-zinc-900 flex items-center justify-center gap-1.5 z-25 text-neutral-400 pointer-events-none select-none">
            <Film className="w-3.5 h-3.5" />
            <Music className="w-3.5 h-3.5" />
          </div>
          {renderRulerTicks()}
        </div>

        {/* REAL GRID LAYOUT: Rows represent Tracks */}
        <div className="flex flex-col relative py-1 gap-1.5" style={{ width: `${pixelWidth}px` }}>
          
          {tracks.map((track) => {
            const trackClips = clips.filter(c => c.trackIndex === track.index);

            return (
              <div 
                key={track.index} 
                className="h-11 relative flex items-center border border-dashed border-zinc-900/40 rounded-md bg-[#111115]/30 group/track"
              >
                 {/* Track Left Title icon sticky offset */}
                <div 
                  className="sticky left-0 h-full w-12 bg-[#111115] border-r border-zinc-900 flex flex-col items-center justify-center text-zinc-500 z-20 flex-shrink-0 select-none cursor-default"
                  title={track.name}
                >
                  {track.type === "video" ? (
                    <Video className="w-3.5 h-3.5 text-slate-400" />
                  ) : track.type === "audio" ? (
                    <Music className="w-3.5 h-3.5 text-emerald-500/80" />
                  ) : (
                    <Type className="w-3.5 h-3.5 text-violet-400" />
                  )}
                  <span className="text-[8px] font-bold font-mono text-zinc-500 mt-0.5 leading-none">
                    {track.type === "video" ? "VID" : track.type === "audio" ? "AUD" : "TXT"}
                    {tracks.filter((t) => t.type === track.type && t.index <= track.index).length}
                  </span>
                </div>

                {/* Draw absolute tracks wrappers */}
                {trackClips.map((clip) => {
                  const clipLeft = (clip.startTime * zoom) + 48; // Shift absolutely positioned clips by 48px to offset the sticky indicator!
                  const clipWidth = clip.duration * zoom;
                  const isActive = clip.id === selectedClipId;

                  return (
                    <div
                      key={clip.id}
                      onMouseDown={(e) => handleClipMouseDown(e, clip)}
                      onContextMenu={(e) => {
                        e.preventDefault();
                        e.stopPropagation();
                        onSelectClip(clip.id);
                        setContextMenu({
                          x: e.clientX,
                          y: e.clientY,
                          clipId: clip.id
                        });
                      }}
                      className={`absolute h-8 rounded border flex flex-col justify-between px-2.5 py-1.5 cursor-pointer select-none transition-all shadow-md group ${
                        isActive
                          ? "bg-blue-600 border-blue-400 text-white shadow-lg ring-1 ring-blue-500/30 scale-[1.01]"
                          : clip.type === "video" 
                            ? "bg-slate-800 border-slate-700 text-slate-100 hover:bg-slate-700 hover:border-slate-500"
                            : clip.type === "audio"
                              ? "bg-emerald-850 border-emerald-700/60 text-emerald-50 hover:bg-emerald-800 hover:border-emerald-500"
                              : "bg-purple-850 border-purple-700/60 text-purple-50 hover:bg-purple-800 hover:border-purple-500"
                      }`}
                      style={{
                        left: `${clipLeft}px`,
                        width: `${clipWidth}px`,
                        zIndex: isActive ? 20 : 10
                      }}
                    >
                      {/* Name tags and options */}
                      <div className="flex justify-between items-center w-full min-w-0 pointer-events-none select-none">
                        <span className="text-[10px] font-semibold truncate pr-1 uppercase drop-shadow">
                          {clip.name}
                        </span>
                        <span className="text-[9px] font-mono opacity-80">
                          {clip.duration.toFixed(1)}s
                        </span>
                      </div>

                      {/* Timeline range indices visualization bar */}
                      <div className="flex justify-between font-mono text-[8px] opacity-60 font-medium pointer-events-none">
                        <span>{clip.startTime.toFixed(1)}s</span>
                        {clip.speed !== 1 && (
                          <span className="bg-slate-900/60 text-yellow-300 font-mono text-[7px] px-1 rounded scale-90">
                            {clip.speed}x
                          </span>
                        )}
                        <span>{(clip.startTime + clip.duration).toFixed(1)}s</span>
                      </div>

                      {/* Interactive Drag Handles for trimming */}
                      <div 
                        onMouseDown={(e) => handleLeftTrimMouseDown(e, clip)}
                        className="absolute left-0 top-0 bottom-0 w-2 hover:w-3 cursor-ew-resize hover:bg-amber-400 active:bg-amber-500 bg-white/15 border-r border-white/15 flex items-center justify-center transition-all z-20 rounded-l"
                        title="Drag left edge to shorten/lengthen"
                      >
                        <div className="w-[1.5px] h-3.5 bg-white/70 rounded-full" />
                      </div>
                      <div 
                        onMouseDown={(e) => handleRightTrimMouseDown(e, clip)}
                        className="absolute right-0 top-0 bottom-0 w-2 hover:w-3 cursor-ew-resize hover:bg-amber-400 active:bg-amber-500 bg-white/15 border-l border-white/15 flex items-center justify-center transition-all z-20 rounded-r"
                        title="Drag right edge to shorten/lengthen"
                      >
                        <div className="w-[1.5px] h-3.5 bg-white/70 rounded-full" />
                      </div>
                    </div>
                  );
                })}
              </div>
            );
          })}

        </div>

        {/* PLAYHEAD RED SCRUBBING NEEDLE Offset by 48px - FULL HEIGHT across ruler and tracks */}
        <div 
          className="absolute top-0 bottom-0 w-[2px] bg-rose-500 pointer-events-none z-35"
          style={{ 
            left: `${(playhead * zoom) + 48}px`,
            boxShadow: "0 0 8px #f43f5e, 0 0 3px #f43f5e"
          }}
        >
          {/* Playhead handle bulb matching professional edit handle style located on the ruler */}
          <div className="absolute top-[2px] left-1/2 -translate-x-1/2 w-3 h-3 bg-rose-500 rounded-b shadow border border-rose-400 z-45" />
        </div>

      </div>

      {contextMenu && (() => {
        const contextClip = clips.find(c => c.id === contextMenu.clipId);
        const hasLinkGroup = contextClip && !!contextClip.linkedGroupId;
        const altTracks = tracks.filter(t => contextClip && t.type === contextClip.type && t.index !== contextClip.trackIndex);

        return (
          <div 
            className="fixed inset-0 z-50 cursor-default"
            onClick={() => setContextMenu(null)}
            onContextMenu={(e) => { e.preventDefault(); setContextMenu(null); }}
          >
            <div 
              className="absolute bg-slate-900 border border-slate-700/80 rounded-lg shadow-2xl py-1 text-slate-100 text-xs w-48 z-50 font-sans"
              style={{ 
                top: `${Math.min(window.innerHeight - 200, contextMenu.y)}px`, 
                left: `${Math.min(window.innerWidth - 200, contextMenu.x)}px` 
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <div className="px-3 py-1.5 text-[10px] uppercase font-bold text-slate-400/80 tracking-wider border-b border-slate-800">
                Clip Options
              </div>
              
              <button
                onClick={() => {
                  onDuplicateClip(contextMenu.clipId);
                  setContextMenu(null);
                }}
                className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 hover:bg-blue-600 hover:text-white transition-colors cursor-pointer text-slate-200"
              >
                <Copy className="w-3.5 h-3.5 text-blue-400" />
                Duplicate Clip
              </button>

              <button
                disabled={!contextClip || playhead <= contextClip.startTime || playhead >= contextClip.startTime + contextClip.duration}
                onClick={() => {
                  audioSynthEngine.playUISplitCue();
                  onSplitClip();
                  setContextMenu(null);
                }}
                className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 hover:bg-blue-600 hover:text-white disabled:opacity-40 disabled:hover:bg-transparent disabled:hover:text-slate-450 transition-colors cursor-pointer text-slate-200 border-t border-slate-800/60"
                title="Split this clip at current playhead position"
              >
                <Scissors className="w-3.5 h-3.5 text-blue-400" />
                Split Clip (Cut)
              </button>

              {hasLinkGroup && (
                <button
                  onClick={() => {
                    onUnlinkClip(contextMenu.clipId);
                    setContextMenu(null);
                  }}
                  className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 hover:bg-amber-600 hover:text-white transition-colors cursor-pointer text-slate-200 border-t border-slate-800/60"
                  title="Separate linked Audio/Video into independent tracks"
                >
                  <Unlink className="w-3.5 h-3.5 text-amber-400" />
                  Unlink Audio/Video
                </button>
              )}

              {altTracks.length > 0 && (
                <div className="border-t border-slate-800/60">
                  <div className="px-3 py-1 text-[9px] uppercase font-bold text-slate-500/80 tracking-wider">
                    Move to Track
                  </div>
                  {altTracks.map((t) => (
                    <button
                      key={t.index}
                      onClick={() => {
                        onUpdateClip(contextMenu.clipId, { trackIndex: t.index });
                        setContextMenu(null);
                      }}
                      className="flex items-center gap-2.5 w-full text-left px-3 py-2 hover:bg-indigo-650 hover:text-white transition-colors cursor-pointer text-slate-300 font-mono text-[10px]"
                    >
                      <ArrowUpDown className="w-3 h-3 text-indigo-400" />
                      {t.name}
                    </button>
                  ))}
                </div>
              )}

              <button
                onClick={() => {
                  onDeleteClip(contextMenu.clipId);
                  setContextMenu(null);
                }}
                className="flex items-center gap-2.5 w-full text-left px-3 py-2.5 text-rose-400 hover:bg-rose-600 hover:text-white transition-colors cursor-pointer border-t border-slate-800"
              >
                <Trash2 className="w-3.5 h-3.5 text-rose-400" />
                Delete Clip
              </button>
            </div>
          </div>
        );
      })()}
    </div>
  );
}
