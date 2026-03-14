import Comment from "../models/Comment.js";
import Issue from "../models/Issue.js";

export const generateIssueSummary = async (req, res) => {
  try {
    const { issueId } = req.body;
    const issue = await Issue.findById(issueId);
    if (!issue) return res.status(404).json({ message: "Issue not found" });

    const comments = await Comment.find({ issueId }).populate("userId", "name");
    const commentLines = comments.map(c =>
      `${c.userId?.name || "User"}: ${c.commentText}`
    ).join("\n");

    const prompt = `You are a project management assistant. Analyze this issue and its comments.

Issue Title: ${issue.title}
Issue Description: ${issue.description || "No description"}
Priority: ${issue.priority}
Status: ${issue.status}

Comments:
${commentLines || "No comments yet."}

Respond ONLY with a JSON object (no markdown, no backticks) with exactly these keys:
{
  "summary": "2-3 sentence summary of the discussion",
  "actionItems": ["action item 1", "action item 2"],
  "nextStep": "single recommended next step"
}`;

    const response = await fetch("https://openrouter.ai/api/v1/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${process.env.OPENROUTER_API_KEY}`
      },
      body: JSON.stringify({
        model: "openai/gpt-4o",
        max_tokens: 500,
        messages: [{ role: "user", content: prompt }]
      })
    });

    const data = await response.json();
    console.log("OpenRouter raw response:", JSON.stringify(data, null, 2));  // ADD THIS
    const text = data.choices?.[0]?.message?.content || "{}";
    const clean = text.replace(/```json|```/g, "").trim();
    const parsed = JSON.parse(clean);
    res.json(parsed);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};