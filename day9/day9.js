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

const lowPoints = []
for (let i = 0; i < input.length; i++) {
    const row = input[i]
    for (let j = 0; j < row.length; j++) {
        const vent = row[j]
        // Check left
        if (j > 0) {
            const left = input[i][j-1]
            if (vent >= left)
                continue
        }
        // Check right
        if (j < width - 1) {
            const right = input[i][j+1]
            if (vent >= right)
                continue
        }
        // Check up
        if (i > 0) {
            const up = input[i-1][j]
            if (vent >= up)
                continue
        }
        // Check down
        if (i < height - 1) {
            const down = input[i+1][j]
            if (vent >= down)
                continue
        }
        lowPoints.push(vent)
    }
    
}
console.log(lowPoints.map(point => point + 1).reduce((acc, point) => acc + point))

class Vent {
    constructor(num, rowIdx, colIdx) {
        this.n = num
        this.rowIdx = rowIdx
        this.colIdx = colIdx
        this.isMarked = false
    }
}

const vents = []
input.forEach((row, rowIdx) => {
    const ventRow = []
    row.forEach((vent, colIdx) =>  {
        const ventObj = new Vent(vent, rowIdx, colIdx)
        ventRow.push(ventObj)
    })
    vents.push(ventRow)
})

const basins = []
vents.forEach(row => {
    row.forEach(vent => {
        basins.push(bfs(vent))
    })
})

function bfs(vent, basin = []) {
    if (vent.isMarked) {
        return basin
    }
    if (vent.n === 9) {
        return basin
    }
    vent.isMarked = true
    basin.push(vent)

    // Check left
    if (vent.colIdx > 0) {
        const left = vents[vent.rowIdx][vent.colIdx-1]
        if (left.n < 9)
            bfs(left, basin)
    }
    // Check right
    if (vent.colIdx < width - 1) {
        const right = vents[vent.rowIdx][vent.colIdx+1]
        if (right.n < 9)
            bfs(right, basin)
    }
    // Check up
    if (vent.rowIdx > 0) {
        const up = vents[vent.rowIdx-1][vent.colIdx]
        if (up.n < 9)
            bfs(up, basin)
    }
    // Check down
    if (vent.rowIdx < height - 1) {
        const down = vents[vent.rowIdx+1][vent.colIdx]
        if (down.n < 9)
            bfs(down, basin)
    }
    return basin
}

const basinsFiltered = basins.filter(basin => basin.length > 0)
const basinLengths = basinsFiltered.map(basin => {return basin.length})
basinLengths.sort(function(a, b){return b-a})
console.log(basinLengths[0] * basinLengths[1] * basinLengths[2])


