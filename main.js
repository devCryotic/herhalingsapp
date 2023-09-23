import "./style.scss";
import { getAllCocktails, render } from "./functions.js";

async function main() {
  const grid = document.querySelector(".app__grid");
  const gridItemTemplate = document.querySelector("#gridItem").innerHTML;
  const allCocktails = await getAllCocktails();
  let filterField = "";
  render({
    grid,
    gridItemTemplate,
    allCocktails,
    filterField,
  });

  document.querySelector(".app__form__reset").onclick = () => {
    document.querySelector("#filterField").value = "";
    //trigger oninput manually
    document.querySelector("#filterField").dispatchEvent(new Event("input"));
  };
  document.querySelector("#filterField").oninput = (e) => {
    filterField = e.target.value;
    render({
      grid,
      gridItemTemplate,
      allCocktails,
      filterField,
    });
  };
}

main();
