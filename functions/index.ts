import express from "express";
import { onRequest } from "firebase-functions/v2/https";
import OpenAI from "openai";
import { defineSecret } from "firebase-functions/params";
import { createMainRouter } from "./routes";

const openaiApiKey = defineSecret("OPENAI_API_KEY");
const app = express();
let client: OpenAI | null = null;

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

exports.api = onRequest(
  {
    secrets: [openaiApiKey],
    memory: "2GiB",
    timeoutSeconds: 60,
  },
  async (req, res) => {
    const key = openaiApiKey.value();
    if (!client) {
      client = new OpenAI({ apiKey: key });
      // Register routers after client is initialized
      app.use("/", createMainRouter(client));
    }
    app(req, res);
  }
);
