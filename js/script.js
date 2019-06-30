document.querySelector('#elemCreate').addEventListener('click', init);

function init() {
    const elemM = document.querySelector('#elemM');
    const elemN = document.querySelector('#elemN');
    const elemX = document.querySelector('#elemX');
    const m = elemM.value;
    const n = elemN.value;
    const x = elemX.value;
    let matrix = [];
    const matrixPlace = document.querySelector('#matrixPlace');
    let matrixCellElem = document.querySelectorAll('.matrixRowElem');

    function validation() {
        //validation input.
        let informationPlace = document.querySelector('.informationPlace');
        let informationMessage = '';
        if (m === '' || n === '' || x === '' || m < 0 || n < 0 || x < 0) {
            informationMessage = 'Заполните все поля, проверте или ввели числа больше нуля.';
        } else {
            notMoreMatrix();
        }
        informationPlace.textContent = informationMessage;
    }

    function notMoreMatrix() {
        //to rewrite matrix values.
        if (matrixCellElem.length !== 0) {
            while (matrixPlace.firstChild) {
                matrixPlace.removeChild(matrixPlace.firstChild);
            }
            getMatrix();
        } else if (matrixCellElem.length === 0) {
            getMatrix();
        }
    }

    validation();

    function getMatrix() {
        //create matrix in html page.
        let table = document.createElement('table');
        table.classList.add('matrixTable');
        matrixPlace.appendChild(table);

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
        //to calculate matrix values
        getRowSum();
        getColAverage();
        getCellForPercent();
    }

    function getRandomNumber(min, max) {
        //generation random number in range
        return Math.floor(Math.random() * (max - min) + min);
    }

    function getRowSum() {
        //counting the sum of lines(m)
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

    function getColAverage() {
        //counting the sum of column(m) and calculate average value.
        let colSum = 0;
        let table = document.querySelector('.matrixTable');
        let matrixColElem = document.createElement('tr');
        for (let i = 0; i < m; i++) {
            let matrixColSumElem = document.createElement('td');
            matrixColSumElem.classList.add('sumColumn');
            for (let j = 0; j < n; j++) {
                colSum += matrix[j][i].amount;
            }
            matrixColSumElem.textContent = Math.floor(colSum / n);
            matrixColElem.appendChild(matrixColSumElem);
            colSum = 0;
        }
        table.appendChild(matrixColElem);
    }

    //clicker and increasing the value on the page
    function clickCell(column, matrix, i, j) {
        column.addEventListener('click', function () {
            matrix[i][j].amount += 1;
            column.textContent = parseInt(column.textContent) + 1;
            getRowSumAction();
            getColAverageAction();
        });
    }

    //to update the amount(sum) of the page
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

    //to update the amount(average) of the page
    function getColAverageAction() {
        let colSum = 0;
        for (let i = 0; i < m; i++) {
            let colSumResult = document.querySelectorAll('.sumColumn');
            for (let j = 0; j < n; j++) {
                colSum += matrix[j][i].amount;

            }
            colSumResult[i].textContent = Math.floor(colSum / n);
            colSum = 0;
        }
    }

    //finding the nearest items
    function getComingItems(column, matrix, i, j) {
        //mouseleave remove class.
        column.addEventListener('mouseleave', function () {
            this.classList.remove('activeItem');
            let matrixCellElem = document.querySelectorAll('.matrixCellElem');
            for (let i = 0; i < matrixCellElem.length; i++) {
                matrixCellElem[i].classList.remove('comingItemStyle');
            }
        });
        //mouseover remove class
        column.addEventListener('mouseover', function () {
            let matrixCellElem = document.querySelectorAll('.matrixCellElem');
            let columnThisValue = column.textContent;

            matrixCellElem.forEach(function (element) {
                element.classList.remove('activeItem');
                element.classList.remove('comingItemStyle');
            });

            let comingItems;
            let tempArray = [];
            this.classList.add('activeItem');
            for (let i = 0; i < n; i++) {
                for (j = 0; j < m; j++) {
                    tempArray.push(matrix[i][j].amount);
                }
            }
            //find comingItem
            comingItems = tempArray.sort((a, b) => Math.abs(columnThisValue - a) - Math.abs(columnThisValue - b)).splice(1, x);

            for (let i = 0; i < matrixCellElem.length; i++) {
                for (let j = 0; j < comingItems.length; j++) {
                    if (parseInt(matrixCellElem[i].textContent) === comingItems[j]) {
                        matrixCellElem[i].classList.add('comingItemStyle');
                    }
                }
            }
        });
    }

    //finding the percentage of the total amount
    function getCellForPercent() {
        let sumRowElement = document.querySelectorAll('.sumRow');
        let matrixCellElem = document.querySelectorAll('.matrixCellElem');
        let percent = 0;
        //nodelist in array
        let matrixCellElemArray = Array.from(matrixCellElem);
        //create two-dimensional array
        matrixCellElemArray = matrixCellElemArray.map((_, i, a) => a.slice(i * m, i * m + m)).filter((el) => el.length);

        for (let i = 0; i < n; i++) {
            //highlighting of the current sum element
            sumRowElement[i].addEventListener('mouseover', function () {
                sumRowElement[i].classList.add('percentActive');
                for (let j = 0; j < m; j++) {
                    percent = Math.floor(matrix[i][j].amount * 100 / parseInt(sumRowElement[i].textContent));
                    matrixCellElemArray[i][j].textContent = percent + '%';
                    matrixCellElemArray[i][j].style.background = 'linear-gradient(white ' + (100 - percent) + '%, yellow ' + percent + '%)';
                }
            });
            //delete unnecessary classes and return matrix value
            sumRowElement[i].addEventListener('mouseleave', function () {
                sumRowElement[i].classList.remove('percentActive');
                for (let j = 0; j < m; j++) {
                    matrixCellElemArray[i][j].removeAttribute('style');
                    matrixCellElemArray[i][j].textContent = matrix[i][j].amount;
                }
            })
        }
    }

}

