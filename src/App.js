export default function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 20 }}>
        <Stat title="Total Trades" value="3" />
        <Stat title="Win Rate" value="67%" />
        <Stat title="Total P&L" value="$360" />
      </div>
    </div>
  );
}

function Stat({ title, value }) {
  return (
    <div
      style={{
        padding: 20,
        background: "#f4f4f4",
        borderRadius: 8,
        minWidth: 150,
      }}
    >
      <div style={{ fontSize: 14 }}>{title}</div>
      <div style={{ fontSize: 24, fontWeight: "bold" }}>{value}</div>
    </div>
  );
}
