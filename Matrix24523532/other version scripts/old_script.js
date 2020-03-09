
let M = 100, N = 100, X = 30;

var time = performance.now();

//------< css style >---------
let e = document.getElementById('matrix');
e.style.width = (15*M)+40 + 'px'; // 15 ширина 1 ячейки * на количество ячеек
//----------------------------

class AdditionalFunctions {

    randomInteger(min, max) {
        let rand = min - 0.5 + Math.random() * (max - min + 1);
        rand = Math.round(rand);
        return rand;
    }

    checkIdCell(str) {
        return /^\d+-\d+$/ig.test(str);
    }

    //------< сортировка объекта >---------
    sort(ob, name) {
        let i, j, c;
        for (i = 0; i < ob.length; i++)
            for (j = i + 1; j < ob.length; j++)
                if (ob[i][name] > ob[j][name]) {  // от меньшего до большего
                    c = ob[i];
                    ob[i] = ob[j];
                    ob[j] = c;
                }
    }
    printValueInCol(v){
        let str_rand = String(v);
        let symbols = str_rand.split("");
        let ob_rand = '<span>';
        for (let i = 0; i < str_rand.length; i++) {
            ob_rand += '<p>' + symbols[i] + '</p>'
        }
        ob_rand += '<span>';
        return ob_rand;
    }
}

let addFun = new AdditionalFunctions();

function stCell(id, row, col, value) {
    this.id = id;
    this.row = row;
    this.col = col;
    this.value = value;
}

function stAverage(sum) {
    this.sum = sum;  // значение сумы колонки
}

function stSum(sum) {  // сума ряда
    this.sum = sum;  // значение сумы ряда
}

function stSortVal(id, value) { // отсортированые по значению ячейки
    this.id = id;
    this.value = value;
}

function OUTmouseCloseX(id) { // id близких по значению елементов
    this.id = id;
}

ArrStCell = [];
ArrStAverage = [];
ArrStSum = [];
ArrStSortVal = [];
outmouseCloseX = [];


class Context {

    // кнопка "добавить ряд" и среднее по каждой колонке
    CreateTopRow() {
        let divWrappCtrl = document.createElement('div');
        divWrappCtrl.className = "wrappCtrl";
        //---------< ряд >------------
        let divTopRow = document.createElement('div');
        divTopRow.className = "TopRow";
        //--------< кнопка для добавления ряда >-------
        let addRow = document.createElement('div');
        addRow.className = "addRow";
        addRow.id = 'addRow';
        addRow.innerHTML = '<span>Add</span>';
        addRow.setAttribute('onclick', 'state_EventCreateRow.click(this.id)');
        divWrappCtrl.appendChild(addRow);
        //------------< среднее по каждой колонке >--------------
        divTopRow.appendChild(divWrappCtrl);
        for (let cntRow = 0; cntRow < M; cntRow++) {
            let divCell = document.createElement('div');
            divCell.className = "cell-average";
            divCell.id = `cellAverage-${cntRow}`;
            divTopRow.appendChild(divCell);
        }
        document.getElementById('matrix').appendChild(divTopRow);
    }

    // Создать M строчку
    CreateRow(nameCol) {
        let divWrappCtrl = document.createElement('div');
        divWrappCtrl.className = "wrappCtrl";
        //---------< ряд >------------
        let divRow = document.createElement('div');
        divRow.className = "row";
        divRow.id = `row-${nameCol}`;
        //--------< кнопка для удаления ряда >-------
        let deleteRow = document.createElement('div');
        deleteRow.className = "deleteRow";
        deleteRow.id = 'deleteRow-' + nameCol;
        deleteRow.innerHTML = '<span></span>';
        deleteRow.setAttribute('onclick', 'state_EventDeleteRow.click(this.id)');
        divWrappCtrl.appendChild(deleteRow);
        //----------< сума елементов ряда >-----------
        let sumRow = document.createElement('div');
        sumRow.className = "sumRow";
        sumRow.id = 'sumRow-' + nameCol;
        sumRow.setAttribute('onmouseover', 'state_EventSumRow.onmouse(this.id)');
        sumRow.setAttribute('onmouseout', 'state_EventSumRow.outmouse(this.id)');
        divWrappCtrl.appendChild(sumRow);
        //------------< ячейки матрицы >--------------
        divRow.appendChild(divWrappCtrl);
        ArrStCell[nameCol] = []; // инициализация
        for (let cntRow = 0; cntRow < M; cntRow++) {
            let divCell = document.createElement('div');
            divCell.className = "cell";
            divCell.setAttribute('onclick', 'state_EventClick.click(this.id)');
            divCell.setAttribute('onmouseover', 'state_EventOnmouse.eventOnmouseover(this.id)');
            divCell.setAttribute('onmouseout', 'state_EventOnmouse.onmouseCloseX(this.id)');
            let rand = addFun.randomInteger(0, 999);
            let nameId = nameCol + '-' + cntRow;
            divCell.id = nameId;
            divCell.innerHTML = addFun.printValueInCol(String(rand));
            //----------< инициализация структуры и запись значения >------------
            ArrStCell[nameCol][cntRow] = new stCell(nameId,nameCol,cntRow,rand);  // инициализация
            divRow.appendChild(divCell);
        }
        document.getElementById('matrix').appendChild(divRow);
    }

    // создать колонки N
    AppendRowToMatrix() {
        let context = new Context();
        for (let cntCol = 0; cntCol < N; cntCol++) {
            context.CreateRow(cntCol);
        }
    }
}

class State {

    SumOneRow(element) {
        let sum = 0;
        let row;
        element.forEach(function (e) {
            row = e.row;
            sum += e.value;
        });
        ArrStSum[row] = new stSum(sum);
        document.getElementById(`sumRow-${row}`).innerHTML = addFun.printValueInCol(sum);
    }

}

class State_Init extends State {

    SumOllRow() {
        let init = new State_Init();
        ArrStCell.forEach(function (element) {
            init.SumOneRow(element);
        });
    }

    AverageOneCol(coll) {
        let sum = 0;
        ArrStCell.forEach(function (e) {
            sum += e[coll].value;
        });
        ArrStAverage[coll] = new stAverage(sum);
        document.getElementById(`cellAverage-${coll}`).innerHTML = addFun.printValueInCol(Math.round(sum / N));
    }

    AverageOllColl() {
        let init = new State_Init();
        for (let i = 0; i < M; i++) {
            init.AverageOneCol(i);
        }
    }

    closeX() {
        let i = 0;
        ArrStCell.forEach(function (element) {
            element.forEach(function (e) {
                ArrStSortVal[i] = new stSortVal(e.id, e.value);
                i++;
            });
        });
        addFun.sort(ArrStSortVal, 'value');
    }

}

//-----------< при нажатии на ячейку >-------------
class State_EventClick extends State {

    click(id) {

        let arr = id.split('-');
        //-------< значение ячейки >---------
        ArrStCell[arr[0]][arr[1]].value++;
        let e = addFun.printValueInCol(String( ArrStCell[arr[0]][arr[1]].value ));
        document.getElementById(ArrStCell[arr[0]][arr[1]].id).innerHTML = e;

        //---------< StSortCloseX >----------
        //------< позици¤ елемента в масиве структуры >---------
        function posElem(ob, name, value) {
            for (let posElem in ob) {
                if (value == ob[posElem][name]) {
                    return posElem;
                }
            }
            return -1;
        }
        let pos = posElem(ArrStSortVal, 'id', id);
        ArrStSortVal[pos].value = ArrStCell[arr[0]][arr[1]].value;
        //-----< сортировка одного елемента, примен¤ть только когда значение увеличиваетс¤ на 1 (value++)
        function sortOneElem(ob, name, pos) {
            let i = Number(pos), j, c;
            for (j = i + 1; j < ob.length; j++) {
                if (ob[i][name] > ob[j][name]) {  // от меньшего до большего
                    c = ob[i];
                    ob[i] = ob[j];
                    ob[j] = c;
                }
                else {
                    break;
                }
            }
        }
        sortOneElem(ArrStSortVal, 'value', pos);
        //------< сума р¤да >------
        let cntRowSum = ArrStCell[arr[0]][arr[1]].row;
        ArrStSum[cntRowSum].sum++;
        e = addFun.printValueInCol(String( ArrStSum[cntRowSum].sum ));
        document.getElementById(`sumRow-${cntRowSum}`).innerHTML = e;
        //-------< значение с.а. колонки >---------
        let cntCellAverage = ArrStCell[arr[0]][arr[1]].col;
        ArrStAverage[cntCellAverage].sum++;
        e = addFun.printValueInCol(String( Math.round(ArrStAverage[cntCellAverage].sum / N) ));
        document.getElementById(`cellAverage-${cntCellAverage}`).innerHTML = e;
    }

}

// //-----------< при наведении на ячейку >-------------
class State_EventOnmouse extends State {

    eventOnmouseover(id) {

        function SearchCloseX(strId) {
            outmouseCloseX = [];  // init arr
            let posElem = 0;
            let j = 0;
            for(let i in ArrStSortVal) {if(strId == ArrStSortVal[i].id) {break;} posElem++;}
            //----------- close value elem -----------------
            let lenArr = ArrStSortVal.length;

            // если напимер Х = 4, тогда надо подсветить 2 ячейки меньшие по значению и 2 большее
            let bouth = Math.floor(X/2);

            if(posElem-bouth >= 0 && posElem+bouth < lenArr) {
                for(let i=posElem-bouth; i<=posElem+bouth; i++) {
                    document.getElementById(ArrStSortVal[i].id).className = "close-value-elem";
                    outmouseCloseX[j] = new OUTmouseCloseX(ArrStSortVal[i].id);
                    j++;
                }
            }

            if(posElem-bouth < 0) { // выходит за рамки масива в меньшую сторону
                for(let i=0; i<=X; i++) {
                    document.getElementById(ArrStSortVal[i].id).className = "close-value-elem";
                    outmouseCloseX[j] = new OUTmouseCloseX(ArrStSortVal[i].id);
                    j++;
                }
            }

            if(posElem+bouth >= lenArr) {  // выходит за рамки масива в большую сторну
                for(let i=lenArr-1; i>=lenArr-X-1; i--) {
                    document.getElementById(ArrStSortVal[i].id).className = "close-value-elem";
                    outmouseCloseX[j] = new OUTmouseCloseX(ArrStSortVal[i].id);
                    j++;
                }
            }
        }

        SearchCloseX(id);
    }

    onmouseCloseX(id) { // при уходе мыши с ячейки применяются общие стили как для всех ячеек
        for(let i=0; i<outmouseCloseX.length; i++) {
            document.getElementById(outmouseCloseX[i].id).className = "cell";
        }
        outmouseCloseX = [];  // init arr
    }
}

// //----------------< при наведении на ячейку сумы ряда >-----------------------
class State_EventSumRow extends State {

    onmouse(id) {

        let arrSplitId = id.split('-');
        let numRow = Number(arrSplitId[1]);

        for(let i=0; i<M; i++) {
            let pctCell = Math.round( ( ArrStCell[numRow][i].value*100 ) / 1000 );
            let cell = document.getElementById(`${[numRow]}-${[i]}`);
            cell.style.background = 'linear-gradient(to top, #B59EFF ' + pctCell + '%, #FFFFFF ' + pctCell + '%)';
            cell.innerHTML = addFun.printValueInCol( pctCell );
        }

    }

    outmouse(id) {

        let arrSplitId = id.split('-');
        let numRow = Number(arrSplitId[1]);

        for(let i=0; i<M; i++) {
            let cell = document.getElementById(`${[numRow]}-${[i]}`);
            cell.innerHTML = addFun.printValueInCol(ArrStCell[numRow][i].value);
            cell.style.background = '#FFFFFF';
        }
    }

}

//----------------< при нажатии на кнопку, которая удаляет ряд >-------------------
class State_EventDeleteRow extends State {

    click(id) {

        N--;
        let arrSplitId = id.split('-');
        let numId = Number(arrSplitId[1]);
        // подготовка масивов с даными после удаления ряда
        for(let i=0; i < ArrStSortVal.length; i++) {
            let arr = ArrStSortVal[i].id.split('-');
            if(arr[0] == numId) {
                ArrStSortVal.splice(i, 1);
                i--; // что бы удалить все нужные елементы
            }
        }
        delete ArrStSum[numId]; // позиция остальные елементов в масиве не изменяеться
        for(let i in ArrStAverage) {
            ArrStAverage[i].sum -= ArrStCell[numId][i].value;
            document.getElementById(`cellAverage-${i}`).innerHTML = addFun.printValueInCol(Math.round(ArrStAverage[i].sum/N));
        }

        document.getElementById(`row-${arrSplitId[1]}`).remove(); // удаляем елемент с DOM
    }
}

//----------------< при нажатии на кнопку, которая добавляет ряд >-------------------
class State_EventCreateRow extends State {

    click(id) {

        N++;

        function LastRow() {
            let lastRow;
            for (lastRow in ArrStCell) {}
            let arr = ArrStCell[lastRow][0].id.split('-');
            return arr[0];
        }
        let newRow = Number(LastRow()) + 1;

        let state_EventCreateRow = new State_EventCreateRow();
        state_EventCreateRow.CreateRow(newRow);   // новый ряд

        let eventCreateRow = new State_EventCreateRow();
        eventCreateRow.SumOneRow(ArrStCell[newRow]);

        // сортировка ArrStAverage
        for(let i in ArrStAverage) {
            ArrStAverage[i].sum += ArrStCell[newRow][i].value; // newRow соответствует итератору добавляемого ряда
            document.getElementById(`cellAverage-${i}`).innerHTML = addFun.printValueInCol(Math.round(ArrStAverage[i].sum/N));
        }

        function e(id, value) {
            this.id = id;
            this.value = value;
        }

        let sortCreatedRow = [];

        for(let i in ArrStCell[newRow]) {
            sortCreatedRow[i] = new e(ArrStCell[newRow][i].id, ArrStCell[newRow][i].value);
        }

        addFun.sort(sortCreatedRow, 'value'); // от меньшего к большему

        let j = 0;
        for(let i=0; i<ArrStSortVal.length; i++) {
            if(ArrStSortVal[i].value > sortCreatedRow[j].value) {
                ArrStSortVal.splice(i, 0, sortCreatedRow[j]);
                j++;
                if(j >= sortCreatedRow.length) { break; }
            }
        }
    }

    // Создать M новою строчку
    CreateRow(nameCol) {

        let divWrappCtrl = document.createElement('div');
        divWrappCtrl.className = "wrappCtrl";
        //---------< ряд >------------
        let divRow = document.createElement('div');
        divRow.className = "row";
        divRow.id = `row-${nameCol}`;
        //--------< кнопка для удаления ряда >-------
        let deleteRow = document.createElement('div');
        deleteRow.className = "deleteRow";
        deleteRow.id = 'deleteRow-' + nameCol;
        deleteRow.innerHTML = '<span></span>';
        deleteRow.setAttribute('onclick', 'state_EventDeleteRow.click(this.id)');
        divWrappCtrl.appendChild(deleteRow);
        //----------< сума елементов ряда >-----------
        let sumRow = document.createElement('div');
        sumRow.className = "sumRow";
        sumRow.id = 'sumRow-' + nameCol;
        sumRow.setAttribute('onmouseover', 'state_EventSumRow.onmouse(this.id)');
        sumRow.setAttribute('onmouseout', 'state_EventSumRow.outmouse(this.id)');
        divWrappCtrl.appendChild(sumRow);
        //------------< ячейки матрицы >--------------
        divRow.appendChild(divWrappCtrl);
        ArrStCell[nameCol] = []; // инициализация
        for (let cntRow = 0; cntRow < M; cntRow++) {
            let divCell = document.createElement('div');
            divCell.className = "cell";
            divCell.setAttribute('onclick', 'state_EventClick.click(this.id)');
            divCell.setAttribute('onmouseover', 'state_EventOnmouse.eventOnmouseover(this.id)');
            divCell.setAttribute('onmouseout', 'state_EventOnmouse.onmouseCloseX(this.id)');
            let rand = addFun.randomInteger(0, 999);
            let nameId = nameCol + '-' + cntRow;
            divCell.id = nameId;
            divCell.innerHTML = addFun.printValueInCol(String(rand));
            //----------< инициализация структуры и запись значения >------------
            ArrStCell[nameCol][cntRow] = new stCell(nameId,nameCol,cntRow,rand);  // инициализация
            divRow.appendChild(divCell);
        }
        document.getElementById('matrix').appendChild(divRow);
    }
}

let context = new Context();

let state_Init = new State_Init();

let state_EventClick = new State_EventClick();
let state_EventOnmouse = new State_EventOnmouse();

let state_EventSumRow = new State_EventSumRow();

let state_EventDeleteRow = new State_EventDeleteRow();
let state_EventCreateRow = new State_EventCreateRow();

async function main() {
    await context.CreateTopRow();
    await context.AppendRowToMatrix();

    await state_Init.SumOllRow();
    await state_Init.AverageOllColl();
    await state_Init.closeX();
}

main();


time = performance.now() - time;
console.log('Время выполнения = ', Math.round(time) );


//
// ArrayStructCell.forEach(function(element) {
//     element.forEach(function(e) {
//         console.log(e);
//     });
// });





























