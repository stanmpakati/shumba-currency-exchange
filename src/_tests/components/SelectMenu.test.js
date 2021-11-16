import { render, screen, fireEvent } from "@testing-library/react";

import SelectMenu from "../../components/selectMenu";

test("On render does button get name of passed currency", () => {
  render(
    <SelectMenu
      currencies={[
        { value: "GBP", name: "pound", symbol: "U" },
        { value: "USD", name: "dollar", symbol: "U" },
      ]}
      selectedCurrency={{ value: "USD", name: "dollar", symbol: "U" }}
    />
  );

  const usd = screen.getByRole("button", { name: "dollar" });

  expect(usd).toBeTruthy();
});

test("On render do options have the length of passed in props", () => {
  render(
    <SelectMenu
      currencies={[
        { value: "GBP", name: "pound", symbol: "U" },
        { value: "USD", name: "dollar", symbol: "U" },
      ]}
      selectedCurrency={{ value: "USD", name: "dollar", symbol: "U" }}
    />
  );

  const btn = screen.getByRole("button", { name: "dollar" });
  fireEvent.click(btn);

  //   Confirm ListBox with name of selectedCurrency.name
  const listBox = screen.getByRole("listbox", {
    name: /dollar/i,
  });

  expect(listBox).toBeTruthy();

  //   Confirm presence of other currency
  const gbp = screen.getByRole("option", {
    name: /gbp - pound/i,
  });

  expect(gbp).toBeTruthy();
});

test("Confirm Change of currency on option click", () => {
  const mockChangeCurrency = jest.fn();

  render(
    <SelectMenu
      currencies={[
        { value: "GBP", name: "pound", symbol: "U" },
        { value: "USD", name: "dollar", symbol: "U" },
      ]}
      selectedCurrency={{ value: "USD", name: "dollar", symbol: "U" }}
      onChangeCurrency={mockChangeCurrency}
    />
  );

  const btn = screen.getByRole("button", { name: "dollar" });
  fireEvent.click(btn);

  // Click option
  fireEvent.click(
    screen.getByRole("option", {
      name: /gbp - pound/i,
    })
  );

  // check If called
  expect(mockChangeCurrency).toHaveBeenCalled();
});
