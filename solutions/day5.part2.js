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

function main() {
    let input = readline()

    let spots = []
    while(input != undefined){
        let value = input.split(" -> ").map(x => x.split(",").map(x => +x))

        if(value[0][0] == value[1][0]){
            if(value[0][1] > value[1][1]){
                for(let i = value[1][1]; i <= value[0][1]; i++){
                    spots.push(JSON.stringify([value[0][0], i]))
                }
            } else {
                for(let i = value[0][1]; i <= value[1][1]; i++){
                    spots.push(JSON.stringify([value[0][0], i]))
                }
            }
        } else if(value[0][1] == value[1][1]) {
            if(value[0][0] > value[1][0]){
                for(let i = value[1][0]; i <= value[0][0]; i++){
                    spots.push(JSON.stringify([i, value[0][1]]))
                }
            } else {
                for(let i = value[0][0]; i <= value[1][0]; i++){
                    spots.push(JSON.stringify([i, value[0][1]]))
                }
            }
        } else {
            let x = 0
            let tempSpot = []
            while(x < 2){
                if(value[0][x] > value[1][x]){
                    for(let i = 0; i <= value[0][x] - value[1][x]; i++){
                        tempSpot[i] == undefined ? tempSpot[i] = [] : 1
                        tempSpot[i][x] = value[0][x] - i
                    }
                } else {
                    for(let i = 0; i <= value[1][x] - value[0][x]; i++){
                        tempSpot[i] == undefined ? tempSpot[i] = [] : 1
                        tempSpot[i][x] = i + value[0][x]
                    }
                }
                x++
            }
            tempSpot.forEach(x => spots.push(JSON.stringify(x)))
        }

        input = readline()
    }

    let sum = 0
    Object.entries(spots.reduce(function(obj, item) {
        obj[item] = (obj[item] || 0) + 1;
        return obj;
      }, {})).forEach(x => x[1] > 1 ? sum++ : 1)

    console.log(sum)

}
