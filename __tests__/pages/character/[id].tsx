import { RouterContext } from "next/dist/shared/lib/router-context"
import { fireEvent, screen, waitFor } from "@testing-library/react"
import {
  getRouter,
  renderAllProviders,
  renderWithApollo,
  renderWithRouter,
} from "../../../src/test-utils/render"
import { GET_CHARACTER } from "../../../src/utils/graphql"
import CharacterDetail from "../../../src/pages/character/[id]"

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: { id: 1 },
  }),
}))

describe("character/[id].tsx", () => {
  it("renders the <Header />", async () => {
    renderAllProviders(<CharacterDetail />)

    const header = screen.getByTestId("header-wrapper")
    expect(header).toBeInTheDocument()
  })

  jest.mock("next/router", () => {
    return { useRouter: () => ({ query: { id: 1 } }) }
  })

  it("performs a graphql query and renders the <Spinner /> and character details", async () => {
    renderWithApollo(
      <CharacterDetail />,
      {},
      { addTypename: false, mocks: [mockData] }
    )

    const mockDataChar = mockData.result.data.character

    expect(screen.getByTestId("spinner")).toBeInTheDocument()

    const detailWrapper = await screen.findByTestId("detail-wrapper")
    expect(detailWrapper).toBeInTheDocument()

    expect(detailWrapper).toHaveTextContent(mockDataChar.name)
    expect(detailWrapper).toHaveTextContent(mockDataChar.gender)
    expect(detailWrapper).toHaveTextContent(mockDataChar.species)
    expect(detailWrapper).toHaveTextContent(mockDataChar.status)
    expect(detailWrapper).toHaveTextContent(mockDataChar.location.name)
    expect(detailWrapper).toHaveTextContent(mockDataChar.episode.length.toString())

    expect(
      screen.getByAltText(`profile image of ${mockDataChar.name}`)
    ).toBeInTheDocument()
  })
})

const mockData = {
  request: {
    query: GET_CHARACTER,
    variables: { id: 1 },
  },
  result: {
    data: {
      character: {
        name: "Rick Sanchez",
        status: "Alive",
        species: "Human",
        gender: "Male",
        image: "https://rickandmortyapi.com/api/character/avatar/1.jpeg",
        location: {
          name: "Citadel of Ricks",
        },
        episode: [
          {
            id: "1",
          },
          {
            id: "2",
          },
        ],
      },
    },
  },
}
