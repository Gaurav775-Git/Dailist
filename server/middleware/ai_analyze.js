const aimodel = require("../config/ai_model");

async function analyze_task(tasks) {
  try {
    const response = await aimodel.models.generateContent({
      model: "gemini-3-flash-preview",
      contents: `
You are a productivity task analyzer AI.

Your job is to analyze user tasks and return ONLY a JSON array.
Each object must match this schema exactly:

{
  "task": string,
  "difficulty": "easy" | "medium" | "hard",
  "category": "health" | "learning" | "work" | "personal" | "other",
  "points": number,
  "completed": false,
  "completedAt": null
}

Rules for assigning values:

1. Difficulty:
   - easy → simple daily tasks (drink water, walk, clean room)
   - medium → needs effort/consistency (gym, study 1hr, coding practice)
   - hard → high effort/long focus (build project, exam prep, 3hr deep work)

2. Category:
   - health → body, exercise, food, sleep
   - learning → study, reading, coding, skills
   - work → job, assignments, professional tasks
   - personal → habits, hobbies, self-improvement
   - other → if not fitting above

3. Points based on difficulty:
   - easy = 10 points
   - medium = 25 points
   - hard = 50 points

4. completed must always be false.
5. completedAt must always be null.
6. Return ONLY valid JSON. No explanation text.

User Tasks:
${JSON.stringify(tasks)}
`,
    });

    const raw = response.candidates[0].content.parts[0].text;

    const clean=raw.replace(/```json|```/g, "").trim();

    const parsed =JSON.parse(clean);
    
    return parsed


  } catch (err) {
    console.log("AI ERROR:", err);
    throw err;
  }
}

module.exports = analyze_task;
