import { PrismaClient } from "@prisma/client";
import type { NextApiResponse } from "next";
import withUser, { NextApiRequestWithUser } from "../../../middleware/withUser";
import { UserWithStripe } from "../user/user";

const stripe = require("stripe")(process.env.STRIPE_SECRET_API_KEY_TEST);
const AWS = require("aws-sdk");

const prisma = new PrismaClient();
const s3 = new AWS.S3();
const BUCKET = process.env.S3_UPLOAD_BUCKET;

const deleteProduct = async (
  req: NextApiRequestWithUser,
  res: NextApiResponse
) => {
  if (req.method !== "POST") return res.status(405).end();

  try {
    const user = req.user as UserWithStripe;
    // FIXME: Add validation
    const { productId } = JSON.parse(req.body);

    // Check if the product is from the user
    const product = await prisma.product.findUnique({
      where: {
        id: productId,
      },
    });

    if (!product || product.userId !== user.id) {
      return res.status(403).json({ message: "Forbidden" });
    }

    await prisma.product.update({
      where: {
        id: productId,
      },
      data: {
        deleted: true,
      },
    });

    // Update the Stripe Payment Link to Inactive

    await stripe.paymentLinks.update(
      product.stripePaymentLinkId,
      {
        active: false,
      },
      {
        stripeAccount: user.stripeAccountId,
      }
    );

    // Delete the file in AWS asynchronously
    const params = { Bucket: BUCKET, Key: product.awsFileKey };
    s3.deleteObject(params, function (err: { stack: any }, data: any) {
      if (err) console.log(err, err.stack); // error
      else console.log(); // deleted
    });

    return res.status(200).json({ message: "deleted" });
  } catch (error) {
    console.log(error);
    return res.status(403).end();
  }
};

export default withUser(deleteProduct);
