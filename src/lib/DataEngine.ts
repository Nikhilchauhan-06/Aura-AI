import { ai, MODELS } from "./gemini";
import { DashboardState } from "../types/dashboard";

/**
 * Aura Intelligence Engine
 * Uses Gemini to transform raw business data into executive insights.
 */
export async function analyzeBusinessData(csvData: string): Promise<DashboardState> {
  const prompt = `
    Analyze the following business data (CSV format) and provide a JSON response summarizing it for an executive dashboard.
    
    The response MUST be a valid JSON object matching the DashboardState interface:
    {
      "kpis": [
        { "label": "string", "value": "string or number", "change": "number (percentage)", "trend": "up | down | neutral" }
      ],
      "revenueData": [
        { "name": "string", "value": "number", "prevValue": "number (optional)" }
      ],
      "salesData": [
        { "name": "string", "value": "number" }
      ]
    }

    Data:
    ${csvData.substring(0, 5000)} // truncate if too large for prompt
  `;

  try {
    const response = await ai.models.generateContent({
      model: MODELS.flash,
      contents: prompt,
      config: {
        responseMimeType: "application/json",
      }
    });

    return JSON.parse(response.text);
  } catch (error) {
    console.error("Analysis Failed:", error);
    throw new Error("Aura failed to interpret the provided business data structure.");
  }
}
