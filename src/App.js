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
      width: 700,
      height: 350,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#000",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
      timeScale: {
        timeVisible: true,
        secondsVisible: false,
      },
    });

    const candleSeries = chart.addCandlestickSeries({
      upColor: "#26a69a",
      downColor: "#ef5350",
      borderUpColor: "#26a69a",
      borderDownColor: "#ef5350",
      wickUpColor: "#26a69a",
      wickDownColor: "#ef5350",
    });

    // Stable demo OHLC data
    candleSeries.setData([
      { time: "2024-01-01", open: 150, high: 160, low: 148, close: 155 },
      { time: "2024-01-02", open: 155, high: 162, low: 152, close: 158 },
      { time: "2024-01-03", open: 158, high: 159, low: 150, close: 152 },
      { time: "2024-01-04", open: 152, high: 168, low: 151, close: 165 },
      { time: "2024-01-05", open: 165, high: 175, low: 162, close: 172 },
    ]);

    return () => chart.remove();
  }, [isProUser]);

  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      {!isProUser ? (
        <>
          <p>This dashboard is locked.</p>
          <p>Upgrade to Pro to unlock charts.</p>

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

          <h2 style={{ marginTop: 30 }}>Candlestick Chart</h2>
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
