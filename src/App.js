import React, { useEffect, useState } from "react";
import "./App.css";

import { API_URL } from "./utils/urls";
import CurrencyComponent from "./CurrencyComponent";

function App() {
  const [currencyOptions, SetCurrencyOptions] = useState([]);

  // Initialize app by fetching the currency data and notifying other components
  useEffect(() => {
    // Get request to the exchangeratesapi.io API
    fetch(API_URL)
      .then((res) => res.json())
      .then((currencyData) => {
        /**
         * currencyData is an object with the following properties:
         * * base: a string showing the currency being converted from
         * * success: a boolean of whether the request was successful or not
         * * rates: an array of objects with
         * * * Key: a string of the currency code
         * * * Value: exchange rate relative to the base
         *
         * */

        // For currency options get the base currency and list of other currencies
        SetCurrencyOptions([
          currencyData.base,
          ...Object.keys(currencyData.rates),
        ]);
      });
  }, []);

  return (
    <>
      <h1>Shumba Money Exchange rate calculator</h1>
      <div>
        <CurrencyComponent currencyOptions={currencyOptions} />
        <div>Icon</div>
        <CurrencyComponent currencyOptions={currencyOptions} />
      </div>
    </>
  );
}

export default App;
