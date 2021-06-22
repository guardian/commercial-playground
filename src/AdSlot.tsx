import React from 'react'
import { useDisplayAd } from './hooks/useDisplayAd'

interface Props {
    classNames: string,
    dataAttributes: string[][],
    slotId: string,
    slotName: string
}

const AdSlot = ({ classNames, dataAttributes, slotId, slotName}: Props) => {
    const [isLoading, ] = useDisplayAd(slotId, slotName);
    return (
        <div
            id={slotId}
            className={classNames}
            data-name={slotName}
            aria-hidden='true'
        >
            {slotName} loading: {String(isLoading)}
        </div>
    )
}

export { AdSlot };