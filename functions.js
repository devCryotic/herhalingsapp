const getAllCocktails = async () => {
  // zoek naar de api endpoint dat alle cocktails opvraagt beginnend met de letter L
  // thecocktaildb
  // fetch met .then.catch
  // fetch met async/await

  // FETCH DATA WITH OLD SCHOOL THEN/CATCH => BAD PRACTICE ... WHY? when we start multiple fetches de second starts after the first

  //   fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=l")
  //     .then((response) => response.json())
  //     .then((data) => console.log(data.drinks.map((drink) => drink.strDrink)))
  //     .catch((err) => console.log(err));

  // array with all fetch promises
  const allDownloads = [
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=a"),
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=b"),
    fetch("https://www.thecocktaildb.com/api/json/v1/1/search.php?f=c"),
  ];
  //we wait for all fetch promises to resolve
  const allResponses = await Promise.all(allDownloads);
  // we wait to get all the json data
  const allDatas = await Promise.all(
    allResponses.map((responseObj) => responseObj.json())
  );
  // from every dataObject we keep only the .drinks
  const allDrinks = allDatas
    .filter((data) => data.drinks != null) // filter out all the drinks that have no cocktails = null
    .map((data) => data.drinks);
  // we flat all the cocktails so they are all in one big array
  console.log(allDrinks.flat().map((d) => d.strDrink));
};
getAllCocktails();
