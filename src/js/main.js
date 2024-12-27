"use strict";

// SECCIÓN DE LOS QUERY SELECTOR

const charactersUl = document.querySelector(".js_charactersUl");
const favoritesUl = document.querySelector(".js_favoritesUl");
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');


// SECCIÓN DE LOS DATOS DE LA APLICACIÓN

let allCharacters = [];
let favorites = [];


// SECCIÓN DE FUNCIONES

const imageUrlVisible = (imageUrl) => {
    if (!imageUrl) {
        return 'https://placehold.co/400x400/ffffff/555555?text=Disney';
    }
    return imageUrl;

};


const renderOneCharacter = (characterObj) => {

    const imageUrl = imageUrlVisible(characterObj.imageUrl);

    const favoritesIdx = favorites.findIndex((eachCharacter) => eachCharacter._id === characterObj._id);


    if (favoritesIdx === -1) {
        const html = `
        <li class="js_character characters__card" id="${characterObj._id}">
            <img class="characters__img" src="${imageUrl}" alt="foto de ${characterObj.name}">
            <p class="characters__name">${characterObj.name}</p>
        </li>`;
        return html;
    }
    else {
        const html = `
    <li class="js_character characters__card favorite" id="${characterObj._id}">
        <img class="characters__img" src="${imageUrl}" alt="foto de ${characterObj.name}">
        <p class="characters__name">${characterObj.name}</p>
    </li>`;
        return html;
    }
};


const renderAllCharacters = () => {
    let html = ''; /*aqui acumulo el html de cada personaje*/

    if (Array.isArray(allCharacters)) {
        for (const characterObj of allCharacters) {
            html += renderOneCharacter(characterObj);
        }
    } else {
        const characterObj = allCharacters;
        html = renderOneCharacter(characterObj);
    }

    charactersUl.innerHTML = html;

    const allCharacterLi = document.querySelectorAll('.js_character');

    for (const li of allCharacterLi) {
        li.addEventListener('click', handleFavorite);
    }
};

const renderFavorites = () => {
    let html = '';
    for (const characterObj of favorites) {
        html += renderOneCharacter(characterObj);
    }
    favoritesUl.innerHTML = html;
}


const handleFavorite = (ev) => {
    console.log('favorito');
    console.log(ev.currentTarget.id);

    // ev.currentTarget.classList.toggle('favorite'); BORRAR!!!!!

    const clickedId = ev.currentTarget.id;

    const clickedIdNumber = parseInt(clickedId);

    // para buscar en el array general
    const clickedCharacterObj = allCharacters.find((eachCharacter) => eachCharacter._id === clickedIdNumber);
    // para buscar en el array de favoritos
    const favoritesIdx = favorites.findIndex((eachCharacter) => eachCharacter._id === clickedIdNumber);

    if (favoritesIdx === -1) {
        favorites.push(clickedCharacterObj);
        renderFavorites();
        renderAllCharacters();

        //const liFavorite = renderOneCharacter(clickedCharacterObj); /*me devuelve el li pintado*/
        //favoritesUl.innerHTML += liFavorite;

    }
    else {
        favorites.splice(favoritesIdx, 1);
        renderFavorites();

    }

    localStorage.setItem('charactersFav', JSON.stringify(favorites));
};

const renderfilteredCharacter = (filterText) => {
    const apiUrl = `https://api.disneyapi.dev/character?pageSize=50&name=${encodeURIComponent(filterText)}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            allCharacters = data.data;
            renderAllCharacters(allCharacters);
        })
};

const handleBtnSearch = (ev) => {
    ev.preventDefault();

    const filterText = inputSearch.value.toLowerCase().trim();
    if (filterText !== '') {
        renderfilteredCharacter(filterText);
    }
    else {
        renderAllCharacters();
    }
};

btnSearch.addEventListener('click', handleBtnSearch);


// CUANDO CARGA LA PÁGINA

fetch('https://api.disneyapi.dev/character?pageSize=50')
    .then((response) => response.json())
    .then((data) => {
        allCharacters = data.data;
        renderAllCharacters();

    });

if (localStorage.getItem('charactersFav') !== null) {
    favorites = JSON.parse(localStorage.getItem('charactersFav'))
    renderFavorites();
}




