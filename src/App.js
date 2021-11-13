import React, { useEffect } from "react";
import "./App.css";

import { API_URL } from "./utils/urls";
import CurrencyComponent from "./CurrencyComponent";

function App() {
  useEffect(() => {
    fetch(API_URL)
      .then((res) => res.json())
      .then((currencyData) => console.log(currencyData));
  }, []);

  return (
    <>
      <h1>Shumba Money Exchange rate calculator</h1>
      <div>
        <CurrencyComponent />
        <div>Icon</div>
        <CurrencyComponent />
      </div>
    </>
  );
}

export default App;
