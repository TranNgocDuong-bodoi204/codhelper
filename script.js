
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

const RSS_data = {
    mage : {
        T4: { gold: 0, wood: 300, stone: 225 },
        T5: { gold: 0, wood: 800, stone: 600 },
        T4_T5: { gold: 0, wood: 500, stone: 375 },
    },
    archer : {
        T4: { gold: 300, wood: 0, stone: 225 },
        T5: { gold: 800, wood: 0, stone: 600 },
        T4_T5: { gold: 500, wood: 0, stone: 375 },
    },
    infantry : {
        T4: { gold: 300, wood: 300, stone: 0 },
        T5: { gold: 800, wood: 800, stone: 0 },
        T4_T5: { gold: 500, wood: 500, stone: 0 },
    },
    cavalry : {
        T4: { gold: 180, wood: 180, stone: 180 },
        T5: { gold: 480, wood: 480, stone: 480 },
        T4_T5: { gold: 300, wood: 300, stone: 300 },
    }
}


let init_totalTroops = 0;
let totalTroopRemain = 0;
let troop_tier_rss = "T5";

let rss_value = {
    gold : 0,
    wood : 0,
    stone : 0,
    mana : 0,

    AddData(g,w,s,m)
    {
        this.gold += g
        this.wood += w
        this.stone += s
        this.mana += m
    }
}

const RSS_Cal_Element = {
    totalTroop: document.getElementById("totalTroopCanTrain"),
    input:{
        archerInput: {
            value : 0,
            lable : document.getElementById("archerLable")
        },
        mageInput:{
            value: 0,
            lable: document.getElementById("mageLable")
        },
        cavalryInput:{
            value: 0,
            lable: document.getElementById("cavalryLable")
        },
        infantryInput:{
            value: 0,
            lable: document.getElementById("infantryLable")
        }
    }
};

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
    addEventForTroopInput()
}

function  addEventForRadioTroop(params) {
    document.querySelectorAll('input[name="choice"]').forEach((radio) => {
    radio.addEventListener("change", () => OnRadioSelector(radio.value));
    });   
}

function  addEventForTroopInput(params) {
    document.querySelectorAll('input[name="troopInput"]').forEach((input) =>
    {
        input.addEventListener("input", () => onTroopInputChange(input));
    }
    );
}

function OnRadioSelector(select) {
    const quantityId =
        select === "T4" ? "t4Q" : select === "T5" ? "t5Q" : "t4T5Q";
    init_totalTroops = NumberUnFormat(document
        .getElementById(quantityId)
        .textContent);
    totalTroopRemain = init_totalTroops;
    troop_tier_rss = select;

    RSS_Cal_Element.totalTroop.textContent = NumberFormat(
        init_totalTroops,
    );

    CalculateRSSValue();
}

function onTroopInputChange(input) {
    const preInput = RSS_Cal_Element.input[input.id].value || 0;
    const used = init_totalTroops - totalTroopRemain;
    const except = used - preInput;
    const i = NumberUnFormat(input.value);

    const newSumTotal = except + i;

    const v = (newSumTotal <= init_totalTroops) ? i : init_totalTroops - except;
    input.value = v;
    RSS_Cal_Element.input[input.id].value = v;

    let totalRemaining = init_totalTroops;

    CalculateRSSValue();

    for(const key in RSS_Cal_Element.input)
    {
        const obj = RSS_Cal_Element.input[key]
        totalRemaining -= obj.value;
    }
    totalTroopRemain = totalRemaining;
    RSS_Cal_Element.totalTroop.textContent = NumberFormat(totalRemaining);
}
function SelectAllRemainingTroops(inputId) {
    const input = document.getElementById(inputId);
    if (!input) return;

    const currentValue = RSS_Cal_Element.input[inputId].value || 0;
    input.value = currentValue + totalTroopRemain;
    onTroopInputChange(input);
}
function ResetTroopInputs() {
    for (const key in RSS_Cal_Element.input) {
        RSS_Cal_Element.input[key].value = 0;
        document.getElementById(key).value = "";
    }

    totalTroopRemain = NumberUnFormat(init_totalTroops);
    RSS_Cal_Element.totalTroop.textContent = NumberFormat(totalTroopRemain);
    CalculateRSSValue();
}
function CalculateRSSValue() {
    rss_value.gold = 0;
    rss_value.wood = 0;
    rss_value.stone = 0;
    rss_value.mana = 0;

    for (const key in RSS_Cal_Element.input) {
        const value = RSS_Cal_Element.input[key].value;
        RSSCalculate(value, key, troop_tier_rss);
    }

    document.getElementById("totalGold").textContent = NumberFormat(rss_value.gold);
    document.getElementById("totalWood").textContent = NumberFormat(rss_value.wood);
    document.getElementById("totalStone").textContent = NumberFormat(rss_value.stone);
    document.getElementById("totalMana").textContent = NumberFormat(rss_value.mana);
}
function RSSCalculate(value, id,tier) {
    let type = id.replace("Input", "")
    const data = RSS_data[type][tier]

    let gold = value * data.gold
    let wood = value * data.wood
    let stone = value * data.stone
    let mana = value * GetManaData(tier)

    rss_value.AddData(gold,wood,stone,mana)
}
function GetManaData(tier) {
    return (tier === "T4") ? rss_general_T4_mana_ 
    : (tier === "T5") ? rss_general_T5_mana 
    : rss_general_T4_T5_mana
}

function getInitTotalTroop() {
    return init_totalTroops;
}
function setInitTotalTroop(params) {
    init_totalTroops = params
}

function NumberFormat(params) {
    return params.toLocaleString("vi-VN")
}
function NumberUnFormat(params) {
    if (!params) return 0;
    // Xóa tất cả dấu chấm (.) hoặc phẩy (,) có trong chuỗi
    let n = params.toString().replace(/\./g, "").replace(/,/g, "");
    return Number(n) || 0;
}

StartCalculateResources();