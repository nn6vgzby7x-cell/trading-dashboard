export default function App() {
  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Trading Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Card title="Total Trades" value="3" />
        <Card title="Win Rate" value="67%" />
        <Card title="Total P&L" value="$360" positive />
      </div>
    </div>
  );
}

function Card({ title, value, positive }) {
  return (
    <div
      style={{
        padding: 20,
        minWidth: 160,
        borderRadius: 8,
        background: "#ffffff",
        boxShadow: "0 4px 10px rgba(0,0,0,0.1)",
      }}
    >
      <div style={{ fontSize: 14, color: "#666" }}>{title}</div>
      <div
        style={{
          marginTop: 10,
          fontSize: 28,
          fontWeight: "bold",
          color: positive ? "green" : "#000",
        }}
      >
        {value}
      </div>
    </div>
  );
}
