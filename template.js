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
    
}
