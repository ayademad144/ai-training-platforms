import { ImageResponse } from "next/og";

export const alt =
  "AI Training Models — compare trusted AI training and data annotation platforms";
export const contentType = "image/png";
export const size = {
  height: 630,
  width: 1200,
};

export default function OpenGraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          alignItems: "center",
          background: "#ffffff",
          color: "#0f0f10",
          display: "flex",
          flexDirection: "column",
          fontFamily: "Arial, sans-serif",
          height: "100%",
          justifyContent: "center",
          padding: "72px",
          textAlign: "center",
          width: "100%",
        }}
      >
        <div
          style={{
            alignItems: "center",
            background: "#2563eb",
            borderRadius: "24px",
            color: "#ffffff",
            display: "flex",
            fontSize: "38px",
            fontWeight: 700,
            height: "96px",
            justifyContent: "center",
            marginBottom: "34px",
            width: "96px",
          }}
        >
          AI
        </div>
        <div
          style={{
            display: "flex",
            fontSize: "68px",
            fontWeight: 800,
            letterSpacing: "-2px",
            lineHeight: 1.05,
          }}
        >
          AI Training Models
        </div>
        <div
          style={{
            color: "#6b7280",
            display: "flex",
            fontSize: "30px",
            lineHeight: 1.35,
            marginTop: "24px",
            maxWidth: "900px",
          }}
        >
          Compare trusted AI training, evaluation, and data annotation
          platforms.
        </div>
      </div>
    ),
    size,
  );
}
