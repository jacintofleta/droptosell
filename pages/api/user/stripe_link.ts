import type { NextApiResponse } from "next";
import withUser, { NextApiRequestWithUser } from "../../../middleware/withUser";
import { UserWithStripe } from "./user";

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY_TEST);

const stripe_link = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  try {
    const user = req.user as UserWithStripe;

    const accountLink = await stripe.accountLinks.create({
      account: user?.stripeAccountId,
      refresh_url: process.env.STRIPE_RETURN_URL,
      return_url: process.env.STRIPE_RETURN_URL,
      type: "account_onboarding",
    });

    return res.status(200).json(accountLink);
  } catch (error) {
    return res.status(401).end();
  }
};

export default withUser(stripe_link);
