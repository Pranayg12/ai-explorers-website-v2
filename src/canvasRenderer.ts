/**
 * @license
 * SPDX-License-Identifier: Apache-2.0
 */

import { Clip, ProjectAspectRatio } from "./types";

// Canvas default rendering dimensions (we render in HD bounds then scale/fit into container)
export const RENDER_WIDTH = 1280;
export const RENDER_HEIGHT = 720;

export function getAspectRatioDimensions(ratio: ProjectAspectRatio): { width: number; height: number } {
  switch (ratio) {
    case "16:9":
      return { width: 1280, height: 720 };
    case "9:16":
      return { width: 720, height: 1280 };
    case "1:1":
      return { width: 720, height: 720 };
    default:
      return { width: 1280, height: 720 };
  }
}

/**
 * Draws a gorgeous procedural neon grid (Cyberpunk style)
 */
function drawNeonGrid(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  ctx.fillStyle = "#0c0a0f"; // Deep space dark purple
  ctx.fillRect(0, 0, width, height);

  ctx.strokeStyle = "rgba(236, 72, 153, 0.45)"; // Hot Pink Glowing grid lines
  ctx.lineWidth = 2.5;

  // Horizon line (vanishing point at 40% height)
  const horizon = height * 0.45;
  
  // Draw vanishing perspective lines
  const linesCount = 20;
  for (let i = 0; i <= linesCount; i++) {
    const xRatio = i / linesCount;
    const startX = width * xRatio;
    // Vanishing point lines
    ctx.beginPath();
    ctx.moveTo(width / 2, horizon);
    ctx.lineTo(startX, height);
    ctx.stroke();
  }

  // Draw horizontal sliding lines (animated by time)
  const horizLines = 12;
  const speed = 0.05;
  const offset = (time * speed) % 1;
  ctx.strokeStyle = "rgba(6, 182, 212, 0.5)"; // Cyber cyan horizontal tracks

  for (let i = 0; i < horizLines; i++) {
    // Exponentially space horizontal lines for perspective
    const norm = (i + offset) / horizLines;
    const y = horizon + (height - horizon) * Math.pow(norm, 2.5);
    ctx.beginPath();
    ctx.moveTo(0, y);
    ctx.lineTo(width, y);
    ctx.stroke();
  }

  // Draw a synthwave vector sun rising
  ctx.beginPath();
  const sunRadius = Math.min(width, height) * 0.16;
  const sunX = width / 2;
  const sunY = horizon - 10;
  const gradient = ctx.createLinearGradient(sunX, sunY - sunRadius, sunX, sunY + sunRadius);
  gradient.addColorStop(0, "#f43f5e"); // Rose sun top
  gradient.addColorStop(0.5, "#f59e0b"); // Orange sun mid
  gradient.addColorStop(1, "#facc15"); // Golden sun bottom
  ctx.fillStyle = gradient;
  ctx.arc(sunX, sunY, sunRadius, Math.PI, 0, false);
  ctx.fill();

  // Draw neon lines over horizontal grid to add classic retro horizontal gaps
  ctx.fillStyle = "#0c0a0f";
  for (let y = sunY - sunRadius; y < sunY; y += 16) {
    const lineThickness = 3;
    ctx.fillRect(sunX - sunRadius - 5, y, sunRadius * 2 + 10, lineThickness);
  }
}

/**
 * Draws an interactive Deep Space Starfield
 */
function drawStarfield(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  ctx.fillStyle = "#020205"; // Total black
  ctx.fillRect(0, 0, width, height);

  // Draw glowing nebula clouds (radial gradient)
  const nebulaGradient = ctx.createRadialGradient(
    width * 0.3 + Math.sin(time * 0.01) * 100,
    height * 0.5,
    50,
    width * 0.3,
    height * 0.5,
    width * 0.6
  );
  nebulaGradient.addColorStop(0, "rgba(99, 102, 241, 0.18)"); // Indigo core
  nebulaGradient.addColorStop(0.5, "rgba(168, 85, 247, 0.08)"); // Purple halo
  nebulaGradient.addColorStop(1, "transparent");
  ctx.fillStyle = nebulaGradient;
  ctx.fillRect(0, 0, width, height);

  // Draw star dust
  ctx.fillStyle = "#ffffff";
  const starCount = 60;
  for (let i = 0; i < starCount; i++) {
    // Deterministic random positioning based on index
    const seedX = Math.sin(i * 45892.42) * 0.5 + 0.5;
    const seedY = Math.cos(i * 92837.11) * 0.5 + 0.5;
    const speed = (i % 3) + 1;
    const size = (i % 2) + 0.8;

    let x = (seedX * width + time * speed * 8) % width;
    let y = seedY * height;

    ctx.beginPath();
    ctx.arc(x, y, size, 0, Math.PI * 2);
    ctx.fill();
  }

  // Draw planet/comet
  ctx.beginPath();
  ctx.fillStyle = "rgba(14, 165, 233, 0.85)"; // Sky blue gas giant
  const planetX = width * 0.75 - time * 0.3;
  const planetY = height * 0.3;
  ctx.arc(planetX, planetY, 32, 0, Math.PI * 2);
  ctx.fill();

  // Ring around planet
  ctx.beginPath();
  ctx.strokeStyle = "rgba(14, 165, 233, 0.4)";
  ctx.lineWidth = 4;
  ctx.ellipse(planetX, planetY, 55, 12, Math.PI / 10, 0, Math.PI * 2);
  ctx.stroke();
}

/**
 * Draws liquid purple flow
 */
function drawLiquidPurple(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  const gradient = ctx.createLinearGradient(0, 0, width, height);
  // Animate dynamic color tones
  const phase1 = Math.floor((time * 5) % 360);
  gradient.addColorStop(0, `hsl(${(280 + phase1) % 360}, 80%, 15%)`);
  gradient.addColorStop(0.5, `hsl(${(320 + phase1 / 2) % 360}, 90%, 25%)`);
  gradient.addColorStop(1, `hsl(${(240 - phase1) % 360}, 75%, 10%)`);
  ctx.fillStyle = gradient;
  ctx.fillRect(0, 0, width, height);

  ctx.fillStyle = "rgba(255, 255, 255, 0.12)";
  for (let i = 0; i < 8; i++) {
    const scale = 80 + i * 20;
    const x = width / 2 + Math.sin(time * 0.4 + i) * (width * 0.35);
    const y = height / 2 + Math.cos(time * 0.3 - i) * (height * 0.35);
    ctx.beginPath();
    ctx.arc(x, y, scale, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Draws a gorgeous Matrix Code stream falling down
 */
function drawMatrixRain(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  ctx.fillStyle = "rgba(0, 0, 5, 0.95)";
  ctx.fillRect(0, 0, width, height);

  ctx.font = "bold 16px monospace";
  const columns = Math.floor(width / 20);

  for (let col = 0; col < columns; col++) {
    const speed = (Math.sin(col * 9382) * 0.5 + 0.5) * 12 + 6;
    const startY = (time * speed * 25) % (height + 200) - 200;
    
    // Draw columns of characters falling down
    const length = 15;
    for (let charIdx = 0; charIdx < length; charIdx++) {
      const charY = startY - charIdx * 16;
      if (charY < 0 || charY > height) continue;

      // Bright white for head, fading green for tail
      if (charIdx === 0) {
        ctx.fillStyle = "#ffffff";
      } else {
        const opacity = 1 - charIdx / length;
        ctx.fillStyle = `rgba(34, 197, 94, ${opacity})`; // Tailwind green-500
      }

      // Generate random binary state or code
      const codeVal = Math.sin(col * 50 + charIdx * 200 + Math.floor(time * 5)) > 0 ? "1" : "0";
      ctx.fillText(codeVal, col * 20 + 4, charY);
    }
  }
}

/**
 * Draws sunset golden clouds moving slowly
 */
function drawSunsetClouds(ctx: CanvasRenderingContext2D, width: number, height: number, time: number) {
  // Sunset sky gradient
  const skyGrad = ctx.createLinearGradient(0, 0, 0, height);
  skyGrad.addColorStop(0, "#4a1236"); // Deep plum twilight
  skyGrad.addColorStop(0.4, "#921345"); // Burgundy mid
  skyGrad.addColorStop(0.7, "#fb7185"); // Rose blush
  skyGrad.addColorStop(1, "#fed7aa"); // Golden sunset peach
  ctx.fillStyle = skyGrad;
  ctx.fillRect(0, 0, width, height);

  // Draw giant glowing warm sun
  ctx.beginPath();
  const sunX = width * 0.5;
  const sunY = height * 0.7;
  const sunRadius = Math.min(width, height) * 0.25;
  const sunGrad = ctx.createRadialGradient(sunX, sunY, 0, sunX, sunY, sunRadius);
  sunGrad.addColorStop(0, "rgba(254, 240, 138, 0.95)"); // Bright white yellow center
  sunGrad.addColorStop(0.3, "rgba(249, 115, 22, 0.6)"); // Soft orange mid
  sunGrad.addColorStop(1, "rgba(244, 63, 94, 0)"); // Fading halo
  ctx.fillStyle = sunGrad;
  ctx.arc(sunX, sunY, sunRadius, 0, Math.PI * 2);
  ctx.fill();

  // Draw slow horizontal cloud silhouettes
  const cloudCount = 6;
  ctx.fillStyle = "rgba(74, 18, 54, 0.35)"; // Overlay cloud structures
  for (let i = 0; i < cloudCount; i++) {
    const cloudSpeed = (i % 2 === 0 ? 1 : -1) * (10 + (i * 3));
    const cloudWidth = 350 + (i * 50);
    const cloudHeight = 70 + (i * 15);
    
    // Slowly cycle cloud positions
    const xPos = ((time * cloudSpeed + (i * 401)) % (width + cloudWidth)) - cloudWidth;
    const yPos = height * 0.4 + i * 40;

    // Drawing flat billowy round clouds
    ctx.beginPath();
    ctx.ellipse(xPos, yPos, cloudWidth, cloudHeight, 0, 0, Math.PI * 2);
    ctx.fill();
  }
}

/**
 * Primary Video compositor
 */
export function drawFrame(
  canvas: HTMLCanvasElement,
  playhead: number,
  clips: Clip[],
  aspectRatio: ProjectAspectRatio,
  selectedClipId: string | null,
  videoElementsRef: { current: { [id: string]: HTMLVideoElement } }
) {
  const ctx = canvas.getContext("2d", { willReadFrequently: true });
  if (!ctx) return;

  const { width, height } = getAspectRatioDimensions(aspectRatio);
  canvas.width = width;
  canvas.height = height;

  // 1. BASE CANVAS BACKDROP GREETING
  ctx.fillStyle = "#111827"; // Dark gray base slate
  ctx.fillRect(0, 0, width, height);

  // 2. DETECT ACTIVE VIDEO CLIPS
  // Filter clips sorted by track index so highest media overlays on top
  const activeVideoClips = clips
    .filter(c => c.type === "video" && playhead >= c.startTime && playhead <= c.startTime + c.duration)
    .sort((a, b) => a.trackIndex - b.trackIndex);

  if (activeVideoClips.length === 0) {
    // No active visual, draw a beautiful minimalist placeholder indicator
    ctx.fillStyle = "rgba(255, 255, 255, 0.2)";
    ctx.font = "24px sans-serif";
    ctx.textAlign = "center";
    ctx.textBaseline = "middle";
    ctx.fillText("No Active Visual Clip", width / 2, height / 2);
    ctx.font = "14px monospace";
    ctx.fillText(`Playhead: ${playhead.toFixed(2)}s | Aspect: ${aspectRatio}`, width / 2, height / 2 + 40);
  } else {
    // Iterate and draw active video cards
    for (const clip of activeVideoClips) {
      ctx.save();

      // Implement crop/render filters (grayscale, vintage, sepia, inverter, blur, cold, etc.)
      switch (clip.filter) {
        case "grayscale":
          ctx.filter = "grayscale(100%)";
          break;
        case "sepia":
          ctx.filter = "sepia(80%)";
          break;
        case "vintage":
          ctx.filter = "sepia(50%) hue-rotate(-30deg) saturate(140%) contrast(90%)";
          break;
        case "monochrome":
          ctx.filter = "grayscale(100%) contrast(150%) brightness(95%)";
          break;
        case "cold":
          ctx.filter = "hue-rotate(30deg) saturate(85%) contrast(105%)";
          break;
        case "invert":
          ctx.filter = "invert(100%)";
          break;
        case "blur":
          ctx.filter = "blur(8px)";
          break;
        default:
          ctx.filter = "none";
      }

      // Check if there is an loaded/playing real HTMLVideoElement
      const realVideoElement = videoElementsRef.current[clip.id];
      const isRealVideoReady = realVideoElement && realVideoElement.readyState >= 1;

      const clipTimeElapsed = playhead - clip.startTime;
      const playbackProgressTime = clipTimeElapsed * clip.speed;

      // Transition effects state parameters
      let transitionWhiteFlash = 0;
      let transitionFadeToBlack = 0;

      if (clip.transition && clip.transition !== "none") {
        const transDur = 1.0;
        if (clipTimeElapsed < transDur) {
          const t = clipTimeElapsed / transDur;
          switch (clip.transition) {
            case "fade_in":
            case "cross_dissolve":
              ctx.globalAlpha *= t;
              break;
            case "slide_up": {
              const yOffset = height * (1 - t);
              ctx.translate(0, yOffset);
              break;
            }
            case "slide_down": {
              const yOffset = -height * (1 - t);
              ctx.translate(0, yOffset);
              break;
            }
            case "wipe_left": {
              ctx.beginPath();
              ctx.rect(0, 0, width * t, height);
              ctx.clip();
              break;
            }
            case "zoom_in": {
              ctx.translate(width / 2, height / 2);
              ctx.scale(t, t);
              ctx.translate(-width / 2, -height / 2);
              break;
            }
            case "blur_flash": {
              const blurAmt = (1 - t) * 35;
              ctx.filter = ctx.filter === "none" ? `blur(${blurAmt}px)` : `${ctx.filter} blur(${blurAmt}px)`;
              transitionWhiteFlash = 1 - t;
              break;
            }
            case "dip_black": {
              transitionFadeToBlack = 1 - t;
              break;
            }
            case "dip_white": {
              transitionWhiteFlash = 1 - t;
              break;
            }
            case "spin_cut": {
              ctx.translate(width / 2, height / 2);
              ctx.rotate((1 - t) * Math.PI);
              ctx.scale(t, t);
              ctx.translate(-width / 2, -height / 2);
              break;
            }
          }
        }
      }

      if (isRealVideoReady) {
        // Seek real video element to align strictly with composite timelines
        const targetTime = playbackProgressTime % realVideoElement.duration;
        if (Math.abs(realVideoElement.currentTime - targetTime) > 0.45) {
          realVideoElement.currentTime = targetTime;
        }

        // Compost visual mapping onto main frame
        ctx.drawImage(realVideoElement, 0, 0, width, height);
      } else {
        // Run procedural math fallback engine based on clip ID triggers or categories
        if (clip.id.includes("neon-grid") || clip.name.toLowerCase().includes("neon") || clip.name.toLowerCase().includes("cyber")) {
          drawNeonGrid(ctx, width, height, playbackProgressTime);
        } else if (clip.id.includes("starfield") || clip.name.toLowerCase().includes("space") || clip.name.toLowerCase().includes("star")) {
          drawStarfield(ctx, width, height, playbackProgressTime);
        } else if (clip.id.includes("abstract") || clip.name.toLowerCase().includes("wave") || clip.name.toLowerCase().includes("fluid")) {
          drawLiquidPurple(ctx, width, height, playbackProgressTime);
        } else if (clip.id.includes("matrix") || clip.name.toLowerCase().includes("code")) {
          drawMatrixRain(ctx, width, height, playbackProgressTime);
        } else if (clip.id.includes("clouds") || clip.name.toLowerCase().includes("sunset") || clip.name.toLowerCase().includes("nature")) {
          drawSunsetClouds(ctx, width, height, playbackProgressTime);
        } else {
          // General gradient fallback as ultimate protection
          const fallGrad = ctx.createLinearGradient(0, 0, width, height);
          fallGrad.addColorStop(0, "#1e3a8a");
          fallGrad.addColorStop(1, "#1e1b4b");
          ctx.fillStyle = fallGrad;
          ctx.fillRect(0, 0, width, height);

          // Draw an elegant pulsing waveform representing the loading asset
          ctx.strokeStyle = "rgba(99, 102, 241, 0.4)";
          ctx.lineWidth = 4;
          ctx.beginPath();
          for (let x = 0; x < width; x += 10) {
            const y = height / 2 + Math.sin(x * 0.008 + playbackProgressTime * 4) * 60;
            if (x === 0) ctx.moveTo(x, y);
            else ctx.lineTo(x, y);
          }
          ctx.stroke();

          ctx.fillStyle = "rgba(255, 255, 255, 0.85)";
          ctx.font = "italic 28px Georgia, serif";
          ctx.textAlign = "center";
          ctx.fillText(clip.name, width / 2, height / 2);
        }
      }

      // Draw transition overlays before restoring
      if (transitionWhiteFlash > 0) {
        ctx.fillStyle = `rgba(255, 255, 255, ${transitionWhiteFlash})`;
        ctx.fillRect(0, 0, width, height);
      }
      if (transitionFadeToBlack > 0) {
        ctx.fillStyle = `rgba(0, 0, 0, ${transitionFadeToBlack})`;
        ctx.fillRect(0, 0, width, height);
      }

      ctx.restore();

      // Draw active yellow highlight boundary index if user selected this visual clip
      if (selectedClipId === clip.id) {
        ctx.strokeStyle = "#facc15"; // yellow-400
        ctx.lineWidth = 10;
        ctx.strokeRect(5, 5, width - 10, height - 10);
      }
    }
  }

  // 3. DRAW ACTIVE TEXT OVERLAYS / SUBTITLES
  const activeTextClips = clips
    .filter(c => c.type === "text" && playhead >= c.startTime && playhead <= c.startTime + c.duration && c.text)
    .sort((a, b) => a.trackIndex - b.trackIndex);

  for (const textClip of activeTextClips) {
    if (!textClip.text) continue;

    ctx.save();

    // Default template styles fallback if some fields are missing
    const style = {
      fontSize: 28,
      color: "#ffffff",
      backgroundColor: "transparent",
      outlineColor: "transparent",
      outlineWidth: 0,
      positionX: 50,
      positionY: 80,
      align: "center" as const,
      animation: "none",
      ...textClip.textStyle
    };

    // Calculate actual pixel coordinates
    const posX = (style.positionX / 100) * width;
    const posY = (style.positionY / 100) * height;

    // Font family styling selections (we can expand fonts in css imports)
    ctx.font = `bold ${style.fontSize}px sans-serif`;
    ctx.textAlign = style.align;
    ctx.textBaseline = "middle";

    // Split text into lines to support newline separators
    const lines = textClip.text.split("\n");
    const lineHeight = style.fontSize * 1.35;
    const totalBlockHeight = lines.length * lineHeight;

    // 1. Precalculate maximum width for rendering background container shield
    let maxLineWidth = 0;
    for (const line of lines) {
      const lineLen = ctx.measureText(line).width;
      if (lineLen > maxLineWidth) maxLineWidth = lineLen;
    }

    // 2. Render background block shield if transparency isn't set
    if (style.backgroundColor && style.backgroundColor !== "transparent") {
      ctx.fillStyle = style.backgroundColor;
      const padX = style.fontSize * 0.8;
      const padY = style.fontSize * 0.4;

      const rectWidth = maxLineWidth + padX * 2;
      const rectHeight = totalBlockHeight + padY * 2;

      let rectX = posX - rectWidth / 2;
      if (style.align === "left") rectX = posX - padX;
      else if (style.align === "right") rectX = posX - rectWidth + padX;

      const rectY = posY - rectHeight / 2;

      // Draw rounded rectangle for text background shield
      const radius = 8;
      ctx.beginPath();
      ctx.moveTo(rectX + radius, rectY);
      ctx.lineTo(rectX + rectWidth - radius, rectY);
      ctx.quadraticCurveTo(rectX + rectWidth, rectY, rectX + rectWidth, rectY + radius);
      ctx.lineTo(rectX + rectWidth, rectY + rectHeight - radius);
      ctx.quadraticCurveTo(rectX + rectWidth, rectY + rectHeight, rectX + rectWidth - radius, rectY + rectHeight);
      ctx.lineTo(rectX + radius, rectY + rectHeight);
      ctx.quadraticCurveTo(rectX, rectY + rectHeight, rectX, rectY + rectHeight - radius);
      ctx.lineTo(rectX, rectY + radius);
      ctx.quadraticCurveTo(rectX, rectY, rectX + radius, rectY);
      ctx.closePath();
      ctx.fill();
    }

    // 3. Render drop-shadow / outer outlines
    const textClipTimeElapsed = playhead - textClip.startTime;

    // Apply animation translation / micro scale triggers
    let animatedYOffset = 0;
    let animatedOpacity = 1;
    let animatedScale = 1;

    if (style.animation === "fade") {
      // Fade in over first 0.3s
      if (textClipTimeElapsed < 0.35) {
        animatedOpacity = textClipTimeElapsed / 0.35;
      }
    } else if (style.animation === "slide") {
      // Slide up from bottom over first 0.4s
      if (textClipTimeElapsed < 0.4) {
        const factor = 1 - (textClipTimeElapsed / 0.4);
        animatedYOffset = factor * 40;
        animatedOpacity = textClipTimeElapsed / 0.4;
      }
    } else if (style.animation === "scale") {
      // Bounce scale in over first 0.3s
      if (textClipTimeElapsed < 0.3) {
        const factor = textClipTimeElapsed / 0.3;
        animatedScale = 0.5 + Math.sin(factor * Math.PI / 2) * 0.65;
      }
    }

    ctx.translate(posX, posY + animatedYOffset);
    ctx.scale(animatedScale, animatedScale);
    ctx.globalAlpha = animatedOpacity;

    // Draw text lines
    lines.forEach((lineText, lineIdx) => {
      // Pacing calculate for typewriter animation
      let renderedText = lineText;
      if (style.animation === "typewriter") {
        const lettersCount = Math.floor(textClipTimeElapsed * 15);
        renderedText = lineText.slice(0, Math.max(0, lettersCount));
      }

      // Compute relative Y coordinate offsets
      const lineYOffset = (lineIdx - (lines.length - 1) / 2) * lineHeight;

      // Draw background stroke outline first
      if (style.outlineWidth > 0 && style.outlineColor && style.outlineColor !== "transparent") {
        ctx.strokeStyle = style.outlineColor;
        ctx.lineWidth = style.outlineWidth;
        ctx.lineJoin = "round";
        ctx.strokeText(renderedText, 0, lineYOffset);
      }

      // Draw primary text
      ctx.fillStyle = style.color;
      ctx.fillText(renderedText, 0, lineYOffset);
    });

    ctx.restore();

    // Secondary editing border highlight index if user selected this text clip
    if (selectedClipId === textClip.id) {
      ctx.save();
      ctx.strokeStyle = "#a855f7"; // purple-500 text selections
      ctx.lineWidth = 3;
      ctx.setLineDash([5, 5]);
      // Approximate bounding outline
      const pad = 12;
      const bW = maxLineWidth + pad * 2;
      const bH = totalBlockHeight + pad * 2;
      let bX = posX - bW / 2;
      if (style.align === "left") bX = posX;
      else if (style.align === "right") bX = posX - bW;
      
      ctx.strokeRect(bX, posY - bH / 2, bW, bH);
      ctx.restore();
    }
  }

  // 4. WATERMARK / BRANDING LOGO (To make it look extremely premium like a production editor)
  ctx.save();
  ctx.fillStyle = "rgba(255, 255, 255, 0.4)";
  ctx.font = "bold 13px system-ui";
  ctx.textAlign = "right";
  ctx.fillText("AI STUDIO BUILD", width - 20, 25);
  ctx.restore();
}
