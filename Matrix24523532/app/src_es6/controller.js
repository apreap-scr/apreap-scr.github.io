
class Controller {

    SumOneRow(element) {
        let sum = 0;
        let row;
        element.forEach(function (e) {
            row = e.row;
            sum += e.value;
        });
        ArrStSum[row] = model.stSum(sum);
        view.PrintValue(`sumRow-${row}`, sum);
    }

}

class State_Init extends Controller {

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
        ArrStAverage[coll] = model.stAverage(sum);
        view.PrintValue(`cellAverage-${coll}`, Math.round(sum / N));
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
                ArrStSortVal[i] = model.stSortVal(e.id, e.value);
                i++;
            });
        });
        sort(ArrStSortVal, 'value');
        //----< after sort >-----
        state_Init.stCellCloseElemX();
    }

    //---< init stCell close elem X >-----
    stCellCloseElemX() {
        let ifNonPairX;
        let bouth;
        // если напимер Х = 4, тогда надо подсветить 2 ячейки меньшие по значению и 2 большее
        // а также подсвечиваеться ячейка на которую наведен курсор миши
        if(X%2 == 1) { // не парное число, non-pair number
            bouth = Math.floor(X/2);
            ifNonPairX = 1;
        } else {
            bouth = X/2;
            ifNonPairX = 0;
        }
        let lenArr = ArrStSortVal.length;
        let posElem = 0;


        for(let k in ArrStSortVal) {
            let j = 0;
            let arrId = ArrStSortVal[posElem].id.split('-');

            if (posElem - bouth >= 0 && posElem + bouth + ifNonPairX < lenArr) { // не выходит за рамки масива
                for (let i = posElem - bouth; i <= posElem + bouth + ifNonPairX; i++) {
                    ArrStCell[arrId[0]][arrId[1]].range[j] = ArrStSortVal[i].id;
                    j++;
                }
            } else {
                if (posElem - bouth - ifNonPairX < 0) { // выходит за рамки масива в меньшую сторону
                    for (let i = 0; i <= X; i++) {
                        ArrStCell[arrId[0]][arrId[1]].range[j] = ArrStSortVal[i].id;
                        j++;
                    }
                } else {
                    if (posElem + bouth + ifNonPairX >= lenArr) {  // выходит за рамки масива в большую сторну
                        for (let i = lenArr - 1; i >= lenArr - X - 1; i--) {
                            ArrStCell[arrId[0]][arrId[1]].range[j] = ArrStSortVal[i].id;
                            j++;
                        }
                    }
                }
            }
            posElem++;
        }
    }

}

//-----------< при нажатии на ячейку >-------------
class State_EventClick extends Controller {

    click(id) {

        let arr = id.split('-');
        //-------< значение ячейки >---------
        ArrStCell[arr[0]][arr[1]].value++;
        let e = String( ArrStCell[arr[0]][arr[1]].value );
        view.PrintValue(ArrStCell[arr[0]][arr[1]].id, e);

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
        e = String( ArrStSum[cntRowSum].sum );
        view.PrintValue(`sumRow-${cntRowSum}`, e);
        //-------< значение с.а. колонки >---------
        let cntCellAverage = ArrStCell[arr[0]][arr[1]].col;
        ArrStAverage[cntCellAverage].sum++;
        e = String( Math.round(ArrStAverage[cntCellAverage].sum / N) );
        view.PrintValue(`cellAverage-${cntCellAverage}`, e);
    }

}

// //-----------< при наведении на ячейку >-------------
class State_EventOnmouse extends Controller {

    eventOnmouseover(id) {

        function SearchCloseX(strId) {
            let arrId = strId.split('-');
            for(let i in ArrStCell[arrId[0]][arrId[1]].range) {
                document.getElementById(ArrStCell[arrId[0]][arrId[1]].range[i]).className = "close-value-elem";
            }
        }

        SearchCloseX(id);
    }

    onmouseCloseX(id) { // при уходе мыши с ячейки применяются общие стили как для всех ячеек
        let arrId = id.split('-');

        for(let i in ArrStCell[arrId[0]][arrId[1]].range) {
            document.getElementById(ArrStCell[arrId[0]][arrId[1]].range[i]).className = "cell";
        }

    }
}

//----------------< при наведении на ячейку сумы ряда >-----------------------
class State_EventSumRow extends Controller {

    onmouse(id) {

        let arrSplitId = id.split('-');
        let numRow = Number(arrSplitId[1]);

        for(let i=0; i<M; i++) {
            let pctCell = Math.round( ( ArrStCell[numRow][i].value*100 ) / 1000 );
            let cell = document.getElementById(`${[numRow]}-${[i]}`);
            cell.style.background = 'linear-gradient(to top, #B59EFF ' + pctCell + '%, #FFFFFF ' + pctCell + '%)';
            view.PrintValue(`${[numRow]}-${[i]}`, pctCell);
        }

    }

    outmouse(id) {

        let arrSplitId = id.split('-');
        let numRow = Number(arrSplitId[1]);

        for(let i=0; i<M; i++) {
            let cell = document.getElementById(`${[numRow]}-${[i]}`);
            view.PrintValue(`${[numRow]}-${[i]}`, ArrStCell[numRow][i].value);
            cell.style.background = '#FFFFFF';
        }
    }

}

//----------------< при нажатии на кнопку, которая удаляет ряд >-------------------
class State_EventDeleteRow extends Controller {

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
            view.PrintValue(`cellAverage-${i}`, Math.round(ArrStAverage[i].sum/N));
        }

        state_Init.stCellCloseElemX();

        view.DeleteElem(`row-${arrSplitId[1]}`);
    }
}

//----------------< при нажатии на кнопку, которая добавляет ряд >-------------------
class State_EventCreateRow extends Controller {

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
        view.CreateRow(newRow);   // новый ряд

        let eventCreateRow = new State_EventCreateRow();
        eventCreateRow.SumOneRow(ArrStCell[newRow]);

        // сортировка ArrStAverage
        for(let i in ArrStAverage) {
            ArrStAverage[i].sum += ArrStCell[newRow][i].value; // newRow соответствует итератору добавляемого ряда
            view.PrintValue(`cellAverage-${i}`, Math.round(ArrStAverage[i].sum/N));
        }

        function e(id, value) {
            this.id = id;
            this.value = value;
        }

        let sortCreatedRow = [];

        for(let i in ArrStCell[newRow]) {
            sortCreatedRow[i] = new e(ArrStCell[newRow][i].id, ArrStCell[newRow][i].value);
        }

        sort(sortCreatedRow, 'value'); // от меньшего к большему

        let j = 0;
        for(let i=0; i<ArrStSortVal.length; i++) {
            if(ArrStSortVal[i].value > sortCreatedRow[j].value) {
                ArrStSortVal.splice(i, 0, sortCreatedRow[j]);
                j++;
                if(j >= sortCreatedRow.length) { break; }
            }
        }

        state_Init.stCellCloseElemX();
    }

}
