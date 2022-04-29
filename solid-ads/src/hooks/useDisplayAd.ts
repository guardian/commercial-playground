import { useEffect, useState } from 'react';
import { getGoogleTag } from '../lib/googletag';
import { Sizes, SizeMappings } from '../lib/sizes';

export const useDisplayAd = (id: string, name: string, targeting: { [key: string]: string | string[] } = {}) => {
    const [slot, setSlot] = useState<googletag.Slot | undefined>(undefined);
    useEffect(() => {
        const googletag = getGoogleTag();
        googletag.cmd.push(function() {
            const sizes = Sizes[name].desktop;
            const sizeMappings = SizeMappings[name];
            const slot = googletag.defineSlot('59666047/theguardian.com/uk/front/ng', sizes, id);
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
                googletag.display(id);
                setSlot(slot);
            }
        });
    });
    return [slot, setSlot] as const;
};
