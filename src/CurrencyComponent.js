import React from "react";
import { ReactComponent as UKLogo } from "./assets/uk.svg";

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

  return (
    <div>
      <p>{isBase ? "From" : "To"}</p>
      <select value={selectedCurrency} onChange={onChangeCurrency}>
        {currencyOptions.map((option) => (
          <option key={option} value={option}>
            {option === "USD" && (
              <div>
                {/* <UKLogo className="country-flag" /> */}
                USD - United Stated Dollar
              </div>
            )}
            {option === "GBP" && "GBP - Great British Pound"}
            {option === "EUR" && "EUR - Euro"}
            {option === "ZAR" && "ZAR - South African Rand"}
          </option>
        ))}
      </select>

      <input type="number" value={amount} onChange={onChangeAmount} />
    </div>
  );
}
