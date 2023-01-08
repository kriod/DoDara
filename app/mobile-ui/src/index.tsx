import React from "react";
import { createRoot } from "react-dom/client";

import { Entry } from "./entry";

import "./index.css";

const container = document.createElement("main");
container.classList.add(
  "absolute",
  "left-0",
  "right-0",
  "top-0",
  "bottom-0",
  "bg-slate-100",
  "min-w-{300}",
  "overflow-hidden"
);
document.body.append(container);

const root = createRoot(container);
root.render(<Entry />);
