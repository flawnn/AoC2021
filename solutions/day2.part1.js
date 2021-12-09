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

    let depth = 0;
    let horizontalPos = 0;
    let input = readline()
    while(input != undefined){
        let [direction, distance] = input.split(' ')
        switch(direction){
            case("forward"): {
                horizontalPos += parseInt(distance);
                break;
            }
            case("down"): {
                depth += parseInt(distance);
                break;
            }
            case("up"): {
                depth -= parseInt(distance);
                break;
            }
        }
        input = readline()
    }

    console.log(horizontalPos * depth)
}
