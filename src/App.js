export default function App() {
  return (
    <div style={{ padding: 40, fontFamily: "Arial, sans-serif" }}>
      <h1>Trading Dashboard</h1>
      <p>React is rendering correctly.</p>

      <a
        href="https://buy.stripe.com/YOUR_REAL_STRIPE_LINK"
        target="_blank"
        rel="noopener noreferrer"
      >
        <button
          style={{
            marginTop: "20px",
            padding: "12px 20px",
            fontSize: "16px",
            cursor: "pointer",
          }}
        >
          Upgrade to Pro
        </button>
      </a>
    </div>
  );
}
