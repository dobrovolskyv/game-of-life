
let rows
let col

let btnSubmit = document.getElementById('submit')



const size = 10;
const tableStyle = document.querySelectorAll("table td")


let countGeneration = document.querySelector('#countGeneration')
let play = false
let counter = 0
let firstGeneration = []

document.getElementById("btn1").addEventListener("click", () => {
    exchangePlayback()
})

document.getElementById("btn3").addEventListener("click", () => {
    сleanUp()
})
document.getElementById("btn4").addEventListener("click", () => {
    randomizer()
})


//функция изменения величины поля
function valueInp() {
    let inp = +document.getElementById('input').value
        rows = inp
        col = inp
        document.getElementById('input').value = ""
   
    tableGeberation()

    return inp
}

if (!rows) {
    rows = 50
}

if (!col) {
    col = 50
}


setInterval(() => {
    if (play) {
        nextState()
    }
}, 80)
function exchangePlayback() {
    play = !play
    if (play) {

        btn1.innerHTML = "Пауза"
    } else {

        btn1.innerHTML = "Старт"
    }
}

//создаем таблицу
// проходимся по массиву строк и колонок генерируя tr td
// получаем таблицу
// получаем ширину ячейки

tableGeberation()

function tableGeberation() {
    let html = "<table cellpadding=0 cellspacing=0 id='table'>"
    for (let y = 0; y < rows; y++) {
        html += "<tr>"
        for (let x = 0; x < col; x++) {
            html += `<td id="cell-${x + ',' + y}" onmouseup="stateElements(${x},${y})" class='td'>`
            html += "</td>"
        }
        html += "</tr>"
    }
    html += "</table>"

    let container = document.getElementById("container-table")
    container.innerHTML = html
    let table = document.getElementById("table")
    table.style.width = size * col + 'px'
    table.style.height = size * rows + 'px'

}


//создаем функицию состяния ячеек
// делаем возможность переключать цвет ячейки

function stateElements(x, y) {
    let cell = document.getElementById(`cell-${x + ',' + y}`)
    if (cell.style.background != "black") {
        cell.style.background = "black"
    } else {
        cell.style.background = ""
    }
}

//функция очистки
function сleanUp() {

    for (let x = 0; x < col; x++) {
        firstGeneration.push([])
        for (let y = 0; y < col; y++) {
            let cell = document.getElementById(`cell-${x + ',' + y}`)
            cell.style.background = ""
        }
    }
}

//функция запоминания доски
function firstGenerations() {
    firstGeneration = []

    countGeneration.innerText = `Поколение: ${counter++}`
    for (let x = 0; x < col; x++) {
        firstGeneration.push([])
        for (let y = 0; y < col; y++) {
            let cell = document.getElementById(`cell-${x + ',' + y}`)
            firstGeneration[x][y] = cell.style.background == "black"
        }
    }
}

//подсчет сколько живых клеток вокруг каждой клетки
// проходимся по всем клеткам ища живые и мертвые
function countAlive(x, y) {
    let alive = 0

    for (let i = -1; i <= 1; i++) {
        for (let j = -1; j <= 1; j++) {
            if (i == 0 && j == 0)
                continue
            try {
                if (firstGeneration[x + i][y + j])
                    alive++
            } catch (e) { }
            if (alive > 3) {
                return alive
            }
        }
    }
    return alive
}

//проверяем следу состояние каждой клетки
//делаем услвоия меньше 2 и больше 3 клеток , то умерает от переносиления или одинчества
//если 3 клетки то она живет
function nextState() {
    firstGenerations()
    for (x = 0; x < col; x++) {
        for (y = 0; y < col; y++) {
            let alive = countAlive(x, y)
            let cell = document.getElementById(`cell-${x + ',' + y}`)
            if (firstGeneration[x][y]) {
                if (alive < 2 || alive > 3) {
                    cell.style.background = ""
                }
            } else {
                if (alive == 3) {
                    cell.style.background = "black"
                }
            }
        }
    }
}


function randomizer() {

    for (let x = 0; x < col; x++) {
        for (let y = 0; y < rows; y++) {
            if (Math.random() < 0.2) {
                stateElements(x, y)
            }
        }
    }
}






document.getElementById('input').addEventListener('input', function () {
    this.value = this.value.replace(/[^0-9\.]/g, '');
});



let canZoomOut = true

document.addEventListener('DOMContentLoaded', () => {
    const btnZoom = document.getElementById('btn5')
    let factor = 1

    btnZoom.addEventListener('click', () => {
        if (canZoomOut) {
            if (factor > 0.3) {
                factor *= 0.3
            } else {
                canZoomOut = false
                btnZoom.disabled = true
            }
            let table = document.getElementById('container-table')
            table.style.transform = `scale(${factor}) translate(-${(0.8 - factor) * 9 * col}px, -${(1.4 - factor) * 10 * rows }px)`
        }
    })
})

 

document.addEventListener('DOMContentLoaded', () => {
    const btnZoom = document.getElementById('btn6')


    let factor = 1

    btnZoom.addEventListener('click', () => {
        factor *= 1
        document.getElementById('container-table').style.transform = `scale(${factor})`
    })
})

