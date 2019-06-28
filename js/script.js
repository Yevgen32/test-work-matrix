const matrixPlace = document.querySelector('#matrixPlace');
// const matrixTable = document.createElement('table');
// matrixPlace.appendChild(matrixTable);
//
// function createMatrix() {
//     const elemM = document.querySelector('#elemM');
//     const elemN = document.querySelector('#elemN');
//     const elemX = document.querySelector('#elemX');
//     // console.log(elemM, elemN, elemX);
//     const matrixTr = document.createElement('tr');
//     const matrixTd = document.createElement('td');
//     matrixTable.appendChild(matrixTr);
//
//     const matrix = [];
//     const m = elemM.value;
//     const n = elemN.value;
//     const x = elemX.value;
//     let flagId = 0;
//     for (let i = 0; i < n; i++){
//         matrix[i] = [];
//         for (let j = 0; j < m; j++){
//             flagId += 1;
//             matrix[i][j] = {
//                 id: flagId,
//                 amount: getRandomNumber(100,999)
//             };
//             matrixTd.innerHTML = matrix[i][j].id;
//             matrixTr.appendChild(matrixTd);
//         }
//     }
//     console.log(matrix);
//     function getRandomNumber(min,max) {
//         return Math.floor(Math.random() * (max - min) + min);
//     }
//
// }
//
// const m = 3;
// const n = 2;
// let flagId = 0;
// let matrix = [];
// let rowSum = 0;
// let colSum = 0;
// let table = document.createElement('table');
// matrixPlace.appendChild(table);
//
// for (let i = 0; i < n; i++) {
//     matrix[i] = [];
//     let row = document.createElement('tr');
//     let rowSumElem = document.createElement('td');
//     for (let j = 0; j < m; j++) {
//         let column = document.createElement('td');
//         flagId += 1;
//         matrix[i][j] = {
//             id: flagId,
//             amount: getRandomNumber(100,999)
//         };
//         column.addEventListener('click', function () {
//             matrix[i][j].amount += 1;
//             column.textContent = matrix[i][j].amount;
//             getColSumElem();
//             console.log(matrix[i][j]);
//
//         });
//         rowSum += matrix[i][j].amount;
//         matrix[i].push(rowSum);
//         rowSumElem.textContent = "row sum:" + rowSum;
//         column.textContent = matrix[i][j].amount;
//         row.appendChild(column);
//         row.appendChild(rowSumElem);
//     }
//     table.appendChild(row);
//     rowSum = 0;
//
// }
// getColSumElem();
// console.log(matrix);
//
// function getColSumElem() {
//     let colSumElem = document.createElement('tr');
//     for (let i = 0; i < m; i++){
//         let td = document.createElement('td');
//         for (let j = 0; j < n; j++){
//             colSum += matrix[j][i].amount;
//         }
//         td.textContent = colSum;
//         colSumElem.appendChild(td);
//         colSum = 0;
//     }
//     table.appendChild(colSumElem);
// }
//
// function getRandomNumber(min, max) {
//     return Math.floor(Math.random() * (max - min) + min);
// }

const m = 5;
const n = 4;
const x = 5;
let matrix = [];
let table = document.createElement('table');
matrixPlace.appendChild(table);

function getMatrix() {
    let flagId = 0;
    for (let i = 0; i < n; i++) {
        matrix[i] = [];
        let row = document.createElement('tr');
        row.classList.add('matrixRowElem');
        for (let j = 0; j < m; j++) {
            let column = document.createElement('td');
            column.classList.add('matrixCellElem');
            flagId += 1;
            matrix[i][j] = {
                id: flagId,
                amount: getRandomNumber(100, 999)
            };
            column.textContent = matrix[i][j].amount;
            clickCell(column, matrix, i, j);
            getComingItems(column, matrix, i, j);
            row.appendChild(column);
        }
        table.appendChild(row);
    }

    getRowSum();
    getColSum();
    getCellForPercent();
}

function getRandomNumber(min, max) {
    return Math.floor(Math.random() * (max - min) + min);
}

function getRowSum() {
    let matrixRowElem = document.querySelectorAll('.matrixRowElem');
    let rowSum = 0;
    for (let i = 0; i < n; i++) {
        let rowSumElem = document.createElement('td');
        rowSumElem.classList.add('sumRow');
        for (let j = 0; j < m; j++) {
            rowSum += matrix[i][j].amount;
        }
        rowSumElem.textContent = rowSum;
        matrixRowElem[i].appendChild(rowSumElem);
        rowSum = 0;
    }
}

function getColSum() {
    let colSum = 0;
    let matrixColElem = document.createElement('tr');
    for (let i = 0; i < m; i++) {
        let matrixColSumElem = document.createElement('td');
        matrixColSumElem.classList.add('sumColomn');
        for (let j = 0; j < n; j++) {
            colSum += matrix[j][i].amount;
        }
        matrixColSumElem.textContent = Math.floor(colSum / n);
        matrixColElem.appendChild(matrixColSumElem);
        colSum = 0;
    }
    table.appendChild(matrixColElem);
}

function clickCell(column, matrix, i, j) {
    column.addEventListener('click', function () {
        matrix[i][j].amount += 1;
        column.textContent = parseInt(column.textContent) + 1;
        getRowSumAction();
        getColSumAction();
    });
}


function getRowSumAction() {
    let rowSum = 0;
    for (let i = 0; i < n; i++) {
        let rowSumResult = document.querySelectorAll('.sumRow');
        for (let j = 0; j < m; j++) {
            rowSum += matrix[i][j].amount;
        }
        rowSumResult[i].textContent = rowSum;
        rowSum = 0;
    }
}

function getColSumAction() {
    let colSum = 0;
    for (let i = 0; i < m; i++) {
        let colSumResult = document.querySelectorAll('.sumColomn');
        for (let j = 0; j < n; j++) {
            colSum += matrix[j][i].amount;

        }
        colSumResult[i].textContent = Math.floor(colSum / n);
        colSum = 0;
    }
}

function getComingItems(column, matrix, i, j) {
    column.addEventListener('mouseover', function () {

        let matrixCellElem = document.querySelectorAll('.matrixCellElem');
        let columnThisValue = column.textContent;

        matrixCellElem.forEach(function (element) {
            element.classList.remove('activeItem');
            element.classList.remove('comingItemStyle');
        });

        let comingItems = [];
        let tempArray = [];
        this.classList.add('activeItem');
        for (let i = 0; i < n; i++) {
            for (j = 0; j < m; j++) {
                tempArray.push(matrix[i][j].amount);
            }
        }
        comingItems = tempArray.sort((a, b) => Math.abs(columnThisValue - a) - Math.abs(columnThisValue - b)).splice(1, x);

        for (let i = 0; i < matrixCellElem.length; i++) {
            for (let j = 0; j < comingItems.length; j++) {
                if (parseInt(matrixCellElem[i].textContent) === comingItems[j]) {
                    matrixCellElem[i].classList.add('comingItemStyle');
                }
            }
        }
    })
}

function getCellForPercent() {
    document.querySelectorAll('.sumRow').forEach(function (element){
        element.onmouseover = getPercentCellInRow;
    })
}
function getPercentCellInRow() {
    let matrixCellElem = document.querySelectorAll('.matrixCellElem');
    document.querySelectorAll('.matrixCellElem').forEach(function (element) {
        element.classList.remove('activeItem');
        element.classList.remove('comingItemStyle');
    });
    let sumRow = document.querySelectorAll('.sumRow');
    let percent = 0;
    for (let i = 0; i < n; i++){
        for (let j = 0; j < m; j++){
            percent = Math.floor(matrix[i][j].amount * 100 / parseInt(sumRow[i].textContent));
            matrixCellElem[i].textContent = percent;
        }

    }
}

getMatrix();



