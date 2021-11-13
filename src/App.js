import React, { useEffect, useState } from "react";
import "./App.css";

import { API_URL } from "./utils/urls";
import CurrencyComponent from "./CurrencyComponent";

function App() {
  // Manage an array of available currencies
  const [currencyOptions, SetCurrencyOptions] = useState([]);

  // Set Base currency
  const [fromCurrency, setFromCurrency] = useState([]);

  // Set convertinng currency
  const [toCurrency, setToCurrency] = useState([]);

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

        // For currency options get list of available currencies
        SetCurrencyOptions([
          currencyData.base,
          ...Object.keys(currencyData.rates),
        ]);

        // Set base currency
        setFromCurrency(currencyData.base);

        // Set converting currency
        const convertingCurrency = Object.keys(currencyData.rates)[0];
        setToCurrency(convertingCurrency);
      });
  }, []);

  return (
    <>
      <h1>Shumba Money Exchange rate calculator</h1>
      <div>
        <CurrencyComponent
          isBase={true}
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
        />
        <div>Icon</div>
        <CurrencyComponent
          isBase={false}
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
        />
      </div>
    </>
  );
}

export default App;
