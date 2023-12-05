const cells = document.querySelectorAll(".cell");
const statusText = document.querySelector("#statusText");
const restartBtn = document.querySelector("#restartBtn");
const winConditions = [
  [0, 1, 2],
  [3, 4, 5],
  [6, 7, 8],
  [0, 3, 6],
  [1, 4, 7],
  [2, 5, 8],
  [0, 4, 8],
  [2, 4, 6],
];

let options = ["", "", "", "", "", "", "", "", ""]; //empty board. array of empty trings representing the board  options
let currentPlayer = "X"; //starting player, to keep track
let isGameActive = false; //keep track of wheteher game is running. will be stwitched to true when game is initialised
initialiseGame(); //this function will be called whenever we open the browser
function initialiseGame() {
  cells.forEach((cell) => cell.addEventListener("click", cellClicked)); //for each cell carry out the cell clicked function
  restartBtn.addEventListener("click", restartGame); //when we click restarttn, run the restart game
  statusText.textContent = `Waiting for Player ${currentPlayer} to start game`;
  isGameActive = true;
}

function cellClicked() {
  const cellIndex = this.getAttribute("cellIndex"); //get the attribute. we want the elements with the attribute cellIndex to execute the cunction
  //if the cell isnt empty or game isnt running dont do anything if cell is clicked
  if (options[cellIndex] != "" || !isGameActive) {
    return;
  }
  updateCell(this, cellIndex); //otherwise reun the updateCellFunction with this as a parameter?

  checkWinner();
}

function updateCell(cell, index) {
  options[index] = currentPlayer; //update the placeholders in the options array, aka generate options array using index and place current players value within the index of the cell clicked
  cell.textContent = currentPlayer; //display the above within the cell
  addColour(cell);
}

function addColour(cell) {
  const color = (currentPlayer == "X") ? "red" : "blue";
  cell.style.color = color;
}

function changePlayer() {
  currentPlayer = currentPlayer == "X" ? "O" : "X";
  statusText.textContent = `Waiting for Player ${currentPlayer} to play turn`;
}

function checkWinner() {
  let roundWon = false;
  for (let i = 0; i < winConditions.length; i++) {
    const condition = winConditions[i]; //we take the index of all the win conditions
    const cellA = options[condition[0]]; //first index in winconditions
    const cellB = options[condition[1]]; //second index in winconditions
    const cellC = options[condition[2]]; //third index in winconditions

    //if we check wincondition's index 0 aka 0,1,2. cell a will be 0, cellb will be 1 cell c will be 2 for index 2 a=3 b=4 c=5, for index 7 a =2 =4 c=6
    //3 cells as 3 indices ber wincondition and 3x3 grid
    if (cellA == "" || cellB == "" || cellC == "") {
      continue; //aka keep loop running if the indices arent complete therefore condition hasnt been met
    }
    //checking if all the indices are Xs or Os for the winning condition
    if (cellA == cellB && cellB == cellC) {
      roundWon = true;
      break; //break out of the for loop if win condition me
    }
  }
  if (roundWon) {
    statusText.textContent = `${currentPlayer} has Won!`;
    isGameActive = false; //end game aka make nothing be able to be clicked anymore since game has been won

    //if options does not include any spaces then update status aka all the board has been played with no winners so far
  } else if (!options.includes("")) {
    statusText.textContent = "Match draw";
    //if noone has won yet and noone has drawn (aka there are still empty cells, run the function to change player)
  } else {
    changePlayer();
  }
}

function restartGame() {
  currentPlayer = "X";
  options = ["", "", "", "", "", "", "", "", ""];
  statusText.textContent = `${currentPlayer}'s turn`;
  cells.forEach((cell) => (cell.textContent = ""));
  isGameActive = true;
}