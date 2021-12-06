import React from 'react'
import { useDisplayAd } from './hooks/useDisplayAd'

interface Props {
    classNames: string,
    dataAttributes: string[][],
    slotId: string,
    slotName: string,
    styles?: React.CSSProperties,
    targeting?: {
        [key: string]: string | string[],
    }
}

const AdSlot = ({ classNames, dataAttributes, slotId, slotName, styles, targeting }: Props) => {
    const [isLoading, ] = useDisplayAd(slotId, slotName, targeting);
    return (
        <div
            id={slotId}
            className={classNames}
            data-name={slotName}
            aria-hidden='true'
            style={styles}
        >
        </div>
        // {slotName} loading: {String(isLoading)}
    )
}

export { AdSlot };