// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import type { NextApiRequest, NextApiResponse } from "next";

type Data = {
  name: string;
};

export default function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  let name = "Asher";

  if (req.method === "POST") {
    console.log("jjj", Object.keys(req.body)[0]);
    name = Object.keys(req.body)[0];
    res.status(200).json({ name: name });
  } else {
    res.status(200).json({ name: name });
  }
}
