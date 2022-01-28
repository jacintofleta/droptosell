import Iron from "@hapi/iron";
import type { NextApiRequest, NextApiResponse } from "next";
import { ProcessEnv } from "../../types/env";
import CookieService from "../../lib/cookie";
import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY_TEST);

const stripe_link = async (req: NextApiRequest, res: NextApiResponse) => {
  let user;
  try {
    //FIXME: Get the user could be a middleware
    user = await Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET as ProcessEnv,
      Iron.defaults
    );

    // Check if the user has the stripe account connected
    const dbUser = await prisma.user.findUnique({
      where: {
        email: user.email as string,
      },
    });

    const accountLink = await stripe.accountLinks.create({
      account: dbUser?.stripeAccountId,
      refresh_url: process.env.STRIPE_RETURN_URL,
      return_url: process.env.STRIPE_RETURN_URL,
      type: "account_onboarding",
    });

    return res.status(200).json(accountLink);
  } catch (error) {
    console.log(error);
    return res.status(401).end();
  }
  // now we have access to the data inside of user
  // and we could make database calls or just send back what we have
  // in the token.
};

export default stripe_link;
