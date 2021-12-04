const fs = require('fs')

const inputText = fs.readFileSync('./input',  {encoding:'utf8'})
const inputArr = inputText.split('\n')

function day3 (input) {
    const oxyRating = getOxygenRating(input)
    const scrubRating = getScrubberRating(input)
    return parseInt(oxyRating, 2) * parseInt(scrubRating, 2)
}

function getOxygenRating (inputArr, idx = 0) {
    if (inputArr.length === 1) {
        return inputArr[0]
    }
    const bitCountOnes = inputArr.reduce((acc, binNum) => {
        acc += parseInt(binNum[idx])
        return acc
    }, 0)
    const commonNum = +(bitCountOnes >= inputArr.length / 2)
    const binNumsFiltered = inputArr.filter(binNum => binNum[idx] == commonNum)
    return getOxygenRating(binNumsFiltered, idx + 1)
}

function getScrubberRating (inputArr, idx = 0) {
    if (inputArr.length === 1) {
        return inputArr[0]
    }
    const bitCountOnes = inputArr.reduce((acc, binNum) => {
        acc += parseInt(binNum[idx])
        return acc
    }, 0)
    const uncommonNum = 1 - +(bitCountOnes >= inputArr.length / 2)
    const binNumsFiltered = inputArr.filter(binNum => binNum[idx] == uncommonNum)
    return getScrubberRating(binNumsFiltered, idx + 1)
}

console.log(day3(inputArr))