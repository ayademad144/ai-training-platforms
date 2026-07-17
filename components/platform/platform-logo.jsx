import {
  getLogoColor,
  getPlatformInitials,
} from "./platform-visuals";
import Image from "next/image";

const sizeClassNames = {
  lg: "size-16 rounded-2xl text-xl",
  sm: "size-10 rounded-xl text-sm",
  xs: "size-8 rounded-lg text-xs",
};

export default function PlatformLogo({
  categoryColor,
  image,
  name,
  size = "sm",
}) {
  return (
    <span
      aria-hidden="true"
      className={`relative flex shrink-0 items-center justify-center overflow-hidden font-bold text-white ${
        sizeClassNames[size] ?? sizeClassNames.sm
      }`}
      style={{ backgroundColor: getLogoColor(categoryColor) }}
    >
      {getPlatformInitials(name)}
      {image ? (
        <Image
          alt=""
          className="object-cover"
          fill
          sizes={size === "lg" ? "64px" : size === "xs" ? "32px" : "40px"}
          src={image}
          unoptimized
        />
      ) : null}
    </span>
  );
}
