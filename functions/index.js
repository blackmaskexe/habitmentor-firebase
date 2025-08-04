const express = require("express");
const { onRequest } = require("firebase-functions/v2/https");
const OpenAI = require("openai");
const chatResponseSchema = require("./models/chatResponseSchema");

const { defineSecret } = require("firebase-functions/params");
const openaiApiKey = defineSecret("OPENAI_API_KEY");

const app = express();

let client = null;

// Middlewares:
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Create a router:
const router = express.Router();

// Define routes within the /habit-mentor router:
router.get("/test", (req, res, _) => {
  res.json({
    working: true,
  });
});

router.post("/chat", async (req, res, _) => {
  const userData = req.body;
  console.log("Sneaky text message siphon", req.body);

  const response = await client.responses.create({
    model: "gpt-4.1-nano-2025-04-14",
    input: [{ role: "user", content: JSON.stringify(userData) }],
    tools: chatResponseSchema, // schema for structured AI response with function calling
  });

  let args = null;
  console.log(response);

  if ("arguments" in response.output[0]) {
    // the function calling is showing correct behavior
    args = JSON.parse(response.output[0].arguments);
  } else {
    // in cases where the function calling fails, returns an unusual output (but it is the same kind of format each time it fails so can catch that exception)
    args = {
      response: response.output_text,
      importantMessage: false,
      actionableSteps: [],
    };
  }
  res.json({
    response: args.response,
    importantMessage: args.importantMessage,
    actionableSteps: args.actionableSteps,
  });
});

router.post("/pro-active", async (req, res, _) => {
  const userData = req.body;
  console.log("Sneaky text message siphon", req.body);

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-nano-2025-04-14", // replace fine tuned model with regular 4.1 nano
      input: [
        {
          role: "user",
          content:
            "If the following content has no mention of any habitName, habitId, or something like that, then tell the user to come back again after doing some habits so that the AI can tailor make recommendations for them." +
            JSON.stringify(userData) +
            ". How can I improve the consistency of my habits? Make as many connections between my habits to give me a good recommendation! Try to limit responses to less than 40 words (not strict but good to follow). Don't include things like 'you are doing well', 'good going', etc.",
        },
      ],
    });

    console.log("WICKED WICKED WICKED WICKED, WICKED TUNES YOU");

    const aiResponse = response.output_text || null;
    res.json({
      response: aiResponse,
      success: response ? true : false,
    });
  } catch (err) {
    console.log(err);
  }
});

router.post("/tag-habits", (req, res, _) => {
  const habitsData = req.body;

  // objective: apply 1-5 tags on each of the habits from the "MASTER TAG LIST"
  // plus, use the cheapest possible openai model for this job as well
});

// Mount the router on /habit-mentor:
// app.use("/habit-mentor", router);

exports.api = onRequest(
  {
    secrets: [openaiApiKey],
    memory: "1GB",
    timeoutSeconds: 60,
  },
  async (req, res) => {
    const key = openaiApiKey.value(); // ✅ This will now work

    if (!client) {
      client = new OpenAI({ apiKey: key });
    }

    app(req, res);
  }
);
