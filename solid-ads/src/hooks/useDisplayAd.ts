import { createEffect, createSignal, JSX } from "solid-js";
import { SizeMappings, Sizes } from "../lib/sizes";
import { getGoogleTag } from "../lib/googletag";

export const useDisplayAd = (slotId: string, slotName: string, targeting: { [key: string]: string | string[] } = {}) => {
    const [slot, setSlot] = createSignal<any>(undefined);
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
    return slot;
}