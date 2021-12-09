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

var columns = []
function main() {
    let input = readline()
    while(input != undefined){
        input.split("").forEach((element, i) => {    
            columns[i] == undefined ? columns[i] = [element] : columns[i].push(element)
        })

        input = readline()
    }

    var gammaRate = ""
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

    var epsilonRate = flipbits(gammaRate)
    
    let numPools = [[],[]]
    
    for(let i = 0; i < columns.length; i++){
        if(numPools[0].length != 1){
            if(numPools[0].length == 0){
                columns[i].forEach((e,ind) => {
                    if(e == gammaRate[i]){
                        numPools[0].push(ind)
                    }
                })
            } else {
                numPools[0].forEach((e) => {
                    let element = columns[i][e]

                    if(element != gammaRate[i]){
                        numPools[0] = numPools[0].filter(item => item !== e)
                    }
                })
            }
        } 

        
        if(numPools[1].length != 1){
            if(numPools[1].length == 0){
                columns[i].forEach((e,ind) => {
                    if(e == epsilonRate[i]){
                        numPools[1].push(ind)
                    }
                })
            } else {
                numPools[1].forEach((e) => {
                    let element = columns[i][e]

                    if(element != epsilonRate[i]){
                        numPools[1] = numPools[1].filter(item => item !== e)
                    }
                })
            }
        }
        
        [gammaRate, epsilonRate] = calcGammaEpsilon(numPools) 
    }

    numPools.forEach((x, ind) => {
        let num = "";
        columns.forEach(xi => num += xi[x])
        numPools[ind] = parseInt(num, 2)
    })

    console.log(numPools[0] * numPools[1])
}

var flipbits = str => str.split('').map(b => (1 - b).toString()).join('');

function calcGammaEpsilon(elements){
    let gammaRate = ""

    columns.forEach(column => {
        let oneCount = 0;
        for (let i of elements[0]) {
            escape(column[i]) == '1' ? oneCount++ : 1;
        }

        if(oneCount > (elements[0].length / 2)){
            gammaRate += "1"
        } else if(oneCount == (elements[0].length / 2)) {
            gammaRate += "1"
        } else {
            gammaRate += "0"
        }
    })

    let epsilonRate = ""

    columns.forEach(column => {
        let oneCount = 0;
        for (let i of elements[1]) {
            escape(column[i]) == '1' ? oneCount++ : 1;
        }

        if(oneCount > (elements[1].length / 2)){
            epsilonRate += "0"
        } else if(oneCount == (elements[1].length / 2)) {
            epsilonRate += "0"
        } else {
            epsilonRate += "1"
        }
    })
    
    return [gammaRate, epsilonRate]
}