const pokemons = [{
  id: 1,
  img: "https://www.serebii.net/pokemongo/pokemon/001.png"
},
{
  id: 2,
  img: "https://www.serebii.net/pokemongo/pokemon/013.png"
},
{
  id: 3,
  img: "https://www.serebii.net/pokemongo/pokemon/002.png"
},
{
  id: 4,
  img: "https://www.serebii.net/pokemongo/pokemon/014.png"
},
{
  id: 5,
  img: "https://www.serebii.net/pokemongo/pokemon/004.png"
},
{
  id: 6,
  img: "https://www.serebii.net/pokemongo/pokemon/015.png"
},
{
  id: 7,
  img: "https://www.serebii.net/pokemongo/pokemon/005.png"
},
{
  id: 8,
  img: "https://www.serebii.net/pokemongo/pokemon/016.png"
},
{
  id: 9,
  img: "https://www.serebii.net/pokemongo/pokemon/006.png"
},
{
  id: 10,
  img: "https://www.serebii.net/pokemongo/pokemon/017.png"
},
{
  id: 11,
  img: "https://www.serebii.net/pokemongo/pokemon/007.png"
},
{
  id: 12,
  img: "https://www.serebii.net/pokemongo/pokemon/025.png"
},
{
  id: 13,
  img: "https://www.serebii.net/pokemongo/pokemon/008.png"
},
{
  id: 14,
  img: "https://www.serebii.net/pokemongo/pokemon/019.png"
},
{
  id: 15,
  img: "https://www.serebii.net/pokemongo/pokemon/009.png"
}
];

let arr = [];

for (let i = 0; i < 8; i++) {
for (let j = 0; j < 12; j++) {
  arr.push({
    y: i,
    x: j,
    isBusy: false
  });
}
}

let elHeroList = document.querySelector(".hero__list");

let x = 0;
let y = 0;

arr.forEach(_ => {
if (x > 11) {
  x = 0;
  y++;
}
let elItem = document.createElement("li");

elItem.className = `hero__item y-${y} x-${x}`;

elHeroList.appendChild(elItem);
x++;
})

let elArr = [];

for (let i = 0; i < 4; i++) {
pokemons.forEach((item) => {
  elArr.push(item);
})
}

for (let i = 0; i < 100; i++) {
let idx1 = Math.floor(Math.random() * 60);
let idx2 = Math.floor(Math.random() * 60);

let temp = elArr[idx1];
elArr[idx1] = elArr[idx2];
elArr[idx2] = temp;
}

let elItems = document.querySelectorAll(".hero__item");

let j = 0;
arr.forEach(item => {
if (item.y != 0 && item.x != 0 && item.y != 7 && item.x != 11) {
  item.isBusy = true;
  for (let i = 0; i < elItems.length; i++) {
    if (elItems[i].classList.contains(`y-${item.y}`) && elItems[i].classList.contains(`x-${item.x}`)) {
      elItems[i].classList.add(`${elArr[j].id}`)
      elItems[i].innerHTML = `
        <img src="${elArr[j].img}">
      `;
      break;
    }
  }
  j++;
  if (j == 100) {
    j = 0;
  }
} else {
  for (let i = 0; i < elItems.length; i++) {
    if (elItems[i].classList.contains(`y-${item.y}`) && elItems[i].classList.contains(`x-${item.x}`)) {
      elItems[i].style.opacity = "0";
      elItems[i].style.cursor = "default";
      break;
    }
  }
}
});

let yArray = [];
let xArray = [];
let elIdArr = [];
let elLis = [];

elItems.forEach(item => {
item.addEventListener("click", () => {
  elItems.forEach(color => {
    if (!(color.id.includes("through"))) {
      color.style.background = "#f8f6d8";
    }
  });
  if (!(item.id.includes("through"))) {
    item.style.background = "red";
  }
  if (yArray.length > 1 && xArray.length > 1) {
    yArray.length = 0;
    xArray.length = 0;
    elIdArr.length = 0;
    elLis.length = 0;
  }
  let y = item.classList[1].slice(-1);
  let x = item.classList[2].slice(-1);
  let id = item.classList[3];
  arr.forEach(value => {
    if (value.y == y && value.x == x) {
      yArray.push(+(y));
      xArray.push(+(x));
      elIdArr.push(id);
      elLis.push(item);
    }
  });
  xArray.sort((a, b) => {
    return a - b
  })
  if (yArray[0] == yArray[1]) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u < (xArray[1] + (yArray[0] * 12)); u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }
    if (xArray[1] - xArray[0] == 1) {
      removeIt();
    } else if (yArray[0] == 1 || yArray[0] == 6) {
      removeIt();
    } else if (xArray[0] == 0 && xArray[1] == 9) {
      removeIt();
    } 
    let whatIt = false;
    for(let g = (xArray[0]+1 + (yArray[0] * 12) - 12); g < (xArray[1] + (yArray[0] * 12) - 12); g++){
      if (elItems[g].innerHTML != "") {
        whatIt = true;
        break;
      }
    }
    if(whatIt != true){
      removeIt();
    }
  } else if (xArray[0] == xArray[1]) {
    yArray.sort((a, b) => {
      return a - b
    });
    let seeWhat = false;
    let n = 0;
    let q = 0;
    let w = 0;
    for (; n < arr.length; n++) {
      if (arr[n].x == xArray[0] && arr[n].y == yArray[0]) {
        q = n;
      } else if (arr[n].x == xArray[1] && arr[n].y == yArray[1]) {
        w = n;
      }
    }
    for (let u = q+12; u < w; u += 12) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }
    if (yArray[1] - yArray[0] == 1) {
      removeIt();
    } else if (xArray[0] == 1 && xArray[1] == 1) {
      removeIt();
    }
  } else if (yArray[0] == 1 && yArray[1] == 2) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u <= (xArray[1] + (yArray[1] * 12)) - 12; u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }

    let hey = false;
    for(let t = (xArray[0] + (yArray[0] * 12) + 12); t < (xArray[1] + (yArray[0] * 12) + 12); t++){
      console.log(elItems[t]);
      if(elItems[t] != ""){
        hey = true;
        break;
      }
    }
    if(hey != true){
      removeIt();
    }
  } else if (yArray[1] == 1 && yArray[0] == 2) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u <= (xArray[1] + (yArray[1] * 12)) - 12; u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }

    let hey = false;
    for(let t = (xArray[0] + (yArray[0] * 12) + 12); t < (xArray[1] + (yArray[0] * 12) + 12); t++){
      console.log(elItems[t]);
      if(elItems[t] != ""){
        hey = true;
        break;
      }
    }
    if(hey != true){
      removeIt();
    }
  } else if (yArray[0] == 2 && yArray[1] == 3) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u <= (xArray[1] + (yArray[1] * 12)) - 12; u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }

    let hey = false;
    for(let t = (xArray[0] + (yArray[0] * 12) + 12); t < (xArray[1] + (yArray[0] * 12) + 12); t++){
      console.log(elItems[t]);
      if(elItems[t] != ""){
        hey = true;
        break;
      }
    }
    if(hey != true){
      removeIt();
    }
  } else if (yArray[1] == 2 && yArray[0] == 3) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u <= (xArray[1] + (yArray[1] * 12)) - 12; u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }

    let hey = false;
    for(let t = (xArray[0] + (yArray[0] * 12) + 12); t < (xArray[1] + (yArray[0] * 12) + 12); t++){
      console.log(elItems[t]);
      if(elItems[t] != ""){
        hey = true;
        break;
      }
    }
    if(hey != true){
      removeIt();
    }
  } else if (yArray[0] == 3 && yArray[1] == 4) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u <= (xArray[1] + (yArray[1] * 12)) - 12; u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }

    let hey = false;
    for(let t = (xArray[0] + (yArray[0] * 12) + 12); t < (xArray[1] + (yArray[0] * 12) + 12); t++){
      console.log(elItems[t]);
      if(elItems[t] != ""){
        hey = true;
        break;
      }
    }
    if(hey != true){
      removeIt();
    }
  } else if (yArray[1] == 3 && yArray[0] == 4) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u <= (xArray[1] + (yArray[1] * 12)) - 12; u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }

    let hey = false;
    for(let t = (xArray[0] + (yArray[0] * 12) + 12); t < (xArray[1] + (yArray[0] * 12) + 12); t++){
      console.log(elItems[t]);
      if(elItems[t] != ""){
        hey = true;
        break;
      }
    }
    if(hey != true){
      removeIt();
    }
  } else if (yArray[0] == 4 && yArray[1] == 5) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u <= (xArray[1] + (yArray[1] * 12)) - 12; u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }
    let hey = false;
    for(let t = (xArray[0] + (yArray[0] * 12) + 12); t < (xArray[1] + (yArray[0] * 12) + 12); t++){
      console.log(elItems[t]);
      if(elItems[t] != ""){
        hey = true;
        break;
      }
    }
    if(hey != true){
      removeIt();
    }
  } else if (yArray[1] == 4 && yArray[0] == 5) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u <= (xArray[1] + (yArray[1] * 12)) - 12; u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }

    let hey = false;
    for(let t = (xArray[0] + (yArray[0] * 12) + 12); t < (xArray[1] + (yArray[0] * 12) + 12); t++){
      console.log(elItems[t]);
      if(elItems[t] != ""){
        hey = true;
        break;
      }
    }
    if(hey != true){
      removeIt();
    }
  } else if (yArray[0] == 5 && yArray[1] == 6) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u <= (xArray[1] + (yArray[1] * 12)) - 12; u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }

    let hey = false;
    for(let t = (xArray[0] + (yArray[0] * 12) + 12); t < (xArray[1] + (yArray[0] * 12) + 12); t++){
      console.log(elItems[t]);
      if(elItems[t] != ""){
        hey = true;
        break;
      }
    }
    if(hey != true){
      removeIt();
    }
  } else if (yArray[1] == 5 && yArray[0] == 6) {
    let seeWhat = false;
    for (let u = (xArray[0] + 1 + (yArray[0] * 12)); u <= (xArray[1] + (yArray[1] * 12)) - 12; u++) {
      if (elItems[u].innerHTML != "") {
        seeWhat = true;
        break;
      }
    }
    if (seeWhat != true) {
      removeIt();
    }

    let hey = false;
    for(let t = (xArray[0] + (yArray[0] * 12) + 12); t < (xArray[1] + (yArray[0] * 12) + 12); t++){
      console.log(elItems[t]);
      if(elItems[t] != ""){
        hey = true;
        break;
      }
    }
    if(hey != true){
      removeIt();
    }
  }
});
});

function removeIt(){
  if (elIdArr[0] == elIdArr[1]) {
    if (elLis[0].className != elLis[1].className) {
      elLis.forEach(element => {
        element.innerHTML = "";
        element.id = "through";
        element.style.background = "#1c1f41";
      })
    }
  }
}
