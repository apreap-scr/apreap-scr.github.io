
class Model {

    stCell(id, row, col, value) {
        let that = [];
        that.id = id;
        that.row = row;
        that.col = col;
        that.value = value;
        that.range = [];
        return that;
    }

    stAverage(sum) {
        let that = [];
        that.sum = sum;  // значение сумы колонки
        return that;
    }

    stSum(sum) {  // сума ряда
        let that = [];
        that.sum = sum;  // значение сумы ряда
        return that;
    }

    stSortVal(id, value) { // отсортированые по значению ячейки
        let that = [];
        that.id = id;
        that.value = value;
        return that;
    }

    OUTmouseCloseX(id) { // id близких по значению елементов
        let that = [];
        that.id = id;
        return that;
    }

}

let ArrStCell = [];
let ArrStAverage = [];
let ArrStSum = [];
let ArrStSortVal = [];
let outmouseCloseX = [];
