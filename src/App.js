export default function App() {
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

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Total Trades" value="3" />
        <Card title="Win Rate" value="67%" />
        <Card title="Total P&L" value="$360" />
      </div>
    </div>
  );
}

function Card({ title, value }) {
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
      <div style={{ fontSize: 28, fontWeight: "bold", marginTop: 10 }}>
        {value}
      </div>
    </div>
  );
}
