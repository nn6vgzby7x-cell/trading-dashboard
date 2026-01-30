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
      height: 400,
      layout: {
        background: { color: "#ffffff" },
        textColor: "#000",
      },
      grid: {
        vertLines: { color: "#eee" },
        horzLines: { color: "#eee" },
      },
    });

    const series = chart.addLineSeries({
      color: "#0070f3",
      lineWidth: 2,
    });

    series.setData([
      { time: 1, value: 100 },
      { time: 2, value: 102 },
      { time: 3, value: 101 },
      { time: 4, value: 105 },
    ]);

    let time = 4;
    let price = 105;

    const interval = setInterval(() => {
      time += 1;
      price += (Math.random() - 0.5) * 2;
      series.update({ time, value: Number(price.toFixed(2)) });
    }, 1000);

    return () => {
      clearInterval(interval);
      chart.remove();
    };
  }, [isProUser]);

  const unlock = () => {
    localStorage.setItem("isProUser", "true");
    setIsProUser(true);
  };

  return (
    <div
      style={{
        padding: 40,
        fontFamily: "Arial, sans-serif",
        background: "#f5f7fa",
        minHeight: "100vh",
      }}
    >
      <h1>Trading Dashboard</h1>

      {!isProUser ? (
        <div
          style={{
            background: "#fff",
            padding: 30,
            borderRadius: 10,
            marginTop: 40,
            maxWidth: 500,
          }}
        >
          <h2>This dashboard is locked</h2>
          <p>Upgrade to Pro to unlock charts.</p>

          <a
            href="https://buy.stripe.com/4gM9AM0iy5Q91PldkE2Ji01"
            target="_blank"
            rel="noopener noreferrer"
          >
            <button style={buttonStyle}>Upgrade to Pro</button>
          </a>

          <div style={{ marginTop: 20 }}>
            <button onClick={unlock} style={devButton}>
              (Dev) Mark as Paid
            </button>
          </div>
        </div>
      ) : (
        <>
          <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
            <Stat title="Asset" value="AAPL" />
            <Stat title="Update" value="Live" />
            <Stat title="Status" value="Unlocked" positive />
          </div>

          <h2 style={{ marginTop: 40 }}>Live Chart</h2>
          <div
            ref={chartRef}
            style={{
              marginTop: 10,
              background: "#fff",
              padding: 10,
              borderRadius: 10,
            }}
          />
        </>
      )}
    </div>
  );
}

function Stat({ title, value, positive }) {
  return (
    <div
      style={{
        background: "#fff",
        padding: 20,
        borderRadius: 10,
        minWidth: 160,
        boxShadow: "0 4px 10px rgba(0,0,0,0.08)",
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div
        style={{
          fontSize: 22,
          fontWeight: "bold",
          marginTop: 10,
          color: positive ? "green" : "#000",
        }}
      >
        {value}
      </div>
    </div>
  );
}

const buttonStyle = {
  padding: "14px 24px",
  fontSize: 16,
  background: "#0070f3",
  color: "#fff",
  border: "none",
  borderRadius: 6,
  cursor: "pointer",
};

const devButton = {
  padding: "10px 16px",
  fontSize: 14,
  background: "#eee",
  border: "1px solid #ccc",
  borderRadius: 6,
  cursor: "pointer",
};
