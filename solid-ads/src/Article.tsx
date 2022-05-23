import type { Component } from "solid-js";
import { AdSlotRight } from "./AdSlotRight";
import { Lorem } from "./Lorem";

const articleLayout = {
  display: "grid",
  "grid-area": "article",
  "grid-template": '"articlel article articler"',
  gap: "2rem",
  "grid-template-columns": "220px auto 300px",
  "border-left": "1px solid lightgrey",
  "border-right": "1px solid lightgrey",
  "padding-right": "2rem",
};

export const Article: Component = () => {
  return (
    <div style={articleLayout}>
      <div
        style={{
          "grid-area": "articlel",
          "padding-left": "1rem",
          "padding-top": "0.5rem",
        }}
      >
        <div
          style={{
            "font-size": "1.25rem",
            color: "#C70000",
            "font-weight": 700,
          }}
        >
          Commercial Dev
        </div>
      </div>
      <div
        style={{
          "grid-area": "article",
          "border-left": "1px solid lightgrey",
          "padding-left": "1rem",
        }}
      >
        <div style={{ "font-size": "2.5rem" }}>Something about something</div>
        <Lorem />
      </div>
      <div style={{ "grid-area": "articler" }}>
        <AdSlotRight />
      </div>
    </div>
  );
};
