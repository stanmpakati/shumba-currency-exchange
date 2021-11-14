import React, { useEffect, useState } from "react";
import "./App.css";

import { API_URL } from "./utils/urls";
import CurrencyComponent from "./CurrencyComponent";

function App() {
  // Manage an array of available currencies
  const [currencyOptions, setCurrencyOptions] = useState([]);
  // Set Base currency
  const [fromCurrency, setFromCurrency] = useState();
  // Set convertinng currency
  const [toCurrency, setToCurrency] = useState();
  // Set amount
  const [amount, setAmount] = useState(1);
  // Track amount that needs to be changed
  const [amountOfBaseCurrency, setAmountOfBaseCurrency] = useState(true);
  // Set exchange rate
  const [exchangeRate, setExchangeRate] = useState();

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
        console.log(currencyData);
        // For currency options get list of available currencies
        setCurrencyOptions([
          currencyData.query.base_currency,
          ...Object.keys(currencyData.data),
        ]);

        // Set base currency
        setFromCurrency(currencyData.query.base_currency);

        // Set converting currency
        const convertingCurrency = Object.keys(currencyData.data)[0];
        setToCurrency(convertingCurrency);

        // Set exchange rate
        setExchangeRate(currencyData.data[convertingCurrency]);
      });
  }, []);

  // useEffect(() => {
  //   fetch
  // }, [fromCurrency, toCurrency])

  // The amount of each currency
  let baseAmount, toAmount;
  // Changing amount of each text field based on which one was updated by the user
  if (amountOfBaseCurrency) {
    baseAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    baseAmount = amount / exchangeRate;
    toAmount = amount;
  }

  const onChangeBaseAmount = (e) => {
    setAmount(e.target.value);
    setAmountOfBaseCurrency(true);
  };

  const onChangeToAmount = (e) => {
    setAmount(e.target.value);
    setAmountOfBaseCurrency(false);
  };

  return (
    <>
      <h1>Shumba Money Exchange rate calculator</h1>
      <div>
        <CurrencyComponent
          isBase={true}
          currencyOptions={currencyOptions}
          selectedCurrency={fromCurrency}
          onChangeCurrency={(e) => setFromCurrency(e.target.value)}
          amount={baseAmount}
          onChangeAmount={onChangeBaseAmount}
        />
        <div>Icon</div>
        <CurrencyComponent
          isBase={false}
          currencyOptions={currencyOptions}
          selectedCurrency={toCurrency}
          onChangeCurrency={(e) => setToCurrency(e.target.value)}
          amount={toAmount}
          onChangeAmount={onChangeToAmount}
        />
      </div>
    </>
  );
}

export default App;
