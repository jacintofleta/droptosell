// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";
import { ProcessEnv } from "../../types/env";
import { PrismaClient } from "@prisma/client";

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY_TEST);

const prisma = new PrismaClient();

let magic = new Magic(process.env.MAGIC_SECRET_KEY);

type Data = {
  name: string;
};

export default async function login(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  if (req.method !== "POST") return res.status(405).end();

  try {
    // exchange the DID from Magic for some user data
    const did = magic.utils.parseAuthorizationHeader(
      req.headers.authorization as string
    );

    // Get the info from Magic
    const user = await magic.users.getMetadataByToken(did);

    // Author a couple of cookies to persist a user's session
    const token = await Iron.seal(
      user,
      process.env.ENCRYPTION_SECRET as ProcessEnv,
      Iron.defaults
    );

    // Get the user from DB
    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.email as string,
      },
    });

    if (!dbUser) {
      // Create the stripe account
      const stripeAccount = await stripe.accounts.create({
        type: "standard",
        email: user.email,
      });

      // Save the user in the DB
      await prisma.user.create({
        data: {
          email: user.email as string,
          stripeAccountId: stripeAccount.id as string,
        },
      });
    }

    CookieService.setTokenCookie(res, token);

    //Save user in the db
  } catch (error) {
    console.log({ error });
  }

  res.end();
}
