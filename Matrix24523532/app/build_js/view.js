'use strict';

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var View = function () {
    function View() {
        _classCallCheck(this, View);
    }

    _createClass(View, [{
        key: 'printValueInCol',
        value: function printValueInCol(v) {
            var str_rand = String(v);
            var symbols = str_rand.split("");
            var ob_rand = '<span>';
            for (var i = 0; i < str_rand.length; i++) {
                ob_rand += '<p>' + symbols[i] + '</p>';
            }
            ob_rand += '<span>';
            return ob_rand;
        }

        // кнопка "добавить ряд" и среднее по каждой колонке

    }, {
        key: 'CreateTopRow',
        value: function CreateTopRow() {
            var divWrappCtrl = document.createElement('div');
            divWrappCtrl.className = "wrappCtrl";
            //---------< ряд >------------
            var divTopRow = document.createElement('div');
            divTopRow.className = "TopRow";
            //--------< кнопка для добавления ряда >-------
            var addRow = document.createElement('div');
            addRow.className = "addRow";
            addRow.id = 'addRow';
            addRow.innerHTML = '<span>Add</span>';
            addRow.setAttribute('onclick', 'state_EventCreateRow.click(this.id)');
            divWrappCtrl.appendChild(addRow);
            //------------< среднее по каждой колонке >--------------
            divTopRow.appendChild(divWrappCtrl);
            for (var cntRow = 0; cntRow < M; cntRow++) {
                var divCell = document.createElement('div');
                divCell.className = "cell-average";
                divCell.id = 'cellAverage-' + cntRow;
                divTopRow.appendChild(divCell);
            }
            document.getElementById('matrix').appendChild(divTopRow);
        }

        // Создать M строчку

    }, {
        key: 'CreateRow',
        value: function CreateRow(nameCol) {
            var divWrappCtrl = document.createElement('div');
            divWrappCtrl.className = "wrappCtrl";
            //---------< ряд >------------
            var divRow = document.createElement('div');
            divRow.className = "row";
            divRow.id = 'row-' + nameCol;
            //--------< кнопка для удаления ряда >-------
            var deleteRow = document.createElement('div');
            deleteRow.className = "deleteRow";
            deleteRow.id = 'deleteRow-' + nameCol;
            deleteRow.innerHTML = '<span></span>';
            deleteRow.setAttribute('onclick', 'state_EventDeleteRow.click(this.id)');
            divWrappCtrl.appendChild(deleteRow);
            //----------< сума елементов ряда >-----------
            var sumRow = document.createElement('div');
            sumRow.className = "sumRow";
            sumRow.id = 'sumRow-' + nameCol;
            sumRow.setAttribute('onmouseover', 'state_EventSumRow.onmouse(this.id)');
            sumRow.setAttribute('onmouseout', 'state_EventSumRow.outmouse(this.id)');
            divWrappCtrl.appendChild(sumRow);
            //------------< ячейки матрицы >--------------
            divRow.appendChild(divWrappCtrl);
            ArrStCell[nameCol] = []; // инициализация
            for (var cntRow = 0; cntRow < M; cntRow++) {
                var divCell = document.createElement('div');
                divCell.className = "cell";
                divCell.setAttribute('onclick', 'state_EventClick.click(this.id)');
                divCell.setAttribute('onmouseover', 'state_EventOnmouse.eventOnmouseover(this.id)');
                divCell.setAttribute('onmouseout', 'state_EventOnmouse.onmouseCloseX(this.id)');
                var rand = randomInteger(0, 999);
                var nameId = nameCol + '-' + cntRow;
                divCell.id = nameId;
                divCell.innerHTML = view.printValueInCol(String(rand));
                //----------< инициализация структуры и запись значения >------------
                ArrStCell[nameCol][cntRow] = model.stCell(nameId, nameCol, cntRow, rand); // инициализация
                divRow.appendChild(divCell);
            }
            document.getElementById('matrix').appendChild(divRow);
        }

        // создать колонки N

    }, {
        key: 'AppendRowToMatrix',
        value: function AppendRowToMatrix() {
            var view = new View();
            for (var cntCol = 0; cntCol < N; cntCol++) {
                view.CreateRow(cntCol);
            }
        }
    }, {
        key: 'PrintValue',
        value: function PrintValue(id, value) {
            document.getElementById(id).innerHTML = view.printValueInCol(value);
        }
    }, {
        key: 'DeleteElem',
        value: function DeleteElem(id) {
            document.getElementById(id).remove();
        }
    }]);

    return View;
}();