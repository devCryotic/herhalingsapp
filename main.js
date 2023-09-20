import "./style.scss";
import { getAllCocktails } from "./functions.js";

const grid = document.querySelector(".app__grid");

async function main() {
  const gridItemTemplate = document.querySelector("#gridItem").innerHTML;
  const allCocktails = await getAllCocktails();
  let filterField = "";

  document.querySelector("#filterField").oninput = function (e) {
    filterField = e.target.value;
    render();
  };

  function render() {
    let nrOfItems = 0;
    let total = allCocktails.length;
    grid.innerHTML = allCocktails
      .filter((c) =>
        filterField == ""
          ? true
          : c.strDrink.toLowerCase().indexOf(filterField.toLowerCase()) != -1
      )
      .map(({ strDrink, strDrinkThumb }) => {
        nrOfItems++;
        return gridItemTemplate
          .replaceAll("%NAAM%", strDrink)
          .replaceAll("%FOTO%", strDrinkThumb);
      })
      .join("");
    document.querySelector(".app__header__start").innerText = nrOfItems;
    document.querySelector(".app__header__total").innerText = total;
  }

  render();
}

main();
