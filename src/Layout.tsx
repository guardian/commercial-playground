import React, { ReactChild } from 'react'

function Layout({ children }: { children: ReactChild[]}) {
  return (
    <div
        style={{
            display: 'grid',
            gridTemplate: '"headerl headerad headerr"  "left article right"',
            gap: '0.5rem',
            gridTemplateColumns: '4rem auto 4rem',
            gridTemplateRows: 'minmax(192px, auto) auto',
        }}
    >
        {children}
    </div>
  )
}

export { Layout }
