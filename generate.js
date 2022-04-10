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
    document.getElementById("maps-instruction").style.display = "none";

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
                newMap.map = "Unknown Map";
                newMap.mode = "Unknown Mode";
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
        menuHeader.innerText = currentRounds[i].name;
        roundContainer.appendChild(menuHeader);

        for (var j = 0; j < currentRounds[i].maps.length; j++){
            const gameContainer = document.createElement("div");
            gameContainer.setAttribute("class", "game-container");
            gameContainer.innerText = j + 1;
            gameContainer.style.animationDelay = `${Math.min(j * 0.1,2)}s`;

            const modeDropMenu = document.createElement("select");
            modeDropMenu.setAttribute("class", "map-drop-menu");
            const modes = ["Turf War", "Splat Zones", "Tower Control", "Rainmaker", "Clam Blitz", "Unknown Mode"];
            for (var k = 0; k < modes.length; k++){
                const option = document.createElement("option");
                option.setAttribute("value", modes[k]);
                option.innerText = modes[k];
                modeDropMenu.appendChild(option);
            }
            modeDropMenu.id = "mode-drop-menu";

            modeDropMenu.value = currentRounds[i].maps[j].mode;

            gameContainer.appendChild(modeDropMenu);

            const mapDropMenu = document.createElement("select");
            mapDropMenu.setAttribute("class", "map-drop-menu");
            mapDropMenu.id ="map-drop-menu";

            const selectors = getMapPoolSelectors(currentRounds[i].maps[j].mode);
            for (var k = 0; k < selectors.length; k++){
                mapDropMenu.appendChild(selectors[k]);
            } 

            if (currentRounds[i].maps[j].mode == "Unknown Mode"){
                mapDropMenu.value = "Unknown Map";
            }

            gameContainer.appendChild(mapDropMenu);

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
            case "Unknown Mode": return null;
        }
    }
    const shortHandMode = getShortHandMode(mode);

    const mapPool = [];

    if (shortHandMode == null){
        const selector = document.createElement("option");
        selector.value = "Unknown Map";
        selector.innerText = "Unknown Map";
        mapPool.push(selector);
        return mapPool;
    }

    for (var i = 0; i < allMaps.length; i++){
        const checkBox = document.getElementById(`${shortHandMode}-${allMaps[i]}-map-selector`);
        if (checkBox.checked){
            const selector = document.createElement("option");
            selector.value = allMaps[i];
            selector.innerText = allMaps[i];
            mapPool.push(selector);
        }
    }

    const selector = document.createElement("option");
    selector.value = "Unknown Map";
    selector.innerText = "Unknown Map";
    mapPool.push(selector);
    return mapPool;
}

function poolHasMaps(mode){
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

    for (var i = 0; i < allMaps.length; i++){
        const checkBox = document.getElementById(`${shortHandMode}-${allMaps[i]}-map-selector`);
        if (checkBox.checked){
            return true;
        }
    }
    return false;
}

function updateStageDropdown(mode){
    const mapPoolSelectors = getMapPoolSelectors(mode);

}

function generateEmptyRounds(){
    clearMapsPanel();
    importRounds();
    addMapElements();
}

function generateModes(){
    generateEmptyRounds();

    const modesTemp = ["Turf War", "Splat Zones", "Tower Control", "Rainmaker", "Clam Blitz"];
    const modes = [];
    for (var i = 0; i < modesTemp.length; i++){
        if (poolHasMaps(modesTemp[i])){
            modes.push(modesTemp[i]);
        }
    }

    if (modes.length == 0){
        return;
    }

    const mapsPanel = document.getElementById("maps-panel");
    const mapSelectors = mapsPanel.getElementsByClassName("map-drop-menu");
    var modesIndex = Math.floor(Math.random() * modes.length);

    for (var i = 0; i < mapSelectors.length; i++){
        if (mapSelectors[i].id == "mode-drop-menu"){
            mapSelectors[i].value = modes[modesIndex];
            modesIndex = (modesIndex + 1) % modes.length;
        }
    }

}