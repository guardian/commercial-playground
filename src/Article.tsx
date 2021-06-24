import React from 'react';
import { AdSlotRight } from './AdSlotRight';

const articleLayout = {
    display: 'grid',
    gridArea: 'article',
    gridTemplate: '"articlel article articler"',
    gap: '0.5rem',
    gridTemplateColumns: '192px auto 192px',
};

const Article = () => {
    return (
        <div style={articleLayout}>
            <div style={{ gridArea: 'articlel' }}></div>
            <div style={{ gridArea: 'article' }}></div>
            <div style={{ gridArea: 'articler' }}>
                <AdSlotRight />
            </div>
        </div>
    )
};

export { Article };