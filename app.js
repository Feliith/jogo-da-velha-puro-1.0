
let playerSymbol = ''
let botSymbol = ''
let playSymbol = ''

let winner = false

const snakeBot = document.querySelector('.snake-image')
const snakeOn = document.querySelector('.snake-on')

const selectBox = document.querySelector('.select-box')

const playArea = document.querySelector('.play-area')
const player = document.querySelectorAll('.player')
const turnOn = document.querySelector('.turn-on')
const allBox = document.querySelectorAll('.boxes > div')

const winnerBox = document.querySelector('.winner-box')
const winnerText = document.querySelector('.winner-text')
const winnerTextSpan  = document.querySelector('.winner-text > span')

const xButton = () => {
    playerSymbol = 'X'
    botSymbol = 'O'
    playAreaOn()
}

const oButton = () => {
    playerSymbol = 'O'
    botSymbol = 'X'
    shiftTurn()
    playAreaOn()
}

function playAreaOn() {
    selectBox.classList.add('hide')
    playArea.classList.remove('hide')
    snakeBot.style.display = 'block'
}

function shiftTurn() {
    turnOn.classList.toggle('on')
    player[0].classList.toggle('on')
    player[1].classList.toggle('on')
    snakeOn.classList.toggle('on')
}

const boxClicked = (box) => {
    box.innerText = playerSymbol
    box.style.pointerEvents = 'none'
    shiftTurn()
    playArea.style.pointerEvents = 'none'

    playSymbol = playerSymbol
    box.setAttribute('id', playSymbol)

    selectWinner()
    if (!winner) {
        setTimeout(() => {
            Bot()
        }, 1200)
    }
}

const Bot = () => {
    let freeBox = []
    for (let i = 0 ; i < 9 ; i++) {
        if(allBox[i].textContent == '') {
            freeBox.push(i)
        }
    }
    const randomBox = freeBox[Math.floor(Math.random() * freeBox.length)]
    allBox[randomBox].innerText = botSymbol
    allBox[randomBox].style.pointerEvents = 'none'
    shiftTurn()

    playSymbol = botSymbol
    allBox[randomBox].setAttribute('id', playSymbol)

    selectWinner()
    if (!winner) {
        playArea.style.pointerEvents = 'auto'
    }
}

function getID(boxID) {
    return document.querySelector('.box' + boxID).id
}

function verifyWinner(val1, val2, val3) {
    if (getID(val1) == playSymbol && 
    getID(val2) == playSymbol && 
    getID(val3) == playSymbol) {
        return true
    }
}

const selectWinner = () => {
    if (verifyWinner(1, 2, 3) || verifyWinner(4, 5, 6) || verifyWinner(7, 8, 9) || verifyWinner(1, 4, 7) || verifyWinner(2, 5, 8) || verifyWinner(3, 6, 9) || verifyWinner(1, 5, 9) || verifyWinner(3, 5, 7)) {
        winner = true
        winnerTextSpan.innerText = playSymbol
        finishGame()
    } else if (getID(1) !== '' && getID(2) !== '' && getID(3) !== '' && getID(4) !== '' && getID(5) !== '' && getID(6) !== '' && getID(7) !== '' && getID(8) !== '' && getID(9) !== '') {
        winner = true
        winnerText.innerText = 'Empate!'
        finishGame()
    }
}

function finishGame() {
    setTimeout(() => {
        playArea.classList.add('hide')
        winnerBox.classList.remove('hide')
        snakeBot.style.display = 'none'
    }, 1500)
}

function replay() {
    window.location.reload()
}