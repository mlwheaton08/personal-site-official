import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { PersonalWebiste } from "./components/PersonalWebsite";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <BrowserRouter>
    <PersonalWebiste />
  </BrowserRouter>
);
