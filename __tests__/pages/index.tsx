import { render, screen, fireEvent } from "@testing-library/react"
import Home from "../../src/pages"
import { createMockRouter } from "../../src/test-utils/createMockRouter"
import { RouterContext } from "next/dist/shared/lib/router-context"

import { useRouter } from "next/router"
import { renderWithRouter } from "../../src/test-utils/render"

// const useRouter = jest.spyOn(Router, "useRouter")

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
    expect(cardWrapper.childNodes.length).toBe(1)
  })

  it("navigates to pages on card click", async () => {
    // const router = createMockRouter({
    //   query: {},
    //   pathname: "/",
    //   basePath: "/",
    // })

    // render(
    //   <RouterContext.Provider value={router}>
    //     <Home />
    //   </RouterContext.Provider>
    // )

    const { router } = renderWithRouter(<Home />)

    const overviewCard = screen.getByText("Character Overview")

    fireEvent.click(overviewCard)

    expect(router.push).toHaveBeenCalledWith("/character-overview")
  })
})
