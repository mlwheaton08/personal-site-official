export const makeStars = (starCount) => {
    const array = []
    let twinkleClassCounter = 1

    for (let n = 1; n <= starCount; n++) {
        const randomXPosition = Math.floor((Math.random() * 98) + 1)
        let randomYPosition = Math.floor((Math.random() * 200))
        randomYPosition *= Math.round(Math.random()) ? 1 : -1
        const randomSize = Math.floor((Math.random() * 4) + 1)

        const newStar = {
            id: n,
            left: randomXPosition,
            top: randomYPosition,
            size: randomSize,
            twinkleClass: ""
        }

        const numRemainder = n % 3
        if (numRemainder === 0) {
            newStar.twinkleClass = `twinkle-${twinkleClassCounter}`
            if (twinkleClassCounter < 8) {
                twinkleClassCounter += 1
            } else {
                twinkleClassCounter = 1
            }
        }

        array.push(newStar)
    }
    return array
}

export const starBgColors = [
    "rgb(255, 34, 34)", //red
    "rgb(255, 136, 81)", //orange
    "rgb(255, 233, 39)", //yellow
    "rgb(81, 255, 81)", //green
    "rgb(81, 255, 246)", //blue
    "rgb(160, 119, 255)", //purple
    "rgb(253, 114, 218)", //pink
    "rgb(255, 255, 255)", //white
    "rgb(255, 255, 255)" //white
]

const getRandomIndex = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

const changeStarColor = (starId) => {
    document.getElementById(starId).style.background = getRandomIndex(starBgColors)
}

export const lightUpStars = (viewNum, viewsToStarsRatio) => {
    let timeDelay = 600
    const firstNum = (viewNum * viewsToStarsRatio) - (viewsToStarsRatio - 1)
    const lastNum = viewNum * viewsToStarsRatio
    for (let n = firstNum; n <= lastNum; n++) {
        setTimeout(changeStarColor, timeDelay, `star-${n}`)
        timeDelay += 30
    }
}