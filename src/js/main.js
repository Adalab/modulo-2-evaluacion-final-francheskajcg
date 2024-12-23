"use strict";

// SECCIÓN DE LOS QUERY SELECTOR

const charactersUl = document.querySelector(".js_charactersUl");
const favoritesUl = document.querySelector(".js_favoritesUl");


// SECCIÓN DE LOS DATOS DE LA APLICACIÓN

let allCharacters = [];


// SECCIÓN DE FUNCIONES

/*const imageUrlVisible = (imageUrl) => {
    if (!imageUrl) {
        return 'https://placehold.co/400x400/ffffff/555555?text=Disney';
    }
    return imageUrl;

};
*/

const renderOneCharacter = (characterObj) => {

    //  const imageUrl = imageUrlVisible(characterObj.imageUrl);

    const html = `
    <li class="js_character characters__card">
        <img class="characters__img" src="${characterObj.imageUrl}" alt="">
        <p class="characters__name">${characterObj.name}</p>
    </li>`;

    return html;
};
const renderAllCharacters = () => {
    let html = ''; /*aqui acumulo el html de cada personaje*/
    for (const characterObj /*este es cada uno de los elementos del array*/ of allCharacters /*este es el nombre del contenerdor del array*/) {
        html += renderOneCharacter(characterObj);
    }
    charactersUl.innerHTML = html;

    const allCharacterLi = document.querySelectorAll('.js_character');

    for (const li of allCharacterLi) {
        li.addEventListener('click', handleFavorite);
    }
};


const handleFavorite = (ev) => {
    ev.currentTarget.classList.toggle('favorite');

    const liFavorite = renderOneCharacter();

    favoritesUl.innerHTML = liFavorite;
};



// CUANDO CARGA LA PÁGINA

fetch('https://api.disneyapi.dev/character?pageSize=50')
    .then((response) => response.json())
    .then((data) => {
        allCharacters = data.data;
        renderAllCharacters();

    });



