import Iron from "@hapi/iron";
import { PrismaClient } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../lib/cookie";
import { ProcessEnv } from "../../types/env";

const prisma = new PrismaClient();

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY_TEST);

const user = async (req: NextApiRequest, res: NextApiResponse) => {
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

    const stripeAccount = await stripe.accounts.retrieve(
      dbUser?.stripeAccountId
    );

    user.stripeConnected = stripeAccount?.details_submitted ? true : false;
  } catch (error) {
    return res.status(401).end();
  }

  // now we have access to the data inside of user
  // and we could make database calls or just send back what we have
  // in the token.

  res.json(user);
};

export default user;
