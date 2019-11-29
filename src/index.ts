import { SearchBar } from "./SearchBar";
const input = require("./input.json");

new SearchBar(
  input,
  document.getElementById("searchbox") as HTMLInputElement,
  document.getElementById("output") as HTMLDivElement
);
