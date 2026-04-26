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
    title: "יותר אנרגיה",
    description: "תחושה יציבה יותר לאורך היום.",
    tone: "yellow",
    category: "core",
  },
  {
    id: "heart",
    title: "בריאות הלב",
    description: "תמיכה בהרגלים שקשורים ללחץ דם וכולסטרול.",
    tone: "green",
    category: "core",
  },
  {
    id: "weight",
    title: "משקל בריא",
    description: "התקדמות עדינה וברת־קיימא.",
    tone: "green",
    category: "core",
  },
  {
    id: "gut",
    title: "עיכול",
    description: "יותר סיבים, ארוחות קלילות יותר.",
    tone: "green",
    category: "core",
  },
  {
    id: "glucose",
    title: "איזון סוכר",
    description: "פחות קפיצות וירידות חדות.",
    tone: "blue",
    category: "core",
  },
  {
    id: "strength",
    title: "חוזק",
    description: "הרגלי חלבון ותנועה.",
    tone: "blue",
    category: "core",
  },
  {
    id: "sleep",
    title: "שינה טובה יותר",
    description: "הרגלי ערב ותזמון.",
    tone: "yellow",
    category: "functional",
  },
  {
    id: "mood",
    title: "מצב רוח",
    description: "תמיכה ברוגע ובבהירות.",
    tone: "blue",
    category: "functional",
  },
  {
    id: "b12",
    title: "ויטמין B12",
    description: "תמיכה באנרגיה ובמערכת העצבים.",
    tone: "yellow",
    category: "micro",
  },
  {
    id: "vitd",
    title: "ויטמין D",
    description: "תמיכה בעצמות ובחיסון.",
    tone: "yellow",
    category: "micro",
  },
  {
    id: "iron",
    title: "ברזל",
    description: "תמיכה בחמצון ובסבולת.",
    tone: "green",
    category: "micro",
  },
  {
    id: "omega3",
    title: "אומגה 3",
    description: "תמיכה בלב ובמוח.",
    tone: "blue",
    category: "functional",
  },
  {
    id: "polyphenols",
    title: "פוליפנולים",
    description: "תרכובות צמחיות צבעוניות.",
    tone: "green",
    category: "functional",
  },
  {
    id: "fiber",
    title: "סיבים",
    description: "תמיכה בשובע ובבריאות העיכול.",
    tone: "green",
    category: "core",
  },
];

