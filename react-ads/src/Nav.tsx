import React from "react";

const Nav = () => {
    return (
        <div style={{
            backgroundColor: '#052966',
            gridArea: 'nav',
            position: 'relative'
        }}>
            <div style={{ position: 'absolute', right: '4rem' }}>
                <img src='/adian.png' width='360px' height='auto'></img>
            </div>
        </div>
    )
}

export { Nav }