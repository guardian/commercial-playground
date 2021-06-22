import { useEffect, useState } from 'react'
import { getGoogleTag } from '../lib/googletag';
import { Sizes } from '../lib/sizes';
import { Slots } from '../lib/slots';

const useDisplayAd = (id: string, name: string) => {
    const [isLoading, setIsLoading] = useState(true);
    useEffect(() => {
        const googletag = getGoogleTag();
        googletag.cmd.push(function() {
            googletag
            .defineSlot(
              // Define an ad slot
              // Ad unit path, size, div id
              // Ad unit path follows the format /network-code/[parent-ad-unit-code/.../]ad-unit-code, where:
              '59666047/theguardian.com/uk/front/ng', Sizes["top-above-nav"].desktop, id)
            // add a service to the slot e.g. pubads service
            .addService(googletag.pubads());
            googletag.enableServices();
            googletag.display(id);
            setIsLoading(false);
        });
    }, []);

    return [isLoading, setIsLoading];
};

export { useDisplayAd };
