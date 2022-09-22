import { fireEvent, screen, waitFor } from "@testing-library/react"
import EpisodeOverview from "../../src/pages/episode-overview"
import {
  renderAllProviders,
  renderWithApollo,
  renderWithRouter,
} from "../../src/test-utils/render"
import { GET_CHARACTERS, GET_EPISODES } from "../../src/utils/graphql"
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
    renderWithApollo(<EpisodeOverview />)

    const header = screen.getByTestId("header-wrapper")
    expect(header).toBeInTheDocument()
  })

  it("performs a graphql query and renders the <Spinner />, character cards and <Pagination />", async () => {
    renderWithApollo(
      <EpisodeOverview />,
      {},
      { addTypename: false, mocks: [mockData] }
    )

    const mockDataEpisodes = mockData.result.data.episodes.results
    const mockDataEpisodeLength = mockDataEpisodes.length

    expect(screen.getByTestId("spinner")).toBeInTheDocument()

    const pagination = screen.getByTestId("pagination")
    expect(pagination).toBeInTheDocument()

    await waitFor(() => {
      const charCardWrapper = screen.getByTestId("episode-card-wrapper")
      expect(charCardWrapper).toBeInTheDocument()
      expect(charCardWrapper.childNodes.length).toBe(mockDataEpisodeLength)
    })

    for (const i of Array.from(
      { length: mockDataEpisodeLength },
      (_, i) => i
    )) {
      const charCard = screen.getByTestId(`card-${mockDataEpisodes[i]!.name}`)
      expect(charCard).toBeInTheDocument()

      expect(charCard).toContainElement(
        screen.getByText(mockDataEpisodes[i]!.name)
      )
      expect(charCard).toContainElement(
        screen.getByText(mockDataEpisodes[i]!.episode)
      )
      expect(charCard).toContainElement(
        screen.getByText(`First aired: ${mockDataEpisodes[i]!.air_date}`)
      )
    }
  })

  it("navigates on click of a card", async () => {
    renderWithApollo(
      <EpisodeOverview />,
      {},
      { addTypename: false, mocks: [mockData] }
    )
    // const { router } = renderWithRouter(
    //   <MockedProvider>{container}</MockedProvider>
    // )
    // const { router } = renderAllProviders(
    //   <EpisodeOverview />,
    //   {},
    //   { addTypename: false, mocks: [mockData] },
    //   {}
    // )

    const mockDataEpisodes = mockData.result.data.episodes.results
    const mockDataEpisodeLength = mockDataEpisodes.length

    expect(screen.getByTestId("spinner")).toBeInTheDocument()

    const pagination = screen.getByTestId("pagination")
    expect(pagination).toBeInTheDocument()

    await waitFor(() => {
      // TODO: See character-overview test, route testing currently not implemented
    })
  })
})

const mockData = {
  request: {
    query: GET_EPISODES,
    variables: { page: 1 },
  },
  result: {
    data: {
      episodes: {
        info: {
          count: 51,
          pages: 3,
          next: 2,
          prev: null,
        },
        results: [
          {
            id: "1",
            name: "Pilot",
            air_date: "December 2, 2013",
            episode: "S01E01",
            created: "2017-11-10T12:56:33.798Z",
          },
          {
            id: "2",
            name: "Lawnmower Dog",
            air_date: "December 9, 2013",
            episode: "S01E02",
            created: "2017-11-10T12:56:33.916Z",
          },
        ],
      },
    },
  },
}
