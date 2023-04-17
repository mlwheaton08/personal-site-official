import { useEffect, useState } from "react";
import "./TextViews.css"
import { useNavigate } from "react-router-dom";
import click1 from "../../audio/joystick-1.mp3"
import click2 from "../../audio/joystick-2.mp3"
import click3 from "../../audio/mouse-2.mp3"
import twinkle1 from "../../audio/twinkle-G1.mp3"
import twinkle2 from "../../audio/twinkle-B.mp3"
import twinkle3 from "../../audio/twinkle-C.mp3"
import twinkle4 from "../../audio/twinkle-E.mp3"
import twinkle5 from "../../audio/twinkle-G2.mp3"

export const View1 = () => {
    const navigate = useNavigate()

    const text = "hi."
    const textArray = text.split("")
    const starCount = 7 // represents how many I want on page. can change this number to render more on page
    const charClicks = [click1, click2, click3]
    const starTwinkles = [twinkle1, twinkle2, twinkle3, twinkle4, twinkle5]
    const starBgColors = [
        "rgb(255, 34, 34)", //red
        "rgb(255, 136, 81)", //orange
        "rgb(255, 233, 39)", //yellow
        "rgb(81, 255, 81)", //green
        "rgb(81, 255, 246)", //blue
        "rgb(160, 119, 255)", //purple
        "rgb(253, 114, 218)", //pink
        "rgb(255, 255, 255)" //white
    ]

    const [foundCharIndexes, setFoundCharIndexes] = useState([])
    const [score, setScore] = useState(0)
    const [starTally, setStarTally] = useState(1)
    const [stars, setStars] = useState([])


    const addCharIndex = (index) => {
        const foundCharIndex = foundCharIndexes.find(i => i == index)
        if (foundCharIndex === undefined) {
            const copyArray = foundCharIndexes
            copyArray.push(index)
            setFoundCharIndexes(copyArray)
            setScore(score + 1)
        }
    }

    const charComplete = () => {
        if (score === textArray.length) {
            document.getElementById('score-1').classList.add("complete")
            lightUpStars()
        }
    }

    const renderNewStar = () => {
        if (starTally <= starCount) {
            setStarTally(starTally + 1)
            const copyArray = stars
            copyArray.push(starTally)
            setStars(copyArray)
        }
    }

    useEffect(
        () => {
            // if (stars.length > 0 && stars.length < starCount) {
            // }
            setTimeout(renderNewStar, 400)
        },
        [starTally]
    )

    const starBright = (starId) => {
        document.getElementById(starId).style.background = getRandomStarBgColor()
        playRandomTwinkle()
        document.getElementById(starId).classList.add("bright")
    }

    const lightUpStars = () => {
        let timeDelay = 600
        for (let n = 1; n <= starCount; n++) {
            setTimeout(starBright, timeDelay, `star-1-${n}`)
            timeDelay += 300
        }
    }

    useEffect(
        () => {
            charComplete()
        },
        [score]
    )

    const playRandomCharClick = () => {
        const randomIndex = Math.floor(Math.random() * charClicks.length)
        const randomClick = new Audio(charClicks[randomIndex])
        randomClick.play()
    }

    const playRandomTwinkle = () => {
        const randomIndex = Math.floor(Math.random() * starTwinkles.length)
        const randomClick = new Audio(starTwinkles[randomIndex])
        randomClick.play()
    }

    const getRandomStarBgColor = () => {
        const randomIndex = Math.floor(Math.random() * starBgColors.length)
        return starBgColors[randomIndex]
    }

  
    return <div id="view1" className="text-view">
        <p>
            {
                textArray.map((char, index) => {
                    return <span
                        key={`char-1-${index}`}
                        id={`char-1-${index}`}
                        className="char"
                        onMouseOver={() => {{
                            document.getElementById(`char-1-${index}`).classList.add("bright")}
                            addCharIndex(index)
                            playRandomCharClick()
                        }}>
                        {char}
                    </span>
                })
            }
        </p>

        <svg className="page down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => navigate("/2")}>
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg>

        <span className="score" id="score-1">{score}/{textArray.length}</span>

        {
            stars.map(star => {
                return <span
                    key={`star-1-${star}`}
                    id={`star-1-${star}`}
                    className="star"
                ></span>
            })
        }

        {/* <span id="star-1-1" className="star"></span>
        <span id="star-1-2" className="star"></span>
        <span id="star-1-3" className="star"></span>
        <span id="star-1-4" className="star"></span>
        <span id="star-1-5" className="star"></span>
        <span id="star-1-6" className="star"></span>
        <span id="star-1-7" className="star"></span> */}
    </div>
  }