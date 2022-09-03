/*-------------------------------- Constants --------------------------------*/

const winningCombos = [
  [0,1,2],
  [3,4,5],
  [6,7,8],
  [0,3,6],
  [1,4,7],
  [2,5,8],
  [0,4,8],
  [3,4,6]
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
}

function render() {
  resetBtnEl.removeAttribute('hidden')
  board.forEach((square, i) => {
    if (square === 1) {
      squareEls[i].textContent = 'X'
    } else if (square === -1) {
      squareEls[i].textContent = 'O'
    } else {
      squareEls[i].textContent = ''
    }
  })
  
  if (winner === null) {
    messageEl.textContent = `It's player ${turn === 1 ? "X's" : "O's"} turn`
  } else if (winner === 'T') {
    messageEl.textContent = `It's a tie!`
  } else {
    messageEl.textContent = `Congratulations! ${winner === 1 ? "X" : "O"} wins!`
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
  if (!board.includes(null)) {
    return 'T'
  }
  for (let i = 0; i < winningCombos.length; i++) {
  if (board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]] === 3) {
    return 1
  } else if (board[winningCombos[i][0]] + board[winningCombos[i][1]] + board[winningCombos[i][2]] === -3) {
    return -1
  }
  }
  return null
}

