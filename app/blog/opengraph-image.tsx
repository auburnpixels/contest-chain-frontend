import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt = "Veristiq Blog — Prize Draw Compliance & Industry Insights";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default async function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          height: "100%",
          width: "100%",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#1e293b",
          padding: "60px",
          position: "relative",
        }}
      >
        {/* Grid pattern overlay */}
        <div
          style={{
            position: "absolute",
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage:
              "linear-gradient(to right, rgba(255,255,255,0.03) 1px, transparent 1px), linear-gradient(to bottom, rgba(255,255,255,0.03) 1px, transparent 1px)",
            backgroundSize: "40px 40px",
          }}
        />

        {/* Content */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            justifyContent: "center",
            alignItems: "center",
            height: "100%",
            position: "relative",
            zIndex: 1,
            textAlign: "center",
          }}
        >
          {/* Logo */}
          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "16px",
              marginBottom: "40px",
            }}
          >
            <svg width="56" height="56" viewBox="0 0 24 24" fill="#3b82f6">
              <path
                fillRule="evenodd"
                d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                clipRule="evenodd"
              />
            </svg>
            <span
              style={{
                fontSize: "36px",
                fontWeight: "bold",
                color: "#3b82f6",
                letterSpacing: "-0.02em",
              }}
            >
              VERISTIQ
            </span>
          </div>

          {/* Title */}
          <h1
            style={{
              fontSize: "64px",
              fontWeight: "bold",
              color: "white",
              lineHeight: 1.1,
              margin: 0,
              marginBottom: "24px",
              letterSpacing: "-0.02em",
            }}
          >
            Blog
          </h1>

          {/* Subtitle */}
          <p
            style={{
              fontSize: "26px",
              color: "#94a3b8",
              lineHeight: 1.5,
              margin: 0,
              maxWidth: "700px",
            }}
          >
            Expert insights on prize draw compliance, DCMS regulations, and
            industry best practices for UK operators.
          </p>

          {/* Bottom URL */}
          <div
            style={{
              position: "absolute",
              bottom: "60px",
              display: "flex",
              alignItems: "center",
              gap: "12px",
              color: "#64748b",
              fontSize: "20px",
            }}
          >
            <span>veristiq.io/blog</span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

