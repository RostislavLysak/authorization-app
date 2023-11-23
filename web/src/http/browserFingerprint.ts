"use client";

async function generateBrowserFingerprint() {
  let fingerprint = "";

  // User Agent
  fingerprint += navigator.userAgent;

  // Screen Resolution
  fingerprint += window.screen.width + "x" + window.screen.height;

  // Available Screen Height and Width
  fingerprint += window.screen.availWidth + "x" + window.screen.availHeight;

  // Timezone Offset
  fingerprint += new Date().getTimezoneOffset();

  // Language
  fingerprint += navigator.language;

  // Canvas Fingerprint
  fingerprint += await getCanvasFingerprint();

  // Audio Fingerprint
  fingerprint += await getAudioFingerprint();

  // WebGL Vendor and Renderer
  fingerprint += await getWebGLInfo();

  // Font Enumeration
  fingerprint += await getFonts();

  // Other attributes can be added based on your requirements.

  return fingerprint;
}

async function getCanvasFingerprint() {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  // @ts-ignore
  const data = gl ? gl.getParameter(gl.UNMASKED_RENDERER_WEBGL) : "";
  return data;
}

async function getAudioFingerprint() {
  try {
    const audioContext = new (window.AudioContext ||
      // @ts-ignore
      window.webkitAudioContext)();
    const oscillator = audioContext.createOscillator();
    const analyser = audioContext.createAnalyser();
    oscillator.connect(analyser);
    analyser.connect(audioContext.destination);
    oscillator.start();
    const buffer = new Uint8Array(analyser.frequencyBinCount);
    analyser.getByteFrequencyData(buffer);
    oscillator.stop();
    return buffer.join(",");
  } catch (err) {
    return "";
  }
}

async function getWebGLInfo() {
  const canvas = document.createElement("canvas");
  const gl = canvas.getContext("webgl");
  const data = gl ? gl.getParameter(gl.VENDOR) + gl.getParameter(gl.RENDERER) : "";
  return data;
}

async function getFonts() {
  const fonts = [];
  const fontList = [
    "monospace",
    "sans-serif",
    "serif",
    "cursive",
    "fantasy",
    "system-ui",
    "emoji",
    "math",
    "fangsong",
  ];
  const testString = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
  for (const font of fontList) {
    ctx.font = "12px " + font;
    const width = ctx.measureText(testString).width;
    fonts.push(font + "-" + width);
  }
  return fonts.join(",");
}

async function hashStringToSHA256(string: string, length = 36) {
  const encoder = new TextEncoder();
  const data = encoder.encode(string);
  const hashBuffer = crypto?.subtle?.digest ? await crypto.subtle.digest("SHA-256", data) : data;
  const hashArray = Array.from(new Uint8Array(hashBuffer));
  const hashHex = hashArray.map((byte) => byte.toString(16).padStart(2, "0")).join("");
  return hashHex.substring(0, length); // Truncate to desired length
}

async function browserFingerprint() {
  const fingerprint = await generateBrowserFingerprint();
  const hashedFingerprint = await hashStringToSHA256(fingerprint);

  return hashedFingerprint;
}

export default browserFingerprint;
