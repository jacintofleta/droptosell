// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";
import { Magic } from "@magic-sdk/admin";
import Iron from "@hapi/iron";
import CookieService from "../../lib/cookie";
import { ProcessEnv } from "../../types/env";
import { PrismaClient } from "@prisma/client";

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
    const user = await magic.users.getMetadataByToken(did);
    // Author a couple of cookies to persist a user's session
    const token = await Iron.seal(
      user,
      process.env.ENCRYPTION_SECRET as ProcessEnv,
      Iron.defaults
    );

    // Save the user into the db
    const dbUser = await prisma.user.upsert({
      where: {
        email: user.email as string,
      },
      update: {},
      create: {
        email: user.email as string,
      },
    });

    CookieService.setTokenCookie(res, token);

    //Save user in the db
  } catch (error) {
    console.log({ error });
  }

  res.end();
}
