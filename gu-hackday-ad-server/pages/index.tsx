import {
  Badge,
  Card,
  Code,
  Dot,
  Link,
  Page,
  Spacer,
  Table,
  Tabs,
  useTheme,
} from "@geist-ui/core";
import Head from "next/head";
import Image from "next/image";
import styles from "../styles/Home.module.css";
import { prisma } from "../src/prisma";
import {
  Campaign,
  CampaignType as BaseCampaignType,
  Label,
  Creative,
  Targeting,
} from "@prisma/client";

type CampaignType = BaseCampaignType & {
  Campaign: Campaign[];
};

// Hack to get the through-relations
type CampaignProp = Omit<
  Campaign & {
    type: CampaignType;
    labels: Label[];
    creatives: Creative[];
    targeting: Targeting[];
  },
  "created_at" | "updated_at"
>;

function CampaignTable({ campaigns }: { campaigns: CampaignProp[] }) {
  return (
    <div style={{ padding: "16px" }}>
      <Table
        data={campaigns.map((campaign) => ({
          ...campaign,
          type: campaign.type.name,
          state: (
            <>
              <Dot style={{ marginRight: "15px" }} type="success" />
              {campaign.state}
            </>
          ),
          labels: (
            <>
              {campaign.labels.map((label) => (
                <>
                  <Badge style={{ backgroundColor: "blue" }}>
                    {label.name}
                  </Badge>{" "}
                  <Spacer h={0.5} />
                </>
              ))}
            </>
          ),
          creatives: (
            <>
              {campaign.creatives.map((creative) =>
                creative.url !== "" ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img
                    alt="..."
                    key={creative.id}
                    style={{
                      padding: "4px",
                      maxWidth: "150px",
                      height: "auto",
                    }}
                    src={`http://localhost:3032/creatives/${creative.url}`}
                  />
                ) : (
                  <Code>HTML / CSS</Code>
                )
              )}
            </>
          ),
          targeting: (
            <>
              {campaign.targeting.map((targeting) =>
                <div key={targeting.id}>{targeting.key}={targeting.value}</div>
              )}
            </>
          )
        }))}
      >
        <Table.Column prop="state" label="state" />
        <Table.Column prop="id" label="id" />
        <Table.Column prop="name" label="name" />
        <Table.Column prop="type" label="Campaign Group" />
        <Table.Column prop="labels" label="labels" />
        <Table.Column prop="creatives" label="creatives" />
        <Table.Column prop="targeting" label="targeting" />
      </Table>
    </div>
  );
}

function CampaignGroupMenu({
  campaignTypes,
}: {
  campaignTypes: CampaignType[];
}) {
  const theme = useTheme();
  const colors = [
    theme.palette.successLight,
    theme.palette.successDark,
    theme.palette.alert,
    theme.palette.purple,
    theme.palette.violet,
    theme.palette.cyanLighter,
  ];
  const getColor = (id: number) => colors[id % colors.length];
  return (
    <div style={{ padding: "16px" }}>
      {[...Array(10).keys()]
        .map((i) => i + 1)
        .map((index) => (
          <Card draggable={true} style={{ margin: "16px" }} key={index}>
            <div style={{ display: "flex" }}>
              <div
                style={{
                  borderRight: "1px solid grey",
                  paddingRight: "16px",
                  width: "5%",
                }}
              >
                <Badge style={{ backgroundColor: "#AAA" }} type="success">
                  {index}
                </Badge>
              </div>
              <div style={{ width: "75%" }}>
                {campaignTypes
                  .filter((campaignType) => campaignType.priority === index)
                  .map((campaignType) => (
                    <div key={campaignType.id}>
                      <Badge
                        style={{
                          backgroundColor: getColor(campaignType.id),
                          marginLeft: "1rem",
                          marginBottom: "1rem",
                        }}
                        type="success"
                      >
                        {campaignType.name}
                      </Badge>
                    </div>
                  ))}
              </div>
              <div style={{ width: "20%", borderLeft: "1px solid grey" }}>
                {campaignTypes
                  .filter((campaignType) => campaignType.priority === index)
                  .map((campaignType) =>
                    campaignType.Campaign?.map((campaign) => (
                      <div key={campaign.id}>
                        <Badge
                          style={{
                            backgroundColor: getColor(campaign.id),
                            marginLeft: "1rem",
                            marginBottom: "1rem",
                          }}
                          type="success"
                        >
                          {campaign.name}
                        </Badge>
                      </div>
                    ))
                  )}
              </div>
            </div>
          </Card>
        ))}
    </div>
  );
}

type Props = {
  campaigns: CampaignProp[];
  campaignTypes: CampaignType[];
};

export default function Home({ campaigns, campaignTypes }: Props) {
  return (
    <div className={styles.container}>
      <Head>
        <title>Gu-Ad-Server</title>
        <meta name="description" content="Generated by create next app" />
        <link
          rel="icon"
          href="data:image/svg+xml,<svg xmlns=%22http://www.w3.org/2000/svg%22 viewBox=%220 0 100 100%22><text y=%22.9em%22 font-size=%2290%22>🤑</text></svg>"
        />
      </Head>

      <Page>
        <header>
          <h1>🤑 gu-ad-server</h1>
        </header>

        <Tabs initialValue="1">
          <Tabs.Item label="Campaigns" value="1">
            <CampaignTable campaigns={campaigns} />
          </Tabs.Item>
          <Tabs.Item label="Priority Groups" value="2">
            <CampaignGroupMenu campaignTypes={campaignTypes} />
          </Tabs.Item>
        </Tabs>
      </Page>
    </div>
  );
}

export async function getServerSideProps(): Promise<{ props: Props }> {
  const campaignTypes = (
    await prisma.campaignType.findMany({
      include: { Campaign: true },
    })
  ).map((c) => ({
    // This is a hack to avoid having to serialise the dates
    id: c.id,
    name: c.name,
    priority: c.priority,
    Campaign: c.Campaign.map((cam) => ({
      ...cam,
      created_at: null,
      updated_at: null,
    })),
  }));
  const campaigns = (
    await prisma.campaign.findMany({
      include: { type: true, labels: true, creatives: true, targeting: true },
    })
  ).map((c) => ({
    // This is a hack to avoid having to serialise the dates
    ...c,
    created_at: null,
    updated_at: null,
  }));
  return {
    props: {
      campaigns,
      campaignTypes,
    },
  };
}
