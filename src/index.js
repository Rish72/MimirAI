import express from "express";
import dotenv from "dotenv";
import { getDataOfSite, getSummary } from "./controller/controller.js";

dotenv.config();
const app = express();
app.use(express.json());


console.log("PORT ",process.env.PORT);

// Usage in Express
app.get("/summarize", async (req, res) => {
  try {
    const summary = await getSummary(req.query.url);
    res.json({ summary });
  } catch (error) {
    res.status(500).json({ error: "Failed to generate summary" });
  }
});

app.post("/fetch-data", getDataOfSite);

app.listen(3000, () => {
  console.log("LISTENING");
});
