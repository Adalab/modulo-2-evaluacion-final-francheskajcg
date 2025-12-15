const h=document.querySelector(".js_charactersUl"),m=document.querySelector(".js_favoritesUl"),_=document.querySelector(".js_inputSearch"),p=document.querySelector(".js_btnSearch"),u=document.querySelector(".js_btnDeleteAll");let c=[],s=[];const g=e=>e||"https://placehold.co/400x400/ffffff/555555?text=Disney",f=e=>{const t=g(e.imageUrl);return s.findIndex(r=>r._id===e._id)===-1?`
        <li class="js_character characters__card" id="${e._id}">
            <img class="characters__img" src="${t}" alt="foto de ${e.name}">
            <p class="characters__name">${e.name}</p>
             <p class="date">${e.updatedAt}</p>
            
        </li>`:i?`
    <li class="js_character characters__card favorite" id="${e._id}">
        <img class="characters__img" src="${t}" alt="foto de ${e.name}">
        <p class="characters__name">${e.name}</p>
        <button class="delete-button"><i class="fa-solid fa-trash"></i></button>
    </li>`:`
            <li class="js_character characters__card favorite" id="${e._id}">
                <img class="characters__img" src="${t}" alt="foto de ${e.name}">
                <p class="date">${e.updatedAt}</p>
                <p class="characters__name">${e.name}</p>
            </li>`},l=()=>{let e="";for(const a of c)e+=f(a);h.innerHTML=e;const t=document.querySelectorAll(".js_character");for(const a of t)a.addEventListener("click",v)};let i=!1;const n=()=>{i=!0;let e="";for(const t of s)e+=f(t);i=!1,m.innerHTML=e},v=e=>{console.log(e.currentTarget.id);const t=e.currentTarget.id,a=parseInt(t),r=c.find(o=>o._id===a),d=s.findIndex(o=>o._id===a);d===-1?(s.push(r),n(),l()):(s.splice(d,1),n()),localStorage.setItem("charactersFav",JSON.stringify(s))},S=e=>{const t=`https://api.disneyapi.dev/character?pageSize=50&name=${encodeURIComponent(e)}`;fetch(t).then(a=>a.json()).then(a=>{Array.isArray(a.data)?c=a.data:c=[a.data],l()})},I=e=>{e.preventDefault();const t=_.value.toLowerCase().trim();t!==""?S(t):l()};p.addEventListener("click",I);const $=e=>{console.log("fdgg"),s=[],n(),localStorage.removeItem("charactersFav"),l()};u.addEventListener("click",$);const y=e=>{const t=e.target.parentNode.id,a=s.findIndex(r=>r._id===parseInt(t));s.splice(a,1),n(),localStorage.setItem("charactersFav",JSON.stringify(s))};document.addEventListener("click",e=>{e.target.classList.contains("delete-button")&&y(e)});fetch("https://api.disneyapi.dev/character?pageSize=50").then(e=>e.json()).then(e=>{c=e.data,l()});localStorage.getItem("charactersFav")!==null&&(s=JSON.parse(localStorage.getItem("charactersFav")),n());
//# sourceMappingURL=main.js.map
