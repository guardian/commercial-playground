import { Page } from "@geist-ui/core";
import { Campaign, Label } from "@prisma/client";
import { useEffect, useState } from "react";

async function getAd(slotName: string) {
  const res = await fetch(`http://localhost:3032/api/ads?slotName=${slotName}`);

  if (!res.ok) {
    return;
  }

  const { campaignId, url, code, labels } = (await res.json()) as {
    campaignId: Campaign["id"];
    url: string;
    code: string;
    labels: Label[];
  };

  const slot = document.querySelector(`#${slotName}`);

  if (!slot) {
    return;
  }

  if (url !== "") {
    // Image based creative
    const img = document.createElement("img");
    img.src = url;
    slot.appendChild(img);
  } else if (code !== "") {
    // Markup based creative
    slot.innerHTML = code;
  }
}

function AdSlot({ id }: { id: string }) {
  const [done, setDone] = useState(false);
  useEffect(() => {
    if (!done) {
      void getAd(id);
      setDone(true);
    }
  }, [done, id]);
  return (
    <>
      <p>{id}</p>
      <div
        style={{
          backgroundColor: "#e3e3e3",
          padding: "8px",
          margin: "8px",
          display: "inline-block",
        }}
        id={id}
      ></div>
    </>
  );
}

export default function TestPage() {
  return (
    <Page>
      <AdSlot id="top-above-nav" />
      <AdSlot id="inline" />
    </Page>
  );
}
