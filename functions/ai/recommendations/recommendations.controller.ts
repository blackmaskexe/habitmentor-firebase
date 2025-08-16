import { getProActiveRecommendation } from "./recommendations.service";

// Controller for POST /pro-active
export async function postProActiveRecommendation(req, res, next, client) {
  try {
    const userData = req.body;
    console.log("Sneaky text message siphon", userData);
    const aiResponse = await getProActiveRecommendation(userData, client);
    res.json({
      response: aiResponse,
      success: !!aiResponse,
    });
  } catch (err) {
    console.log(err);
    res.status(500).json({
      response: null,
      success: false,
      error: "Internal server error",
    });
  }
}
