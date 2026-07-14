const platformPreviews = [
  { abbreviation: "OA", color: "#1e3a5f", name: "Outlier" },
  { abbreviation: "SC", color: "#4f46e5", name: "Scale" },
  { abbreviation: "AP", color: "#0369a1", name: "Appen" },
  { abbreviation: "TL", color: "#c2410c", name: "Toloka" },
  { abbreviation: "DA", color: "#059669", name: "DataAnnotation" },
  { abbreviation: "RT", color: "#7c3aed", name: "Remotasks" },
];

export default function HeroPlatformPreview() {
  return (
    <ul
      aria-label="AI training platforms reviewed"
      className="mx-auto mt-16 grid max-w-xl grid-cols-3 gap-3 sm:grid-cols-6"
    >
      {platformPreviews.map((platform) => (
        <li
          key={platform.name}
          className="flex flex-col items-center gap-2 rounded-xl border border-border bg-white p-3.5 transition-shadow hover:shadow-sm"
        >
          <span
            aria-hidden="true"
            className="flex size-9 items-center justify-center rounded-lg text-xs font-bold text-white"
            style={{ backgroundColor: platform.color }}
          >
            {platform.abbreviation}
          </span>
          <span className="text-center text-[11px] font-medium leading-tight text-muted-foreground">
            {platform.name}
          </span>
        </li>
      ))}
    </ul>
  );
}
