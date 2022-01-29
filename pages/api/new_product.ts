import { PrismaClient } from "@prisma/client";
import type { NextApiResponse } from "next";
import withUser, { NextApiRequestWithUser } from "../../middleware/withUser";
import { UserWithStripe } from "./user";

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY_TEST);

const prisma = new PrismaClient();

const newProduct = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const user = req.user as UserWithStripe;
    // FIXME: Add validation
    const { name, currency, amount } = JSON.parse(req.body);

    // Create a new Stripe product price and payment link
    const product = await stripe.products.create(
      {
        name,
      },
      {
        stripeAccount: user.stripeAccountId,
      }
    );

    const price = await stripe.prices.create(
      {
        unit_amount: amount * 100,
        currency,
        product: product.id,
      },
      {
        stripeAccount: user.stripeAccountId,
      }
    );

    const paymentLink = await stripe.paymentLinks.create(
      {
        line_items: [
          {
            price: price.id,
            quantity: 1,
          },
        ],
        application_fee_amount: amount * 100 * 0.05,
      },
      {
        stripeAccount: user.stripeAccountId,
      }
    );

    await prisma.product.create({
      data: {
        stripeProductId: product.id,
        stripePriceId: price.id,
        stripePaymentLinkId: paymentLink.id,
        file: "google.es",
      },
    });

    return res.status(200).json({ paymentLink: paymentLink.url });
  } catch (error) {
    console.log(error);
    return res.status(403).end();
  }
};

export default withUser(newProduct);
