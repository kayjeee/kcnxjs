// This is an example of how to access a session from an API route
/**
 * Created 
 * Created by kagiso eugen sebogodion 22/09/03.
 *
 */

/**
 * @author Kagiso Eugene Sebogodi
 *@Organization chameleon-techie pty
 */
import { unstable_getServerSession } from "next-auth"
import { authOptions } from "../auth/[...nextauth]"

import type { NextApiRequest, NextApiResponse } from "next"

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions)
  res.send(JSON.stringify(session, null, 2))
}
