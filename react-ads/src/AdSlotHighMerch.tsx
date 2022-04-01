import React from 'react'
import { AdSlot } from './AdSlot';
import { Slots } from './lib/slots'

const AdSlotHighMerch = () => {
   return (
        <div>
            <AdSlot
                classNames={[
                    'js-ad-slot', 'ad-slot', 'ad-slot--merchandising', 'ad-slot--fluid', 'ad-slot--rendered'
                ].join(' ')}
                dataAttributes={[]}
                slotId="dfp-ad--merchandising-high"
                slotName={Slots.highMerch}
                targeting={{ "slot": "merchandising-high" }}
            />
        </div>
    )
}

export { AdSlotHighMerch };