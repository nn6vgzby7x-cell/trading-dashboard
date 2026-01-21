import React from "react";
import ReactDOM from "react-dom";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));function App() {
  return (
    <div style={{ padding: 40 }}>
      <h1>Trading Dashboard</h1>
      <p>App loaded successfully.</p>
    </div>
  );
}

export default App;
