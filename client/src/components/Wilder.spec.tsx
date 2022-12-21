import React from "react";
import { render, screen } from "@testing-library/react";
import Wilder from "./Wilder";
import { MockedProvider } from "@apollo/client/testing";
import "@testing-library/jest-dom/extend-expect";
import { BrowserRouter } from "react-router-dom";

test("renders Wilder with name and skills", () => {
  const tree = render(
    <MockedProvider mocks={[]} addTypename={false}>
      <Wilder
        wilder={{
          id: 1,
          name: "Dave",
          skills: [
            { id: 1, name: "PHP", votes: 3 },
            { id: 1, name: "JS", votes: 7 },
          ],
        }}
      />
    </MockedProvider>,
    { wrapper: BrowserRouter }
  );
  expect(screen.getByText(/Dave/)).toBeInTheDocument();
  expect(screen.getByText(/PHP/)).toBeInTheDocument();
  expect(screen.getByText(/JS/)).toBeInTheDocument();
  expect(screen.getByText(/3/)).toBeInTheDocument();
  expect(screen.getByText(/7/)).toBeInTheDocument();
  expect(tree.baseElement).toMatchInlineSnapshot(`
<body>
  <div>
    <div
      class="flex bg-white p-4 rounded-2xl mb-4 shadow-md"
    >
      <a
        href="/wilders/1"
      >
        <img
          alt="Dave"
          class="h-16 w-16 rounded-full mr-6"
          src="avatar.png"
        />
      </a>
      <div
        class="flex justify-between w-full  min-w-[200px]"
      >
        <div
          class="flex flex-col"
        >
          <a
            href="/wilders/1"
          >
            <h3
              class="font-semibold"
            >
              Dave
            </h3>
          </a>
          <ul
            class="flex flex-wrap"
          >
            <li
              class="transition-all duration-500 flex items-center mr-4 mb-3 bg-black/5 hover:bg-black/10 p-1 pl-2 pr-2 rounded-xl cursor-pointer border hover:border-black/5 "
            >
              JS
              <div
                class="items-center flex bg-black/30 text-white rounded-[9999px] h-[25px] pr-2 pl-2 justify-center ml-2 transition-all duration-1000"
              >
                <div
                  class="transition-all duration-1000"
                >
                  7
                </div>
              </div>
            </li>
            <li
              class="transition-all duration-500 flex items-center mr-4 mb-3 bg-black/5 hover:bg-black/10 p-1 pl-2 pr-2 rounded-xl cursor-pointer border hover:border-black/5 "
            >
              PHP
              <div
                class="items-center flex bg-black/30 text-white rounded-[9999px] h-[25px] pr-2 pl-2 justify-center ml-2 transition-all duration-1000"
              >
                <div
                  class="transition-all duration-1000"
                >
                  3
                </div>
              </div>
            </li>
          </ul>
        </div>
        <div
          class="flex flex-col min-w-[40px]"
        >
          <a
            href="/wilders/1/edit"
          >
            <button
              class="mb-2 w-full"
            >
              ✏️
            </button>
          </a>
          <button>
            x
          </button>
        </div>
      </div>
    </div>
  </div>
</body>
`);
});
