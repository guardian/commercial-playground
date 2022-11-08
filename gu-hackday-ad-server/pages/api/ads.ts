import { Campaign, Creative, Label } from "@prisma/client";
import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../src/prisma";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

type Data =
  | { campaignId: Campaign["id"]; code: string; url: string; labels: Label[] }
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

  // Retrieve all of the campaigns
  const campaigns = await prisma.campaign.findMany({
    include: { creatives: true, labels: true, type: true },
  });

  // Filter the campaigns so it's only ones that pertain to this slot
  const campaignsWithMatchingCreatives = campaigns.filter((campaign) =>
    campaign.creatives.find((creative) => creative.slots.includes(slotName))
  );

  console.log(campaignsWithMatchingCreatives);

  // choose a campaign randomly
  // not taking into account priority just yet
  const campaignIndex = getRandomInt(campaignsWithMatchingCreatives.length);
  console.log({ campaignIndex });
  const campaign = campaignsWithMatchingCreatives[campaignIndex];

  if (!campaign) {
    return res.status(404).send({ error: "Campaign not found " });
  }

  // Select a random creative in the winning campaign
  const filteredCreatives = campaign.creatives.filter((creative) =>
    creative.slots.includes(slotName)
  );
  const creative: Creative | undefined =
    filteredCreatives[getRandomInt(filteredCreatives.length)];

  if (!creative) {
    return res.status(404).send({ error: "Creative not found " });
  }

  return res.send({
    campaignId: campaign.id,
    url: creative.url ? `http://localhost:3000/creatives/${creative.url}` : "",
    code: creative.code,
    labels: campaign.labels,
  });
}
