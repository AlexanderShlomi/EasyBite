export type Insight = {
  id: string;
  title: string;
  body: string;
  tone: "success" | "info" | "warm";
};

const INSIGHTS: Insight[] = [
  {
    id: "b12_goal",
    title: "איזה יופי!",
    body: "הצלחתם להגיע ליעד ה־B12 היום. זה בוסט אמיתי לתמיכה באנרגיה.",
    tone: "success",
  },
  {
    id: "fiber_streak",
    title: "אתם צוברים תנופה",
    body: "הסיבים במגמת עלייה השבוע. בחירות קטנות מצטברות.",
    tone: "info",
  },
  {
    id: "hydration_gentle",
    title: "תזכורת עדינה",
    body: "אם זה מתאים לכם, כוס מים יכולה לעזור להרגיש יציבים יותר — בלי לחץ.",
    tone: "warm",
  },
];

export function getMockInsightForToday(seed: number = new Date().getDate()): Insight {
  return INSIGHTS[seed % INSIGHTS.length]!;
}

