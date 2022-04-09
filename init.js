//connect buttons to open modals
const stageButtons = document.getElementsByClassName("map-picker button");
const modalContainer = document.getElementById("modal-container");

for (var i = 0; i < stageButtons.length; i++){

    const id = stageButtons[i].id;
    const modalContent = document.getElementById(`${id}-modal`);
    const modalClose = document.getElementById(`${id}-close`);

    stageButtons[i].onclick = function(){
        modalContainer.style.display = "flex";
        modalContent.style.display = "flex";
    }

    modalClose.onclick = function(){
        modalContainer.style.display = "none";
        modalContent.style.display = "none";
    }
}


//load map options into page
const allMaps = ["The Reef", "Musselforge Fitness", "Starfish Mainstage", "Humpback Pump Track", "Inkblot Art Academy", "Sturgeon Shipyard", "Moray Towers", "Port Mackerel", "Manta Maria", "Kelp Dome", "Snapper Canal", "Blackbelly Skatepark", "Makomart", "Walleye Warehouse", "Shellendorf Institute", "Arowana Mall", "Goby Arena", "Piranha Pit", "Camp Triggerfish", "Wahoo World", "New Albacore Hotel", "Ancho-V Games", "Skipper Pavilion"];

for (var i = 0; i < allMaps.length; i++){
    const modes = ["tw","sz","tc","rm","cb"];

    for (var j = 0; j < modes.length; j++){

        const mapInputId = `${modes[j]}-${allMaps[i]}-map-selector`;

        const mapLabel = document.createElement("label");
        mapLabel.setAttribute("for", mapInputId);
        mapLabel.innerHTML = `<div class="map-name">${allMaps[i]}</div>`;

        const mapInput = document.createElement("input");
        mapInput.type = "checkbox";
        mapInput.id = mapInputId;
        mapInput.setAttribute("class", "map-selector");

        mapInput.setAttribute("onclick", `adjustSelectedCount("${modes[j]}")`);

        mapLabel.appendChild(mapInput);

        document.getElementById(`${modes[j]}-picker-modal`).appendChild(mapLabel);


        //make "select all" & "deselect all" buttons work for each mode
        document.getElementById(`${modes[j]}-select-all`).setAttribute("onclick", `massSelect("${modes[j]}", true)`);
        document.getElementById(`${modes[j]}-deselect-all`).setAttribute("onclick", `massSelect("${modes[j]}", false)`);
    }
}

function adjustSelectedCount(mode){
    var count = 0;
    for (var i = 0; i < allMaps.length; i++){
        const checkBox = document.getElementById(`${mode}-${allMaps[i]}-map-selector`);
        if (checkBox.checked){
            count++;
        }
    }
    const plural = count == 1 ? "" : "s";
    document.getElementById(`${mode}-picker-detail`).innerText = `${count} Map${plural} selected  ▶`;
}

function massSelect(mode, isEnabling){
    for (var i = 0; i < allMaps.length; i++){
        const checkBox = document.getElementById(`${mode}-${allMaps[i]}-map-selector`);
        checkBox.checked = isEnabling;
    }
    adjustSelectedCount(mode);
}


//attach round adder stuff
const addRoundButton = document.getElementById("add-round-button");
const roundNameInput = document.getElementById("round-name");
const roundGamesInput = document.getElementById("round-games");
const roundIsCounterpick = document.getElementById("round-counterpick-check");

const roundEditor = document.getElementById("round-editor");

addRoundButton.addEventListener("click", function(){
    if (roundNameInput.value == ""){
        return;
    }
    if (roundGamesInput.value == ""){
        return;
    }

    const addedRound = document.createElement("div");
    addedRound.setAttribute("class", "added-round");

    const roundTitle = document.createElement("div");
    roundTitle.setAttribute("class", "title");
    roundTitle.id = "round-title";
    roundTitle.innerText = roundNameInput.value;
    addedRound.appendChild(roundTitle);
    
    const roundGames = document.createElement("div");
    roundGames.setAttribute("class", "games");
    roundGames.id = "round-games";
    roundGames.innerText = roundGamesInput.value;
    addedRound.appendChild(roundGames);

    if (roundIsCounterpick.checked){
        const roundCounterpick = document.createElement("div");
        roundCounterpick.setAttribute("class", "counterpick");
        roundCounterpick.id = "round-counterpick";
        roundCounterpick.innerText = "Counterpick";
        addedRound.appendChild(roundCounterpick);
    }

    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove button");
    removeButton.innerText = "Remove  ▶";
    removeButton.addEventListener("click", function(){
        removeButton.parentElement.remove();
    });
    addedRound.appendChild(removeButton);

    roundEditor.appendChild(addedRound);
});