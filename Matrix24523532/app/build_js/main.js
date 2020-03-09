"use strict";

var model = new Model();

var view = new View();

var state_Init = new State_Init();

var state_EventClick = new State_EventClick();
var state_EventOnmouse = new State_EventOnmouse();

var state_EventSumRow = new State_EventSumRow();

var state_EventDeleteRow = new State_EventDeleteRow();
var state_EventCreateRow = new State_EventCreateRow();

function main() {
    view.CreateTopRow();
    view.AppendRowToMatrix();

    state_Init.SumOllRow();
    state_Init.AverageOllColl();
    state_Init.closeX();
}

main();