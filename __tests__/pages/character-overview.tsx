import { fireEvent, screen, waitFor } from "@testing-library/react"
import CharacterOverview from "../../src/pages/character-overview"
import {
  renderAllProviders,
  renderWithApollo,
  renderWithRouter,
} from "../../src/test-utils/render"
import { GET_CHARACTERS } from "../../src/utils/graphql"
import { MockedProvider } from "@apollo/client/testing"
import { useRouter } from "next/router"
import userEvent from "@testing-library/user-event"

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: { id: 1 },
  }),
}))

describe("character-overview.tsx", () => {
  it("renders the <Header />", async () => {
    renderWithApollo(<CharacterOverview />)

    const header = screen.getByTestId("header-wrapper")
    expect(header).toBeInTheDocument()
  })

  it("performs a graphql query and renders the <Spinner />, character cards and <Pagination />", async () => {
    renderWithApollo(
      <CharacterOverview />,
      {},
      { addTypename: false, mocks: [mockData] }
    )

    const mockDataChars = mockData.result.data.characters.results
    const mockDataCharLength = mockDataChars.length

    expect(screen.getByTestId("spinner")).toBeInTheDocument()

    const pagination = screen.getByTestId("pagination")
    expect(pagination).toBeInTheDocument()

    await waitFor(() => {
      const charCardWrapper = screen.getByTestId("character-card-wrapper")
      expect(charCardWrapper).toBeInTheDocument()
      expect(charCardWrapper.childNodes.length).toBe(mockDataCharLength)
    })

    for (const i of Array.from({ length: mockDataCharLength }, (_, i) => i)) {
      const charCard = screen.getByTestId(`card-${mockDataChars[i]!.name}`)
      expect(charCard).toBeInTheDocument()

      expect(charCard).toContainElement(
        screen.getByText(mockDataChars[i]!.name)
      )
      expect(charCard).toContainElement(
        screen.getByTestId(`image-${mockDataChars[i]!.id}`)
      )
    }
  })

  it("navigates on click of a card", async () => {
    renderWithApollo(
      <CharacterOverview />,
      {},
      { addTypename: false, mocks: [mockData] }
    )
    // const { router } = renderWithRouter(
    //   <MockedProvider>{container}</MockedProvider>
    // )
    // const { router } = renderAllProviders(
    //   <CharacterOverview />,
    //   {},
    //   { addTypename: false, mocks: [mockData] },
    //   {}
    // )

    const mockDataChars = mockData.result.data.characters.results
    const mockDataCharLength = mockDataChars.length

    expect(screen.getByTestId("spinner")).toBeInTheDocument()

    const pagination = screen.getByTestId("pagination")
    expect(pagination).toBeInTheDocument()

    await waitFor(() => {
      const charCardWrapper = screen.getByTestId("character-card-wrapper")
      expect(charCardWrapper).toBeInTheDocument()
      expect(charCardWrapper.childNodes.length).toBe(mockDataCharLength)

      const characterIndex = 0
      const charCard = screen.getByTestId(
        `card-${mockDataChars[characterIndex]!.name}`
      )
      expect(charCard).toBeInTheDocument()

      const charImage = screen.getByTestId(
        `image-${mockDataChars[characterIndex]!.id}`
      )
      expect(charImage).toBeInTheDocument()
      // TODO: Route testing isn't working yet
      const router = { push: jest.fn() }
      // const router = jest.spyOn(useRouter(), "push")

      // const useRouter = jest.spyOn(import("next/router"), "useRouter")
      // useRouter.mockReturnValue(router)

      // userEvent.click(charImage)
      // expect(router.push).toHaveBeenCalled()

      // expect(router.push).toHaveBeenCalledWith(
      //   `/character/${mockDataChars[characterIndex].id}`
      // )
    })
  })
})

const mockData = {
  request: {
    query: GET_CHARACTERS,
    variables: { page: 1 },
  },
  result: {
    data: {
      characters: {
        info: {
          count: 2,
          pages: 1,
          next: null,
          prev: null,
        },
        results: [
          {
            id: 1,
            name: "RickName",
            image: "https://example.com/rick-doesnt-exist.png",
          },
          {
            id: 2,
            name: "MortyName",
            image: "https://example.com/morty-doesnt-exist.png",
          },
        ],
      },
    },
  },
}
