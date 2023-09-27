import "./style.scss";
import {
  getAllCocktails,
  renderCocktails,
  renderLikedCocktails,
} from "./functions.js";

async function main() {
  const grid = document.querySelector(".app__grid");
  const likedGrid = document.querySelector(".app__likedgrid");
  const gridItemTemplate = document.querySelector("#gridItem").innerHTML;
  const likedGridItemTemplate =
    document.querySelector("#likedgridItem").innerHTML;
  const allCocktails = await getAllCocktails();
  let filterField = "";
  const likedCocktails =
    JSON.parse(window.localStorage.getItem("likedcocktails")) ?? [];
  renderCocktails({
    grid,
    gridItemTemplate,
    allCocktails,
    filterField,
    likedCocktails,
  });

  renderLikedCocktails({
    likedGrid,
    likedGridItemTemplate,
    likedCocktails,
    allCocktails,
  });

  document.querySelector(".app__form__reset").onclick = () => {
    document.querySelector("#filterField").value = "";
    //trigger oninput manually
    document.querySelector("#filterField").dispatchEvent(new Event("input"));
  };

  document.querySelector("#filterField").oninput = (e) => {
    filterField = e.target.value;
    renderCocktails({
      grid,
      gridItemTemplate,
      allCocktails,
      filterField,
      likedCocktails,
    });
  };

  likedGrid.onclick = (e) => {
    if (e.target.className === "removeLike") {
      //href niet volgen
      e.preventDefault();
      const id = e.target.parentElement.dataset.id;
      likedCocktails.splice(
        likedCocktails.findIndex((cocktailId) => cocktailId === id),
        1
      );
      window.localStorage.setItem(
        "likedcocktails",
        JSON.stringify(likedCocktails)
      );
      renderCocktails({
        grid,
        gridItemTemplate,
        allCocktails,
        filterField,
        likedCocktails,
      });
      renderLikedCocktails({
        likedGrid,
        likedGridItemTemplate,
        likedCocktails,
        allCocktails,
      });
    }
  };

  grid.onclick = function (e) {
    console.log(e);
    if (e.target.classList[0] === "app__grid__item__icon") {
      // console.log("clicked on heart");
      if (e.target.classList[1] === "app__grid__item__icon--heart-o") {
        likedCocktails.push(e.target.parentElement.dataset.id);
      } else {
        likedCocktails.splice(
          likedCocktails.indexOf(e.target.parentElement.dataset.id),
          1
        );
      }
      window.localStorage.setItem(
        "likedcocktails",
        JSON.stringify(likedCocktails)
      );
      renderCocktails({
        grid,
        gridItemTemplate,
        allCocktails,
        filterField,
        likedCocktails,
      });
      renderLikedCocktails({
        likedGrid,
        likedGridItemTemplate,
        likedCocktails,
        allCocktails,
      });
    }
  };
}

main();
