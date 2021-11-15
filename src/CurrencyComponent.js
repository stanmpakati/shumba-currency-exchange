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
    { value: "USD", name: "United States Dollar", avatar: "./assets/usa.svg" },
    { value: "GBP", name: "Great Britain Pound", avatar: "./assets/uk.svg" },
    { value: "EUR", name: "Euro", avatar: "./assets/eu.svg" },
    { value: "ZAR", name: "South African Rand", avatar: "./assets/zar.svg" },
  ];

  const varia = currencies.find(
    (currency) => currency.value === selectedCurrency
  );

  return (
    <div className="flex flex-col">
      <p>{isBase ? "From" : "To"}</p>
      {/* <img src={uKLogo} /> */}
      {/* <Select
        placeholder={selectedCurrency}
        defaultValue={selectedCurrency}
        options={currencies}
        isClearable={false}
        isSearchable={false}
        onChange={onChangeCurrency}
      /> */}
      <SelectMenu
        currencies={currencies}
        selectedCurrency={varia}
        onChangeCurrency={onChangeCurrency}
      />

      <input type="number" value={amount && amount} onChange={onChangeAmount} />
    </div>
  );
}

// {currencyOptions.map((option) => (
//   <option key={option} value={option}>
//     {option === "USD" && (
//       <div>
//         {/* <UKLogo className="country-flag" /> */}
//         USD - United Stated Dollar
//       </div>
//     )}
//     {option === "GBP" && "GBP - Great British Pound"}
//     {option === "EUR" && "EUR - Euro"}
//     {option === "ZAR" && "ZAR - South African Rand"}
//   </option>
// ))}
// </Select>
