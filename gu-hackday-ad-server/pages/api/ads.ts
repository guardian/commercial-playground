import type { NextApiRequest, NextApiResponse } from "next";
import { prisma } from "../../src/prisma";
import { Campaign as BaseCampaign, CampaignType, Label, Creative, Targeting } from "@prisma/client";

function getRandomInt(max: number) {
  return Math.floor(Math.random() * max);
}

type Data =
  | { campaignId: Campaign["id"]; code: string; url: string; labels: Label[] }
  | { error: string };


type Campaign = 
  BaseCampaign & {
    type: CampaignType;
    labels: Label[];
    creatives: Creative[];
    targeting: Targeting[];
  };

const filterCampaigns = (campaigns: Campaign[], userTargeting: Partial<{
  [key: string]: string | string[];
}>): Campaign[] => {
  const filteredCampaigns = campaigns.filter(campaign =>
    campaign.targeting.every(targetingRule => {
      const { key, value, operator } = targetingRule;
      switch(operator) {
        case 'Equals': {
          return userTargeting[key] === value;
        }
        // case 'Contains': {
        //   return (userTargeting[key] ?? '').toString().includes(value);
        // }
        case 'Not': {
          return userTargeting[key] !== value;
        }
        default:
          return false;
      }
    })
  );
  return filteredCampaigns;
}

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
  const targeting = req.query;
  console.log(targeting);
  const slotName = (targeting.slotName ?? "") as string;

  // Retrieve all of the campaigns
  const campaigns = await prisma.campaign.findMany({
    include: { creatives: true, labels: true, type: true, targeting: true },
  });

  // Filter the campaigns so it's only ones that pertain to this slot
  const campaignsWithMatchingCreatives = campaigns.filter((campaign) =>
    campaign.creatives.find((creative) => creative.slots.includes(slotName))
  );

  const filteredCampaigns = filterCampaigns(campaignsWithMatchingCreatives, targeting);

  // choose a campaign randomly
  // not taking into account priority just yet
  const campaignIndex = getRandomInt(filteredCampaigns.length);
  const campaign = filteredCampaigns[campaignIndex];

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
    url: creative.url ? `http://localhost:3032/creatives/${creative.url}` : "",
    code: creative.code,
    labels: campaign.labels,
  });
}
