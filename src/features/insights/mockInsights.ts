export type Insight = {
  id: string;
  title: string;
  body: string;
  tone: "success" | "info" | "warm";
};

const INSIGHTS: Insight[] = [
  {
    id: "b12_goal",
    title: "Nice work!",
    body: "You’ve reached your B12 goal today. That’s a real win for energy support.",
    tone: "success",
  },
  {
    id: "fiber_streak",
    title: "You’re building momentum",
    body: "Fiber is trending up this week. Small choices are adding up.",
    tone: "info",
  },
  {
    id: "hydration_gentle",
    title: "Gentle reminder",
    body: "If it feels good, a glass of water can help you feel steadier—no pressure.",
    tone: "warm",
  },
];

export function getMockInsightForToday(seed: number = new Date().getDate()): Insight {
  return INSIGHTS[seed % INSIGHTS.length]!;
}

