export default function App() {
  const stats = [
    { label: "Total Trades", value: 3 },
    { label: "Win Rate", value: "67%" },
    { label: "Total P&L", value: "$360" },
  ];

  return (
    <div style={{ padding: 40, fontFamily: "Arial" }}>
      <h1>Trading Dashboard</h1>

      <div style={{ display: "flex", gap: 20, marginTop: 30 }}>
        {stats.map((stat, index) => (
          <div
            key={index}
            style={{
              border: "1px solid #ccc",
              borderRadius: 8,
              padding: 20,
              minWidth: 150,
              textAlign: "center",
              background: "#f9f9f9",
            }}
          >
            <h3>{stat.label}</h3>
            <p style={{ fontSize: 24, fontWeight: "bold" }}>
              {stat.value}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
}
