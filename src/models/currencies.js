import { ReactComponent as EUIcon } from "../assets/eu.svg";
import { ReactComponent as UKIcon } from "../assets/uk.svg";
import { ReactComponent as USAIcon } from "../assets/usa.svg";
import { ReactComponent as SAIcon } from "../assets/sa.svg";

// A list of the currencies being used and relevant data
const currencies = [
  {
    value: "USD",
    name: "United States Dollar",
    avatar: <USAIcon className="country-flag" />,
    symbol: "$",
  },
  {
    value: "GBP",
    name: "Great British Pound",
    avatar: <UKIcon className="country-flag" />,
    symbol: "£",
  },
  {
    value: "EUR",
    name: "Euro",
    avatar: <EUIcon className="country-flag" />,
    symbol: "€",
  },
  {
    value: "ZAR",
    name: "South African Rand",
    avatar: <SAIcon className="country-flag" />,
    symbol: "R",
  },
];

export default currencies;
