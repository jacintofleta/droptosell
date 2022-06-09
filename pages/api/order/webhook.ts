import type { NextApiResponse } from "next";
import { NextApiRequestWithUser } from "../../../middleware/withUser";
import { buffer } from "micro";
import { PrismaClient } from "@prisma/client";

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY);

const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET_KEY;

const prisma = new PrismaClient();

const sgMail = require("@sendgrid/mail");
sgMail.setApiKey(process.env.SENDGRID_API_KEY);

export const config = {
  api: {
    bodyParser: false,
  },
};

const webhook = async (req: NextApiRequestWithUser, res: NextApiResponse) => {
  // Check valid call to the webhook from Stripe
  const buf = await buffer(req);
  const sig = req.headers["stripe-signature"];
  let event;

  try {
    event = stripe.webhooks.constructEvent(buf, sig, endpointSecret);
  } catch (error) {
    console.log(error);
    return res.status(400).send(`Webhook Error`);
  }

  if (event.type !== "checkout.session.completed") {
    return res.status(403).end();
  }

  const session = event.data.object;
  const connectedAccountId = event.account;

  try {
    const lineItems = await stripe.checkout.sessions.listLineItems(
      event.data.object.id,
      { stripeAccount: connectedAccountId }
    );

    const dbUser = await prisma.user.findUnique({
      where: {
        stripeAccountId: connectedAccountId,
      },
      include: {
        products: true,
      },
    });

    if (!dbUser) return res.status(403).send("User not found");

    // We always have just 1 item per order
    const item = lineItems.data[0];

    const dbProduct = dbUser.products.find(
      (product) => product.stripeProductId === item.price.product
    );

    if (!dbProduct) return res.status(403).send("Product not found");

    await prisma.order.create({
      data: {
        stripeProductId: item.price.product,
        stripePriceId: item.price.id,
        stripeAccountId: connectedAccountId,
        currency: item.currency,
        amount: item.amount_total,
        customerEmail: session.customer_details.email,
        product: {
          connect: {
            id: dbProduct.id,
          },
        },
      },
    });

    console.log(session.customer_details.email);

    const msg = {
      to: session.customer_details.email,
      from: "jacin@droptosell.com",
      subject: "Download your file",
      text: "Thank you for your purchase.",
      html: `<strong><a href=${dbProduct.awsFileUrl}>Download</a></strong>`,
    };
    sgMail
      .send(msg)
      .then(() => {
        console.log("Email sent");
      })
      .catch((error: any) => {
        console.error(error);
      });

    return res.status(200).end();
  } catch (error) {
    console.log(error);
    return res.status(403).end();
  }
};

export default webhook;
