import { render, screen } from "@testing-library/react";
import App from "./App";

test("renders recipe explorer header", () => {
  render(<App />);
  expect(screen.getByText(/recipe explorer/i)).toBeInTheDocument();
});
