import React, { ReactChild } from 'react'

function Layout({ children }: { children: ReactChild[]}) {
  return (
    <div
        style={{
            display: 'grid',
            gridTemplate: '"headerl headerad headerr" "nav nav nav" "left article right"',
            gap: '0.5rem',
            gridTemplateColumns: '4rem auto 4rem',
            gridTemplateRows: 'minmax(192px, auto) 180px auto',
        }}
    >
        {children}
    </div>
  )
}

export { Layout }
