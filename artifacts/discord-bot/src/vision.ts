import { GoogleGenAI } from "@google/genai";
import fetch from "node-fetch";

const ai = new GoogleGenAI({
  apiKey: process.env.AI_INTEGRATIONS_GEMINI_API_KEY!,
  httpOptions: {
    apiVersion: "",
    baseUrl: process.env.AI_INTEGRATIONS_GEMINI_BASE_URL,
  },
});

const VISION_MODEL = "gemini-2.5-flash";

export interface ImageData {
  buffer: Buffer;
  mimeType: string;
}

export async function downloadImage(url: string): Promise<ImageData> {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Görsel indirilemedi: HTTP ${res.status}`);
  const contentType = res.headers.get("content-type") || "image/png";
  const mimeType = contentType.split(";")[0].trim();
  const buffer = Buffer.from(await res.arrayBuffer());
  return { buffer, mimeType };
}

export async function analyzeImageWithGemini(
  images: ImageData[],
  prompt: string
): Promise<string> {
  const imageParts = images.map((img) => ({
    inlineData: {
      mimeType: img.mimeType,
      data: img.buffer.toString("base64"),
    },
  }));

  const response = await ai.models.generateContent({
    model: VISION_MODEL,
    contents: [
      {
        role: "user",
        parts: [...imageParts, { text: prompt }],
      },
    ],
    config: {
      systemInstruction:
        "Sen BasurAi adlı Türkçe konuşan bir Discord botusun. " +
        "Görselleri Türkçe olarak detaylı, anlaşılır biçimde yanıtla. Discord markdown formatını kullan (**kalın**, *italic*, > alıntı). " +
        "Kullanıcı belirli bir soru sorduysa onu yanıtla. Soru yoksa görseli tam anlamıyla ve detaylıca tanımla. " +
        "Nesne, renk, mekan, metin, kişi, araç, hayvan — ne varsa belirt.",
      maxOutputTokens: 2048,
      temperature: 0.4,
    },
  });

  return response.text ?? "Görseli analiz edemedim.";
}

export async function removeImageBackground(imageUrl: string): Promise<Buffer> {
  const { removeBackground } = await import("@imgly/background-removal-node");
  const resultBlob = await removeBackground(imageUrl);
  const arrayBuffer = await resultBlob.arrayBuffer();
  return Buffer.from(arrayBuffer);
}

export function isBackgroundRemovalRequest(text: string): boolean {
  const lower = text.toLowerCase();
  return [
    "arka plan sil",
    "arka planı sil",
    "arka planını sil",
    "arka plan kaldır",
    "arka planı kaldır",
    "arka planını kaldır",
    "arkaplan sil",
    "arkaplanı sil",
    "background sil",
    "background kaldır",
    "bg sil",
    "bg kaldır",
    "şeffaf yap",
    "transparan yap",
    "şeffafa çevir",
    "remove background",
    "remove bg",
    "arkaplanı kaldır",
  ].some((kw) => lower.includes(kw));
}
