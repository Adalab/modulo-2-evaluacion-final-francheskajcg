"use strict";

const charactersUl = document.querySelector(".js_charactersUl");

const characterObj = {
  _id: 16,
  films: ["Cheetah"],
  shortFilms: [],
  tvShows: [],
  videoGames: [],
  parkAttractions: [],
  allies: [],
  enemies: [],
  sourceUrl: "https://disney.fandom.com/wiki/Abdullah",
  name: "Abdullah",
  imageUrl:
    "https://static.wikia.nocookie.net/disney/images/c/cb/1087603-44532-clp-950.jpg",
  createdAt: "2021-04-12T01:26:02.377Z",
  updatedAt: "2021-12-20T20:39:18.032Z",
  url: "https://api.disneyapi.dev/characters/16",
  __v: 0,
};

charactersUl.innerHTML = `
<li class="characters__card">
    <img class="characters__img"
        src="${characterObj.imageUrl}"
        alt="">
        <p class="characters__name">${characterObj.name}</p>
</li>`;
