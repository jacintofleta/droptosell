import Iron from "@hapi/iron";
import { PrismaClient, User } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../lib/cookie";
import { ProcessEnv } from "../types/env";

const prisma = new PrismaClient();

export type NextApiRequestWithUser = NextApiRequest & { user: User | null };

const withUser = (handler: any) => {
  return async (req: NextApiRequestWithUser, res: NextApiResponse) => {
    try {
      const user = await Iron.unseal(
        CookieService.getAuthToken(req.cookies),
        process.env.ENCRYPTION_SECRET as ProcessEnv,
        Iron.defaults
      );

      // Check if the user has the stripe account connected
      const dbUser = await prisma.user.findUnique({
        where: {
          email: user.email as string,
        },
        include: {
          products: true,
        },
      });

      req.user = dbUser;
      return handler(req, res);
    } catch (error) {
      console.log({ error });
      return res.status(401).end();
    }
  };
};

export default withUser;
