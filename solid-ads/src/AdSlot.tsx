import { Component, createEffect, createSignal, JSX } from "solid-js";
import { SizeMappings, Sizes } from "./sizes";

interface Props {
  classNames: string;
  dataAttributes: string[][];
  slotId: string;
  slotName: string;
  styles?: JSX.CSSProperties;
  targeting?: {
    [key: string]: string | string[];
  };
}

const googleTagStub = {
  display: () => {},
  enableServices: () => {},
  pubads: () => {},
  cmd: [],
};

const getGoogleTag = () => window.googletag || googleTagStub;

const AdSlot: Component<Props> = ({
  classNames,
  dataAttributes,
  slotId,
  slotName,
  styles,
  targeting = {},
}) => {
  const [slot, setSlot] = createSignal<any>(undefined);

  setInterval(() => {
    // Refresh the slot
    console.log("Refreshing slot");
    googletag.pubads().refresh([slot()]);
  }, 5_000);

  createEffect(() => {
    const googletag = getGoogleTag();
    googletag.cmd.push(function () {
      const sizes = Sizes[slotName].desktop;
      const sizeMappings = SizeMappings[slotName];
      const slot = googletag.defineSlot(
        "59666047/theguardian.com/uk/front/ng",
        sizes,
        slotId
      );
      if (slot !== null) {
        slot
          // Define an ad slot
          // Ad unit path, size, div id
          // Ad unit path follows the format /network-code/[parent-ad-unit-code/.../]ad-unit-code, where:
          // @ts-ignore ???
          .defineSizeMapping(sizeMappings)
          // add a service to the slot e.g. pubads service
          .addService(googletag.pubads());

        Object.keys(targeting).forEach((key) =>
          slot.setTargeting(key, targeting[key])
        );

        googletag.enableServices();
        googletag.display(slotId);

        setSlot(slot);
      }
    });
  });

  return (
    <div
      id={slotId}
      className={classNames}
      data-name={slotName}
      aria-hidden="true"
      style={styles}
    ></div>
  );
};

export { AdSlot };
