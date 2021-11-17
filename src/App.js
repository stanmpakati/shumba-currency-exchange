import React from "react";
import "./App.css";

import CurrencyLogic from "./currencyLogic";
import CurrencyComponent from "./components/CurrencyComponent";

function App() {
  const {
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
    clearIfFirstInput,
    changeToCurrency,
    changeFromCurrency,
  } = CurrencyLogic();

  // The amount of each currency
  let baseAmount, toAmount;
  // Changing amount of each text field based on which one was updated by the user
  if (changingBase) {
    baseAmount = amount;
    toAmount = +(amount * exchangeRate).toFixed(2);
  } else {
    baseAmount = +(amount / exchangeRate).toFixed(2);
    toAmount = amount;
  }

  return (
    <>
      <h1 className="font-bold text-white text-xl absolute top-10">
        Shumba Money Exchange Rate Calculator
      </h1>

      {isLoading ? (
        <div className="flex justify-center items-center">
          <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-white"></div>
        </div>
      ) : (
        <div className="container mx-auto bg-gray-50 py-4 px-8 rounded-2xl">
          <div className="mb-8 flex flex-col md:flex-row">
            <div className="flex-grow">
              <CurrencyComponent
                isBase={true}
                excludedCurrency={toCurrency}
                selectedCurrency={fromCurrency}
                onChangeCurrency={(data) => changeFromCurrency(data.value)}
                amount={baseAmount}
                onChangeAmount={onChangeBaseAmount}
                clearIfFirst={clearIfFirstInput}
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
                    fillRule="evenodd"
                    clipRule="evenodd"
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
                onChangeCurrency={(data) => changeToCurrency(data.value)}
                amount={toAmount}
                onChangeAmount={onChangeToAmount}
                clearIfFirst={clearIfFirstInput}
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
              Reset
            </button>
          </div>
        </div>
      )}
    </>
  );
}

export default App;
