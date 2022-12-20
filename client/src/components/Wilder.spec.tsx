import React from "react";
import { render, screen } from "@testing-library/react";
import Wilder from "./Wilder";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

test("renders Wilder with name and skills", () => {
  render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Wilder
        wilder={{
          id: 1,
          name: "Dave",
          skills: [
            { id: 1, name: "JS", votes: 2 },
            { id: 1, name: "PHP", votes: 5 },
          ],
        }}
      />
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
  expect(screen.getByText(/Dave/i)).toBeInTheDocument();
  expect(screen.getByText(/JS/i)).toBeInTheDocument();
  expect(screen.getByText(/PHP/i)).toBeInTheDocument();
  expect(screen.getByText(/2/i)).toBeInTheDocument();
  expect(screen.getByText(/5/i)).toBeInTheDocument();
});
