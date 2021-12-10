// ------------------------
// Codeabschnitt, der für die Verarbeitung der Eingabe zuständig ist
'use strict';

process.stdin.resume();
process.stdin.setEncoding('utf-8');

let inputString = '';
let currentLine = 0;

process.stdin.on('data', inputStdin => {
    inputString += inputStdin;
});

process.stdin.on('end', _ => {
    inputString = inputString.trim().split('\n').map(string => {
        return string.trim();
    });
    
    main();    
});

function readline() {
    return inputString[currentLine++];
}
// ---------------------------

/**
 * Usage (Linux/Unix): cat input.txt | node index.js 
 */
var scoreBoards = []
function main() {
    let drawnNumbers = readline().split(",")

    let line = readline()

    for(let i = 0; line != undefined; i++){
        let board = []

        for(let j = 0; j < 5;j++){
            let boardRow = readline().split(" ")
            board.push(boardRow.filter(x => x != '').map(x => [x, 0]))
        }

        scoreBoards.push(board)
        line = readline();
    }

    var candidates = scoreBoards;
    
    for(let num of drawnNumbers){
        for(let i = 0; i < scoreBoards.length; i++){
            let board = scoreBoards[i]
            scoreBoards[i] = checkNumber(num, board)

            let res = checkIfWon(board)
            if(res){
                candidates = candidates.filter(x => x != board)

                if(scoreBoards.length == 1){
                    let sum = calcUnmarkedSum(scoreBoards[i])
                    console.log(+num * sum)

                    // Dirty workaround for quitting the program lulz
                    throw {}
                }
            }
        }

        scoreBoards = candidates
    }
}

function checkIfWon(board){
    for(let i = 0; i < board.length; i++){
        let row = []
        let column = []
        for(let j = 0; j < board[i].length; j++){
            if(board[i][j][1] == 1){
                row.push("X")
            }

            if(board[j][i][1] == 1){
                column.push("X")
            }
        }

        if(row.length == 5 || column.length == 5){
            return true
        } 
    }
}

function checkNumber(number, board){
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            // check row
            if(board[i][j][0] == number){
                board[i][j][1] = 1
            }
            
            // check column
            if(board[j][i][0] == number){
                board[j][i][1] = 1
            }
        }
    }

    return board;
}

function calcUnmarkedSum(board){
    let sum = 0
    for(let i = 0; i < board.length; i++){
        for(let j = 0; j < board[i].length; j++){
            if(board[i][j][1] == 0){
                sum += +board[i][j][0]
            }
        }
    }

    return sum;
}