import { Component, JSX } from "solid-js";
import { useDisplayAd } from "./hooks/useDisplayAd";

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

const AdSlot: Component<Props> = ({
  classNames,
  dataAttributes,
  slotId,
  slotName,
  styles,
  targeting = {},
}) => {
  const slot = useDisplayAd(slotId, slotName, targeting);

  setInterval(() => {
    // Refresh the slot
    console.log("Refreshing slot");
    googletag.pubads().refresh([slot()]);
  }, 5_000);

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
