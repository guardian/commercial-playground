import type { Component } from "solid-js";

const Layout: Component = ({ children }) => {
  return (
    <div
      style={{
        display: "grid",
        "grid-template":
          '"headerl headerad headerr" "nav nav nav" "left article right"',
        gap: "0.5rem",
        "grid-template-columns": "4rem auto 4rem",
        "grid-template-rows": "minmax(192px, auto) 180px auto",
      }}
    >
      {children}
    </div>
  );
};

export { Layout };
