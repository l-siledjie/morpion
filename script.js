document.addEventListener("DOMContentLoaded", function () {

    //debut du dessin de ma matrice
    const container = document.getElementById("game-container");
    let size = prompt("Entrez la taille de la matrice (n):");
    size = parseInt(size) || 10;
    document.documentElement.style.setProperty('--size', size);
    //fin du dessin de ma matrice

    let player1Score = 2;
    let player2Score = 2;

    //initialisation du premier joueur
    let currentPlayer = 1;
    document.querySelector("#playPlayer").innerHTML = "Tour du joueur : " + currentPlayer
    let board = initializeBoard(size);

    renderBoard();

    function initializeBoard(size) {
        const board = [];
        for (let i = 0; i < size; i++) {
            board.push(new Array(size).fill(0));
        }
        // Placer deux pions au centre de la matrice
        const center = Math.floor(size / 2);
        board[center - 1][center - 1] = 1;
        board[center - 1][center] = 2;
        board[center][center - 1] = 2;
        board[center][center] = 1;

        return board;
    }

    //fonction permettant de creer plusieurs cellules en fonction du nombre entré au lancement de l'application
    function renderBoard() {
        container.innerHTML = "";
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                const cell = document.createElement("div");
                cell.classList.add("cell");
                cell.dataset.row = i;
                cell.dataset.col = j;
                cell.innerText = board[i][j] === 1 ? 'X' : (board[i][j] === 2 ? 'O' : '');
                
                cell.addEventListener("click", handleCellClick);
                container.appendChild(cell);
            }
        }
    }

    function handleCellClick(event) {
        const row = parseInt(event.target.dataset.row);
        const col = parseInt(event.target.dataset.col);
    
        if (board[row][col] === 0 && isAdjacentToOtherPion(row, col)) {
            board[row][col] = currentPlayer;
            // currentPlayer = currentPlayer === 1 ? 2 : 1;
            renderBoard();
            const alignments = checkAlignedPions(row, col);
            updateMaxAlignments(alignments);
            // currentPlayer = currentPlayer === 1 ? 2 : 1;
            if (isBoardFull()) {
                checkGameStatus();
            }
        }
        currentPlayer = currentPlayer === 1 ? 2 : 1;
    }

    // fonction qui verifie si le pion est à cote d'un autre
    function isAdjacentToOtherPion(row, col) {
        // Vérifie si la cellule est adjacente (y compris diagonale) à une cellule déjà occupée par un pion
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < size && j >= 0 && j < size && board[i][j] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    function checkGameStatus() {
        if (player1Score > player2Score ) {
            alert(`Joueur  'X'  gagne !`);
            resetGame();
        }
        if(player1Score < player2Score ){
            alert(`Joueur  'O'  gagne !`);
            resetGame();
        }
        else if (isBoardFull()) {
            alert("Match nul !");
            resetGame();
        }
    }

    //mettre a jour le score
    /* function updateScores() {
        const player1Count = checkForWinnerCount(1);
        const player2Count = checkForWinnerCount(2);

        player1Score += player1Count;
        alert(player1Score)
        player2Score += player2Count;

        document.querySelector("#player1-score").innerHTML = player1Score;
        document.querySelector("#player2-score").innerHTML = player2Score;
    }*/

    function checkForWinnerCount(player) {
        const playerRows = checkRows(player);
        const playerColumns = checkColumns(player);
        const playerDiagonals = checkDiagonals(player);
        return Math.max(playerRows, playerColumns, playerDiagonals);
    }

    //ajout de la fonction isAdjacente

    function isAdjacentToOtherPion(row, col) {
        // Vérifie si la cellule est adjacente (y compris diagonale) à une cellule déjà occupée par un pion
        for (let i = row - 1; i <= row + 1; i++) {
            for (let j = col - 1; j <= col + 1; j++) {
                if (i >= 0 && i < size && j >= 0 && j < size && board[i][j] !== 0) {
                    return true;
                }
            }
        }
        return false;
    }

    function checkGameStatus() {
        if (player1Score > player2Score ) {
            alert(`Joueur  'X'  gagne !`);
            resetGame();
        }
        if(player1Score < player2Score ){
            alert(`Joueur  'O'  gagne !`);
            resetGame();
        }
        else if (isBoardFull()) {
            alert("Match nul !");
            resetGame();
        }
    }

    // Compte le nombre de pions alignés sur la ligne
    // function countAlignedPionsInRow(row, col) {
    //     let count = 0;
    //     for (let j = 0; j < size; j++) {
    //         if (board[row][j] === currentPlayer) {
    //             count++;
    //         } else {
    //             break;  // Arrete le compte si le pion d'un joueur différent est rencontré
    //         }
    //     }
    
    //     return count;
    // }
    
    // // Compte le nombre de pions alignés sur la colonne
    //     function countAlignedPionsInCol(row, col) {
    //     let count = 0;
    //     for (let i = 0; i < size; i++) {
    //         if (board[i][col] === currentPlayer) {
    //             count++;
    //         } else {
    //             break;  // Arrete le compte si le pion d'un joueur différent est rencontré  
    //         }
    //     }
    //     return count;
    // }
    
    // // Compte le nombre de pions alignés sur la diagonale
    //     function countAlignedPionsInDiagonal(row, col) {
    //     let count1=0;
    //     let count2=0

    //     // Diagonale principale
    //      for (let i = 0; i < size; i++) {
    //         const currentRow = row - (col - i);
    //         if (currentRow >= 0 && currentRow < size && board[currentRow][i] === currentPlayer) {
    //             if(board[currentRow][i] === currentPlayer){
    //                 count1++;
    //             }
                
    //         } 
    //         // else() {
    //         //     break;  // Stop counting if a different player's pawn is encountered or if out of bounds
    //         // }
    //     }
    
    //     // Diagonale opposée
    //     for (let i = 1; i <= size; i++) {
    //         const currentRow = row + (col - i);
    //         if (currentRow >= 0 && currentRow < size && board[currentRow][size - i - 1] === currentPlayer) {
    //             if(board[currentRow][size -i - 1] === currentPlayer){
    //                 count2++;
    //             }
    //         }
    //          //else {
    //         //     break;  // Stop counting if a different player's pawn is encountered or if out of bounds
    //          //}
    //     }
    
    
    //     if(count1< count2){
    //         alert('max diagonal 2 ' +count2)
    //         return count2;
    //     }
    
    //     else{
    //         alert('max diagonal 1 ' +count1)
    //         return count1
    //     }
       
        
    // }

    function countAlignedPionsInRow(row, col) {
        let count = 0;
        for (let j = 0; j < size; j++) {
            if (board[row][j] === currentPlayer) {
                count++;
            } else {
                break; // Arrete le compte si le pion d'un joueur différent est rencontré
            }
        }
        for (let j = size - 1; j >= 0; j--) {
            if (board[row][j] === currentPlayer) {
                count++;
            } else {
                break; // Arrete le compte si le pion d'un joueur différent est rencontré
            }
        }
        return (count - 1);
    }
    
    function countAlignedPionsInCol(row, col) {
        let count = 0;
        for (let i = 0; i < size; i++) {
            if (board[i][col] === currentPlayer) {
                count++;
            } else {
                break; // Arrete le compte si le pion d'un joueur différent est rencontré 
            }
        }
        for (let i = size - 1; i >= 0; i--) {
            if (board[i][col] === currentPlayer) {
                count++;
            } else {
                break; // Arrete le compte si le pion d'un joueur différent est rencontré
            }
        }
        return (count - 1);
    }
    
    function countAlignedPionsInDiagonal(row, col) {
        let count = 0;
        for (let i = row, j = col; i >= 0 && j >= 0; i--, j--) {
            if (board[i][j] === currentPlayer) {
                count++;
            } else {
                break; // Arrete le compte si le pion d'un joueur différent est rencontré 
            }
        }
        for (let i = row, j = col; i < size && j < size; i++, j++) {
            if (board[i][j] === currentPlayer) {
                count++;
            } else {
                break; // Arrete le compte si le pion d'un joueur différent est rencontré
            }
        }
        return (count - 1);
    }
    
    function countAlignedPionsInAntiDiagonal(row, col) {
        let count = 0;
        for (let i = row, j = col; i >= 0 && j < size; i--, j++) {
            if (board[i][j] === currentPlayer) {
                count++;
            } else {
                break; // Arrete le compte si le pion d'un joueur différent est rencontré 
            }
        }
        for (let i = row, j = col; i < size && j >= 0; i++, j--) {
            if (board[i][j] === currentPlayer) {
                count++;
            } else {
                break; // Arrete le compte si le pion d'un joueur différent est rencontré
            }
        }
        return (count - 1);
    }

    //return le max entre la colone , ligne et colone
    function checkAlignedPions(row, col) {
        const alignedRows = countAlignedPionsInRow(row, col);
        const alignedCols = countAlignedPionsInCol(row, col);
        const alignedDiagonals = countAlignedPionsInDiagonal(row, col);
        const alignedAntiDiagonals = countAlignedPionsInAntiDiagonal(row, col);
        return Math.max(alignedRows, alignedCols, alignedDiagonals, alignedAntiDiagonals);
    }

    // modifie le plus grand nombre de chaque joueur
    function updateMaxAlignments(alignments) {
        if (currentPlayer === 1) {
            player1Score = Math.max(player1Score, alignments);
            // alert(`le max de x est ${player1Score}`)
        } else {
            player2Score = Math.max(player2Score, alignments);
            // alert(`le max de o est ${player2Score}`)
        }

        document.querySelector("#player1-score").innerHTML = player1Score;
        document.querySelector("#player2-score").innerHTML = player2Score;
    }

    
    //fonction pour verifiier si la grille est pleine
    function isBoardFull() {
        for (let i = 0; i < size; i++) {
            for (let j = 0; j < size; j++) {
                if (board[i][j] === 0) {
                    return false;
                }
            }
        }
        return true;
    }

    function resetGame() {
        // Vous pouvez implémenter ici la logique pour réinitialiser le jeu , en rechargeant la page
        alert(`Joueur X : ${player1Score}, Joueur O : ${player2Score}`);
        location.reload();
    }

});
















