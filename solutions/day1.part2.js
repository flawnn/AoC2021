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
    let largerMeasurements = 0

    let currentIndex = 0;
    let input = +readline();
    let groups = []
    
    while(!Number.isNaN(input)){
        let inc = currentIndex;
        while(inc >= 0 && inc > currentIndex - 3){
            groups[inc] != undefined ? groups[inc].push(input) : groups[inc] = [input]
            inc--
        }

        currentIndex++
        input = +readline()
    }

    groups.reduce((prev, curr) => {
        let sum1 = curr.reduce((pv, cv) => pv + cv, 0);
        let sum2 = prev.reduce((pv, cv) => pv + cv, 0);
        if(curr.length == 3 && sum1 > sum2){
            largerMeasurements++
        }
        
        return curr;
    })

    console.log(largerMeasurements)
}
