import { render } from "@testing-library/react"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { ReactElement, ReactNode } from "react"
import { createMockRouter } from "./createMockRouter"

type WrapperProps = {
  children: ReactNode
}

function renderWithRouter(ui: ReactElement, options = {}, routerOptions = {}) {
  const router = createMockRouter({
    query: {},
    pathname: "/",
    basePath: "/",
    ...routerOptions,
  })

  const Wrapper = ({ children }: WrapperProps) => (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  )

  return { router, ...render(ui, { wrapper: Wrapper, ...options }) }
}

export * from "@testing-library/react"
export { renderWithRouter }
