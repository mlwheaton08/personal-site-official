import { useEffect, useState } from "react";
import "./TextView.css"
import { useNavigate } from "react-router-dom";
import { makeStars } from "../functions/stars.js"
import { lightUpStars } from "../functions/stars.js"

export const TextView = ({ viewNum, viewsCount, text, starCount }) => {
    const navigate = useNavigate()

    const textArray = text.split("")
    const [foundCharIndexes, setFoundCharIndexes] = useState([])
    const [score, setScore] = useState(0)

    const [stars, setStars] = useState([])

    useEffect(
        () => {
            setFoundCharIndexes([])
            setScore(0)
            setStars(makeStars(starCount))
        },
        [viewNum]
    )

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
        if (foundCharIndexes.length === textArray.length) {
            setScore(foundCharIndexes.length) //this is a safeguard. score messed up on me once, so checking/setting the charindex array length is more reliable
            document.getElementById(`score-${viewNum}`).classList.add("complete")
            lightUpStars(starCount, viewNum)
        }
    }

    useEffect(
        () => {
            charComplete()
        },
        [score]
    )

    // const playRandomCharClick = () => {
    //     const randomIndex = Math.floor(Math.random() * charClicks.length)
    //     const randomClick = new Audio(charClicks[randomIndex])
    //     randomClick.play()
    // }

  
    return <div id={`view${viewNum}`} className="text-view">
        {
            viewNum === 1
                ? ""
                : <svg
                    className="page previous"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 512 512"
                    onClick={() => {
                        if (viewNum === 2) {
                            navigate("/")
                        } else {
                            navigate(`/${viewNum - 1}`)
                        }
                    }}
                >
                    <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
                </svg>
        }

        <p>
            {
                textArray.map((char, index) => {
                    return <span
                        key={`char-${viewNum}-${index}`}
                        id={`char-${viewNum}-${index}`}
                        className="char"
                        onMouseOver={() => {{
                            document.getElementById(`char-${viewNum}-${index}`).classList.add("bright")}
                            addCharIndex(index)
                        }}>
                        {char}
                    </span>
                })
            }
        </p>

        <svg
            className="page next"
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 512 512"
            onClick={() => {
                if (viewNum < viewsCount) {
                    navigate(`/${viewNum + 1}`)
                } else {
                    navigate("/musical_background")
                }
            }}
        >
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg>

        <span className="score" id={`score-${viewNum}`}>{score}/{textArray.length}</span>

        {
            stars.map(star => {
                return <span
                    style={{
                        left: `${star.left}vw`,
                        top: `${star.top}vh`,
                        width: `${star.size}px`,
                        height: `${star.size}px`
                    }}
                    key={`star-${viewNum}-${star.id}`}
                    id={`star-${viewNum}-${star.id}`}
                    className="star"
                ></span>
            })
        }
    </div>
  }