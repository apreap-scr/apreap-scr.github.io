

let model = new Model();

let view = new View();

let state_Init = new State_Init();

let state_EventClick = new State_EventClick();
let state_EventOnmouse = new State_EventOnmouse();

let state_EventSumRow = new State_EventSumRow();

let state_EventDeleteRow = new State_EventDeleteRow();
let state_EventCreateRow = new State_EventCreateRow();

function main() {
    view.CreateTopRow();
    view.AppendRowToMatrix();

    state_Init.SumOllRow();
    state_Init.AverageOllColl();
    state_Init.closeX();
}

main();

