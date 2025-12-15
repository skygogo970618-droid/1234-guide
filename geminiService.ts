import { GoogleGenAI, Type } from "@google/genai";
import { Category, AnalysisResult } from '../types';
import { DOLLS, FALLBACK_CONTENT } from '../constants';

const getClient = () => {
  const apiKey = process.env.API_KEY;
  if (!apiKey) {
    return null;
  }
  return new GoogleGenAI({ apiKey });
};

// Helper to timeout a promise
const timeoutPromise = (ms: number) => new Promise<never>((_, reject) => 
  setTimeout(() => reject(new Error("Timeout")), ms)
);

export const generateConsultation = async (
  scores: Record<Category, number>,
  dominantCategory: Category
): Promise<AnalysisResult> => {
  const fallback = FALLBACK_CONTENT[dominantCategory];
  const defaultResult: AnalysisResult = {
    dominantCategory,
    scores,
    advice: fallback.advice,
    actionItems: fallback.actionItems
  };

  try {
    const ai = getClient();
    
    // If no API key is present, return the high-quality fallback immediately
    if (!ai) {
      console.warn("API Key missing, using offline fallback.");
      return defaultResult;
    }
    
    const dominantDoll = DOLLS[dominantCategory];
    
    const prompt = `
      你現在是「拾心所」的首席心理諮商師。這是一個溫暖、治癒的線上諮商所。
      用戶剛完成了一項心理測驗，主要針對四種現代文明病：
      1. Appearance (容貌焦慮)
      2. Phone (手機成癮)
      3. PeoplePleaser (討好型)
      4. Perfectionist (完美主義)

      用戶的測驗得分如下 (滿分是該類別題數 * 5)：
      ${JSON.stringify(scores)}

      用戶最嚴重的問題是：${dominantDoll.name} (${dominantDoll.description})。

      請根據這些數據，為用戶生成一份溫柔、有洞察力且具體的諮商報告。
      
      語氣要求：
      - 極度溫柔、療癒、像是在與老朋友談心。
      - 充滿同理心，不要說教。
      - 使用繁體中文 (Traditional Chinese)。

      請按照以下 JSON 格式回傳：
      {
        "advice": "一段約 150-200 字的溫暖開導話語，針對他們最嚴重的問題，解開他們的心結。",
        "actionItems": ["三個具體、簡單、今天就能開始做的小練習或建議，每個約 20 字"]
      }
    `;

    // Race the API call against a 15-second timeout (increased from 5s) to ensure reliability
    const response = await Promise.race([
      ai.models.generateContent({
        model: 'gemini-2.5-flash',
        contents: prompt,
        config: {
          responseMimeType: 'application/json',
          responseSchema: {
            type: Type.OBJECT,
            properties: {
              advice: { type: Type.STRING },
              actionItems: {
                type: Type.ARRAY,
                items: { type: Type.STRING }
              }
            }
          }
        }
      }),
      timeoutPromise(15000) // 15 seconds max wait time
    ]) as any; // Cast to any because race types are tricky with genai types

    const text = response.text;
    if (!text) throw new Error("No response from Gemini");

    const parsed = JSON.parse(text);

    return {
      dominantCategory,
      scores,
      advice: parsed.advice,
      actionItems: parsed.actionItems || fallback.actionItems,
    };

  } catch (error) {
    console.error("Gemini API Error or Timeout:", error);
    // If timeout or error, return the default (fallback) immediately
    return defaultResult;
  }
};