import React from "react";

export default function CurrencyComponent(props) {
  /**
   * Function renders a component where you can select country or amount to exchange
   * Accepts a props object which is an object which contains:
   * * isBase: a boolean determining if component is the base or secondary
   * * currencyOptions: a list of available currencies
   * * selectedCurrency: a string of the highlighted currency
   **/
  //  Destructure the props object
  const { isBase, currencyOptions, selectedCurrency } = props;

  return (
    <div>
      <p>{isBase ? "From" : "To"}</p>
      <select value={selectedCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
      <input type="number" />
    </div>
  );
}
