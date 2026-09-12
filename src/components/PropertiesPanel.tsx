/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React from "react";
import { Sliders, Trash2, Info } from "lucide-react";
import { Clip, ProjectAspectRatio } from "../types";
import { audioSynthEngine } from "./AudioSynthEngine";

interface PropertiesPanelProps {
  selectedClip: Clip | null;
  onUpdateClip: (clipId: string, updatedFields: Partial<Clip>) => void;
  onDeleteClip: (clipId: string) => void;
  timelineDuration: number;
  onSetTimelineDuration: (duration: number) => void;
  aspectRatio: ProjectAspectRatio;
  onChangeAspectRatio: (ratio: ProjectAspectRatio) => void;
}

export default function PropertiesPanel({
  selectedClip,
  onUpdateClip,
  onDeleteClip,
  timelineDuration,
  onSetTimelineDuration,
  aspectRatio,
  onChangeAspectRatio,
}: PropertiesPanelProps) {
  return (
    <div id="properties-panel" className="w-80 border-l border-zinc-800 bg-[#16161a] flex flex-col h-full select-none text-slate-250">
      
      {/* Active properties or empty selector */}
      {!selectedClip ? (
        <div className="flex-1 flex flex-col items-center justify-center p-6 text-center text-slate-500">
          <p className="text-xs font-medium text-zinc-500 font-sans tracking-wide">
            Select a clip to view properties
          </p>
        </div>
      ) : (
        <div className="flex-1 flex flex-col h-full overflow-y-auto p-4 gap-4">
          
          {/* Active selection banner */}
          <div className="flex justify-between items-start border-b border-zinc-800 pb-3">
            <div>
              <span className="text-[9px] uppercase font-mono px-2 py-0.5 rounded font-bold tracking-wider bg-zinc-800/80" style={{
                color: selectedClip.type === "video" ? "#3b82f6" : selectedClip.type === "audio" ? "#eab308" : "#a855f7"
              }}>
                {selectedClip.type} Clip Settings
              </span>
              <h4 className="text-xs font-bold text-white mt-1.5 truncate max-w-[150px]">{selectedClip.name}</h4>
            </div>
            
            <button
              onClick={() => { audioSynthEngine.playUISplitCue(); onDeleteClip(selectedClip.id); }}
              className="p-1 px-2 border border-red-900/30 bg-red-950/20 hover:bg-red-900/40 rounded transition text-red-400 text-[10px] flex items-center gap-1 font-semibold"
            >
              <Trash2 className="w-3 h-3" />
              Delete
            </button>
          </div>

          {/* Properties Inputs Form */}
          <div className="flex flex-col gap-4">
            
            {/* Position offset values */}
            <div className="grid grid-cols-2 gap-2 text-xs">
              <div>
                <label className="text-[10px] text-slate-500 block mb-1 uppercase tracking-wider font-semibold">Track Start</label>
                <input
                  type="number"
                  min="0"
                  step="0.1"
                  value={parseFloat(selectedClip.startTime.toFixed(2))}
                  onChange={(e) => onUpdateClip(selectedClip.id, { startTime: Math.max(0, parseFloat(e.target.value) || 0) })}
                  className="w-full bg-zinc-950 border border-zinc-800 text-slate-200 px-2.5 py-1.5 rounded-md font-mono text-xs focus:border-blue-500 outline-none"
                />
              </div>
              <div>
                <label className="text-[10px] text-slate-500 block mb-1 uppercase tracking-wider font-semibold">Duration (s)</label>
                <input
                  type="number"
                  min="0.5"
                  step="0.1"
                  value={parseFloat(selectedClip.duration.toFixed(2))}
                  onChange={(e) => onUpdateClip(selectedClip.id, { duration: Math.max(0.5, parseFloat(e.target.value) || 1) })}
                  className="w-full bg-zinc-950 border border-zinc-800 text-slate-200 px-2.5 py-1.5 rounded-md font-mono text-xs focus:border-blue-500 outline-none"
                />
              </div>
            </div>

            {/* Playback speed scale */}
            <div>
              <label className="text-[10px] text-slate-500 block mb-1.5 uppercase tracking-wider font-semibold">Playback Speed</label>
              <div className="grid grid-cols-4 gap-1">
                {([0.5, 1.0, 1.5, 2.0]).map((sp) => (
                  <button
                    key={sp}
                    onClick={() => { audioSynthEngine.playUIBeep(); onUpdateClip(selectedClip.id, { speed: sp }); }}
                    className={`py-1 text-xs font-mono rounded border transition ${
                      selectedClip.speed === sp
                        ? "bg-blue-600/10 border-blue-500 text-blue-300 font-bold"
                        : "bg-zinc-950 border-zinc-800 text-slate-400 hover:border-zinc-750"
                    }`}
                  >
                    {sp}x
                  </button>
                ))}
              </div>
            </div>

            {/* Audio properties if type is audio */}
            {selectedClip.type === "audio" && (
              <div>
                <label className="text-[10px] text-slate-500 block mb-1.5 uppercase tracking-wider font-semibold">
                  Clip Volume ({Math.round((selectedClip.volume || 1) * 100)}%)
                </label>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.05"
                  value={selectedClip.volume !== undefined ? selectedClip.volume : 1}
                  onChange={(e) => onUpdateClip(selectedClip.id, { volume: parseFloat(e.target.value) })}
                  className="w-full h-1 bg-zinc-800 accent-blue-500 rounded appearance-none cursor-pointer"
                />
              </div>
            )}

            {/* Color preset list if type is video */}
            {selectedClip.type === "video" && (
              <div className="flex flex-col gap-3">
                <div>
                  <label className="text-[10px] text-slate-500 block mb-1.5 uppercase tracking-wider font-semibold">Color Grade Filter</label>
                  <select
                    value={selectedClip.filter || "none"}
                    onChange={(e) => { audioSynthEngine.playUIBeep(); onUpdateClip(selectedClip.id, { filter: e.target.value as any }); }}
                    className="w-full bg-zinc-950 border border-zinc-850 text-slate-100 px-2 py-1.5 rounded-md text-xs focus:border-blue-500 outline-none cursor-pointer"
                  >
                    <option value="none">No Filter (Original)</option>
                    <option value="grayscale">Grayscale (Classic B&W)</option>
                    <option value="sepia">Warm Sepia (Retro Film)</option>
                    <option value="vintage">Sunset Vintage (Cinematic)</option>
                    <option value="monochrome">Dark Noir (High Contrast)</option>
                    <option value="cold">Electric Cold (Frosty)</option>
                    <option value="invert">Inverted Dimension (X-Ray)</option>
                    <option value="blur">Dream Blur Effect</option>
                  </select>
                </div>

                <div>
                  <label className="text-[10px] text-slate-500 block mb-1.5 uppercase tracking-wider font-semibold">Intro Transition</label>
                  <select
                    value={selectedClip.transition || "none"}
                    onChange={(e) => { audioSynthEngine.playUIBeep(); onUpdateClip(selectedClip.id, { transition: e.target.value }); }}
                    className="w-full bg-zinc-950 border border-zinc-850 text-slate-100 px-2 py-1.5 rounded-md text-xs focus:border-blue-500 outline-none cursor-pointer"
                  >
                    <option value="none">Instant Pop (None)</option>
                    <option value="fade_in">Cinematic Fade In</option>
                    <option value="cross_dissolve">Dissolve Blend</option>
                    <option value="slide_up">Slide Up Transition</option>
                    <option value="slide_down">Slide Down Transition</option>
                    <option value="wipe_left">Horizontal Linear Wipe</option>
                    <option value="zoom_in">Grow Zoom Centered</option>
                    <option value="blur_flash">Cosmic Blur Flash</option>
                    <option value="dip_black">Dip to Pure Black</option>
                    <option value="dip_white">Dip to Ambient White</option>
                    <option value="spin_cut">Rotate Spin Cue</option>
                  </select>
                </div>
              </div>
            )}

            {/* Caption Text overlays if type is text */}
            {selectedClip.type === "text" && selectedClip.textStyle && (
              <div className="flex flex-col gap-3 border-t border-zinc-800 pt-3">
                <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider">Text Overlays Settings</p>
                
                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Overlay Caption Text</label>
                  <textarea
                    rows={2}
                    value={selectedClip.text || ""}
                    onChange={(e) => onUpdateClip(selectedClip.id, { text: e.target.value })}
                    className="w-full bg-zinc-950 border border-zinc-800 text-slate-100 text-xs px-2.5 py-1.5 rounded-md leading-relaxed focus:border-blue-500 outline-none font-sans"
                    placeholder="Type captions..."
                  />
                </div>

                <div>
                  <div className="flex justify-between text-[10px] text-slate-400 mb-1">
                    <span>Font Size: {selectedClip.textStyle.fontSize}px</span>
                    <span>Vertical: {selectedClip.textStyle.positionY}%</span>
                  </div>
                  <div className="flex gap-2">
                    <input
                      type="range"
                      min="14"
                      max="72"
                      value={selectedClip.textStyle.fontSize}
                      onChange={(e) => onUpdateClip(selectedClip.id, {
                        textStyle: { ...selectedClip.textStyle!, fontSize: parseInt(e.target.value) }
                      })}
                      className="flex-1 h-1 bg-zinc-850 accent-blue-500 rounded appearance-none cursor-pointer"
                    />
                    <input
                      type="range"
                      min="5"
                      max="95"
                      value={selectedClip.textStyle.positionY}
                      onChange={(e) => onUpdateClip(selectedClip.id, {
                        textStyle: { ...selectedClip.textStyle!, positionY: parseInt(e.target.value) }
                      })}
                      className="flex-1 h-1 bg-zinc-850 accent-blue-500 rounded appearance-none cursor-pointer"
                    />
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Text Alignment</label>
                  <div className="grid grid-cols-3 gap-1">
                    {(["left", "center", "right"] as const).map((al) => (
                      <button
                        key={al}
                        onClick={() => onUpdateClip(selectedClip.id, {
                          textStyle: { ...selectedClip.textStyle!, align: al }
                        })}
                        className={`py-1 text-[10px] font-semibold border rounded capitalize transition ${
                          selectedClip.textStyle!.align === al
                            ? "bg-blue-600/10 border-blue-500 text-blue-300"
                            : "bg-zinc-950 border-zinc-805 text-slate-400"
                        }`}
                      >
                        {al}
                      </button>
                    ))}
                  </div>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Text Color</label>
                    <input
                      type="color"
                      value={selectedClip.textStyle.color}
                      onChange={(e) => onUpdateClip(selectedClip.id, {
                        textStyle: { ...selectedClip.textStyle!, color: e.target.value }
                      })}
                      className="w-full bg-zinc-950 border border-zinc-800 h-8 rounded p-0.5 cursor-pointer"
                    />
                  </div>
                  <div>
                    <label className="text-[10px] text-slate-400 block mb-1">Backdrop Shield</label>
                    <select
                      value={selectedClip.textStyle.backgroundColor}
                      onChange={(e) => onUpdateClip(selectedClip.id, {
                        textStyle: { ...selectedClip.textStyle!, backgroundColor: e.target.value }
                      })}
                      className="w-full bg-zinc-950 border border-zinc-800 text-slate-200 text-xs px-2 rounded h-8"
                    >
                      <option value="transparent">Transparent</option>
                      <option value="rgba(0,0,0,0.4)">Soft Black (40%)</option>
                      <option value="rgba(0,0,0,0.75)">Dark Black (75%)</option>
                      <option value="#000000">Solid Black</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="text-[10px] text-slate-400 block mb-1">Fade Transition</label>
                  <select
                    value={selectedClip.textStyle.animation || "none"}
                    onChange={(e) => onUpdateClip(selectedClip.id, {
                      textStyle: { ...selectedClip.textStyle!, animation: e.target.value as any }
                    })}
                    className="w-full bg-zinc-950 border border-zinc-800 text-slate-250 text-xs px-2 py-1.5 rounded-md"
                  >
                    <option value="none">Instant Pop (None)</option>
                    <option value="fade">Cinema Fade In (Smooth)</option>
                    <option value="slide">Social Slide Up</option>
                    <option value="scale">Bounce Scale In</option>
                  </select>
                </div>

              </div>
            )}

          </div>

        </div>
      )}

      {/* Persistent global aspect ratio adjustments at the bottom of Right panel */}
      <div className="p-4 border-t border-zinc-800/80 bg-zinc-950/40 flex flex-col gap-3">
        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-wider flex items-center gap-1.5">
          <Sliders className="w-3.5 h-3.5 text-blue-500" />
          Project Canvas Settings
        </p>
        
        <div className="flex gap-1">
          {(["16:9", "9:16", "1:1"] as ProjectAspectRatio[]).map((ratio) => (
            <button
              key={ratio}
              onClick={() => { audioSynthEngine.playUIBeep(); onChangeAspectRatio(ratio); }}
              className={`flex-1 py-1 text-[10px] font-medium border rounded transition ${
                aspectRatio === ratio
                  ? "bg-blue-600/10 border-blue-500 text-blue-300"
                  : "bg-zinc-950 border-zinc-900 text-slate-400 hover:border-zinc-800 hover:text-white"
              }`}
            >
              {ratio === "16:9" ? "16:9 Landscape" : ratio === "9:16" ? "9:16 Phone" : "1:1 Hex/Square"}
            </button>
          ))}
        </div>

        <div>
          <div className="flex justify-between text-[10px] text-slate-500 mb-1">
            <span>Clip Duration Limit:</span>
            <span className="font-mono text-slate-350">{timelineDuration}s</span>
          </div>
          <input
            type="range"
            min="30"
            max="120"
            step="10"
            value={timelineDuration}
            onChange={(e) => onSetTimelineDuration(parseInt(e.target.value))}
            className="w-full accent-blue-500 bg-zinc-800 h-1 rounded appearance-none cursor-pointer"
          />
        </div>
      </div>

    </div>
  );
}
