import { GoogleGenAI, Type } from "@google/genai";
import { AiInsights } from "../types";

const apiKey = process.env.API_KEY || '';

// Initialize client only if key exists to avoid immediate errors, though functionality will be limited without it.
const ai = apiKey ? new GoogleGenAI({ apiKey }) : null;

export const fetchAgeInsights = async (year: number, age: number): Promise<AiInsights> => {
  if (!ai) {
    throw new Error("API Key is missing");
  }

  const prompt = `
    Berikan saya satu fakta sejarah menarik dan positif yang terjadi pada tahun ${year} di dunia (terjemahkan ke Bahasa Indonesia).
    Juga berikan satu kutipan inspiratif pendek untuk seseorang yang berumur ${age} tahun agar semangat menjalani hidup.
    Output harus dalam JSON yang valid.
  `;

  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            historicalFact: {
              type: Type.STRING,
              description: "Fakta sejarah menarik dari tahun kelahiran",
            },
            inspirationalQuote: {
              type: Type.STRING,
              description: "Kutipan inspiratif untuk umur tersebut",
            },
          },
          required: ["historicalFact", "inspirationalQuote"],
        },
      },
    });

    if (response.text) {
      return JSON.parse(response.text) as AiInsights;
    }
    
    throw new Error("No data returned");
  } catch (error) {
    console.error("Gemini API Error:", error);
    throw error;
  }
};