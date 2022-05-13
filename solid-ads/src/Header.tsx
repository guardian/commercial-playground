import { Component } from "solid-js";
import { AdSlotTopAboveNav } from "./AdSlotTopAboveNav";

const Header: Component = () => {
  return (
    <div style={{ "grid-area": "headerad" }}>
      <AdSlotTopAboveNav />
    </div>
  );
};

export { Header };
