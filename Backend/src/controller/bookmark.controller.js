import axios from "axios";
import { GoogleGenAI } from "@google/genai";
import dotenv from "dotenv"
import { Bookmarks } from "../models/bookmarks.models.js";
dotenv.config()

// google genai setup for summary
const ai = new GoogleGenAI({
  apiKey:
    process.env.GEMINI_API_KEY
});


// getting data from URL
export const getDataOfSite = async (req, res) => {

  const { link } = req.body;
  try {
    const headers = {
      Accept: "application/json",
      "X-Retain-Images": "none",
    };

    const response = await axios.get(`https://r.jina.ai/${link}`, { headers });
    const summary = await getSummary(response?.data?.data);
    const favicon = getFavicon(link);
    const { title, description, url } = response?.data?.data;

    const bookmark = new Bookmarks({
      user: req.userID,
      title,
      description,
      url,
      summary: summary,
      favicon: favicon,
    });

    await bookmark.save()

    return res.status(201).json(bookmark);
  } catch (error) {
    console.log("error while fetching ", error);
  }
};

async function getFavicon(url) {
  // extracting favicon
  try {
    const parsed = new URL(url);
    const faviconUrl = `${parsed.origin}/favicon.ico`;
    
    // Verify favicon exists before returning
    await axios.head(faviconUrl, { timeout: 1000 });
    return faviconUrl;
  } catch {
    return `https://www.google.com/s2/favicons?domain=${new URL(url).hostname}`;
  }
}

export async function getSummary({ description, title, url, content }) {
  const trimmedContent = content?.slice(0, 1000); 
  const systemPrompt = `You are a helpful summarizes that takes description of a link and make a summary for it and give it to users 
  the format of the summary should be text
  
  Rules : 
  -- Give a 2 or 3 sentence summary for based on description, title and the url given to you
  `;

  const fullPrompt = `Description: ${description}\nTitle: ${title}\nURL: ${url}\n CONTENT : ${trimmedContent}\nProvide a summary based on the above information.`;

  try {
    // Implement SUMMARIZATION USING GEMEINI
    const response = await ai.models.generateContent({
      model: "gemini-2.0-flash",
      contents: [{ role: "user", parts: [{ text: fullPrompt }] }],
      config: {
        systemInstruction: systemPrompt,
      },
    });

    return response.text;
  } catch (error) {
    console.error("Error:", error.message);
    throw error;
  }
}
