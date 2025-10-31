# X0X Game (Tic Tac Toe)

A modern and stylish **Tic Tac Toe (X0X)** web game built using **HTML, CSS, and JavaScript**.  
It features a golden neon design, smooth animations, and dynamic strike effects for winning combinations.

---
##  Features

-  **Two-player mode** — play locally with a friend.  
-  **Golden neon UI** — elegant and visually striking interface.  
-  **Animated gameplay** — smooth hover and click transitions.  
-  **Winning strike line** — visually highlights the winning move.  
-  **Reset option** — restart the game at any time.  
-  **Draw detection** — announces when no more moves are left.



---
## Technologies Used

- **HTML5** — game layout and structure.  
- **CSS3** — styling, animations, and effects.  
- **JavaScript (ES6)** — game logic and interactivity.


---

##  How to Play

1. Open the game in your browser.  
2. Player **X** starts first.  
3. Click on any empty cell to place your mark.  
4. Player **O** takes the next turn.  
5. The first player to align three symbols (row, column, or diagonal) wins.  
6. If all cells are filled without a winner, it’s a **draw**.  
7. Click **Reset Game** to start a new round.

---

##  Game Logic

- The game board is represented as a 9-cell array:
  ```js
  let board = ["", "", "", "", "", "", "", "", ""];
Each move updates the board and checks:

- If a player has won

- If the game is a draw

- Whose turn is next

- A strike line appears for the corresponding winning pattern.

How to Run Locally

Clone this repository:
```bash

```
- Open the index.html file in your browser.
- That’s it — the game will launch instantly!

