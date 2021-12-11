'use strict';
const fs = require('fs');
const { toNamespacedPath } = require('path/posix');
const { exit } = require('process')

const inputText = fs.readFileSync('./input.txt',  {encoding:'utf8'})
const inputLines = inputText.split('\n')
const syntaxErrors = []
const completedLines = []

const pointMapping = new Map()
pointMapping.set(')', 3)
pointMapping.set(']', 57)
pointMapping.set('}', 1197)
pointMapping.set('>', 25137)

const pointMappingPart2 = new Map()
pointMappingPart2.set(')', 1)
pointMappingPart2.set(']', 2)
pointMappingPart2.set('}', 3)
pointMappingPart2.set('>', 4)


inputLines.forEach(line => {
    const stack = []
    const completionLine = []
    let canSkipLine = false
    for (const c of line) {
        if (canSkipLine) {
            break
        }
        switch (c) {
            case '(':
                stack.push(c)
                break
            case '[':
                stack.push(c)
                break
            case '{':
                stack.push(c)
                break
            case '<':
                stack.push(c)
                break
            case ')':
                if (stack.pop() !== '(') {
                    canSkipLine = true
                    syntaxErrors.push(c)
                }
                break
            case ']':
                if (stack.pop() !== '[') {
                    canSkipLine = true
                    syntaxErrors.push(c)
                }
                break
            case '}':
                if (stack.pop() !== '{') {
                    canSkipLine = true
                    syntaxErrors.push(c)
                }
                break
            case '>':
                if (stack.pop() !== '<') {
                    canSkipLine = true
                    syntaxErrors.push(c)
                }
                break
        }
    }
    if (!canSkipLine) {
        for (const c of stack) {
            switch (c) {
                case '(':
                    completionLine.unshift(')')
                    break
                case '[':
                    completionLine.unshift(']')
                    break
                case '{':
                    completionLine.unshift('}')
                    break
                case '<':
                    completionLine.unshift('>')
                    break
            }
        }
        completedLines.push(completionLine)
    }
})

let total = 0
syntaxErrors.forEach(c => {
    total += pointMapping.get(c)
})
console.log(total)

let totalsArr = []
completedLines.forEach(line => {
    let lineTotal = 0
    for (const c of line) {
        lineTotal *= 5
        lineTotal += pointMappingPart2.get(c)    
    }
    totalsArr.push(lineTotal)
})
totalsArr.sort(function(a, b){return a-b})
console.log(totalsArr[Math.floor(totalsArr.length / 2)])