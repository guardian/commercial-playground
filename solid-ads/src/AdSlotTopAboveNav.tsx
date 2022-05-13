import { Component } from "solid-js";
import { AdSlot } from "./AdSlot";
import { Slots } from "./lib/slots";

const AdSlotTopAboveNav: Component = () => {
  return (
    <div style={{ display: "flex", "justify-content": "center" }}>
      <AdSlot
        classNames={[
          "js-ad-slot",
          "ad-slot",
          "ad-slot--top-above-nav",
          "ad-slot--mpu-banner-ad",
          "ad-slot--rendered",
        ].join(" ")}
        dataAttributes={[["name", "ad slot top-above-nav"]]}
        slotId="dfp-ad--top-above-nav"
        slotName={Slots.topAboveNav}
        styles={{
          margin: "0 auto",
          "min-height": "108px",
          "padding-bottom": "18px",
          "text-align": "left",
          display: "table",
        }}
      />
    </div>
  );
};

export { AdSlotTopAboveNav };
