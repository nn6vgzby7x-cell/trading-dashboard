import { useEffect, useRef, useState } from "react";
import { createChart } from "lightweight-charts";

export default function App() {
  const chartContainerRef = useRef(null);
  const seriesRef = useRef(null);
  const [price, setPrice] = useState(null);

  useEffect(() => {
    const chart = createChart(chartContainerRef.current, {
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

    const lineSeries = chart.addLineSeries({
      color: "#22c55e",
      lineWidth: 2,
    });

    seriesRef.current = lineSeries;

    async function fetchBTC() {
      const res = await fetch(
        "https://api.coingecko.com/api/v3/simple/price?ids=bitcoin&vs_currencies=usd"
      );
      const data = await res.json();
      const btcPrice = data.bitcoin.usd;

      setPrice(btcPrice);

      lineSeries.update({
        time: Math.floor(Date.now() / 1000),
        value: btcPrice,
      });
    }

    fetchBTC();
    const interval = setInterval(fetchBTC, 10000);

    return () => {
      clearInterval(interval);
      chart.remove();
    };
  }, []);

  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Trading Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginBottom: 40 }}>
        <Card title="Asset" value="BTC / USD" />
        <Card title="Live Price" value={price ? `$${price}` : "Loading..."} />
        <Card title="Status" value="Live" positive />
      </div>

      <div ref={chartContainerRef} />
    </div>
  );
}

function Card({ title, value, positive }) {
  return (
    <div
      style={{
        padding: 20,
        minWidth: 180,
        borderRadius: 8,
        background: "#fff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div
        style={{
          marginTop: 10,
          fontSize: 24,
          fontWeight: "bold",
          color: positive ? "green" : "#000",
        }}
      >
        {value}
      </div>
    </div>
  );
}
