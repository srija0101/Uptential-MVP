import { GoogleGenAI, Type } from "@google/genai";
import { AmbitionAnalysis } from '../types';

// Use process.env.API_KEY directly for initialization as per guidelines
const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });

export const analyzeAmbition = async (name: string, ambition: string, bio: string): Promise<AmbitionAnalysis> => {
  if (!process.env.API_KEY) {
    console.warn("No API Key provided for Gemini.");
    // Update fallback to match AmbitionAnalysis interface
    return {
      score: 85,
      summary: "Simulation (No API Key): This ambition shows strong market fit but requires significant capital execution.",
      riskFactors: ["High competition", "Execution risk"],
      bullCase: "If successful, could disrupt the local market significantly."
    };
  }

  try {
    const prompt = `
      Analyze the investment potential of this person's ambition based on the following profile:
      Name: ${name}
      Ambition: ${ambition}
      Bio: ${bio}

      Act as a Venture Capital Analyst. Be critical but fair. 
      Return a JSON object with a score (1-100), a short summary (max 2 sentences), 3 key risk factors, and a "bull case" scenario.
    `;

    // Use 'gemini-3-pro-preview' for complex analysis tasks
    const response = await ai.models.generateContent({
      model: 'gemini-3-pro-preview',
      contents: prompt,
      config: {
        responseMimeType: "application/json",
        responseSchema: {
          type: Type.OBJECT,
          properties: {
            score: { type: Type.NUMBER },
            summary: { type: Type.STRING },
            riskFactors: { 
              type: Type.ARRAY,
              items: { type: Type.STRING }
            },
            bullCase: { type: Type.STRING }
          },
          required: ["score", "summary", "riskFactors", "bullCase"]
        }
      }
    });

    const text = response.text;
    if (!text) throw new Error("No response from AI");
    
    return JSON.parse(text) as AmbitionAnalysis;

  } catch (error) {
    console.error("Gemini Analysis Error:", error);
    // Fallback updated to match AmbitionAnalysis interface
    return {
      score: 50,
      summary: "AI Analysis unavailable currently. Proceed with caution.",
      riskFactors: ["Data unavailable"],
      bullCase: "Unknown upside."
    };
  }
};

export const refineAmbition = async (rawAmbition: string): Promise<string> => {
    if (!process.env.API_KEY) return rawAmbition + " (Refined)";

    try {
        // Use 'gemini-3-flash-preview' for basic text refinement tasks
        const response = await ai.models.generateContent({
            model: 'gemini-3-flash-preview',
            contents: `Rewrite this ambition statement to be more punchy, inspiring, and investable for a token launch. Keep it under 20 words. Original: "${rawAmbition}"`
        });
        return response.text || rawAmbition;
    } catch (e) {
        return rawAmbition;
    }
}