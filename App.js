export default function App() {
  return (
    <div style={{
      padding: 40,
      background: "#f5f7fb",
      minHeight: "100vh",
      fontFamily: "Arial"
    }}>
      <h1 style={{ color: "#111" }}>Trading Dashboard</h1>
      <p style={{ color: "#333", fontSize: "18px" }}>
        React is rendering correctly.
      </p>

      <div style={{
        marginTop: 30,
        padding: 20,
        background: "white",
        borderRadius: 8,
        boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
        maxWidth: 400
      }}>
        <h3>Status</h3>
        <p>System Online ✅</p>
      </div>
    </div>
  );
}
