import { PrismaClient } from "@prisma/client";

// We have to do this boilerplate because of an issue with Next clearing the cache in dev mode
// See https://www.prisma.io/docs/support/help-articles/nextjs-prisma-client-dev-practices

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line no-var
  var prisma: PrismaClient | undefined;
}

export const prisma = global.prisma || new PrismaClient();

if (process.env.NODE_ENV !== "production") global.prisma = prisma;
