let M = 100, N = 100, X = 30;

//------< css style >---------
let e = document.getElementById('matrix');
e.style.width = (15*M)+40 + 'px'; // 15 ширина 1 ячейки * на количество ячеек
//-----------< add functions >-------------
function randomInteger(min, max) {
    let rand = min - 0.5 + Math.random() * (max - min + 1);
    rand = Math.round(rand);
    return rand;
}
//------< сортировка объекта >---------
function sort(ob, name) {
    let i, j, c;
    for (i = 0; i < ob.length; i++)
        for (j = i + 1; j < ob.length; j++)
            if (ob[i][name] > ob[j][name]) {  // от меньшего до большего
                c = ob[i];
                ob[i] = ob[j];
                ob[j] = c;
            }
}
