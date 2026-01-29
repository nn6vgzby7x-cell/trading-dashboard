import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const [isProUser, setIsProUser] = useState(
    localStorage.getItem("isProUser") === "true"
  );

  const chartRef = useRef(null);

  useEffect(() => {
    if (!isProUser) return;

    const chart = createChart(chartRef.current, {
      width: 600,
      height: 300,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#000",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
    });

    const lineSeries = chart.addLineSeries({
      color: "#0070f3",
      lineWidth: 2,
    });

    // Demo price data (safe + stable)
    lineSeries.setData([
      { time: "2024-01-01", value: 150 },
      { time: "2024-01-02", value: 158 },
      { time: "2024-01-03", value: 154 },
      { time: "2024-01-04", value: 165 },
      { time: "2024-01-05", value: 172 },
    ]);

    return () => chart.remove();
  }, [isProUser]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      {!isProUser ? (
        <>
          <p>This dashboard is locked.</p>
          <p>Upgrade to Pro to see charts and stats.</p>

          <a
            href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={{ padding: "14px 24px", fontSize: 16 }}>
              Upgrade to Pro
            </button>
          </a>

          <div style={{ marginTop: 15 }}>
            <button
              style={{ fontSize: 12 }}
              onClick={() => {
                localStorage.setItem("isProUser", "true");
                setIsProUser(true);
              }}
            >
              (Dev) Mark as Paid
            </button>
          </div>
        </>
      ) : (
        <>
          <p>Total Trades: 3</p>
          <p>Win Rate: 67%</p>
          <p>Total P&amp;L: $360</p>

          <h2 style={{ marginTop: 30 }}>Price Chart</h2>
          <div ref={chartRef} />

          <button
            style={{ marginTop: 20, fontSize: 12 }}
            onClick={() => {
              localStorage.removeItem("isProUser");
              window.location.reload();
            }}
          >
            Reset Pro (Dev)
          </button>
        </>
      )}
    </div>
  );
}
