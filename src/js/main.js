"use strict";

const charactersUl = document.querySelector(".js_charactersUl");

let AllCharacters = [];


const renderOneCharacter = (characterObj) => {
    const html = `
    <li class="characters__card">
        <img class="characters__img" src="${characterObj.imageUrl}" alt="">
        <p class="characters__name">${characterObj.name}</p>
    </li>`;

    return html;
};
const renderAllCharacters = () => {
    let html = ''; /*aqui acumulo el html de cada personaje*/
    for (const characterObj /*este es cada uno de los elementos del array*/ of AllCharacters /*este es el nombre del contenerdor del array*/) {
        html += renderOneCharacter(characterObj);
    }
    charactersUl.innerHTML = html;
};

// Cuando carga la página

fetch('https://api.disneyapi.dev/character?pageSize=50')
    .then((response) => response.json())
    .then((data) => {
        AllCharacters = data.data;
        renderAllCharacters();

    });



