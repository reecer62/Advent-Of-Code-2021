const fs = require('fs')

const inputText = fs.readFileSync('./input',  {encoding:'utf8'})
const inputArr = inputText.split('\n').map(s => s.split(/\s+/))

function day2 (input) {
    if (input.length < 1) {
        return 0
    }
    let horizontal = 0
    let depth = 0
    let aim = 0
    for (let i = 0; i < input.length; i++) {
        const [direction, num] = input[i]
        const x = parseInt(num)
        switch (direction) {
            case 'forward':
                horizontal += x
                depth += aim * x
                break
            case 'up':
                aim -= x
                break
            case 'down':
                aim += x
                break
        }
    }
    return horizontal * depth
}

console.log(day2(inputArr))