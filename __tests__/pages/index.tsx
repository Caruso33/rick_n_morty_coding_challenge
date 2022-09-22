import { fireEvent, render, screen } from "@testing-library/react"
import Home from "../../src/pages"
import { renderWithRouter } from "../../src/test-utils/render"

describe("index.tsx", () => {
  it("renders the <Header />, Heading, Info and Cards", async () => {
    render(<Home />)

    const header = screen.getByTestId("header-wrapper")
    expect(header).toBeInTheDocument()

    const heading = screen.getByText(/Rick'n Morty App/i)
    expect(heading).toBeInTheDocument()
    expect(heading.localName).toBe("h1")

    const info = screen.getByText(/Please select card to navigate to page/i)
    expect(info).toBeInTheDocument()

    const cardWrapper = screen.getByTestId("card-wrapper")
    const overviewCard = screen.getByText("Character Overview")
    expect(cardWrapper).toBeInTheDocument()
    expect(cardWrapper).toContainElement(overviewCard)
    expect(cardWrapper.childNodes.length).toBe(2)
  })

  it("navigates to character overview page on card click", async () => {
    const { router } = renderWithRouter(<Home />)

    const overviewCard = screen.getByText("Character Overview")

    fireEvent.click(overviewCard)

    expect(router.push).toHaveBeenCalledWith("/character-overview")
  })

  it("navigates to episode overview page on card click", async () => {
    const { router } = renderWithRouter(<Home />)

    const overviewCard = screen.getByText("Episode Overview")

    fireEvent.click(overviewCard)

    expect(router.push).toHaveBeenCalledWith("/episode-overview")
  })
})
