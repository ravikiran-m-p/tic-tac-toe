const all_cells = document.querySelectorAll('.cell');
const status_txt = document.getElementById('game_status');
const reset_btn = document.getElementById('reset_btn');
const line = document.getElementById('strike_line');

let game_active = true;
let current_board = ["", "", "", "", "", "", "", "", ""];
let player_turn = 'X';

const human = 'X';
const ai_bot = 'O';

const win_patterns = [
    [0, 1, 2], [3, 4, 5], [6, 7, 8],
    [0, 3, 6], [1, 4, 7], [2, 5, 8],
    [0, 4, 8], [2, 4, 6]
];

all_cells.forEach(cell => cell.addEventListener('click', cell_clicked));
reset_btn.addEventListener('click', reset_game);

document.querySelectorAll('input[name="mode"]').forEach(radio => {
    radio.addEventListener('change', reset_game);
});

status_txt.textContent = "Your turn (X)";


function cell_clicked(e)
{

 
    const box_index = e.target.dataset.index;
    const play_mode = document.querySelector('input[name="mode"]:checked').value;

    if (current_board[box_index] !== "" || !game_active) 
      return;

    mark_cell(box_index, player_turn);

    if (game_active)
    {
        if (play_mode === 'ai')
        {
            status_txt.textContent = "AI is thinking...";
            setTimeout(() => {
                const ai_choice = find_best_move(current_board, ai_bot).index;
                if (ai_choice !== undefined) mark_cell(ai_choice, ai_bot);
            }, 400);
        } 
        else
        {
            player_turn = (player_turn === 'X') ? 'O' : 'X';
            status_txt.textContent = `Player ${player_turn}'s turn`;
        }
    }
}

function mark_cell(idx, player) 
{
    current_board[idx] = player;
 
    all_cells[idx].textContent = player;
    all_cells[idx].style.transform = "scale(0.8)";
    setTimeout(() => all_cells[idx].style.transform = "scale(1)", 100);
    check_game_result();
}

function check_game_result()
{
    let result = check_win(current_board);
    if (result)
    {
        status_txt.textContent = `Player ${result.player} Wins!`;
        line.className = `strike_${result.index}`;
        
        const combo = win_patterns[result.index];
        combo.forEach(idx => all_cells[idx].classList.add('winner_cell'));
        
        game_active = false;
    }
    else if (!current_board.includes(""))
    {
        status_txt.textContent = "Draw!";
        game_active = false;
    }
}

function check_win(b)
{
    for (let i = 0; i < win_patterns.length; i++)
    {
        const [a, b1, c] = win_patterns[i];
     
        if (b[a] && b[a] === b[b1] && b[a] === b[c])
            return { player: b[a], index: i };
        
    }
    return null;
}

function find_best_move(temp_board, current_p)
{
    const free_spots = temp_board.map((v, i) => v === "" ? i : null).filter(v => v !== null);

    if (check_win(temp_board)?.player === human)
      return { score: -10 };
    if (check_win(temp_board)?.player === ai_bot)
      return { score: 10 };
    if (free_spots.length === 0)
      return { score: 0 };

    const moves = [];
 
    for (let i = 0; i < free_spots.length; i++)
    {
        let move_data = {};
        move_data.index = free_spots[i];
     
        temp_board[free_spots[i]] = current_p;
        move_data.score = (current_p === ai_bot) ? find_best_move(temp_board, human).score : find_best_move(temp_board, ai_bot).score;
        temp_board[free_spots[i]] = "";
        moves.push(move_data);
    }

    let best_idx;
    if (current_p === ai_bot)
    {
        let max_score = -1000;
        for (let i = 0; i < moves.length; i++)
        {
            if (moves[i].score > max_score)
            {
                max_score = moves[i].score;
                best_idx = i;
            }
        }
    } 
    else
    {
        let min_score = 1000;
        for (let i = 0; i < moves.length; i++)
        {
            if (moves[i].score < min_score)
            {
                min_score = moves[i].score;
                best_idx = i;
            }
        }
    }
    return moves[best_idx];
}

function reset_game()
{
    current_board = ["", "", "", "", "", "", "", "", ""];
    game_active = true;
    player_turn = 'X';
    all_cells.forEach(cell => {
        cell.textContent = "";
        cell.classList.remove('winner_cell');
    });
    status_txt.textContent = "Your turn (X)";
    line.className = "";
}
