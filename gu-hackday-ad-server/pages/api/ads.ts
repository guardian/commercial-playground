import { Campaign, Creative, Label } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../src/prisma";

type Data =
  | { campaignId: Campaign["id"]; url: string; labels: Label[] }
  | { error: string };

/**
 * Request an advert from the server
 *
 * TODO dotcom will make requests to http://localhost:3000/api/ads?...
 *
 */
export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data>
) {
  const slotName = (req.query["slotName"] ?? "") as string;

  // Just take the first campaign for now
  const campaign = await prisma.campaign.findFirst({
    include: { creatives: true, labels: true },
  });

  if (!campaign) {
    return res.status(404).send({ error: "Campaign not found" });
  }

  // Just take the first creative for now
  const creative: Creative | undefined = campaign.creatives.find((creative) =>
    creative.slots.includes(slotName)
  );

  if (!creative) {
    return res.status(404).send({ error: "Creative not found " });
  }

  return res.send({
    campaignId: campaign.id,
    url: `http://localhost:3000/creatives/${creative.url}`,
    labels: campaign.labels,
  });
}
