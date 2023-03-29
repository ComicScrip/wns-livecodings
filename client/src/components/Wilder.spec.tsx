import { render, screen } from "@testing-library/react";
import Wilder from "./Wilder";
import { MockedProvider } from "@apollo/client/testing";
import { BrowserRouter } from "react-router-dom";
import { GetProfileDocument } from "../gql/generated/schema";

const adminProfileMock = {
  request: {
    query: GetProfileDocument,
  },
  result: {
    data: {
      profile: { id: "1", email: "admin@website.com", role: "admin" },
    },
  },
};

describe("Wilder component", () => {
  it("should properly render the wilder passed in prop", () => {
    const view = render(
      <MockedProvider mocks={[adminProfileMock]} addTypename={false}>
        <Wilder
          wilder={{
            id: 1,
            name: "Dave",
            skills: [
              { id: 1, name: "PHP", votes: 3 },
              { id: 2, name: "JS", votes: 7 },
            ],
          }}
        />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );

    expect(screen.getByText(/Dave/)).toBeVisible();
    expect(screen.getByText(/PHP/)).toBeVisible();
    expect(screen.getByText(/JS/)).toBeVisible();
    expect(screen.getByText(/3/)).toBeVisible();
    expect(screen.getByText(/7/)).toBeVisible();

    expect(view.baseElement).toMatchSnapshot();
  });

  it("should display a delete button when logged in with admin", async () => {
    render(
      <MockedProvider mocks={[adminProfileMock]} addTypename={false}>
        <Wilder
          wilder={{
            id: 1,
            name: "Dave",
            skills: [],
          }}
        />
      </MockedProvider>,
      { wrapper: BrowserRouter }
    );

    expect(await screen.findByText(/x/)).toBeVisible();
  });
});
