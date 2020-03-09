"use strict";

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Model = function () {
    function Model() {
        _classCallCheck(this, Model);
    }

    _createClass(Model, [{
        key: "stCell",
        value: function stCell(id, row, col, value) {
            var that = [];
            that.id = id;
            that.row = row;
            that.col = col;
            that.value = value;
            that.range = [];
            return that;
        }
    }, {
        key: "stAverage",
        value: function stAverage(sum) {
            var that = [];
            that.sum = sum; // значение сумы колонки
            return that;
        }
    }, {
        key: "stSum",
        value: function stSum(sum) {
            // сума ряда
            var that = [];
            that.sum = sum; // значение сумы ряда
            return that;
        }
    }, {
        key: "stSortVal",
        value: function stSortVal(id, value) {
            // отсортированые по значению ячейки
            var that = [];
            that.id = id;
            that.value = value;
            return that;
        }
    }, {
        key: "OUTmouseCloseX",
        value: function OUTmouseCloseX(id) {
            // id близких по значению елементов
            var that = [];
            that.id = id;
            return that;
        }
    }]);

    return Model;
}();

var ArrStCell = [];
var ArrStAverage = [];
var ArrStSum = [];
var ArrStSortVal = [];
var outmouseCloseX = [];