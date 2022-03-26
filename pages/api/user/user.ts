import { User } from "@prisma/client";
import type { NextApiResponse } from "next";
import withUser, { NextApiRequestWithUser } from "../../../middleware/withUser";

export type UserWithStripe = User & { stripeConnected?: boolean };
const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY_TEST);

const user = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  try {
    const user = req.user as UserWithStripe;

    const stripeAccount = await stripe.accounts.retrieve(user?.stripeAccountId);

    user.stripeConnected = stripeAccount?.details_submitted ? true : false;

    return res.json(user);
  } catch (error) {
    return res.status(401).end();
  }
};

export default withUser(user);
