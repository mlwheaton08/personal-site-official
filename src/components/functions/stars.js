export const makeStars = (starCount) => {
    const array = []
    for (let n = 1; n <= starCount; n++) {
        const randomXPosition = Math.floor((Math.random() * 98) + 1)
        const randomYPosition = Math.floor((Math.random() * 98) + 1)
        const randomSize = Math.floor((Math.random() * 3) + 1)
        array.push({
            id: n,
            left: randomXPosition,
            top: randomYPosition,
            size: randomSize
        })
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
    "rgb(255, 255, 255)" //white
]

const getRandomIndex = (array) => {
    const randomIndex = Math.floor(Math.random() * array.length)
    return array[randomIndex]
}

const starBright = (starId) => {
    document.getElementById(starId).style.background = getRandomIndex(starBgColors)
    document.getElementById(starId).classList.add("bright")
}

export const lightUpStars = (starCount, viewNum) => {
    let timeDelay = 600
    for (let n = 1; n <= starCount; n++) {
        setTimeout(starBright, timeDelay, `star-${viewNum}-${n}`)
        timeDelay += 30
    }
}