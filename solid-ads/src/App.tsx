import type { Component } from "solid-js";
import { Article } from "./Article";
import { Header } from "./Header";
import { Layout } from "./Layout";
import { Nav } from "./Nav";

const App: Component = () => {
  return (
    <Layout>
      <Header />
      <Nav />
      <Article />
    </Layout>
  );
};

export default App;
