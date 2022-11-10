# gu-ad-server - Commercial hackday project

## Getting Started

You'll need Postgres running locally to run the application.

(I'm using https://postgresapp.com/. You could also use Docker, or install locally).

Once you have Postgres running you'll need to create an `.env` file that contains something like (you may have to adjust depending on your local setup)

```
DATABASE_URL="postgresql://Username@localhost:5432/postgres"
```

First, run the development server:

```bash
npm run dev
# or
yarn dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

##

Open Prisma Studio with

```bash
yarn prisma studio
```

## Running against Frontend & DCR

Use this branch of Frontend to request and show ads from the local ad server:

branch: https://github.com/guardian/frontend/tree/commercial-hackday-ad-server

tree: https://github.com/guardian/frontend/tree/8ef45b9f1e948e061ad62ddb46ac9e11b87e8286
