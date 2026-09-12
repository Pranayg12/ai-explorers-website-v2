import express from "express";
import path from "path";
import { createServer as createViteServer } from "vite";
import { GoogleGenAI, Type } from "@google/genai";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(express.json());

const PORT = 3000;

// Initialize Gemini SDK with telemetry header
const ai = process.env.GEMINI_API_KEY
  ? new GoogleGenAI({
      apiKey: process.env.GEMINI_API_KEY,
      httpOptions: {
        headers: {
          "User-Agent": "aistudio-build",
        },
      },
    })
  : null;

// API Endpoint: Generate Video Outline, Script, and Timeline Tracks
app.post("/api/ai/generate-script", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please set it in Settings > Secrets.",
      });
    }

    const { prompt, tone, duration } = req.body;
    if (!prompt) {
      return res.status(400).json({ error: "Prompt is required." });
    }

    const systemPrompt = `You are an expert video director, scriptwriter, and post-production specialist. 
Create a detailed, creative video outline, script, and a series of timeline tracks (video/voice clips, overlays, audio tracks) for an online video editor.
Ensure the layout fits the requested duration (${duration} seconds) and tone (${tone}).
Return your response STRICTLY as a JSON object matching this schema:
{
  "title": "A creative title for the video",
  "summary": "Brief summary of the video flow",
  "scriptText": "Full presenter/voiceover script",
  "scenes": [
    {
      "time": 0,
      "duration": 5,
      "title": "Scene title",
      "visualDescription": "Detailed visual guidance",
      "narration": "What the voiceover says",
      "overlayText": "Text prompt to display on screen during this scene"
    }
  ],
  "suggestedTags": ["tag1", "tag2"]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate a script and scene-by-scene timing for: "${prompt}" with a ${tone} tone, intended to be ${duration} seconds long.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["title", "summary", "scriptText", "scenes"],
          properties: {
            title: { type: Type.STRING },
            summary: { type: Type.STRING },
            scriptText: { type: Type.STRING },
            suggestedTags: {
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            scenes: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["time", "duration", "title", "visualDescription", "narration", "overlayText"],
                properties: {
                  time: { type: Type.NUMBER, description: "Start time in seconds from 0" },
                  duration: { type: Type.NUMBER, description: "Duration in seconds" },
                  title: { type: Type.STRING },
                  visualDescription: { type: Type.STRING },
                  narration: { type: Type.STRING },
                  overlayText: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI engine");
    }

    const json = JSON.parse(resultText.trim());
    return res.json(json);
  } catch (error: any) {
    console.error("Error generating video script:", error);
    return res.status(500).json({ error: error.message || "Failed to make AI query." });
  }
});

// API Endpoint: Generate Auto-Subtitles for a given narration/script
app.post("/api/ai/generate-subtitles", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please set it in Settings > Secrets.",
      });
    }

    const { scriptText, totalDuration } = req.body;
    if (!scriptText) {
      return res.status(400).json({ error: "Script text is required to generate subtitles." });
    }

    const systemPrompt = `You are an automated subtitler tool. 
Split the given text into an array of short, snappy, chronological subtitle segments with start and end times that span up to the total video duration of (${totalDuration || 30} seconds).
Each segment must look good on a social video (max 4-5 words per subtitle for punchy pacing).
Return your response STRICTLY as a JSON object matching this schema:
{
  "subtitles": [
    {
      "start": 0.0,
      "end": 2.5,
      "text": "Short subtitle text"
    }
  ]
}`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `Generate subtitles for this script: "${scriptText}" across ${totalDuration || 30} seconds.`,
      config: {
        systemInstruction: systemPrompt,
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          required: ["subtitles"],
          properties: {
            subtitles: {
              type: Type.ARRAY,
              items: {
                type: Type.OBJECT,
                required: ["start", "end", "text"],
                properties: {
                  start: { type: Type.NUMBER, description: "Start time in seconds" },
                  end: { type: Type.NUMBER, description: "End time in seconds" },
                  text: { type: Type.STRING }
                }
              }
            }
          }
        }
      }
    });

    const resultText = response.text;
    if (!resultText) {
      throw new Error("Empty response from AI engine");
    }

    const json = JSON.parse(resultText.trim());
    return res.json(json);
  } catch (error: any) {
    console.error("Error generating subtitles:", error);
    return res.status(500).json({ error: error.message || "Failed to generate AI subtitles." });
  }
});

// API Endpoint: Smart Video Assistant Chat & Ideas
app.post("/api/ai/chat", async (req, res) => {
  try {
    if (!ai) {
      return res.status(500).json({
        error: "Gemini API key is not configured. Please set it in Settings > Secrets.",
      });
    }

    const { message, activeProjectState } = req.body;
    if (!message) {
      return res.status(400).json({ error: "Message is required." });
    }

    const systemPrompt = `You are "AI Video Assistant", an intelligent creative copilot built directly into our web-based multi-track online video editor.
You can help the user:
1. Suggest viral video hook ideas, sound effects, subtitles styling.
2. Draft a script structure or voice instructions.
3. Suggest colour palettes (classic, noir, neon, pastel) and transition timings.
4. Recommend layout structures.
Provide professional, inspiring, short answers in beautifully styled Markdown. Keep it practical and action-oriented!`;

    const response = await ai.models.generateContent({
      model: "gemini-3.5-flash",
      contents: `User message: "${message}". Current project state context: ${JSON.stringify(activeProjectState || {})}`,
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return res.json({ reply: response.text });
  } catch (error: any) {
    console.error("AI Assistant Chat error:", error);
    return res.status(500).json({ error: error.message || "Failed to chat with AI Video Assistant." });
  }
});

// Setup Vite Dev Server / Production routing
async function startServer() {
  if (process.env.NODE_ENV !== "production") {
    const vite = await createViteServer({
      server: { middlewareMode: true },
      appType: "spa",
    });
    app.use(vite.middlewares);
  } else {
    const distPath = path.join(process.cwd(), "dist");
    app.use(express.static(distPath));
    app.get("*", (req, res) => {
      res.sendFile(path.join(distPath, "index.html"));
    });
  }

  app.listen(PORT, "0.0.0.0", () => {
    console.log(`Server running on http://localhost:${PORT} [NODE_ENV=${process.env.NODE_ENV || "development"}]`);
  });
}

startServer();
