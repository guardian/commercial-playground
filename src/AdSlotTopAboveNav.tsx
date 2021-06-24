import React from 'react'
import { AdSlot } from './AdSlot';
import { Slots } from './lib/slots'

const AdSlotTopAboveNav = () => {
   return (
        <div style={{ display: 'flex', justifyContent: 'center' }}>
            <AdSlot
                classNames={['js-ad-slot', 'ad-slot', 'ad-slot--top-above-nav', 'ad-slot--mpu-banner-ad', 'ad-slot--rendered'].join(' ')}
                dataAttributes={[['name', 'ad slot top-above-nav']]}
                slotId='dfp-ad--top-above-nav'
                slotName={Slots.topAboveNav}
                styles={{
                    margin: '0 auto',
                    minHeight: '108px',
                    paddingBottom: '18px',
                    textAlign: 'left',
                    display: 'table',
                }}
            />
        </div>
    )
}

export { AdSlotTopAboveNav };