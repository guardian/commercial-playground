import React from 'react';
import { AdSlotRight } from './AdSlotRight';
import { Lorem } from './Lorem';

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
            <div style={{ gridArea: 'article' }}>
                <Lorem />
            </div>
            <div style={{ gridArea: 'articler' }}>
                <AdSlotRight />
            </div>
        </div>
    )
};

export { Article };