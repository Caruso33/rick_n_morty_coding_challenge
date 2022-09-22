import { render } from "@testing-library/react"
import { RouterContext } from "next/dist/shared/lib/router-context"
import { ReactElement, ReactNode } from "react"
import { createMockRouter } from "./createMockRouter"
import { MockedProvider } from "@apollo/client/testing"

type WrapperProps = {
  children: ReactNode
}

function renderWithRouter(
  ui: ReactElement,
  renderOptions = {},
  routerOptions = {}
) {
  const router = getRouter(routerOptions)

  const Wrapper = ({ children }: WrapperProps) => (
    <RouterContext.Provider value={router}>{children}</RouterContext.Provider>
  )

  return { router, ...render(ui, { wrapper: Wrapper, ...renderOptions }) }
}

function renderWithApollo(
  ui: ReactElement,
  renderOptions = {},
  apolloOptions = {}
) {
  const Wrapper = ({ children }: WrapperProps) => (
    <MockedProvider {...apolloOptions}>{children}</MockedProvider>
  )

  return render(ui, { wrapper: Wrapper, ...renderOptions })
}

function renderAllProviders(
  ui: ReactElement,
  renderOptions = {},
  apolloOptions = {},
  routerOptions = {}
) {
  // FIXME For some reason nesting the providers doesn't work and routing can't be tested that way
  // Reason unclear

  const router = getRouter(routerOptions)

  const Wrapper = ({ children }: WrapperProps) => (
    <RouterContext.Provider value={router}>
      <MockedProvider {...apolloOptions}>{children}</MockedProvider>
    </RouterContext.Provider>
  )

  return {
    router,
    ...render(ui, {
      wrapper: Wrapper,
      ...renderOptions,
    }),
  }
}

export * from "@testing-library/react"
export { renderWithRouter, renderWithApollo, renderAllProviders }

export function getRouter(routerOptions = {}) {
  const router = createMockRouter({
    query: {},
    pathname: "/",
    basePath: "/",
    ...routerOptions,
  })

  return router
}
