const startBtn = document.querySelector('#start')
const screens = document.querySelectorAll('.screen')
const timeList = document.querySelector('#time-list')
const timeEl =document.querySelector('#time')
const board = document.querySelector('#board')
const colors = [
    'linear-gradient(90deg, #b9507f 0%, #c2648f 47%, #753958 100%)',
    'linear-gradient(90deg, #f63864 0%, #da4367 47%, #912a42 100%)',
    'linear-gradient(90deg, #e6b759 0%, #efc66f 47%, #c79738 100%)',
    'linear-gradient(90deg, #417a00 0%, #5e9f15 47%, #3f6511 100%)',
    'linear-gradient(90deg, #7b7978 0%, #8c847f 47%, #5d5855 100%)',
    'linear-gradient(90deg, #0090c2 0%, #339dc5 47%, #1e6881 100%)'
]
let time = 0
let score = 0

startBtn.addEventListener('click', (e) => {
    e.preventDefault()
    screens[0].classList.add('up')
})

timeList.addEventListener('click', (e) => {
    if (e.target.classList.contains('time-btn')){
        time = parseInt(e.target.getAttribute('data-time'))
        screens[1].classList.add('up')
        startGame()
    }
})

board.addEventListener('click', e => {
    if (e.target.classList.contains('circle')) {
        score++
        e.target.remove()
        createRandomCircle()
    }
})

function startGame() {
    setInterval(decreaseTime, 1000)
    createRandomCircle()
    setTime(time)
}

function decreaseTime() {
    if (time === 0) {
        finishGame()
    } else {
        let current = --time
        if (current < 10) {
            current = `0${current}`
        }
        setTime(current)
    }
}

function setTime(value) {
    timeEl.innerHTML = `00:${value}`
}

function finishGame() {
    timeEl.parentNode.classList.add('hide')
    board.innerHTML = `<h1 id="score">Счет: <span class="primary">${score}</span></h1>`
}

function createRandomCircle() {
    const circle = document.createElement('div')
    const size = getRandomNumber(10, 60)
    const {width, height} = board.getBoundingClientRect()

    const x = getRandomNumber(0, width - size)
    const y = getRandomNumber(0, height - size)

    circle.classList.add('circle')
    circle.style.width = `${size}px`
    circle.style.height = `${size}px`
    circle.style.top = `${y}px`
    circle.style.left = `${x}px`
    circle.style.background = getRandomColor()

    board.append(circle)
}

function getRandomNumber(min, max) {
    return Math.round(Math.random() * (max - min) + min)
}

function getRandomColor () {
    return colors[Math.floor(Math.random() * colors.length)]
}
