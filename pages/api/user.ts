import Iron from "@hapi/iron";
import type { NextApiRequest, NextApiResponse } from "next";
import CookieService from "../../lib/cookie";
import { ProcessEnv } from "../../types/env";

const user = async (req: NextApiRequest, res: NextApiResponse) => {
  let user;
  try {
    user = await Iron.unseal(
      CookieService.getAuthToken(req.cookies),
      process.env.ENCRYPTION_SECRET as ProcessEnv,
      Iron.defaults
    );
  } catch (error) {
    return res.status(401).end();
  }

  // now we have access to the data inside of user
  // and we could make database calls or just send back what we have
  // in the token.

  res.json(user);
};

export default user;
