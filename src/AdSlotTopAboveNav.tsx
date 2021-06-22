import React from 'react'
import { AdSlot } from './AdSlot';
import { Slots } from './lib/slots'
import './AdSlotTopAboveNav.css'

const AdSlotTopAboveNav = () => {
   return (
        <AdSlot
            classNames={['js-ad-slot', 'ad-slot', 'ad-slot--top-above-nav', 'ad-slot--mpu-banner-ad', 'ad-slot--rendered'].join(' ')}
            dataAttributes={[['name', 'ad slot top-above-nav']]}
            slotId='dfp-ad--top-above-nav'
            slotName={Slots.topAboveNav}
        />
    )
}

export { AdSlotTopAboveNav };