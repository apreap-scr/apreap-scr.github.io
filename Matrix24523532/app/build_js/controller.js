'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _possibleConstructorReturn(self, call) { if (!self) { throw new ReferenceError("this hasn't been initialised - super() hasn't been called"); } return call && (typeof call === "object" || typeof call === "function") ? call : self; }

function _inherits(subClass, superClass) { if (typeof superClass !== "function" && superClass !== null) { throw new TypeError("Super expression must either be null or a function, not " + typeof superClass); } subClass.prototype = Object.create(superClass && superClass.prototype, { constructor: { value: subClass, enumerable: false, writable: true, configurable: true } }); if (superClass) Object.setPrototypeOf ? Object.setPrototypeOf(subClass, superClass) : subClass.__proto__ = superClass; }

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Controller = function () {
    function Controller() {
        _classCallCheck(this, Controller);
    }

    _createClass(Controller, [{
        key: 'SumOneRow',
        value: function SumOneRow(element) {
            var sum = 0;
            var row = void 0;
            element.forEach(function (e) {
                row = e.row;
                sum += e.value;
            });
            ArrStSum[row] = model.stSum(sum);
            view.PrintValue('sumRow-' + row, sum);
        }
    }]);

    return Controller;
}();

var State_Init = function (_Controller) {
    _inherits(State_Init, _Controller);

    function State_Init() {
        _classCallCheck(this, State_Init);

        return _possibleConstructorReturn(this, (State_Init.__proto__ || Object.getPrototypeOf(State_Init)).apply(this, arguments));
    }

    _createClass(State_Init, [{
        key: 'SumOllRow',
        value: function SumOllRow() {
            var init = new State_Init();
            ArrStCell.forEach(function (element) {
                init.SumOneRow(element);
            });
        }
    }, {
        key: 'AverageOneCol',
        value: function AverageOneCol(coll) {
            var sum = 0;
            ArrStCell.forEach(function (e) {
                sum += e[coll].value;
            });
            ArrStAverage[coll] = model.stAverage(sum);
            view.PrintValue('cellAverage-' + coll, Math.round(sum / N));
        }
    }, {
        key: 'AverageOllColl',
        value: function AverageOllColl() {
            var init = new State_Init();
            for (var i = 0; i < M; i++) {
                init.AverageOneCol(i);
            }
        }
    }, {
        key: 'closeX',
        value: function closeX() {
            var i = 0;
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

    }, {
        key: 'stCellCloseElemX',
        value: function stCellCloseElemX() {
            var ifNonPairX = void 0;
            var bouth = void 0;
            // если напимер Х = 4, тогда надо подсветить 2 ячейки меньшие по значению и 2 большее
            // а также подсвечиваеться ячейка на которую наведен курсор миши
            if (X % 2 == 1) {
                // не парное число, non-pair number
                bouth = Math.floor(X / 2);
                ifNonPairX = 1;
            } else {
                bouth = X / 2;
                ifNonPairX = 0;
            }
            var lenArr = ArrStSortVal.length;
            var posElem = 0;

            for (var k in ArrStSortVal) {
                var j = 0;
                var arrId = ArrStSortVal[posElem].id.split('-');

                if (posElem - bouth >= 0 && posElem + bouth + ifNonPairX < lenArr) {
                    // не выходит за рамки масива
                    for (var i = posElem - bouth; i <= posElem + bouth + ifNonPairX; i++) {
                        ArrStCell[arrId[0]][arrId[1]].range[j] = ArrStSortVal[i].id;
                        j++;
                    }
                } else {
                    if (posElem - bouth - ifNonPairX < 0) {
                        // выходит за рамки масива в меньшую сторону
                        for (var _i = 0; _i <= X; _i++) {
                            ArrStCell[arrId[0]][arrId[1]].range[j] = ArrStSortVal[_i].id;
                            j++;
                        }
                    } else {
                        if (posElem + bouth + ifNonPairX >= lenArr) {
                            // выходит за рамки масива в большую сторну
                            for (var _i2 = lenArr - 1; _i2 >= lenArr - X - 1; _i2--) {
                                ArrStCell[arrId[0]][arrId[1]].range[j] = ArrStSortVal[_i2].id;
                                j++;
                            }
                        }
                    }
                }
                posElem++;
            }
        }
    }]);

    return State_Init;
}(Controller);

//-----------< при нажатии на ячейку >-------------


var State_EventClick = function (_Controller2) {
    _inherits(State_EventClick, _Controller2);

    function State_EventClick() {
        _classCallCheck(this, State_EventClick);

        return _possibleConstructorReturn(this, (State_EventClick.__proto__ || Object.getPrototypeOf(State_EventClick)).apply(this, arguments));
    }

    _createClass(State_EventClick, [{
        key: 'click',
        value: function click(id) {

            var arr = id.split('-');
            //-------< значение ячейки >---------
            ArrStCell[arr[0]][arr[1]].value++;
            var e = String(ArrStCell[arr[0]][arr[1]].value);
            view.PrintValue(ArrStCell[arr[0]][arr[1]].id, e);

            //---------< StSortCloseX >----------
            //------< позици¤ елемента в масиве структуры >---------
            function posElem(ob, name, value) {
                for (var _posElem in ob) {
                    if (value == ob[_posElem][name]) {
                        return _posElem;
                    }
                }
                return -1;
            }
            var pos = posElem(ArrStSortVal, 'id', id);
            ArrStSortVal[pos].value = ArrStCell[arr[0]][arr[1]].value;
            //-----< сортировка одного елемента, примен¤ть только когда значение увеличиваетс¤ на 1 (value++)
            function sortOneElem(ob, name, pos) {
                var i = Number(pos),
                    j = void 0,
                    c = void 0;
                for (j = i + 1; j < ob.length; j++) {
                    if (ob[i][name] > ob[j][name]) {
                        // от меньшего до большего
                        c = ob[i];
                        ob[i] = ob[j];
                        ob[j] = c;
                    } else {
                        break;
                    }
                }
            }
            sortOneElem(ArrStSortVal, 'value', pos);
            //------< сума р¤да >------
            var cntRowSum = ArrStCell[arr[0]][arr[1]].row;
            ArrStSum[cntRowSum].sum++;
            e = String(ArrStSum[cntRowSum].sum);
            view.PrintValue('sumRow-' + cntRowSum, e);
            //-------< значение с.а. колонки >---------
            var cntCellAverage = ArrStCell[arr[0]][arr[1]].col;
            ArrStAverage[cntCellAverage].sum++;
            e = String(Math.round(ArrStAverage[cntCellAverage].sum / N));
            view.PrintValue('cellAverage-' + cntCellAverage, e);
        }
    }]);

    return State_EventClick;
}(Controller);

// //-----------< при наведении на ячейку >-------------


var State_EventOnmouse = function (_Controller3) {
    _inherits(State_EventOnmouse, _Controller3);

    function State_EventOnmouse() {
        _classCallCheck(this, State_EventOnmouse);

        return _possibleConstructorReturn(this, (State_EventOnmouse.__proto__ || Object.getPrototypeOf(State_EventOnmouse)).apply(this, arguments));
    }

    _createClass(State_EventOnmouse, [{
        key: 'eventOnmouseover',
        value: function eventOnmouseover(id) {

            function SearchCloseX(strId) {
                var arrId = strId.split('-');
                for (var i in ArrStCell[arrId[0]][arrId[1]].range) {
                    document.getElementById(ArrStCell[arrId[0]][arrId[1]].range[i]).className = "close-value-elem";
                }
            }

            SearchCloseX(id);
        }
    }, {
        key: 'onmouseCloseX',
        value: function onmouseCloseX(id) {
            // при уходе мыши с ячейки применяются общие стили как для всех ячеек
            var arrId = id.split('-');

            for (var i in ArrStCell[arrId[0]][arrId[1]].range) {
                document.getElementById(ArrStCell[arrId[0]][arrId[1]].range[i]).className = "cell";
            }
        }
    }]);

    return State_EventOnmouse;
}(Controller);

//----------------< при наведении на ячейку сумы ряда >-----------------------


var State_EventSumRow = function (_Controller4) {
    _inherits(State_EventSumRow, _Controller4);

    function State_EventSumRow() {
        _classCallCheck(this, State_EventSumRow);

        return _possibleConstructorReturn(this, (State_EventSumRow.__proto__ || Object.getPrototypeOf(State_EventSumRow)).apply(this, arguments));
    }

    _createClass(State_EventSumRow, [{
        key: 'onmouse',
        value: function onmouse(id) {

            var arrSplitId = id.split('-');
            var numRow = Number(arrSplitId[1]);

            for (var i = 0; i < M; i++) {
                var pctCell = Math.round(ArrStCell[numRow][i].value * 100 / 1000);
                var cell = document.getElementById([numRow] + '-' + [i]);
                cell.style.background = 'linear-gradient(to top, #B59EFF ' + pctCell + '%, #FFFFFF ' + pctCell + '%)';
                view.PrintValue([numRow] + '-' + [i], pctCell);
            }
        }
    }, {
        key: 'outmouse',
        value: function outmouse(id) {

            var arrSplitId = id.split('-');
            var numRow = Number(arrSplitId[1]);

            for (var i = 0; i < M; i++) {
                var cell = document.getElementById([numRow] + '-' + [i]);
                view.PrintValue([numRow] + '-' + [i], ArrStCell[numRow][i].value);
                cell.style.background = '#FFFFFF';
            }
        }
    }]);

    return State_EventSumRow;
}(Controller);

//----------------< при нажатии на кнопку, которая удаляет ряд >-------------------


var State_EventDeleteRow = function (_Controller5) {
    _inherits(State_EventDeleteRow, _Controller5);

    function State_EventDeleteRow() {
        _classCallCheck(this, State_EventDeleteRow);

        return _possibleConstructorReturn(this, (State_EventDeleteRow.__proto__ || Object.getPrototypeOf(State_EventDeleteRow)).apply(this, arguments));
    }

    _createClass(State_EventDeleteRow, [{
        key: 'click',
        value: function click(id) {

            N--;
            var arrSplitId = id.split('-');
            var numId = Number(arrSplitId[1]);
            // подготовка масивов с даными после удаления ряда
            for (var i = 0; i < ArrStSortVal.length; i++) {
                var arr = ArrStSortVal[i].id.split('-');
                if (arr[0] == numId) {
                    ArrStSortVal.splice(i, 1);
                    i--; // что бы удалить все нужные елементы
                }
            }
            delete ArrStSum[numId]; // позиция остальные елементов в масиве не изменяеться
            for (var _i3 in ArrStAverage) {
                ArrStAverage[_i3].sum -= ArrStCell[numId][_i3].value;
                view.PrintValue('cellAverage-' + _i3, Math.round(ArrStAverage[_i3].sum / N));
            }

            state_Init.stCellCloseElemX();

            view.DeleteElem('row-' + arrSplitId[1]);
        }
    }]);

    return State_EventDeleteRow;
}(Controller);

//----------------< при нажатии на кнопку, которая добавляет ряд >-------------------


var State_EventCreateRow = function (_Controller6) {
    _inherits(State_EventCreateRow, _Controller6);

    function State_EventCreateRow() {
        _classCallCheck(this, State_EventCreateRow);

        return _possibleConstructorReturn(this, (State_EventCreateRow.__proto__ || Object.getPrototypeOf(State_EventCreateRow)).apply(this, arguments));
    }

    _createClass(State_EventCreateRow, [{
        key: 'click',
        value: function click(id) {

            N++;

            function LastRow() {
                var lastRow = void 0;
                for (lastRow in ArrStCell) {}
                var arr = ArrStCell[lastRow][0].id.split('-');
                return arr[0];
            }
            var newRow = Number(LastRow()) + 1;

            var state_EventCreateRow = new State_EventCreateRow();
            view.CreateRow(newRow); // новый ряд

            var eventCreateRow = new State_EventCreateRow();
            eventCreateRow.SumOneRow(ArrStCell[newRow]);

            // сортировка ArrStAverage
            for (var i in ArrStAverage) {
                ArrStAverage[i].sum += ArrStCell[newRow][i].value; // newRow соответствует итератору добавляемого ряда
                view.PrintValue('cellAverage-' + i, Math.round(ArrStAverage[i].sum / N));
            }

            function e(id, value) {
                this.id = id;
                this.value = value;
            }

            var sortCreatedRow = [];

            for (var _i4 in ArrStCell[newRow]) {
                sortCreatedRow[_i4] = new e(ArrStCell[newRow][_i4].id, ArrStCell[newRow][_i4].value);
            }

            sort(sortCreatedRow, 'value'); // от меньшего к большему

            var j = 0;
            for (var _i5 = 0; _i5 < ArrStSortVal.length; _i5++) {
                if (ArrStSortVal[_i5].value > sortCreatedRow[j].value) {
                    ArrStSortVal.splice(_i5, 0, sortCreatedRow[j]);
                    j++;
                    if (j >= sortCreatedRow.length) {
                        break;
                    }
                }
            }

            state_Init.stCellCloseElemX();
        }
    }]);

    return State_EventCreateRow;
}(Controller);