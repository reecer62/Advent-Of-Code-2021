'use strict';
const fs = require('fs')
const { exit } = require('process')

class Board {
    constructor(rows) {
        this.rows = rows
    }
    getSumUnmarked() {
        let sumUnmarked = 0
        for (const rowTiles of this.rows) {
            for (const tile of rowTiles) {
                if (tile.marked === false) {
                    sumUnmarked += tile.n
                }
            }
        }
        return sumUnmarked
    }
    markTile(number) {
        for (const rowTiles of this.rows) {
            for (const tile of rowTiles) {
                if (tile.n === number) {
                    tile.marked = true
                }
            }
        }
    }
    hasWon() {
        // Horizontal bingo
        for (const row of this.rows) {
            let hasWon = true
            for (let i = 0; i < 5; i++) {
                if (row[i].marked === false) {
                    hasWon = false
                }
            }
            if (hasWon) {
                return true
            }
        }

        // Vertical bingo
        for (let i = 0; i < 5; i++) {
            let hasWon = true
            for (let j = 0; j < 5; j++) {
                if (this.rows[j][i].marked === false) {
                    hasWon = false
                }
            }
            if (hasWon) {
                return true
            }
        }
        return false
    }
}

function createBoard (boardInput) {
    const rows = boardInput.split('\n')
    const boardRows = []
    for (const row of rows) {
        const nums = row.split(/\s+/).filter(numStr => numStr !== '').map(Number)
        const tiles = getTileRowObjs(nums)
        boardRows.push(tiles)
    }
    return new Board(boardRows)
}

function getTileRowObjs (nums) {
    const tileObjArr = []
    for (const num of nums) {
        tileObjArr.push({n: num, marked: false})
    }
    return tileObjArr
}

const inputText = fs.readFileSync('./input.txt',  {encoding:'utf8'})
const inputArr = inputText.split('\n\n')
const drawings = inputArr.shift().split(',').map(Number)
const boards = inputArr.map(createBoard)

const winningBoards = []
const winningNums  = []
while (drawings.length !== 0) {
    const drawing = drawings.shift()
    for (const board of boards) {
        if (winningBoards.indexOf(board) === -1) {
            board.markTile(drawing)
            if (board.hasWon()) {
                winningBoards.push(board)
                winningNums.push(drawing)

            }                
        }
    }
}

console.log(JSON.stringify(winningBoards[winningBoards.length-1]))
console.log(winningBoards[winningBoards.length-1].getSumUnmarked() * winningNums[winningBoards.length-1])
