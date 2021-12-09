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
    let columns = []
    
    let input = readline()
    while(input != undefined){
        input.split("").forEach((element, i) => {    
            columns[i] == undefined ? columns[i] = [element] : columns[i].push(element)
        })

        input = readline()
    }

    let gammaRate = ""
    columns.forEach(column => {
        let oneCount = 0;
        for (let i in column) {
            escape(column[i]) == '1' ? oneCount++ : 1;
        }

        if(oneCount > (column.length / 2)){
            gammaRate += "1"
        } else {
            gammaRate += "0"
        }
    })

    let epsilonRate = parseInt(flipbits(gammaRate), 2)
    
    gammaRate = parseInt(gammaRate, 2)
    

    console.log(Math.abs(gammaRate * epsilonRate))
}

var flipbits = str => str.split('').map(b => (1 - b).toString()).join('');