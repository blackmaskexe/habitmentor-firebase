import { getAiChatResponse } from "./chat.service";
import { AiResponseType } from "../../utils/types";
import { Request, Response, NextFunction } from "express";
import OpenAI from "openai";

export async function postChat(
  req: Request,
  res: Response,
  _: NextFunction,
  client: OpenAI
) {
  try {
    const userData = req.body;
    console.log("Sneaky text message siphon", userData);

    const aiResponse: AiResponseType = await getAiChatResponse(
      userData,
      client
    );

    res.json({
      response: aiResponse.response,
      importantMessage: aiResponse.importantMessage,
      actionableSteps: aiResponse.actionableSteps,
    });
  } catch (err) {
    console.log(err);

    const errorResponse: AiResponseType = {
      actionableSteps: [],
      response:
        "Seems like there are some screws lose in my circuit. Try again in sometime please",
      importantMessage: false,
    };
    res.json(errorResponse);
  }
}
