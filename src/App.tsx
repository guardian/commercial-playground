import React from 'react'
import { Layout } from './Layout'
import { Article } from './Article'
import { Header } from './Header'
import { Nav } from './Nav'

function App() {
  return (
    <Layout>
      <Nav />
      <Header />
      <Article />
    </Layout>
  )
}

export default App
