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
