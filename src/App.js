import React, { useEffect, useState } from "react";
import "./App.css";

import { API_URL } from "./utils/urls";
import CurrencyComponent from "./CurrencyComponent";

function App() {
  // Loading state indicator
  const [isLoading, setIsLoading] = useState(true);
  // Set Base currency
  const [fromCurrency, setFromCurrency] = useState();
  // Set converting currency
  const [toCurrency, setToCurrency] = useState();
  // Set amount
  const [amount, setAmount] = useState(1);
  // Track amount that needs to be changed
  const [changingBase, setChangingBaseCurrency] = useState(true);
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
         * */

        // For currency options get list of available currencies
        const availableCurrencies = ["USD", "GBP", "EUR", "ZAR"];

        // Set base currency
        setFromCurrency(currencyData.query.base_currency);

        // Set converting currency as the first currency that is not the base currency
        const convertingCurrency = availableCurrencies.find(
          (currency) => currency !== currencyData.query.base_currency
        );
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
     * tracks changes in the fromCurrency and toCurrency
     */
    if (fromCurrency && fromCurrency)
      fetch(`${API_URL}&base_currency=${fromCurrency}`)
        .then((res) => res.json())
        .then((currencyData) => setExchangeRate(currencyData.data[toCurrency]));
  }, [fromCurrency, toCurrency]);

  const onChangeBaseAmount = (e) => {
    /*
     * Function records input from the from currency input and notifies the app
     */
    setAmount(e.target.value);
    setChangingBaseCurrency(true);
  };

  const onChangeToAmount = (e) => {
    /*
     * Function records input from the from currency input and notifies the app
     */
    setAmount(e.target.value);
    setChangingBaseCurrency(false);
  };

  // The amount of each currency
  let baseAmount, toAmount;
  // Changing amount of each text field based on which one was updated by the user
  if (changingBase) {
    baseAmount = amount;
    toAmount = amount * exchangeRate;
  } else {
    baseAmount = amount / exchangeRate;
    toAmount = amount;
  }

  function switchCurrencies() {
    /*
     * function To swap the to and from dropdown values
     */
    let temp = fromCurrency;
    setFromCurrency(toCurrency);
    setToCurrency(temp);
  }

  function resetAmounts() {
    /*
     * function to reset the app to set the base currency as one
     */
    // Make the from currency the one being tracked
    setChangingBaseCurrency(true);
    // Change it's amount to 1
    setAmount(1);
  }

  return (
    <>
      <h1 className="font-bold text-blue-300 text-xl absolute top-10">
        Shumba Money Exchange rate calculator
      </h1>
      {isLoading ? (
        <p>Loading</p>
      ) : (
        <div className="container mx-auto bg-gray-50 py-4 px-8 rounded-2xl">
          <div className="mb-8 flex flex-col md:flex-row">
            <div className="flex-grow">
              <CurrencyComponent
                isBase={true}
                excludedCurrency={toCurrency}
                selectedCurrency={fromCurrency}
                onChangeCurrency={(data) => setFromCurrency(data.value)}
                amount={baseAmount}
                onChangeAmount={onChangeBaseAmount}
              />
            </div>

            <div className="flex-grow-0 flex items-center justify-center mx-4 my-4 md:my-0">
              <button
                onClick={switchCurrencies}
                className="bg-red-600 hover:bg-red-800 text-white font-bold py-3 px-3 rounded-full"
              >
                <svg
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    clip-rule="evenodd"
                    d="M6.99 11L3 15L6.99 19V16H14V14H6.99V11ZM21 9L17.01 5V8H10V10H17.01V13L21 9Z"
                    fill="#FFFFFF"
                  />
                </svg>
              </button>
            </div>

            <div className="flex-grow">
              <CurrencyComponent
                isBase={false}
                excludedCurrency={fromCurrency}
                selectedCurrency={toCurrency}
                onChangeCurrency={(data) => setToCurrency(data.value)}
                amount={toAmount}
                onChangeAmount={onChangeToAmount}
                className="flex-grow"
              />
            </div>
          </div>

          <div className="flex justify-between ">
            <span className="text-xs text-gray-500">
              1 {fromCurrency} = {exchangeRate} {toCurrency}
            </span>
            <button
              onClick={resetAmounts}
              className="flex items-center hover:bg-gray-200 px-2 py-1"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="10.12"
                height="10.54"
                viewBox="0 0 40.5 42.17"
                className="mr-1"
              >
                <path d="M29.4,2.65A20.85,20.85,0,0,0,8,3.64L4.92.59A2,2,0,0,0,1.5,2V13.18a2,2,0,0,0,2,2H14.67a2,2,0,0,0,1.42-3.42L13.81,9.48A13,13,0,1,1,7.68,26.56a2,2,0,0,0-2.43-1L1.43,26.66A2,2,0,0,0,.15,29.32,21,21,0,1,0,29.4,2.65Z" />
              </svg>
              reset
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
