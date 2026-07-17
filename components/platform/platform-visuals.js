const categoryClassNames = {
  blue: "border-blue-100 bg-blue-50 text-blue-700",
  green: "border-emerald-100 bg-emerald-50 text-emerald-700",
  orange: "border-orange-100 bg-orange-50 text-orange-700",
  purple: "border-purple-100 bg-purple-50 text-purple-700",
  slate: "border-slate-200 bg-slate-50 text-slate-700",
};

const logoColors = {
  blue: "#1e3a5f",
  green: "#059669",
  orange: "#c2410c",
  purple: "#7c3aed",
  slate: "#475569",
};

export function getCategoryClassName(categoryColor) {
  return categoryClassNames[categoryColor] ?? categoryClassNames.slate;
}

export function getLogoColor(categoryColor) {
  return logoColors[categoryColor] ?? logoColors.slate;
}

export function getPlatformInitials(name = "") {
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((word) => word[0])
    .join("")
    .toUpperCase();

  return initials || "AI";
}
