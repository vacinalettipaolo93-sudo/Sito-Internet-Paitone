
import { GoogleGenAI } from "@google/genai";

const ai = new GoogleGenAI({ apiKey: process.env.API_KEY || '' });

const SYSTEM_PROMPT = `
Sei l'assistente virtuale del Paitone Sport Center.
Il centro si trova a Paitone, provincia di Brescia.
Disponiamo di:
- 2 campi da tennis in terreno veloce (hard court).
- 3 campi da padel coperti con tecnologia "Italian Padel".

Informazioni utili:
- Orari: Tutti i giorni dalle 08:00 alle 23:00.
- Prezzi: Tennis 15€/ora, Padel 40€/ora (pomeriggio/sera) o 32€/ora (mattina).
- Corsi: Organizziamo lezioni private e collettive sia per adulti che per bambini.
- Eventi: Organizziamo tornei TPRA e circuiti amatoriali.

Rispondi in modo cordiale, professionale e in italiano. Se l'utente chiede di prenotare, indirizzalo alla sezione "Prenota Ora".
`;

export async function askAssistant(question: string): Promise<string> {
  try {
    const response = await ai.models.generateContent({
      model: 'gemini-3-flash-preview',
      contents: question,
      config: {
        systemInstruction: SYSTEM_PROMPT,
        temperature: 0.7,
      },
    });
    return response.text || "Mi dispiace, non riesco a rispondere al momento.";
  } catch (error) {
    console.error("Gemini Error:", error);
    return "Si è verificato un errore nel contattare l'assistente.";
  }
}
