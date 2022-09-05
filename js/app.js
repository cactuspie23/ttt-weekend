/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [2,4,6]
]

/*---------------------------- Variables (state) ----------------------------*/
let board, turn, winner


/*------------------------ Cached Element References ------------------------*/
const squareEls = document.querySelectorAll('.square')
const messageEl = document.getElementById('message')
const resetBtnEl = document.getElementById('reset-button')

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square) {
  square.addEventListener('click', handleClick)
})
resetBtnEl.addEventListener('click', init)

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = null
  render()
  resetBtnEl.setAttribute("hidden", true)
  messageEl.className = ''
}

function render() {
  resetBtnEl.removeAttribute('hidden')
  board.forEach((square, i) => {
    if (square === 1) {
      squareEls[i].innerHTML = '&#128128;'
    } else if (square === -1) {
      squareEls[i].innerHTML= '&#127875;'
    } else {
      squareEls[i].textContent = ''
    }
  })
  
  if (winner === null) {
    messageEl.textContent = `It's player ${turn === 1 ? "One's" : "Two's"} turn`
  } else if (winner === 'T') {
    messageEl.textContent = `It's a tie!`
    messageEl.className = 'winner'
  } else {
    messageEl.textContent = `Spooktacular! Player ${winner === 1 ? "One" : "Two"} wins!`
    messageEl.className = 'winner'
  }
}

function handleClick(evt) {
  const sqIdx = parseInt(evt.target.id.replace('sq', ''))
  if (board[sqIdx] || winner !== null) {
    return
  } 
  board[sqIdx] = turn
  turn *= -1
  winner = getWinner()
  render()
  // console.log(board[sqIdx])
}

function getWinner() {
  for (let i = 0; i < winningCombos.length; i++) {
  if (board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]] === 3) {
    return 1
  } else if (board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]] === -3) {
    return -1
  }
  }
  if (!board.includes(null)) {
    return 'T'
  }
  return null
}

