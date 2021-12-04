const fs = require('fs-extra')

const inputText = fs.readFileSync('./input',  {encoding:'utf8'})
const inputArr = inputText.split('\n').map(Number)

function day1 (input) {
    let numIncreases = 0
    if (input.length < 4) {
        return 0
    }
    for (let i = 3; i < input.length; i++) {
        const p1 = input[i-3]
        const p2 = input[i-2]
        const p3 = input[i-1]
        const p4 = input[i]
        const windowLeft = p1 + p2 + p3
        const windowRight = p2 + p3 + p4
        if (windowRight > windowLeft) {
            numIncreases++
        }
    }
    return numIncreases
}

console.log(day1(inputArr))