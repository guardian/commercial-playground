import type { Component } from "solid-js";

export const Nav: Component = () => {
  return (
    <div
      style={{
        "background-color": "#052966",
        "grid-area": "nav",
        position: "relative",
      }}
    >
      <div style={{ position: "absolute", right: "4rem" }}>
        <img src="/adian.png" width="360px" height="auto"></img>
      </div>
    </div>
  );
};
