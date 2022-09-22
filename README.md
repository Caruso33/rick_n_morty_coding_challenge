# Rick'n Morty Coding Challenge

Based on [the following instructions](https://gist.github.com/rechenberger/2b11fc22730efdd0513272b153bf9311)

Deployment is [found here](https://rick-n-morty-challenge.vercel.app/)

## Run

`cp .env-example .env` - fill env credentials in `.env`

`yarn install` - install dependencies

`yarn dev` - run development server

## Deploy

`npx vercel --prod $(pwd)` - use vercel to deploy `nextjs` app

## Todo

- testing
  - route testing (next/router)
  - e2e testing
  - extend testing, unit tests / smaller components
- github actions >> testing & deployment
- serious auth
- serverside graphql calls?

## To consider

- Graphql query
  - character overview: number of episodes based on episode { id } -> DB Load?
  - serversideprops vs clientside fetching?
