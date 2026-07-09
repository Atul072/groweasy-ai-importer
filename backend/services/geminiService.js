const { GoogleGenAI } = require("@google/genai");
const crmPrompt = require("../prompts/crmPrompt");

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

async function mapCSVToCRM(rows) {
  try {

    console.log("\n========== SENDING DATA TO GEMINI ==========");
    console.log(rows);

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: crmPrompt(rows),
    });

    console.log("\n========== RAW GEMINI RESPONSE ==========");
    console.dir(response, { depth: null });

    let text = "";

    if (typeof response.text === "function") {
      text = await response.text();
    } else {
      text = response.text || "";
    }

    console.log("\n========== GEMINI TEXT ==========");
    console.log(text);

    return text;

  } catch (error) {

    console.log("\n========== GEMINI ERROR ==========");
    console.error(error);

    throw error;
  }
}

module.exports = {
  mapCSVToCRM,
};