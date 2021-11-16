import { useState, useEffect } from "react";
import { API_URL } from "./utils/urls";

const CurrencyLogic = () => {
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

  function onChangeBaseAmount(e) {
    /*
     * Function records input from the from currency input and notifies the app
     */
    setAmount(e.target.value);
    setChangingBaseCurrency(true);
  }

  function onChangeToAmount(e) {
    /*
     * Function records input from the from currency input and notifies the app
     */
    setAmount(e.target.value);
    setChangingBaseCurrency(false);
  }

  function changeToCurrency(currency) {
    setToCurrency(currency);
  }

  function changeFromCurrency(currency) {
    setFromCurrency(currency);
  }

  return {
    isLoading,
    fromCurrency,
    toCurrency,
    amount,
    changingBase,
    exchangeRate,
    switchCurrencies,
    resetAmounts,
    onChangeBaseAmount,
    onChangeToAmount,
    changeToCurrency,
    changeFromCurrency,
  };
};

export default CurrencyLogic;
