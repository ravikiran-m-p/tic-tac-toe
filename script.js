const cells = document.querySelectorAll('.cell');
const statusText = document.getElementById('status');
const resetBtn = document.getElementById('resetBtn');
const strikeLine = document.getElementById('strikeLine');

let currentPlayer = 'X';
let gameActive = true;
let board = ["", "", "", "", "", "", "", "", ""];

const winningConditions = [
    [0,1,2], [3,4,5], [6,7,8],
    [0,3,6], [1,4,7], [2,5,8], 
    [0,4,8], [2,4,6]  
];


function handleCellClick(e)
{
    const index = e.target.dataset.index;
    if (board[index] !== "" || !gameActive) 
        return;

    board[index] = currentPlayer;
    e.target.textContent = currentPlayer;
    e.target.style.transform = "scale(0)";
    setTimeout(() => e.target.style.transform = "scale(1)", 50);

    checkWinner();
}


function checkWinner()
{
    let roundWon = false;
    let winIndex = -1;

    for (let i=0; i<winningConditions.length; i++)
    {
        const [a,b,c] = winningConditions[i];
        if (board[a] && board[a] === board[b] && board[a] === board[c])
        {
            roundWon = true;
            winIndex = i;
            break;
        }
    }

    if(roundWon)
    {
        statusText.textContent = `Player ${currentPlayer} wins!`;
        gameActive = false;
        strikeLine.className = `strike-${winIndex}`;
        return;
    }

    if(!board.includes(""))
    {
        statusText.textContent = "It's a draw!";
        gameActive = false;
        return;
    }

    currentPlayer = currentPlayer === 'X' ? 'O' : 'X';
    statusText.textContent = `Player ${currentPlayer}'s turn`;
}

function resetGame()
{
    board = ["","","","","","","","",""];
    gameActive = true;
    currentPlayer = 'X';
    cells.forEach(cell => cell.textContent = "");
    statusText.textContent = `Player ${currentPlayer}'s turn`;
    strikeLine.className = ""; 
}

cells.forEach(cell => cell.addEventListener('click', handleCellClick));
resetBtn.addEventListener('click', resetGame);
statusText.textContent = `Player ${currentPlayer}'s turn`;
