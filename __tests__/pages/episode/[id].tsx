import { screen } from "@testing-library/react"
import EpisodeDetail from "../../../src/pages/episode/[id]"
import {
  renderAllProviders,
  renderWithApollo,
} from "../../../src/test-utils/render"
import { GET_EPISODE } from "../../../src/utils/graphql"

jest.mock("next/router", () => ({
  useRouter: () => ({
    push: jest.fn(),
    query: { id: 1 },
  }),
}))

describe("episode/[id].tsx", () => {
  it("renders the <Header />", async () => {
    renderAllProviders(<EpisodeDetail />)

    const header = screen.getByTestId("header-wrapper")
    expect(header).toBeInTheDocument()
  })

  it("performs a graphql query and renders the <Spinner /> and episode details", async () => {
    renderWithApollo(
      <EpisodeDetail />,
      {},
      { addTypename: false, mocks: [mockData] }
    )

    const mockDataEpisode = mockData.result.data.episode

    expect(screen.getByTestId("spinner")).toBeInTheDocument()

    const detailWrapper = await screen.findByTestId("detail-wrapper")
    expect(detailWrapper).toBeInTheDocument()

    expect(detailWrapper).toHaveTextContent(mockDataEpisode.name)
    expect(detailWrapper).toHaveTextContent(mockDataEpisode.episode)
    expect(detailWrapper).toHaveTextContent(mockDataEpisode.air_date)
    expect(detailWrapper).toHaveTextContent(mockDataEpisode.created)

    for (const char of mockDataEpisode.characters.map((char) => char.name)) {
      expect(detailWrapper).toHaveTextContent(char)
    }
  })
})

const mockData = {
  request: {
    query: GET_EPISODE,
    variables: { id: 1 },
  },
  result: {
    data: {
      episode: {
        id: "1",
        name: "Pilot",
        episode: "S01E01",
        air_date: "December 2, 2013",
        created: "2017-11-10T12:56:33.798Z",
        characters: [
          {
            name: "Rick Sanchez",
          },
          {
            name: "Morty Smith",
          },
        ],
      },
    },
  },
}
