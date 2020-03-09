
class View {

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
            let rand = randomInteger(0, 999);
            let nameId = nameCol + '-' + cntRow;
            divCell.id = nameId;
            divCell.innerHTML = view.printValueInCol(String(rand));
            //----------< инициализация структуры и запись значения >------------
            ArrStCell[nameCol][cntRow] = model.stCell(nameId,nameCol,cntRow,rand);  // инициализация
            divRow.appendChild(divCell);
        }
        document.getElementById('matrix').appendChild(divRow);
    }

    // создать колонки N
    AppendRowToMatrix() {
        let view = new View();
        for (let cntCol = 0; cntCol < N; cntCol++) {
            view.CreateRow(cntCol);
        }
    }

    PrintValue(id, value) {
        document.getElementById(id).innerHTML = view.printValueInCol(value);
    }

    DeleteElem(id) {
        document.getElementById(id).remove();
    }

}
