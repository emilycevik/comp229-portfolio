import { render, screen } from "@testing-library/react";
import App from "./App";
import "@testing-library/jest-dom";

// ✅ Mock AuthContext so App doesn’t crash
vi.mock("./context/AuthContext", () => ({
  useAuth: () => ({
    signout: vi.fn(),
  }),
}));

describe("App Home Page", () => {
  it("renders the Home heading", () => {
    render(<App />); // ❗ Removed BrowserRouter wrapper

    expect(
      screen.getByText("Welcome to the Portfolio Admin Dashboard")
    ).toBeInTheDocument();
  });
});
