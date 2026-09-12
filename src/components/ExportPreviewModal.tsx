/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import React, { useState, useEffect } from "react";
import { 
  X, 
  Download, 
  Loader2, 
  CheckCircle, 
  Sparkles, 
  AlertTriangle,
  Play
} from "lucide-react";
import { audioSynthEngine } from "./AudioSynthEngine";

interface ExportPreviewModalProps {
  isOpen: boolean;
  onClose: () => void;
  onStartExportRecord: () => void;
  exportReadyUrl: string | null;
  exportLoading: boolean;
  exportProgress: number;
  totalDuration: number;
}

export default function ExportPreviewModal({
  isOpen,
  onClose,
  onStartExportRecord,
  exportReadyUrl,
  exportLoading,
  exportProgress,
  totalDuration,
}: ExportPreviewModalProps) {
  const [downloadCounter, setDownloadCounter] = useState(0);

  useEffect(() => {
    if (isOpen) {
      setDownloadCounter(0);
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div id="export-drawer" className="fixed inset-0 bg-slate-950/80 backdrop-blur-md flex items-center justify-center z-50 p-4 animate-fade-in select-none">
      
      <div className="bg-slate-900 border border-slate-800 rounded-2xl w-full max-w-md shadow-2xl relative overflow-hidden text-slate-200">
        
        {/* Banner strip */}
        <div className="bg-gradient-to-r from-purple-600 to-indigo-600 h-1.5 w-full" />

        {/* Close Button */}
        <button
          onClick={() => { audioSynthEngine.playUISplitCue(); onClose(); }}
          className="absolute top-4 right-4 p-1 hover:bg-slate-800 rounded-lg text-slate-400 hover:text-white transition cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        <div className="p-6">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-amber-400 animate-pulse" />
            <h3 className="text-base font-bold text-slate-100 uppercase tracking-widest">Compiler Pipeline</h3>
          </div>

          {!exportLoading && !exportReadyUrl ? (
            <div className="flex flex-col gap-4">
              <p className="text-xs text-slate-300 leading-relaxed">
                You are about to compile your multi-track timeline into a final video file. 
                Our pipeline uses <strong>high-fidelity HTML5 MediaStream Canvas recorders</strong> to stitch visual buffers, apply dynamic filters, format font spacing, and render dynamic scenes on-the-fly directly inside your browser.
              </p>

              <div className="bg-slate-950/60 p-3 rounded-xl border border-slate-800 flex flex-col gap-1.5 text-[11px] text-slate-400 leading-relaxed font-sans">
                <span className="text-xs text-amber-300 font-bold uppercase tracking-wide">Project Details:</span>
                <div>• Total Timeline Length: <strong>{totalDuration} seconds</strong></div>
                <div>• Visual Overlay Filters: <strong>Included</strong></div>
                <div>• Audio Melodies Synthesis: <strong>Matched</strong></div>
                <div>• Render Resolution: <strong>HD Vector Scale</strong></div>
              </div>

              <button
                onClick={() => { audioSynthEngine.playUIBeep(); onStartExportRecord(); }}
                className="w-full mt-2 py-3 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white text-xs font-bold rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
              >
                <Play className="w-4 h-4 fill-white" />
                Begin Canvas Recording
              </button>
            </div>
          ) : exportLoading ? (
            <div className="flex flex-col items-center justify-center py-6 text-center gap-4">
              <div className="relative flex items-center justify-center">
                <Loader2 className="w-12 h-12 text-purple-500 animate-spin" />
                <span className="absolute text-[11px] font-mono text-purple-300 font-bold">{Math.round(exportProgress)}%</span>
              </div>

              <div>
                <p className="text-slate-200 text-sm font-bold">Rendering Track Frame Buffers</p>
                <p className="text-slate-500 text-xs mt-1 leading-relaxed">
                  {exportProgress < 30 
                    ? "Compiling retro grid visual coordinates..." 
                    : exportProgress < 65 
                    ? "Stitching text captions timeline structures..." 
                    : exportProgress < 85 
                    ? "Blending audio synth beat waveforms..." 
                    : "Finalizing MP4 media encoding..."}
                </p>
              </div>

              {/* Progress bar */}
              <div className="w-full bg-slate-950 h-2 rounded-full border border-slate-800/80 overflow-hidden mt-1">
                <div 
                  className="bg-gradient-to-r from-purple-500 to-indigo-500 h-full transition-all duration-300" 
                  style={{ width: `${exportProgress}%` }}
                />
              </div>

              <div className="p-2.5 bg-amber-950/20 border border-amber-900/30 text-[10px] text-amber-400 rounded-lg flex gap-2 items-start text-left leading-relaxed">
                <AlertTriangle className="w-4 h-4 text-amber-400 flex-shrink-0 mt-0.5" />
                <p>Please preserve this browser screen active while we record the WebGL buffers. Leaving active tab might stutter frame capture rates.</p>
              </div>
            </div>
          ) : (
            // Export is complete and we show a download link
            <div className="flex flex-col items-center justify-center py-4 text-center gap-4">
              <CheckCircle className="w-12 h-12 text-green-500 animate-bounce" />

              <div>
                <p className="text-slate-200 text-sm font-bold">Compilation Successful!</p>
                <p className="text-slate-500 text-[11px] mt-1">
                  Your High-Definition video file is fully processed and formatted in-browser. Playable on all media engines!
                </p>
              </div>

              <a
                href={exportReadyUrl || "#"}
                download={`ai_studio_video_editor_${Date.now()}.webm`}
                onClick={() => { audioSynthEngine.playUISplitCue(); setDownloadCounter(p => p + 1); }}
                className="w-full mt-2 py-3 bg-green-600 hover:bg-green-500 text-white font-bold text-xs rounded-xl shadow-lg transition flex items-center justify-center gap-1.5"
              >
                <Download className="w-4 h-4" />
                Download Video File (.webm)
              </a>

              {downloadCounter > 0 && (
                <p className="text-[10px] text-slate-400 bg-slate-950/80 px-4 py-1.5 rounded-full border border-slate-850">
                  Clicking multiple times will request another chrome package query.
                </p>
              )}

              <button
                onClick={() => { audioSynthEngine.playUIBeep(); onClose(); }}
                className="mt-2 text-xs text-slate-500 hover:text-slate-350 transition font-medium"
              >
                Return to Editor Board
              </button>
            </div>
          )}

        </div>
      </div>
    </div>
  );
}
