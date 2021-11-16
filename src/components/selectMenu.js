/* This example requires Tailwind CSS v2.0+ */
import { Fragment } from "react";
import { Listbox, Transition } from "@headlessui/react";

// Function to track classNames
function classNames(...classes) {
  return classes.filter(Boolean).join(" ");
}

export default function SelectMenu(props) {
  /**
   * Function renders a select menu where you can pick a different currency from the dropdown
   * recieves a props object which contains:
   * * currencies: an array of currency objects with a currency's
   * * * value: a currency's abbreviation
   * * * name: full name of the currency
   * * * symbol: the currency symbol
   *
   * * selectedCurrency: the currency chosen from the dropdown
   *
   * * onChangeCurrency: a function that notifies the parent when the selectedCurrency is changed
   */
  const { currencies, selectedCurrency, onChangeCurrency } = props;

  return (
    <Listbox value={selectedCurrency.value} onChange={onChangeCurrency}>
      {({ open }) => (
        <>
          <div className="mt-1 relative">
            <Listbox.Button
              aria-label={selectedCurrency.name}
              className="relative w-full bg-white border border-gray-300 rounded-md shadow-sm pl-3 pr-10 py-2 text-left cursor-default focus:outline-none focus:ring-1 focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm"
            >
              <span className="flex items-center">
                {selectedCurrency.avatar}
                <span className="ml-3 block truncate">
                  <strong>{selectedCurrency.value} - </strong>
                  {selectedCurrency.name}
                </span>

                <span className="flex-grow"></span>

                <svg
                  className="h-4 float-left fill-current text-gray-600"
                  version="1.1"
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 129 129"
                  enableBackground="new 0 0 129 129"
                >
                  <g>
                    <path d="m121.3,34.6c-1.6-1.6-4.2-1.6-5.8,0l-51,51.1-51.1-51.1c-1.6-1.6-4.2-1.6-5.8,0-1.6,1.6-1.6,4.2 0,5.8l53.9,53.9c0.8,0.8 1.8,1.2 2.9,1.2 1,0 2.1-0.4 2.9-1.2l53.9-53.9c1.7-1.6 1.7-4.2 0.1-5.8z" />
                  </g>
                </svg>
              </span>
            </Listbox.Button>

            <Transition
              show={open}
              as={Fragment}
              leave="transition ease-in duration-100"
              leaveFrom="opacity-100"
              leaveTo="opacity-0"
            >
              <Listbox.Options className="absolute z-10 mt-1 w-full bg-white shadow-lg max-h-56 rounded-md py-1 text-base ring-1 ring-black ring-opacity-5 overflow-auto focus:outline-none sm:text-sm">
                {currencies.map((currency) => (
                  <Listbox.Option
                    key={currency.value}
                    className={({ active }) =>
                      classNames(
                        active ? "text-white bg-indigo-600" : "text-gray-900",
                        "cursor-default select-none relative py-2 pl-3 pr-9"
                      )
                    }
                    value={currency}
                  >
                    {({ selected, active }) => (
                      <>
                        <div className="flex items-center">
                          {currency.avatar}
                          <span
                            className={classNames(
                              selected ? "font-semibold" : "font-normal",
                              "ml-3 block truncate"
                            )}
                          >
                            <strong>{currency.value} - </strong>
                            {currency.name}
                          </span>
                        </div>
                      </>
                    )}
                  </Listbox.Option>
                ))}
              </Listbox.Options>
            </Transition>
          </div>
        </>
      )}
    </Listbox>
  );
}
