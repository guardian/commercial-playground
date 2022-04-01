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
            <div style={{ gridArea: 'articlel', paddingLeft: '1rem', paddingTop: '0.5rem' }}>
                <div style={{ fontSize: '1.25rem', color: '#C70000', fontWeight: 700 }}>
                    Commercial Dev
                </div>
            </div>
            <div style={{ gridArea: 'article', borderLeft: '1px solid lightgrey', paddingLeft: '1rem' }}>
                <div style={{ fontSize: '2.5rem' }}>
                    Something about something
                </div>
                <Lorem />
            </div>
            <div style={{ gridArea: 'articler' }}>
                <AdSlotRight />
            </div>
        </div>
    )
};

export { Article };