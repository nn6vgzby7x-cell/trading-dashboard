const [trades, setTrades] = useState(() => {
  const saved = localStorage.getItem(STORAGE_KEY);
  return saved
    ? JSON.parse(saved)
    : [
        { id: 1, symbol: "AAPL", pnl: 120 },
        { id: 2, symbol: "TSLA", pnl: -60 },
        { id: 3, symbol: "BTC", pnl: 300 },
      ];
});
