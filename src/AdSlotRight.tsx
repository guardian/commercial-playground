import React from 'react'
import { AdSlot } from './AdSlot';
import { Slots } from './lib/slots'

const AdSlotRight = () => {
   return (
        <div style={{ position: 'sticky', top: 0, height: '1059px', width: '200px'}}>
            <AdSlot
                classNames={['js-ad-slot', 'ad-slot', 'ad-slot--right', 'ad-slot--mpu-banner-ad', 'ad-slot--rendered', 'js-sticky-mpu'].join(' ')}
                dataAttributes={[['link-name', 'ad slot right']]}
                slotId='dfp-ad--right'
                slotName={Slots.right}
            />
        </div>
    )
}

export { AdSlotRight };