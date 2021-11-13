import React from "react";

export default function CurrencyComponent(props) {
  /**
   * Function renders a component where you can select country or amount to exchange
   * Accepts a props object which is an object which contains:
   * * currencyOptions: a list of available currencies
   * *
   **/
  const { currencyOptions } = props;

  return (
    <div>
      <select>
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
