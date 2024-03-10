/**
 * @jest-environment jsdom
 */
import { render, screen } from "@testing-library/react";
import "@testing-library/jest-dom";

function MyComponent() {
    return (<div>A</div>)
}
it("App Router: Works with dynamic route segments", () => {
  render(<MyComponent />);
});
