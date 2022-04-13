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
        modalContainer.classList.add("green");
    }

    modalClose.onclick = function(){
        modalContainer.style.display = "none";
        modalContent.style.display = "none";
        modalContainer.classList.remove("green");
        modalContainer.classList.remove("red");
    }
}

window.addEventListener("click", function(event){
    if (event.target == modalContainer){
        modalContainer.style.display = "none";
        const modals = document.getElementsByClassName("modal-content");
        for (var i = 0; i < modals.length; i++){
            modals[i].style.display = "none";
        }
    }
});


const exportButtonDiscord = document.getElementById("export-button-discord");
const exportDiscordClose = document.getElementById("discord-export-close");
const exportDiscordModal = document.getElementById("discord-export-modal");

exportButtonDiscord.onclick = function(){
    exportToDiscord();
    modalContainer.style.display = "flex";
    exportDiscordModal.style.display = "flex";
    modalContainer.classList.add("red");
}

exportDiscordClose.onclick = function(){
    modalContainer.style.display = "none";
    exportDiscordModal.style.display = "none";
    modalContainer.classList.remove("green");
    modalContainer.classList.remove("red");
}

const exportButtonURL = document.getElementById("export-button-url");
const exportURLClose = document.getElementById("url-export-close");
const exportURLModal = document.getElementById("url-export-modal");

exportButtonURL.onclick = function(){
    modalContainer.style.display = "flex";
    exportURLModal.style.display = "flex";
    modalContainer.classList.add("red");

    const text = document.getElementById("url-export-textarea");

    const url = window.location.href.split("?")[0];
    text.value = url + "?pool=" + encodeMapPool() + "&rounds=" + encodeRounds();
}

exportURLClose.onclick = function(){
    modalContainer.style.display = "none";
    exportURLModal.style.display = "none";
    modalContainer.classList.remove("green");
    modalContainer.classList.remove("red");
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
    document.getElementById(`${mode}-picker-detail`).innerHTML = `${count} Map${plural} selected <i class="right-bias fa-solid fa-circle-chevron-right">`;

    updateGenerateButtonStatus();
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
    removeButton.innerHTML = '<i class="left-bias fa-solid fa-trash-can"></i> Remove';
    removeButton.addEventListener("click", function(){
        removeButton.parentElement.remove();
        updateGenerateButtonStatus();
    });
    addedRound.appendChild(removeButton);

    roundEditor.appendChild(addedRound);

    updateGenerateButtonStatus();

    //attempt to increment last character in name
    const lastChar = roundNameInput.value.slice(-1);
    if (!isNaN(lastChar)){
        const newName = roundNameInput.value.slice(0, -1) + (parseInt(lastChar) + 1);
        roundNameInput.value = newName;
    }
});

const modeHasMaps = function(mode){
    for (var i = 0; i < allMaps.length; i++){
        const checkBox = document.getElementById(`${mode}-${allMaps[i]}-map-selector`);
        if (checkBox.checked){
            return true;
        }
    }
    return false;
}

//make generate buttons respond to status
updateGenerateButtonStatus();
function updateGenerateButtonStatus(){    
    var mapsOk = false;
    var roundsOk = false;

    const modes = ["tw","sz","tc","rm","cb"];
    for (var i = 0; i < modes.length; i++){
        if (modeHasMaps(modes[i])){
            mapsOk = true;
            break;
        }
    }

    const rounds = document.getElementsByClassName("added-round");
    roundsOk = rounds.length > 0;

    const allOk = mapsOk && roundsOk;

    const generateButtons = document.getElementsByClassName("generate");
    for (var i = 0; i < generateButtons.length; i++){
        generateButtons[i].disabled = !allOk;
    }

    const errorMessage = document.getElementById("generate-error-message");
    if (!allOk){
        if (!mapsOk && !roundsOk){
            errorMessage.innerText = "You must select maps and add at least one round.";
        }
        else if (!roundsOk){
            errorMessage.innerText = "You must add at least one round.";
        }
        else if (!mapsOk){
            errorMessage.innerText = "You must select maps.";
        }
        errorMessage.style.display = "block";
    }
    else{
        errorMessage.style.display = "none";
    }
}



//make save and load buttons function
const saveModal = document.getElementById("save-modal");
const saveModalClose = document.getElementById("save-close");
saveModalClose.addEventListener("click", function(){
    saveModal.style.display = "none";
    modalContainer.style.display = "none";
});

const loadModal = document.getElementById("load-modal");
const loadModalClose = document.getElementById("load-close");
loadModalClose.addEventListener("click", function(){
    loadModal.style.display = "none";
    modalContainer.style.display = "none";
});

function saveOnClick(){
    saveModal.style.display = "flex";
    modalContainer.style.display = "flex";

    const saveUrl = document.getElementById("save-url");
    const url = window.location.href.split("?")[0];
    saveUrl.value = url + "?pool=" + encodeMapPool();
}

function saveDialogOnClick(){
    const saveName = document.getElementById("save-name").value;
    if (saveName == ""){
        return;
    }

    const mapSelectors = document.getElementsByClassName("map-selector");
    const maps = [];
    for (var i = 0; i < mapSelectors.length; i++){
        if (mapSelectors[i].checked){
            maps.push(mapSelectors[i].id);
        }
    }

    localStorage.setItem(`maps.iplabs.ink-${saveName}`, JSON.stringify(maps));

    saveModalClose.click();
}

function loadOnClick(){
    loadModal.style.display = "flex";
    modalContainer.style.display = "flex";

    const storage = Object.keys(localStorage);
    const loadContainer = document.getElementById("load-container");
    loadContainer.innerHTML = "";

    if (storage.length == 0){
        const noSaves = document.createElement("div");
        noSaves.innerText = "No saves found.";
        loadContainer.appendChild(noSaves);
    }


    for (var i = 0; i < storage.length; i++){
        if (storage[i].startsWith("maps.iplabs.ink-")){

            const loadWrapper = document.createElement("div");
            loadWrapper.setAttribute("class", "load-wrapper");

            if (i == storage.length - 1){
                loadWrapper.style.border = "none";
            }

            const loadName = document.createElement("div");
            loadName.setAttribute("class", "load-name");
            loadName.innerText = storage[i].slice("maps.iplabs.ink-".length);

            const loadButton = document.createElement("button");
            loadButton.setAttribute("class", "button load-button");
            loadButton.innerHTML = '<i class="left-bias fa-solid fa-floppy-disk"></i>Load';

            loadButton.setAttribute("attached-to", storage[i]);
            loadButton.addEventListener("click", function(){
                const mapSelectors = document.getElementsByClassName("map-selector");
                for (var i = 0; i < mapSelectors.length; i++){
                    mapSelectors[i].checked = false;
                }

                const maps = JSON.parse(localStorage.getItem(this.getAttribute("attached-to")));
                for (var j = 0; j < maps.length; j++){
                    const checkBox = document.getElementById(maps[j]);
                    checkBox.checked = true;
                }

                const modes = ["tw","sz","tc","rm","cb"];
                for (var j = 0; j < modes.length; j++){
                    adjustSelectedCount(modes[j]);
                }

                loadModalClose.click();
            });

            const loadDeleteButton = document.createElement("button");
            loadDeleteButton.setAttribute("class", "button load-delete");
            loadDeleteButton.setAttribute("attached-to", storage[i]);
            loadDeleteButton.innerHTML = '<i class="left-bias fa-solid fa-trash-alt"></i>Delete';
            loadDeleteButton.addEventListener("click", function(){
                localStorage.removeItem(this.getAttribute("attached-to"));
                loadContainer.removeChild(loadWrapper);
            });

            loadWrapper.appendChild(loadName);
            loadWrapper.appendChild(loadButton);
            loadWrapper.appendChild(loadDeleteButton);
            loadContainer.appendChild(loadWrapper);
        }
    }
}


function encodeMapPool(){
    const modes = ["tw", "sz", "tc", "rm", "cb"];
    var pools = [];
    for (var i = 0; i < modes.length; i++){
        const thisPool = {
            m: modes[i],
            p: "1"
        };

        var hasMaps = false;

        for (var j = 0; j < allMaps.length; j++){
            //if map is checked
            const checked = document.getElementById(modes[i] + "-" + allMaps[j] + "-map-selector").checked
            thisPool.p += checked ? "1" : "0";
            hasMaps = checked ? checked : hasMaps;
        }

        if (!hasMaps){
            continue
        }

        thisPool.p = thisPool.p.match(/.{4}/g).reduce(function(acc, i) {
            return acc + parseInt(i, 2).toString(16);
        }, '');

        pools.push(thisPool);
    }

    var stringBuilder = "";
    for (var i = 0; i < pools.length; i++){
        if (pools[i].p == ""){
            continue;
        }
        stringBuilder += pools[i].m + ":" + pools[i].p;
        if (i != pools.length - 1){
            stringBuilder += ";";
        }
    }

    return stringBuilder;
}

function encodeRounds(){
    var encodedRounds = [];
    for (var i = 0; i < currentRounds.length; i++){
        var encodedRound = {
            name:currentRounds[i].name,
            maps:""
        };
        for (var j = 0; j < currentRounds[i].maps.length; j++){
            var encodedMode = currentRounds[i].maps[j].mode;
            switch (encodedMode){
                case "Turf War": encodedMode = "0"; break;
                case "Splat Zones": encodedMode = "1"; break;
                case "Tower Control": encodedMode = "2"; break;
                case "Rainmaker": encodedMode = "3"; break;
                case "Clam Blitz": encodedMode = "4"; break;
                case "Unknown Mode": encodedMode = "5"; break;
            }

            const mapIndex = allMaps.indexOf(currentRounds[i].maps[j].map);
            if (mapIndex == -1){
                encodedRound.maps += encodedMode + "-" + "un";
            }
            else{
                encodedRound.maps += encodedMode + "-" + mapIndex;
            }
            
            if (j != currentRounds[i].maps.length - 1){
                encodedRound.maps += ",";
            }
        }
        encodedRounds.push(encodedRound);
    }
    
    var stringBuilder = "";
    for (var i = 0; i < encodedRounds.length; i++){
        stringBuilder += encodedRounds[i].name.replace(" ", "_") + ":" + encodedRounds[i].maps;
        if (i != encodedRounds.length - 1){
            stringBuilder += ";";
        }
    }

    return stringBuilder;
}


//tw:11111111111111111111111;sz:;tc:11111111111111111111111;rm:;cb:;
function decodeMapPool(pools){ 
    pools = pools.split(";");

    for (var i = 0; i < pools.length; i++){
        var thisPool = pools[i].split(":");

        const decodedHex = thisPool[1].split('').reduce(function(acc, i) {
            return acc + ('000' + parseInt(i, 16).toString(2)).substr(-4, 4);
        }, '')

        console.log(decodedHex);

        for (var j = 1; j < decodedHex.length; j++){
            document.getElementById(thisPool[0] + "-" + allMaps[j-1] + "-map-selector").checked = decodedHex[j] == "1";
        }

        adjustSelectedCount(thisPool[0]);
    }
}


// Round_1:4-14,0-19,1-3;Round_2:2-21,3-8,4-2,0-11,1-22;Round_3:2-17,3-0,4-12,0-10,1-16,2-18,3-1;
function decodeRounds(rounds){
    var rounds = rounds.split(";");
    for (var i = 0; i < rounds.length; i++){
        const roundSplit = rounds[i].split(":");
        var round = {
            name:roundSplit[0].replace("_", " "),
            maps:[]
        };

        console.log(roundSplit[1]);
        const mapModes = roundSplit[1].split(",");
        for (var j = 0; j < mapModes.length; j++){

            const split = mapModes[j].split("-");
            var mode = split[0];

            switch(mode){
                case "0": mode = "Turf War"; break;
                case "1": mode = "Splat Zones"; break;
                case "2": mode = "Tower Control"; break;
                case "3": mode = "Rainmaker"; break;
                case "4": mode = "Clam Blitz"; break;
                case "5": mode = "Unknown Mode"; break;
            }

            if (split[1] == "un"){
                round.maps.push({
                    map: "Unknown Map",
                    mode: mode
                });
            } else {
                const map = allMaps[parseInt(split[1])];
                round.maps.push({
                    map:map,
                    mode:mode
                });
            }

        }
        currentRounds.push(round);
        console.log(round);

        const roundNameInput = document.getElementById("round-name");
        const roundGamesInput = document.getElementById("round-games");
        const roundIsCounterpick = document.getElementById("round-counterpick-check");
        const addRoundButton = document.getElementById("add-round-button");

        roundNameInput.value = round.name;
        roundGamesInput.value = round.maps.length;
        roundIsCounterpick.checked = false;
        addRoundButton.click();
    }

    clearGenerateContainer();
    addMapElements();
}