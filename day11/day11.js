'use strict';
const fs = require('fs')
const { exit } = require('process')

const inputText = fs.readFileSync('./input.txt',  {encoding:'utf8'})
const inputLines = inputText.split('\n')
const input = []
inputLines.forEach(line => {
    const nums = line.split("").map(Number)
    input.push(nums)
})
const width = input[0].length
const height = input.length

let totalFlashes = 0

class Octopus {
    constructor(num) {
        this.energy = num
        this.hasFlashed = false
    }
    increaseEnergy() {
        if (!this.hasFlashed) {
            this.energy += 1
        }
        if (this.energy > 9 && !this.hasFlashed) {
            this.hasFlashed = true
            totalFlashes += 1
            return true
        }
        return false
    }
}

const rows = []
input.forEach(inputRow => {
    const row = []
    inputRow.forEach(number => {
        const o = new Octopus(number)
        row.push(o)
    })
    rows.push(row)
})

// At the end of step clear all octopuses
// First increase all energy levels by 1
let NUM_STEPS = 2200000
let NUM_ITERS = 0
while (NUM_STEPS > 0) {
    NUM_STEPS--
    NUM_ITERS++
    // For each row
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        for (let j = 0; j < row.length; j++) {
            const oct = row[j]
            if (oct.increaseEnergy()) {
                // Increase adjacent energy
                flash(j, i)
            }
        }
    }

    // Check if all octopi have flashed
    if (haveAllFlashed()) {
        console.log(NUM_ITERS)
        exit()
    }

    // Reset energy levels
    for (let i = 0; i < rows.length; i++) {
        const row = rows[i]
        for (let j = 0; j < row.length; j++) {
            const oct = row[j]
            if (oct.hasFlashed) {
                oct.energy = 0
                oct.hasFlashed = false
            }
        }
    }
}
printOcts()
console.log(totalFlashes)

function flash(x, y) {
    // Check top left
    if (y !== 0 && x !== 0) {
        const oct = rows[y-1][x-1]
        if (oct.increaseEnergy()) {
            flash(x-1, y-1)
        }
    }
    // Check top
    if (y !== 0) {
        const oct = rows[y-1][x]
        if (oct.increaseEnergy()) {
            flash(x, y-1)
        }
    }
    // Check top right
    if (y !== 0 && x !== (width - 1)) {
        const oct = rows[y-1][x+1]
        if (oct.increaseEnergy()) {
            flash(x+1, y-1)
        }
    }
    // Check left
    if (x !== 0) {
        const oct = rows[y][x-1]
        if (oct.increaseEnergy()) {
            flash(x-1, y)
        }
    }
    // Check right
    if (x !== (width - 1)) {
        const oct = rows[y][x+1]
        if (oct.increaseEnergy()) {
            flash(x+1, y)
        }
    }
    // Check bottom left
    if (x !== 0 && y !== (height - 1)) {
        const oct = rows[y+1][x-1]
        if (oct.increaseEnergy()) {
            flash(x-1, y+1)
        }
    }
    // Check bottom
    if (y !== (height - 1)) {
        const oct = rows[y+1][x]
        if (oct.increaseEnergy()) {
            flash(x, y+1)
        }
    }
    // Check bottom right
    if (y !== (height - 1) && x !== (width - 1)) {
        const oct = rows[y+1][x+1]
        if (oct.increaseEnergy()) {
            flash(x+1, y+1)
        }
    }
}

function printOcts() {
    for (let i = 0; i < height; i++) {
        let rowStr = ""
        for (let j = 0; j < width; j++) {
            const energy = rows[i][j].energy
            rowStr += energy
        }
        console.log(rowStr)
    }
}

function haveAllFlashed() {
    let total = width * height
    for (let i = 0; i < height; i++) {
        for (let j = 0; j < width; j++) {
            if (rows[i][j].hasFlashed) {
                total -= 1
            }
        }
    }
    // console.log(`\nNum steps = [${NUM_STEPS}]\nTotal = [${total}]\n`)
    if (total === 0) {
        return true
    }
    return false
}