import { Page } from "@geist-ui/core";
import { Campaign, Label } from "@prisma/client";
import { useEffect } from "react";

async function getAd(slotName: string) {
  const res = await fetch(`http://localhost:3000/api/ads?slotName=${slotName}`);

  if (!res.ok) {
    return;
  }

  const { campaignId, url, labels } = (await res.json()) as {
    campaignId: Campaign["id"];
    url: string;
    labels: Label[];
  };

  const img = document.createElement("img");
  img.src = url;

  const slot = document.querySelector(`#${slotName}`);

  if (!slot) {
    return;
  }

  slot.appendChild(img);
}

function AdSlot({ id }: { id: string }) {
  return (
    <>
      <p>{id}</p>
      <div
        style={{ backgroundColor: "#e3e3e3", padding: "8px", margin: "8px" }}
        id={id}
      ></div>
    </>
  );
}

export default function TestPage() {
  useEffect(() => {
    void getAd("top-above-nav");
  }, []);
  useEffect(() => {
    void getAd("inline");
  }, []);
  return (
    <Page>
      <AdSlot id="top-above-nav" />
      <AdSlot id="inline" />
    </Page>
  );
}
