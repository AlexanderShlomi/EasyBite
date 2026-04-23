export type CareFactor = {
  id: string;
  title: string;
  description: string;
  tone: "blue" | "green" | "yellow";
  category: "core" | "micro" | "functional";
};

export const CARE_FACTORS: CareFactor[] = [
  {
    id: "energy",
    title: "More energy",
    description: "Feel steadier throughout the day.",
    tone: "yellow",
    category: "core",
  },
  {
    id: "heart",
    title: "Heart health",
    description: "Support blood pressure & cholesterol habits.",
    tone: "green",
    category: "core",
  },
  {
    id: "weight",
    title: "Healthy weight",
    description: "Gentle, sustainable progress.",
    tone: "green",
    category: "core",
  },
  {
    id: "gut",
    title: "Digestion",
    description: "Fiber-forward, easier meals.",
    tone: "green",
    category: "core",
  },
  {
    id: "glucose",
    title: "Balanced blood sugar",
    description: "Smoother peaks and dips.",
    tone: "blue",
    category: "core",
  },
  {
    id: "strength",
    title: "Strength",
    description: "Protein & movement habits.",
    tone: "blue",
    category: "core",
  },
  {
    id: "sleep",
    title: "Better sleep",
    description: "Evening routines and timing.",
    tone: "yellow",
    category: "functional",
  },
  {
    id: "mood",
    title: "Mood",
    description: "Support calm and clarity.",
    tone: "blue",
    category: "functional",
  },
  {
    id: "b12",
    title: "Vitamin B12",
    description: "Support energy and nervous system.",
    tone: "yellow",
    category: "micro",
  },
  {
    id: "vitd",
    title: "Vitamin D",
    description: "Support bones and immunity.",
    tone: "yellow",
    category: "micro",
  },
  {
    id: "iron",
    title: "Iron",
    description: "Support oxygen and stamina.",
    tone: "green",
    category: "micro",
  },
  {
    id: "omega3",
    title: "Omega‑3",
    description: "Support heart and brain.",
    tone: "blue",
    category: "functional",
  },
  {
    id: "polyphenols",
    title: "Polyphenols",
    description: "Colorful plant compounds.",
    tone: "green",
    category: "functional",
  },
  {
    id: "fiber",
    title: "Fiber",
    description: "Support fullness and gut health.",
    tone: "green",
    category: "core",
  },
];

