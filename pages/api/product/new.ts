import { PrismaClient } from "@prisma/client";
import type { NextApiResponse } from "next";
import withUser, { NextApiRequestWithUser } from "../../../middleware/withUser";
import { UserWithStripe } from "../user/user";

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

const prisma = new PrismaClient();

const newProduct = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const user = req.user as UserWithStripe;
    // FIXME: Add validation
    const { name, currency, amount, awsFileUrl, awsFileKey } = JSON.parse(
      req.body
    );

    // Create a new Stripe product price and payment link
    const stripeProduct = await stripe.products.create(
      {
        name,
      },
      {
        stripeAccount: user.stripeAccountId,
      }
    );

    const stripePrice = await stripe.prices.create(
      {
        unit_amount: amount * 100,
        currency,
        product: stripeProduct.id,
      },
      {
        stripeAccount: user.stripeAccountId,
      }
    );

    const stripePaymentLink = await stripe.paymentLinks.create(
      {
        line_items: [
          {
            price: stripePrice.id,
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
        stripeProductId: stripeProduct.id,
        stripePriceId: stripePrice.id,
        stripePaymentLinkId: stripePaymentLink.id,
        stripePaymentLinkUrl: stripePaymentLink.url,
        awsFileUrl,
        awsFileKey,
        title: name,
        user: {
          connect: {
            id: user.id,
          },
        },
      },
    });

    return res.status(200).json({ paymentLink: stripePaymentLink.url });
  } catch (error) {
    console.log(error);
    return res.status(403).end();
  }
};

export default withUser(newProduct);
