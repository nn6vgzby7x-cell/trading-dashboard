import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const [isPro, setIsPro] = useState(
    localStorage.getItem("isProUser") === "true"
  );

  const chartContainerRef = useRef(null);

  /* Chart */
  useEffect(() => {
    if (!isPro) return;

    const chart = createChart(chartContainerRef.current, {
      width: 720,
      height: 420,
      layout: { background: { color: "#fff" }, textColor: "#000" },
    });

    const series = chart.addLineSeries({ color: "#2563eb" });

    series.setData([
      { time: "2024-01-01", value: 42000 },
      { time: "2024-01-02", value: 43200 },
      { time: "2024-01-03", value: 44000 },
    ]);

    return () => chart.remove();
  }, [isPro]);

  /* LOCKED VIEW */
  if (!isPro) {
    return (
      <div style={locked}>
        <h1>Trading Dashboard</h1>
        <p>This dashboard is locked.</p>
        <p>Upgrade to Pro to unlock charts.</p>

        <a
          href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
          target="_blank"
          rel="noopener noreferrer"
        >
          <button style={btnPrimary}>Upgrade to Pro</button>
        </a>

        {/* DEV ONLY */}
        <button
          style={btnDev}
          onClick={() => {
            localStorage.setItem("isProUser", "true");
            setIsPro(true);
          }}
        >
          (Dev) Mark as Paid
        </button>
      </div>
    );
  }

  /* PRO VIEW */
  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>
      <p>Total Trades: 3</p>
      <p>Win Rate: 67%</p>
      <p>Total P&L: $360</p>

      <div ref={chartContainerRef} />

      <button
        style={btnLogout}
        onClick={() => {
          localStorage.removeItem("isProUser");
          setIsPro(false);
        }}
      >
        Log out (Dev)
      </button>
    </div>
  );
}

/* STYLES */

const locked = {
  padding: 40,
  textAlign: "center",
  fontFamily: "Arial, sans-serif",
};

const btnPrimary = {
  padding: "14px 24px",
  fontSize: 16,
  background: "#2563eb",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
  marginTop: 20,
};

const btnDev = {
  marginTop: 20,
  padding: "10px 18px",
  fontSize: 14,
  background: "#e5e7eb",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const btnLogout = {
  marginTop: 20,
  padding: "10px 18px",
  fontSize: 14,
};
