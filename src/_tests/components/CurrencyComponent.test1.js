import { render, screen } from "@testing-library/react";
import CurrencyComponent from "../../components/CurrencyComponent";

test("On render does", () => {
  render(
    <CurrencyComponent
      isBase={true}
      excludedCurrency="GBP"
      selectedCurrency="USD"
      amount={2}
    />
  );

  screen.getByRole("spinbutton", { name: "amount" });
});
