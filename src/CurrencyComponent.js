import React from "react";

import SelectMenu from "./components/selectMenu";
// import { uKLogo } from "./assets/uk.svg";

export default function CurrencyComponent(props) {
  /**
   * Function renders a component where you can select country or amount to exchange
   * Accepts a props object which is an object which contains:
   * * isBase: a boolean determining if component is the base or secondary
   * * currencyOptions: a list of available currencies
   * * selectedCurrency: a string of the highlighted currency
   * * amount: a number for the amount in that currency
   **/
  //  Destructure the props object
  const {
    isBase,
    currencyOptions,
    selectedCurrency,
    onChangeCurrency,
    amount,
    onChangeAmount,
  } = props;

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

  const usedCurrencyObjects = currencies.filter(
    (currency) => currencies.value !== selectedCurrency
  );

  const currencyObject = currencies.find(
    (currency) => currency.value === selectedCurrency
  );

  return (
    <div className="flex flex-col">
      <p className="mb-4">{isBase ? "From" : "To"}</p>
      {/* <img src={uKLogo} /> */}
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
