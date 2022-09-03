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

/*----------------------------- Event Listeners -----------------------------*/
squareEls.forEach(function(square) {
  square.addEventListener('click', handleClick)
})

/*-------------------------------- Functions --------------------------------*/
init()

function init() {
  board = [null, null, null, null, null, null, null, null, null]
  turn = 1
  winner = null
  render()
}

function render() {
  board.forEach((square, i) => {
    if (square === 1) {
      squareEls[i].textContent = 'X'
    } else if (square === -1) {
      squareEls[i].textContent = 'O'
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
  if (board[sqIdx] || !winner === null) {
    return
  } 
  board[sqIdx] = turn
  turn *= -1
  winner = getWinner()
  render()
  console.log(board[sqIdx])
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


// Step 7 - Build the `getWinner` function

  // 7a) Create a function called `getWinner`

  /* 
   * There are two methods you can use to find out if there is a winner.
   *
   * Step b1 below is a more elegant method that takes advantage of the
   * `winningCombos` array you wrote above in step 5. 
   *
   * Step b2 might be a little simpler to comprehend, but you'll need to write  
   * more code. Step b2 also won't take advantage of the `winningCombos`
   * array, but using it as a reference will help you build a solution.
   * ***Ensure you choose only one path.***
   */

  // 7b1)Loop through each of the winning combination arrays defined in the 
  //     `winningCombos` array. Total up the three board positions using the 
  //     three indexes in the current combo. Convert the total to an absolute 
  //     value (convert any negative total to positive). If the total equals 3, 
  //     we have a winner! Set the `winner` variable to the board's value at
  //     the index specified by the first index of that winning combination's
  //     array by returning that value.

  // 7b2)For each one of the winning combinations you wrote in step 5, find the
  //     total of each winning combination. Convert the total to an absolute 
  //     value (convert any negative total to positive). If the total equals 3, 
  //     we have a winner! Set the `winner` variable to the board's value at 
  //     the index specified by the first index of that winning combination's 
  //     array by returning that value.

// 7c) If there is no winner, check to see if there is a tie. Set the  
  //     `winner` variable to `'T'` if there are no more nulls in the board  
  //     array byreturning the string `'T'`.

  // 7d) If there is no winner and there isn’t a tie, return `null`.

// Step 8 - Create Reset functionality

  // 8a) Add a reset button to the HTML document.

  // 8b) Store the new reset button element in a constant named `resetBtnEl`.

  // 8c) Attach an event listener to the `resetBtnEl`. On the `'click'` event 
  //     it should call the `init` function you created in 3.