import { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const { slug, day, time, partySize } = req.query as {
    slug: string;
    day: string;
    time: string;
    partySize: string;
  };

  if (!day || !time || !partySize) {
    return res.status(400).json({ errorMessage: "Invalid data provide" });
  }
  return res.json({ slug, day, time, partySize });
}

// http://localhost:3000/api/restaurant/ramakrishna-indian-restaurant-ottawa/availability?day=20&time=salam&partySize=qocu
