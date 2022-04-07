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
