import React from "react";

import SelectMenu from "./components/selectMenu";

export default function CurrencyComponent(props) {
  /**
   * Function renders a component where you can select country or amount to exchange
   * Accepts a props object which is an object which contains:
   * * isBase: a boolean determining if component is the base or secondary
   * * excludedCurrency: a string of the value of the currency being compared to
   * *                   so it can be excluded and avoid duplication
   * * selectedCurrency: a string of the highlighted currency
   * * amount: a number for the amount in that currency
   *
   * * onChangeCurrency: a function that changes the state when a new currency is picked from the dropdown
   * * onChangeAmount: a function that updates state when a user changes the amount on any text field
   **/
  //  Destructure the props object
  const {
    isBase,
    excludedCurrency,
    selectedCurrency,
    amount,
    onChangeCurrency,
    onChangeAmount,
  } = props;

  // A list of the currencies being used and relevant data
  const currencies = [
    {
      value: "USD",
      name: "United States Dollar",
      avatar: "./assets/usa.svg",
      symbol: "$",
    },
    {
      value: "GBP",
      name: "Great Britain Pound",
      avatar: "./assets/uk.svg",
      symbol: "£",
    },
    { value: "EUR", name: "Euro", avatar: "./assets/eu.svg", symbol: "€" },
    {
      value: "ZAR",
      name: "South African Rand",
      avatar: "./assets/zar.svg",
      symbol: "R",
    },
  ];

  // list of filtered currencies (excluding the currency being compared to)
  let usedCurrencyObjects = currencies.filter(
    (currency) => currency.value !== excludedCurrency
  );

  // Turning the current Currency value into an object
  const currencyObject = currencies.find(
    (currency) => currency.value === selectedCurrency
  );

  return (
    <div className="flex flex-col">
      <p className="mb-4">{isBase ? "From" : "To"}</p>
      <SelectMenu
        currencies={usedCurrencyObjects}
        selectedCurrency={currencyObject}
        onChangeCurrency={onChangeCurrency}
      />

      <div className="mt-2 flex items-center border-b border-green-500 py-2">
        <span className="ml-2 font-bold">{currencyObject.symbol}</span>
        <input
          type="number"
          value={amount && amount}
          onChange={onChangeAmount}
          className="appearance-none bg-transparent border-none w-full text-gray-700 mr-3 py-1 px-2 leading-tight focus:outline-none"
        />
      </div>
    </div>
  );
}
