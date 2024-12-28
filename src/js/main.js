"use strict";

// SECCIÓN DE LOS QUERY SELECTOR

const charactersUl = document.querySelector(".js_charactersUl");
const favoritesUl = document.querySelector(".js_favoritesUl");
const inputSearch = document.querySelector('.js_inputSearch');
const btnSearch = document.querySelector('.js_btnSearch');
const btnDeleteAllFavorites = document.querySelector('.js_btnDeleteAll')


// SECCIÓN DE LOS DATOS DE LA APLICACIÓN

let allCharacters = [];
let favorites = [];


// SECCIÓN DE FUNCIONES
// PINTA LA IMAGEN QUE NO FUNCIONA
const imageUrlVisible = (imageUrl) => {
    if (!imageUrl) {
        return 'https://placehold.co/400x400/ffffff/555555?text=Disney';
    }
    return imageUrl;
};

//PINTA UN PERSONAJE
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
    } else {
        if (isRenderingFavorites) {
            const html = `
    <li class="js_character characters__card favorite" id="${characterObj._id}">
        <img class="characters__img" src="${imageUrl}" alt="foto de ${characterObj.name}">
        <p class="characters__name">${characterObj.name}</p>
        <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
    </li>`;
            return html;
        } else {
            // lista general sin boton
            const html = `
            <li class="js_character characters__card favorite" id="${characterObj._id}">
                <img class="characters__img" src="${imageUrl}" alt="foto de ${characterObj.name}">
                <p class="characters__name">${characterObj.name}</p>
            </li>`;
            return html;
        }
    }
};

//PINTA TODOS LOS PERSONAJES
const renderAllCharacters = () => {
    let html = ''; /*aqui acumulo el html de cada personaje*/

    for (const characterObj of allCharacters) {
        html += renderOneCharacter(characterObj);
    }


    charactersUl.innerHTML = html;

    const allCharacterLi = document.querySelectorAll('.js_character');
    for (const li of allCharacterLi) {
        li.addEventListener('click', handleFavorite);
    }
};
//indicar si estamos renderizando la lista de favoritos
let isRenderingFavorites = false;


const renderFavorites = () => {
    isRenderingFavorites = true;
    let html = '';
    for (const characterObj of favorites) {
        html += renderOneCharacter(characterObj);
    }
    isRenderingFavorites = false;
    favoritesUl.innerHTML = html;
}


const handleFavorite = (ev) => {
    console.log(ev.currentTarget.id);

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
    }
    else {
        favorites.splice(favoritesIdx, 1);
        renderFavorites();
    }

    localStorage.setItem('charactersFav', JSON.stringify(favorites));
};

//FILTRAR
const renderfilteredCharacter = (filterText) => {
    const apiUrl = `https://api.disneyapi.dev/character?pageSize=50&name=${encodeURIComponent(filterText)}`;

    fetch(apiUrl)
        .then((response) => response.json())
        .then((data) => {
            if (!Array.isArray(data.data)) {
                allCharacters = [data.data];
            } else {
                allCharacters = data.data;
            }

            renderAllCharacters(allCharacters);
        })
};

//EVENTO BOTON DE FILTRAR
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


//BOTON PARA BORRAR TODOS LO FAVORITOS
const deleteAllFavorites = (ev) => {
    console.log('fdgg');
    favorites = [];
    renderFavorites();
    localStorage.removeItem('charactersFav');
    renderAllCharacters(allCharacters);
}

btnDeleteAllFavorites.addEventListener('click', deleteAllFavorites);

//MANEJA EL EVENTO CLICK EN ELIMINAR
const handleDeleteFavorite = (event) => {
    const clickedId = event.target.parentNode.id;
    const favoritesIdx = favorites.findIndex((eachCharacter) => eachCharacter._id === parseInt(clickedId));
    favorites.splice(favoritesIdx, 1);
    renderFavorites();
    localStorage.setItem('charactersFav', JSON.stringify(favorites));
};

// AQUI AGREGA EL EVENTO A LOS ELEMENTOS CON ESTA CLASE "delete-button"
document.addEventListener('click', (event) => {
    if (event.target.classList.contains('delete-button')) {
        handleDeleteFavorite(event);
    }
});




// CUANDO CARGA LA PÁGINA

//LLAMA LOS DATOS DE LA API
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






