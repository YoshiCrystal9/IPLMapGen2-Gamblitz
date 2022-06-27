
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
        modalContainer.classList.remove("green");
        modalContainer.classList.remove("red");
        const modals = document.getElementsByClassName("modal-content");
        for (var i = 0; i < modals.length; i++){
            modals[i].style.display = "none";
        }
    }
});


const mapVisualButton = document.getElementById("map-visual-button");
const mapVisualModal = document.getElementById("map-visual-modal");

mapVisualButton.onclick = function(){
    modalContainer.style.display = "flex";
    modalContainer.classList.add("green");
    mapVisualModal.style.display = "flex";

    createMapVisual();
}

const mapVisualClose = document.getElementById("map-visual-close");
mapVisualClose.onclick = function(){
    modalContainer.style.display = "none";
    modalContainer.classList.remove("green");
    mapVisualModal.style.display = "none";
}

function createMapVisual(){
    const table = document.getElementById("map-visual-table");
    table.innerHTML = "";
    table.style.fontSize = "1em";
    
    const baseModes = ["tw", "sz", "tc", "rm", "cb"];
    var modes = [];
    for (var i = 0; i < baseModes.length; i++){
        if (modeHasMaps(baseModes[i])){
            modes.push(baseModes[i]);
        }
    }

    var tr = document.createElement("tr");
    const mapLabel = document.createElement("th");
    mapLabel.innerText = "Map";
    tr.appendChild(mapLabel);

    for (var i = 0; i < modes.length; i++){
        var td = document.createElement("th");
        td.innerHTML = modes[i].toUpperCase();
        tr.appendChild(td);
    }

    table.appendChild(tr);

    var mapsSort = allMaps;
    if (localStorage.getItem("sorting-order") == "alpha"){
        mapsSort = allMapsAlpha;
    }

    for (var i = 0; i < mapsSort.length; i++){
        var sussyAmongusFortniteMinecrafter = false;

        const tr = document.createElement("tr");

        const mapName = document.createElement("td");
        mapName.innerHTML = mapsSort[i];
        tr.appendChild(mapName);

        for (var j = 0; j < modes.length; j++){
            const td = document.createElement("td");
            if (document.getElementById(`${modes[j]}-${mapsSort[i]}-map-selector`).checked){
                const circle = document.createElement("div");
                circle.classList.add("circle");
                td.appendChild(circle);
                sussyAmongusFortniteMinecrafter = true;
            }
            tr.appendChild(td);
        }

        if (sussyAmongusFortniteMinecrafter){
            table.appendChild(tr);
        }
    }
    
    const mapVisualZoomIn = document.getElementById("map-visual-zoomin");
    const mapVisualZoomOut = document.getElementById("map-visual-zoomout");
    const zoomMin = .5;
    const zoomMax = 3;

    mapVisualZoomIn.onclick = function(){
        table.style.fontSize = Math.min(parseFloat(table.style.fontSize) + 0.1, zoomMax) + "em";
    }
    mapVisualZoomOut.onclick = function(){
        table.style.fontSize = Math.max(parseFloat(table.style.fontSize) - 0.1, zoomMin) + "em";
    }

    if (table.childNodes.length <= 1){
        table.innerHTML = "No maps selected.";
        mapVisualZoomIn.style.display = "none";
        mapVisualZoomOut.style.display = "none";
    }
}


const statsOptionsButton = document.getElementById("stats-button-options");
statsOptionsButton.onclick = function(){
    statsHideAll();
    const statsOptions = document.getElementById("stats-options");
    statsOptions.style.display = "block";
    statsOptionsButton.classList.add("active");
}

const mapStatsButton = document.getElementById("stats-button");
const mapStatsClose = document.getElementById("stats-close");
const mapStatsModal = document.getElementById("stats-modal");

mapStatsButton.onclick = function(){
    const statOptions = document.getElementById("stats-options");
    statOptions.innerHTML = "";

    for (var i = 0; i < currentRounds.length; i++){
        const label = document.createElement("label");
        label.classList.add("stats-option");
        
        const name = document.createElement("div");
        name.classList.add("stats-option-name");
        name.innerHTML = currentRounds[i].name;
        label.appendChild(name);

        const checkbox = document.createElement("input");
        checkbox.type = "checkbox";
        checkbox.id = `stats-option-${i}`;
        checkbox.checked = true;
        checkbox.addEventListener("change", function(){
            getStats();
        });
        label.appendChild(checkbox);
        
        statOptions.appendChild(label);
    }

    const statsNav = document.getElementById("stats-nav");
    for (var i = 1; i < statsNav.children.length; i++){
        statsNav.children[i].style.display = "none";
    }

    modalContainer.style.display = "flex";
    mapStatsModal.style.display = "flex";
    modalContainer.classList.add("red");

    getStats();

    statsOptionsButton.click();
}

mapStatsClose.onclick = function(){
    modalContainer.style.display = "none";
    mapStatsModal.style.display = "none";
    modalContainer.classList.remove("red");
    modalContainer.classList.remove("green");
}

function statsHideAll(){
    const statsOptions = document.getElementById("stats-options");
    statsOptions.style.display = "none";

    const statsContainer = document.getElementById("stats-container");
    for (var i = 0; i < statsContainer.children.length; i++){
        statsContainer.children[i].style.display = "none";
    }

    const statsNav = document.getElementById("stats-nav");
    for (var i = 0; i < statsNav.children.length; i++){
        statsNav.children[i].classList.remove("active");
    }
}

const exportButtonDiscord = document.getElementById("export-button-discord");
const exportDiscordClose = document.getElementById("discord-export-close");
const exportDiscordModal = document.getElementById("discord-export-modal");
const exportDiscordCopy = document.getElementById("discord-export-copy");

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

exportDiscordCopy.onclick = function(){
    const text = document.getElementById("discord-export-textarea");
    navigator.clipboard.writeText(text.value).then(function() {
        exportDiscordCopy.innerHTML = '<i class="left-bias fa-solid fa-clipboard-check fa-bounce"></i>Copied';
        setTimeout(function(){
            exportDiscordCopy.innerHTML = '<i class="left-bias fa-solid fa-clipboard-list"></i>Copy';
        }, 2000);
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
}

const exportButtonURL = document.getElementById("export-button-url");
const exportURLClose = document.getElementById("url-export-close");
const exportURLModal = document.getElementById("url-export-modal");
const exportURLCopy = document.getElementById("url-export-copy");

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

exportURLCopy.onclick = function(){
    const text = document.getElementById("url-export-textarea");
    navigator.clipboard.writeText(text.value).then(function() {
        exportURLCopy.innerHTML = '<i class="left-bias fa-solid fa-clipboard-check fa-bounce"></i>Copied';
        setTimeout(function(){
            exportURLCopy.innerHTML = '<i class="left-bias fa-solid fa-clipboard-list"></i>Copy';
        }, 2000);
      }, function(err) {
        console.error('Async: Could not copy text: ', err);
      });
}


const aboutButton = document.getElementById("about-button");
const aboutModal = document.getElementById("about-modal");
const aboutClose = document.getElementById("about-close");

aboutButton.onclick = function(){
    modalContainer.style.display = "flex";
    aboutModal.style.display = "flex";
    modalContainer.classList.add("green");
}

aboutClose.onclick = function(){
    modalContainer.style.display = "none";
    aboutModal.style.display = "none";
    modalContainer.classList.remove("green");
}


const preferencesButton = document.getElementById("preferences-button");
const preferencesModal = document.getElementById("preferences-modal");
const preferencesClose = document.getElementById("preferences-close");

preferencesButton.onclick = function(){
    modalContainer.style.display = "flex";
    preferencesModal.style.display = "flex";
    modalContainer.classList.add("green");
}

preferencesClose.onclick = function(){
    modalContainer.style.display = "none";
    preferencesModal.style.display = "none";
    modalContainer.classList.remove("green");
}



//load map options into page
const allMaps = ["The Reef", "Musselforge Fitness", "Starfish Mainstage", "Humpback Pump Track", "Inkblot Art Academy", "Sturgeon Shipyard", "Moray Towers", "Port Mackerel", "Manta Maria", "Kelp Dome", "Snapper Canal", "Blackbelly Skatepark", "MakoMart", "Walleye Warehouse", "Shellendorf Institute", "Arowana Mall", "Goby Arena", "Piranha Pit", "Camp Triggerfish", "Wahoo World", "New Albacore Hotel", "Ancho-V Games", "Skipper Pavilion"];
const allMapsAlpha = [...allMaps].sort((a,b) => a.localeCompare(b));

for (var i = 0; i < allMaps.length; i++){
    const modes = ["tw","sz","tc","rm","cb"];

    for (var j = 0; j < modes.length; j++){
        const mapInputId = `${modes[j]}-${allMaps[i]}-map-selector`;

        const mapLabel = document.createElement("label");
        mapLabel.setAttribute("for", mapInputId);
        mapLabel.innerHTML = `<div class="map-name">${allMaps[i]}</div>`;
        mapLabel.setAttribute("data-release", i);
        mapLabel.setAttribute("data-alpha", allMapsAlpha.indexOf(allMaps[i]));

        const mapInput = document.createElement("input");
        mapInput.type = "checkbox";
        mapInput.id = mapInputId;
        mapInput.setAttribute("class", "map-selector");

        mapInput.setAttribute("onclick", `adjustSelectedCount("${modes[j]}")`);

        mapLabel.appendChild(mapInput);

        document.getElementById(`${modes[j]}-picker-wrapper`).appendChild(mapLabel);


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
const roundError = document.getElementById("round-error-message");

const roundEditor = document.getElementById("round-editor");

addRoundButton.addEventListener("click", function(){
    if (roundNameInput.value == ""){
        changeRoundError("Please enter a name for the round.");
        return;
    }
    if (roundGamesInput.value == ""){
        changeRoundError("Please enter the number of games in the round.");
        return;
    }
    //if roundnameinput isn't alphanumeric, return
    if (!/^[\w\-\s]+$/.test(roundNameInput.value)){
        changeRoundError("Please enter an alphanumeric round name.");
        return;
    }

    changeRoundError();

    addRound(roundNameInput.value, roundGamesInput.value, roundIsCounterpick.checked);
    

    //attempt to increment last character in name
    const lastChar = roundNameInput.value.slice(-1);
    if (!isNaN(lastChar)){
        const newName = roundNameInput.value.slice(0, -1) + (parseInt(lastChar) + 1);
        roundNameInput.value = newName;
    }
    else {
        roundNameInput.value = "";
        roundNameInput.focus();
    }
});


function addRound(name, games, isCounterpick){
    const addedRound = document.createElement("div");
    addedRound.setAttribute("class", "added-round");

    const roundTitle = document.createElement("div");
    roundTitle.setAttribute("class", "title");
    roundTitle.id = "round-title";
    roundTitle.innerText = name;
    addedRound.appendChild(roundTitle);
    
    const roundGames = document.createElement("div");
    roundGames.setAttribute("class", "games");
    roundGames.id = "round-games";
    roundGames.innerText = games + " game" + (games == 1 ? "" : "s");
    addedRound.appendChild(roundGames);

    if (isCounterpick){
        const roundCounterpick = document.createElement("div");
        roundCounterpick.setAttribute("class", "counterpick");
        roundCounterpick.id = "round-counterpick";
        roundCounterpick.innerText = "Counterpick";
        addedRound.appendChild(roundCounterpick);
    }

    const upButton = document.createElement("button");
    upButton.setAttribute("class", "button first");
    upButton.innerHTML = '<i class="fa-solid fa-angle-up"></i>';
    upButton.addEventListener("click", function(){
        const parent = this.parentElement;
        if(parent.previousElementSibling)
            parent.parentNode.insertBefore(parent, parent.previousElementSibling);
    });
    addedRound.appendChild(upButton);

    const downButton = document.createElement("button");
    downButton.setAttribute("class", "button");
    downButton.innerHTML = '<i class="fa-solid fa-angle-down"></i>';
    downButton.addEventListener("click", function(){
        const parent = this.parentElement;
        if(parent.nextElementSibling)
            parent.parentNode.insertBefore(parent.nextElementSibling, parent);
    });
    addedRound.appendChild(downButton);

    const removeButton = document.createElement("button");
    removeButton.setAttribute("class", "remove button");
    removeButton.innerHTML = '<i class="fa-solid fa-trash-can"></i>';
    removeButton.addEventListener("click", function(){
        removeButton.parentElement.remove();
        updateGenerateButtonStatus();
    });
    addedRound.appendChild(removeButton);

    roundEditor.appendChild(addedRound);

    updateGenerateButtonStatus();
}

const modeHasMaps = function(mode){
    for (var i = 0; i < allMaps.length; i++){
        const checkBox = document.getElementById(`${mode}-${allMaps[i]}-map-selector`);
        if (checkBox.checked){
            return true;
        }
    }
    return false;
}

function changeRoundError(message){
    if (message == undefined)
        message = "";

    roundError.innerText = message;

    if (message == ""){
        roundError.style.display = "none";
    }
    else{
        roundError.style.display = "block";
    }
}

roundNameInput.addEventListener("change", function(){
    //check if round name exists
    const roundName = roundNameInput.value;
    const rounds = document.getElementsByClassName("added-round");
    for (var i = 0; i < rounds.length; i++){
        if (rounds[i].querySelector("#round-title").innerText == roundName){
            changeRoundError("It's recommended to use a unique name for each round.");
            return;
        }
    }
});

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
    modalContainer.classList.remove("green");
    modalContainer.classList.remove("red");
});

const loadModal = document.getElementById("load-modal");
const loadModalClose = document.getElementById("load-close");
loadModalClose.addEventListener("click", function(){
    loadModal.style.display = "none";
    modalContainer.style.display = "none";
    modalContainer.classList.remove("green");
    modalContainer.classList.remove("red");
});

function saveOnClick(){
    saveModal.style.display = "flex";
    modalContainer.style.display = "flex";
    modalContainer.classList.add("green");

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
    modalContainer.classList.add("green");

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

                const oldInner = loadButton.innerHTML;
                loadButton.innerHTML = '<i class="left-bias fa-solid fa-bounce fa-check"></i>Loaded'
                
                setTimeout(function(){
                    loadModalClose.click();
                    loadButton.innerHTML = oldInner;
                }, 1000);
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
        stringBuilder += encodedRounds[i].name.replaceAll(" ", "_") + ":" + encodedRounds[i].maps;
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
            name:roundSplit[0].replaceAll("_", " "),
            maps:[]
        };
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

        //if all but the first map is unknown mode, then its true
        var isUnknown = true;
        for (var j = 1; j < round.maps.length; j++){
            if (round.maps[j].mode != "Unknown Mode"){
                isUnknown = false;
            }
        }

        addRound(round.name, round.maps.length, isUnknown);
    }

    clearGenerateContainer();
    addMapElements();
}

function scrollToMapList(){
    document.getElementById("maps-panel").scrollIntoView({behavior: "smooth"});
}


const settingsTab = document.getElementById("settings-tab");
const mapListTab = document.getElementById("maplist-tab");
const optionsPanel = document.getElementsByClassName("options-panel")[0];
const mapsPanel = document.getElementsByClassName("maps-panel")[0];

settingsTab.onclick = function(){
    optionsPanel.classList.remove("mobile-hidden");
    mapsPanel.classList.add("mobile-hidden");
    settingsTab.classList.add("active");
    mapListTab.classList.remove("active");
    
};
mapListTab.onclick = function(){
    optionsPanel.classList.add("mobile-hidden");
    mapsPanel.classList.remove("mobile-hidden");
    settingsTab.classList.remove("active");
    mapListTab.classList.add("active");
};



const header = document.getElementsByClassName("header")[0];
const columnContainer = document.getElementsByClassName("column-container")[0];
const footer = document.getElementsByClassName("footer")[0];
const startPage = document.getElementById("start-page-wrapper");

const visited = localStorage.getItem('visited');
if (visited != 1){
    const startPageButton = document.getElementById("start-page-button");
    startPageButton.setAttribute("onclick", 'startButtonClick()');

    header.style.display = "none";
    columnContainer.style.display = "none";
    footer.style.display = "none";
}
else {
    startPage.style.display = "none";
    setTimeout(() => {
        optionsPanel.style.animationDuration = ".4s";
        mapsPanel.style.animationDuration = ".4s";
    }, 1000);
}

function startButtonClick(){
    startPage.style.animation = "startPageClose .5s forwards";

    setTimeout(function(){
        startPage.style.display = "none";
        header.style.display = "flex";
        columnContainer.style.display = "flex";
        footer.style.display = "block";

        localStorage.setItem("visited", 1);

    }, 600);

    setTimeout(() => {
        optionsPanel.style.animationDuration = ".4s";
        mapsPanel.style.animationDuration = ".4s";
    }, 1600);
}


const preferredSortSetting = document.getElementById("preferred-sort-setting");
var sortingMethod = localStorage.getItem("sorting-order");
if (sortingMethod == null){
    localStorage.setItem("sorting-order", preferredSortSetting.value);
} else {
    preferredSortSetting.value = sortingMethod;
    if (sortingMethod == "alpha"){
        changeToAlphaSort();
    }
}

//on sorting method change
preferredSortSetting.onchange = function(){
    localStorage.setItem("sorting-order", preferredSortSetting.value);
    if (preferredSortSetting.value == "alpha"){
        changeToAlphaSort();
    } else {
        changeToReleaseSort();
    }
}

function changeToReleaseSort(){
    const stageSelModals = [
        document.getElementById("tw-picker-wrapper"),
        document.getElementById("sz-picker-wrapper"),
        document.getElementById("tc-picker-wrapper"),
        document.getElementById("rm-picker-wrapper"),
        document.getElementById("cb-picker-wrapper")
    ];

    for (var i = 0; i < stageSelModals.length; i++){
        const childLabels = stageSelModals[i].children;
        const indexesArray = Array.from(childLabels);
        const sortedByRel = indexesArray.sort(function(a,b){
            const ai = parseInt(a.dataset.release);
            const bi = parseInt(b.dataset.release);
            if (ai < bi){
                return -1;
            } else if (ai > bi){
                return 1;
            }
            return 0;
        });
        sortedByRel.forEach(e =>
            document.querySelector("#" + stageSelModals[i].id).appendChild(e));
    }
}

function changeToAlphaSort(){
    const stageSelModals = [
        document.getElementById("tw-picker-wrapper"),
        document.getElementById("sz-picker-wrapper"),
        document.getElementById("tc-picker-wrapper"),
        document.getElementById("rm-picker-wrapper"),
        document.getElementById("cb-picker-wrapper")
    ];

    for (var i = 0; i < stageSelModals.length; i++){
        const childLabels = stageSelModals[i].children;
        const indexesArray = Array.from(childLabels);
        const sortedByAlpha = indexesArray.sort(function(a,b){
            const ai = parseInt(a.dataset.alpha);
            const bi = parseInt(b.dataset.alpha);
            if (ai < bi){
                return -1;
            } else if (ai > bi){
                return 1;
            }
            return 0;
        });
        sortedByAlpha.forEach(e =>
            document.querySelector("#" + stageSelModals[i].id).appendChild(e));
    }
}





//thank you for checking out the code. Here is your reward.
function doABarrelRoll(){
    const body = document.getElementsByTagName("body")[0];
    body.style.transitionDuration = "2s";
    body.style.overflow = "hidden";
    body.style.transform = "rotate(360deg)";
    setTimeout(function(){
        body.style.transitionDuration = "0s";
        body.style.transform = "rotate(0deg)";
    }, 2000);
}