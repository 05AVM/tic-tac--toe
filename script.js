//this will be processed before any html element
window.addEventListener("DOMContentLoaded",()=>{
    const tiles = Array.from(document.querySelectorAll('.tile'));
    const playerDisplay = document.querySelector('.display-player');
    const resetButton = document.querySelector('#reset');
    const announcer = document.querySelector('.announcer');
//board is an empty  array of strings..
    let board = ['', '', '', '', '', '', '', '', ''];
    let currentPlayer = 'X';
    let isGameActive = true;

    const PLAYERX_WON = 'PLAYERX_WON';
    const PLAYERO_WON = 'PLAYERO_WON';
    const TIE = 'TIE';

      /*
        Indexes within the board
        [0] [1] [2]
        [3] [4] [5]
        [6] [7] [8]
    */
//this is an array of arrays and we store different indexes in it..where the first winning condition is 0,1,2 
        const winningConditions = [
            [0, 1, 2],
            [3, 4, 5],
            [6, 7, 8],
            [0, 3, 6],
            [1, 4, 7],
            [2, 5, 8],
            [0, 4, 8],
            [2, 4, 6]
        ];
//we will check if we have a winner or not , we will loop over the array and we will check if all the three characters have the same characters or not,  and if any of the tile is empty we will skip the iteration and if it is equal we will exit our for loop using break keyword 
// and if we have a winner then we will call the announce function and it will go with either playerX_won or playerO_won and  if we dont have a winner we rannounce a tie..
        function handleResultValidation() {
            let roundWon = false;
            for (let i = 0; i <= 7; i++) {
                const winCondition = winningConditions[i];
                const a = board[winCondition[0]];
                const b = board[winCondition[1]];
                const c = board[winCondition[2]];
                if (a === '' || b === '' || c === '') {
                    continue;
                }
                if (a === b && b === c) {
                    roundWon = true;
                    break;
                }
            }
    
        if (roundWon) {
                announce(currentPlayer === 'X' ? PLAYERX_WON : PLAYERO_WON);
                isGameActive = false;
                return;
            }
    
        if (!board.includes(''))
            announce(TIE);
        }
    

        const announce = (type) => {
            switch(type){
                case PLAYERO_WON:
                    announcer.innerHTML = 'Player <span class="playerO">O</span> Won';
                    break;
                case PLAYERX_WON:
                    announcer.innerHTML = 'Player <span class="playerX">X</span> Won';
                    break;
                case TIE:
                    announcer.innerText = 'Tie';
            }
            announcer.classList.remove('hide');
        };
        //here we will make update to the baord array at a given position and set it to the currentPlayer value. 
        const updateBoard=(index)=>{
            board[index]=currentPlayer;

        };
        //this is a simple function which says that if tile contains a valid character then it returns true else false..we make sure that the player plays on an empty tile onlyy..
        const isValidAction=(tile)=>{
            if(tile.innerText==='X'|| tile.innerText==='O')
            {
                return false;
            }
            return true;
        };

        const changePlayer=()=>{
            playerDisplay.classList.remove(`player${currentPlayer}`);
            currentPlayer=currentPlayer==='X'? 'O':'X';
            playerDisplay.innerText=currentPlayer;
            playerDisplay.classList.add(`player${currentPlayer}`);
        }
//so here userAction function takes two arguments tile and index if the user clicks on a valid tile then we will set the current player to X or O then update our board index and then check if we gave a winner or not and the ncall the change player.
        const userAction=(tile,index)=>{
            if(isValidAction(tile) && isGameActive )
            {
                tile.innerText=currentPlayer;
                tile.classList.add(`player${currentPlayer}`);
                updateBoard(index);
                handleResultValidation();
                changePlayer();
                

            }
        }
        const resetBoard = () => {
            board = ['', '', '', '', '', '', '', '', ''];
            isGameActive = true;
            announcer.classList.add('hide');
    
            if (currentPlayer === 'O') {
                changePlayer();
            }
    
            tiles.forEach(tile => {
                tile.innerText = '';
                tile.classList.remove('playerX');
                tile.classList.remove('playerO');
            });
        }

 //attaching an event on every tile..when we click a tile a click event is generated..


        tiles.forEach((tile,index)=>{
            tile.addEventListener('click',()=>{
                userAction(tile,index);})
            })

            resetButton.addEventListener('click', resetBoard);
      
            
});
