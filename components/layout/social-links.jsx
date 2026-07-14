import { socialLabels } from "@/data/footer";

export default function SocialLinks() {
  return (
    <ul
      aria-label="Social platforms"
      className="flex items-center gap-5 text-xs text-muted-foreground"
    >
      {socialLabels.map((label) => (
        <li key={label}>{label}</li>
      ))}
    </ul>
  );
}
