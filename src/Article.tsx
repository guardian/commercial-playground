import React from 'react';
import { AdSlotRight } from './AdSlotRight';
import { Lorem } from './Lorem';

const articleLayout = {
    display: 'grid',
    gridArea: 'article',
    gridTemplate: '"articlel article articler"',
    gap: '2rem',
    gridTemplateColumns: '220px auto 300px',
    borderLeft: '1px solid lightgrey',
    borderRight: '1px solid lightgrey',
    paddingRight: '2rem',
};

const Article = () => {
    return (
        <div style={articleLayout}>
            <div style={{ gridArea: 'articlel' }}></div>
            <div style={{ gridArea: 'article', borderLeft: '1px solid lightgrey', paddingLeft: '1rem' }}>
                <Lorem />
            </div>
            <div style={{ gridArea: 'articler' }}>
                <AdSlotRight />
            </div>
        </div>
    )
};

export { Article };