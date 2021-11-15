import React, { useEffect, useState } from "react";
import "./App.css";

import { API_URL } from "./utils/urls";
import CurrencyComponent from "./CurrencyComponent";

function App() {
  // Loading state indicator
  const [isLoading, setIsLoading] = useState(true);
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
    // Get request to the freecurrencyapi.net API
    fetch(API_URL)
      .then((res) => res.json())
      .then((currencyData) => {
        /**
         * currencyData is an object with the following properties:
         * * query: an array containing the api_key, timestamp and base_currency
         * * * base: a string showing the currency being converted from
         * * data: an array of objects with
         * * * Key: a string of the currency code
         * * * Value: exchange rate relative to the base
         *
         * */

        // For currency options get list of available currencies
        const availableCurrencies = [
          currencyData.query.base_currency,
          ...Object.keys(currencyData.data).filter((value) =>
            // Limit currencies to only 4
            ["USD", "GBP", "EUR", "ZAR"].includes(value)
          ),
        ];
        setCurrencyOptions(availableCurrencies);

        // Set base currency
        setFromCurrency(currencyData.query.base_currency);

        // Set converting currency
        const convertingCurrency = availableCurrencies[1];
        setToCurrency(convertingCurrency);

        // Set exchange rate
        setExchangeRate(currencyData.data[convertingCurrency]);

        // Is loading is false
        setIsLoading(false);
      });
  }, []);

  // To run after each update of the currencies' dropdown
  useEffect(() => {
    /*
     * function will update the exchange rate based on the selected currency
     */
    if (fromCurrency && fromCurrency)
      fetch(`${API_URL}&base_currency=${fromCurrency}`)
        .then((res) => res.json())
        .then((currencyData) => setExchangeRate(currencyData.data[toCurrency]));
  }, [fromCurrency, toCurrency]);

  const onChangeBaseAmount = (e) => {
    setAmount(e.target.value);
    setAmountOfBaseCurrency(true);
  };

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

  const onChangeToAmount = (e) => {
    setAmount(e.target.value);
    setAmountOfBaseCurrency(false);
  };

  function switchCurrencies() {
    /*
     * function To swap the to and from dropdown values
     */
    let temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  return (
    <>
      <h1 className="font-bold text-blue-300 text-xl absolute top-10">
        Shumba Money Exchange rate calculator
      </h1>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="container bg-gray-50 py-4 px-8 rounded-2xl">
          <div className="pb-4">
            <CurrencyComponent
              isBase={true}
              currencyOptions={currencyOptions}
              selectedCurrency={fromCurrency}
              onChangeCurrency={(data) => setFromCurrency(data.value)}
              amount={baseAmount}
              onChangeAmount={onChangeBaseAmount}
            />
            <div>
              <button onClick={switchCurrencies}>Switch</button>
            </div>
            <CurrencyComponent
              isBase={false}
              currencyOptions={currencyOptions}
              selectedCurrency={toCurrency}
              onChangeCurrency={(data) => setToCurrency(data.value)}
              amount={toAmount}
              onChangeAmount={onChangeToAmount}
            />
          </div>
          <p className="text-center">
            1 {fromCurrency} = {exchangeRate} {toCurrency}
          </p>
        </div>
      )}
    </>
  );
}

export default App;
