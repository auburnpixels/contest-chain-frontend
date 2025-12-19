import { ImageResponse } from "next/og";

export const runtime = "edge";

export const alt =
  "Why Screen Recordings Became the Default Evidence for Prize Draws";
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
            justifyContent: "space-between",
            height: "100%",
            position: "relative",
            zIndex: 1,
          }}
        >
          {/* Top: Logo and Category */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            {/* Logo */}
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "12px",
              }}
            >
              <svg width="40" height="40" viewBox="0 0 24 24" fill="#3b82f6">
                <path
                  fillRule="evenodd"
                  d="M12.516 2.17a.75.75 0 0 0-1.032 0 11.209 11.209 0 0 1-7.877 3.08.75.75 0 0 0-.722.515A12.74 12.74 0 0 0 2.25 9.75c0 5.942 4.064 10.933 9.563 12.348a.749.749 0 0 0 .374 0c5.499-1.415 9.563-6.406 9.563-12.348 0-1.39-.223-2.73-.635-3.985a.75.75 0 0 0-.722-.516l-.143.001c-2.996 0-5.717-1.17-7.734-3.08Zm3.094 8.016a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z"
                  clipRule="evenodd"
                />
              </svg>
              <span
                style={{
                  fontSize: "28px",
                  fontWeight: "bold",
                  color: "#3b82f6",
                  letterSpacing: "-0.02em",
                }}
              >
                VERISTIQ
              </span>
            </div>

            {/* Category Badge */}
            <div
              style={{
                backgroundColor: "#14b8a6",
                color: "white",
                padding: "8px 20px",
                borderRadius: "999px",
                fontSize: "16px",
                fontWeight: "600",
              }}
            >
              Industry
            </div>
          </div>

          {/* Middle: Title */}
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              gap: "20px",
              flex: 1,
              justifyContent: "center",
              paddingTop: "40px",
              paddingBottom: "40px",
            }}
          >
            <h1
              style={{
                fontSize: "52px",
                fontWeight: "bold",
                color: "white",
                lineHeight: 1.2,
                margin: 0,
                letterSpacing: "-0.02em",
                maxWidth: "90%",
              }}
            >
              Why Screen Recordings Became the Default Evidence for Prize Draws
            </h1>

            <p
              style={{
                fontSize: "22px",
                color: "#94a3b8",
                lineHeight: 1.5,
                margin: 0,
                maxWidth: "85%",
              }}
            >
              What they do well, what they cannot show, and when they may not be
              enough.
            </p>
          </div>

          {/* Bottom: Meta */}
          <div
            style={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              borderTop: "1px solid rgba(255,255,255,0.1)",
              paddingTop: "24px",
            }}
          >
            <div
              style={{
                display: "flex",
                alignItems: "center",
                gap: "24px",
                color: "#64748b",
                fontSize: "18px",
              }}
            >
              <span>5 min read</span>
              <span>•</span>
              <span>15 December 2025</span>
            </div>

            <span
              style={{
                color: "#64748b",
                fontSize: "18px",
              }}
            >
              veristiq.com/blog
            </span>
          </div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}

