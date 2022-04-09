var currentRounds = [];

function getTemplateRound() {
    return {
        "name": "",
        "maps": []
    }
}
function getTemplateMap() {
    return {
        "map": "",
        "mode": ""
    }
}


function clearMapsPanel(){
    const mapsPanel = document.getElementById("maps-panel");
    
    for (var i = 0; i < mapsPanel.children.length; i++){
        const child = mapsPanel.children[i];
        if (child.classList.contains("round-container")){
            mapsPanel.removeChild(child);
            i--;
        }
    }
}


function importRounds(){
    currentRounds = [];

    const addedRounds = document.getElementsByClassName("added-round");
    for (var i = 0; i < addedRounds.length; i++){
        const newRound = getTemplateRound();
        newRound.name = addedRounds[i].querySelector("#round-title").innerText;

        const numRounds = parseInt(addedRounds[i].querySelector("#round-games").innerText);

        const roundIsCounterpick = addedRounds[i].querySelector("#round-counterpick") != undefined;
        
        for (var j = 0; j < numRounds; j++){
            const newMap = getTemplateMap();
            if (j == 0 || !roundIsCounterpick){
                newMap.map = "";
                newMap.mode = "Turf War";
            }
            else {
                newMap.map = "Unknown Map";
                newMap.mode = "Unknown Mode";
            }
            newRound.maps.push(newMap);
        }
        currentRounds.push(newRound);
    }
    console.log(currentRounds);
}

function addMapElements(){
    for (var i = 0; i < currentRounds.length; i++){
        const roundContainer = document.createElement("div");
        roundContainer.setAttribute("class", "round-container");

        const menuHeader = document.createElement("div");
        menuHeader.setAttribute("class", "menu-header");
        menuHeader.innerText = "Round " + (currentRounds[i].name);
        roundContainer.appendChild(menuHeader);

        for (var j = 0; j < currentRounds[i].maps.length; j++){
            const gameContainer = document.createElement("div");
            gameContainer.setAttribute("class", "game-container");
            gameContainer.innerText = j + 1;

            if (currentRounds[i].maps[j].mode != "Unknown Mode"){

                const mapDropMenu = document.createElement("select");
                mapDropMenu.setAttribute("class", "map-drop-menu");

                const selectors = getMapPoolSelectors(currentRounds[i].maps[j].mode);
                console.log(selectors);
                for (var k = 0; k < selectors.length; k++){
                    mapDropMenu.appendChild(selectors[k]);
                } 

                gameContainer.appendChild(mapDropMenu);
            }
            else {
                const mapDropMenu = document.createElement("select");
                mapDropMenu.setAttribute("class", "map-drop-menu");
                mapDropMenu.setAttribute("disabled", "true");
                const selector = document.createElement("option");
                selector.innerText = "Unknown Map";
                mapDropMenu.appendChild(selector);

                gameContainer.appendChild(mapDropMenu);
            }

            roundContainer.appendChild(gameContainer);
        }

        document.getElementById("maps-panel").appendChild(roundContainer);
    }
}

function getMapPoolSelectors(mode){
    const getShortHandMode = function(mode){
        switch(mode){
            case "Turf War": return "tw";
            case "Splat Zones": return "sz";
            case "Tower Control": return "tc";
            case "Rainmaker": return "rm";
            case "Clam Blitz": return "cb";
        }
    }
    const shortHandMode = getShortHandMode(mode);
    const mapPool = [];
    for (var i = 0; i < allMaps.length; i++){
        const checkBox = document.getElementById(`${shortHandMode}-${allMaps[i]}-map-selector`);
        if (checkBox.checked){
            const selector = document.createElement("option");
            selector.innerText = allMaps[i];
            mapPool.push(selector);
        }
    }
    return mapPool;
}