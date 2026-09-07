
const T1_RAW = 10345; const T1 = T1_RAW * 1.45; const T1_sgl = 5; const T1_GH = 1;
const T2_RAW = 20690; const T2 = T2_RAW * 1.45; const T2_sgl = 10; const T2_GH = 2;
const T3_RAW = 41380; const T3 = T3_RAW * 1.45; const T3_sgl = 20; const T3_GH = 3;
const T4_RAW = 55173; const T4 = T4_RAW * 1.45; const T4_sgl = 40; const T4_GH = 4;
const T5_RAW = 82759; const T5 = T5_RAW * 1.45; const T5_sgl = 100; const T5_GH = 10;

const T1_T4 = 65000.6; const T1_T4_sgl = 35; const T1_T4_GH = 3;
const T2_T4 = 50000.35; const T2_T4_sgl = 30; const T2_T4_GH = 2;
const T3_T4 = 19999.85; const T3_T4_sgl = 20; const T3_T4_GH = 1;
const T1_T5 = 105000.3; const T1_T5_sgl = 95; const T1_T5_GH = 9;
const T2_T5 = 90000.05; const T2_T5_sgl = 90; const T2_T5_GH = 8;
const T3_T5 = 59999.55; const T3_T5_sgl = 80; const T3_T5_GH = 7;
const T4_T5 = 39999.7; const T4_T5_sgl = 60; const T4_T5_GH = 6;

const rss_general_T4_mana_ = 100;
const rss_general_T5_mana = 400;
const rss_general_T4_T5_mana = 300;

const mage_rss = {
    T4: { gold: 0, wood: 300, stone: 225 },
    T5: { gold: 0, wood: 800, stone: 600 },
    T4_T5: { gold: 0, wood: 500, stone: 375 },
};
const archer_rss = {
    T4: { gold: 300, wood: 0, stone: 225 },
    T5: { gold: 800, wood: 0, stone: 600 },
    T4_T5: { gold: 500, wood: 0, stone: 375 },
};
const infantry_rss = {
    T4: { gold: 300, wood: 300, stone: 0 },
    T5: { gold: 800, wood: 800, stone: 0 },
    T4_T5: { gold: 500, wood: 500, stone: 0 },
};
const cavalry_rss = {
    T4: { gold: 180, wood: 180, stone: 180 },
    T5: { gold: 480, wood: 480, stone: 480 },
    T4_T5: { gold: 300, wood: 300, stone: 300 },
};


let amount_troop_rss = 0;
let troop_tier_rss = "T5";

function CalculateQuantityTroops() {
    const days = parseFloat(document.getElementById("daysNumber").value) || 0;
    const hours = parseFloat(document.getElementById("hoursNumber").value) || 0;
    const minutes = parseFloat(document.getElementById("minutesNumber").value) || 0;
    const buff = parseFloat(document.getElementById("buff").value) / 100 || 0;
    const totalDays = days + hours / 24 + minutes / 1440;

    const quantityT1 = CalculateQuantity(totalDays, T1, buff);
    const quantityT2 = CalculateQuantity(totalDays, T2, buff);
    const quantityT3 = CalculateQuantity(totalDays, T3, buff);
    const quantityT4 = CalculateQuantity(totalDays, T4, buff);
    const quantityT5 = CalculateQuantity(totalDays, T5, buff);

    document.getElementById("t1Q").textContent = quantityT1;
    document.getElementById("t2Q").textContent = quantityT2;
    document.getElementById("t3Q").textContent = quantityT3;
    document.getElementById("t4Q").textContent = quantityT4;
    document.getElementById("t5Q").textContent = quantityT5;

    const quantityT1_T4 = CalculateQuantity(totalDays, T1_T4, buff);
    const quantityT2_T4 = CalculateQuantity(totalDays, T2_T4, buff);
    const quantityT3_T4 = CalculateQuantity(totalDays, T3_T4, buff);
    const quantityT1_T5 = CalculateQuantity(totalDays, T1_T5, buff);
    const quantityT2_T5 = CalculateQuantity(totalDays, T2_T5, buff);
    const quantityT3_T5 = CalculateQuantity(totalDays, T3_T5, buff);
    const quantityT4_T5 = CalculateQuantity(totalDays, T4_T5, buff);

    document.getElementById("t1T4Q").textContent = quantityT1_T4;
    document.getElementById("t2T4Q").textContent = quantityT2_T4;
    document.getElementById("t3T4Q").textContent = quantityT3_T4;
    document.getElementById("t1T5Q").textContent = quantityT1_T5;
    document.getElementById("t2T5Q").textContent = quantityT2_T5;
    document.getElementById("t3T5Q").textContent = quantityT3_T5;
    document.getElementById("t4T5Q").textContent = quantityT4_T5;

    const troopResults = [
        ["t1", quantityT1, "T1"], ["t2", quantityT2, "T2"], ["t3", quantityT3, "T3"],
        ["t4", quantityT4, "T4"], ["t5", quantityT5, "T5"],
        ["t1T4", quantityT1_T4, "T1_T4"], ["t2T4", quantityT2_T4, "T2_T4"],
        ["t3T4", quantityT3_T4, "T3_T4"], ["t1T5", quantityT1_T5, "T1_T5"],
        ["t2T5", quantityT2_T5, "T2_T5"], ["t3T5", quantityT3_T5, "T3_T5"],
        ["t4T5", quantityT4_T5, "T4_T5"],
    ];

    troopResults.forEach(([id, quantity, tier]) => {
        document.getElementById(`${id}SglP`).textContent = GetEventPoints(quantity, tier, "strongest lord");
        document.getElementById(`${id}GhP`).textContent = GetEventPoints(quantity, tier, "greate hight");
    });
}

function GetEventPoints(quantity, tier, event) {
    const pointTable = {
        "strongest lord": {
            T1: T1_sgl, T2: T2_sgl, T3: T3_sgl, T4: T4_sgl, T5: T5_sgl,
            T1_T4: T1_T4_sgl, T2_T4: T2_T4_sgl, T3_T4: T3_T4_sgl,
            T1_T5: T1_T5_sgl, T2_T5: T2_T5_sgl, T3_T5: T3_T5_sgl, T4_T5: T4_T5_sgl,
        },
        "greate hight": {
            T1: T1_GH, T2: T2_GH, T3: T3_GH, T4: T4_GH, T5: T5_GH,
            T1_T4: T1_T4_GH, T2_T4: T2_T4_GH, T3_T4: T3_T4_GH,
            T1_T5: T1_T5_GH, T2_T5: T2_T5_GH, T3_T5: T3_T5_GH, T4_T5: T4_T5_GH,
        },
    };

    const pointsPerTroop = pointTable[String(event).trim().toLowerCase()]?.[String(tier).trim().toUpperCase()];
    const troopQuantity = Number(String(quantity).replace(/\./g, "").replace(/,/g, ""));
    if (pointsPerTroop === undefined || !Number.isFinite(troopQuantity)) return 0;
    return (troopQuantity * pointsPerTroop).toLocaleString("vi-VN");
}

function CalculateQuantity(totalDays, baseline, buff) {
    return Math.round((totalDays / (baseline / (1 + buff))) * 86400 * 1000).toLocaleString("vi-VN");
}

function CalculateSpeed() {
    const result = document.getElementById("resultSpeed");
    const numberOfTroops = parseFloat(document.getElementById("quantityTroops").value) || 0;
    const buff = (parseFloat(document.getElementById("buff").value) || 0) / 100;
    const baseline = parseFloat(document.getElementById("selectTroopType").value) || 0;
    const days = (baseline / (1 + buff) * (numberOfTroops / 1000)) / 86400;
    const wholeDays = Math.floor(days);
    const totalRemainingSeconds = Math.round((days - wholeDays) * 86400);
    result.innerHTML = `<p>Days: ${wholeDays}</p><p>Hours: ${Math.floor(totalRemainingSeconds / 3600)}</p><p>Minutes: ${Math.floor((totalRemainingSeconds % 3600) / 60)}</p><p>Seconds: ${totalRemainingSeconds % 60}</p>`;
}

// radio select troop type
function StartCalculateResources() {
    addEventForRadioTroop()
    addEventForTroopSlider()
}

function  addEventForRadioTroop(params) {
    document.querySelectorAll('input[name="choice"]').forEach((radio) => {
    radio.addEventListener("change", () => OnRadioSelector(radio.value));
    });   
}

function OnRadioSelector(select) {
    const quantityId =
        select === "T4" ? "t4Q" : select === "T5" ? "t5Q" : "t4T5Q";
    amount_troop_rss = document
        .getElementById(quantityId)
        .textContent.replace(/\./g, "")
        .replace(/,/g, "");
    troop_tier_rss = select;
    const total = document.getElementById("totalTroopCanTrain");
    total.textContent = NumberFormat(parseInt(amount_troop_rss));
    // khi tick xong sẽ set max cho sliders bằng amount of troop
    firstSetSliderMaxValue(amount_troop_rss);
}

function addEventForTroopSlider(params) {
    const sliders = document.querySelectorAll(".troopSlider");
    sliders.forEach(slider => {
        slider.addEventListener('input',() => {onTroopSliderChanged(slider)});
    });
}

function onTroopSliderChanged(slider) {
    
}

function  firstSetSliderMaxValue(params) {
    /** @type {NodeListOf<HTMLInputElement>} */
    const sliders = document.querySelectorAll(".troopSlider");
    sliders.forEach(slider=>{
        slider.max = params
    });
}



function NumberFormat(params) {
    return params.toLocaleString("vi-VN")
}

StartCalculateResources();