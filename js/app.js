const characterCards=document.getElementById("character-cards");
const filterDropDown = document.getElementById("filter-dropdown");
const filterContent = document.getElementById("filterContent");
// const loadMoreCharacter = document.getElementById("loadMoreBtn");

let allCharacters = [];
// let filteredCharacters = [];
// let currentIndex = 0;
// const batchSize = 16;

function characterData () {
  fetch ('https://hp-api.onrender.com/api/characters')
  .then ((Response) => {
    return Response.json ();

  }) .then ((characters) => {
    console.log(characters);
    allCharacters = characters;
    // filteredCharacters = allCharacters;
    // currentIndex = 0;
    // renderMoreCharacters();
    renderData (allCharacters.slice(0,16));
  }) .catch ((Error) => {
    console.log("error happend here :",Error);
  })
}

// function renderMoreCharacters() {
//   const nextBatch = filteredCharacters.slice(currentIndex, currentIndex + batchSize);
//   renderData(nextBatch);
//   currentIndex += batchSize;

//   if (currentIndex >= filteredCharacters.length) {
//     loadMoreBtn.style.display = "none";
//   } else {
//     loadMoreBtn.style.display = "block";
//   }
// }

function renderData (data) {
  characterCards.innerHTML = "";

  data.forEach(element => {
    const card = document.createElement("div");
    card.className="card-containar"

     if (element.image === "") {
      element.image = "images/not-found.png";
     }

    card.innerHTML = `
    <img src="${element.image}">
    
    <div class="card-content">
    <p class="character-name">${element.name}</p>
    <p> House : ${element.house}</p>
    <p> Date Of Birth : ${element.dateOfBirth}</p>
    </div>
     `

    characterCards.appendChild(card);
  });
}

characterData ();

function houseList () {
  filterContent.classList.toggle("show");
}

window.addEventListener("click", function(e) {
      if (!filterDropDown.contains(e.target)) {
        filterContent.classList.remove("show");
      }
});


filterContent.addEventListener("click", function(e) {
  const selectedHouse = e.target.dataset.value;
  if (!selectedHouse) return;

  filterContent.classList.remove("show");
  // characterCards.innerHTML = "";
  // currentIndex = 0;


  const filtered =
    selectedHouse === "allhouses"
      ? allCharacters.slice (0,16)
      : allCharacters.filter(char => char.house.toLowerCase() === selectedHouse).slice (0,16);

    characterCards.innerHTML = "";
    renderData(filtered);
  
});

// loadMoreCharacter.addEventListener("click",renderMoreCharacters);









