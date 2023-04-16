import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import "./TextViews.css"

export const View3 = () => {
    const navigate = useNavigate()

    const text = "few text. much space."
    const textArray = text.split("")
    const textArrayLength = textArray.length

    const [foundCharIndexes, setFoundCharIndexes] = useState([])
    const [score, setScore] = useState(0)
    const [charComplete, setCharComplete] = useState(false)

    const addIndex = (index) => {
        const copyArray = foundCharIndexes
        const foundCharIndex = copyArray.find(i => i == index)
        if (foundCharIndex === undefined) {
            copyArray.push(index)
            setFoundCharIndexes(copyArray)
            setScore(score + 1)
        }
    }

    useEffect(
        () => {
            if (score === textArrayLength) {
                setCharComplete(true)
            }
        },
        [score]
    )

    const isCharComplete = () => {
        if (charComplete) {
            return " complete"
        } else {
            return ""
        }
    }
  
    return <div id="view3" className="text-view">
        <svg className="page up" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => navigate("/2")}>
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg>

        <p>
            {
                textArray.map((char, index) => {
                    return <span
                        key={`3-char-${index}`}
                        id={`3-char-${index}`}
                        className="char"
                        onMouseOver={() => {{
                            document.getElementById(`3-char-${index}`).classList.add("bright")}
                            addIndex(index)
                        }}>
                        {char}
                    </span>
                })
            }
        </p>

        <svg className="page down" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 512 512" onClick={() => navigate("/4")}>
            <path d="M233.4 406.6c12.5 12.5 32.8 12.5 45.3 0l192-192c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L256 338.7 86.6 169.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l192 192z"/>
        </svg>

        <span className={`score${isCharComplete()}`} id="3-score">{score}/{textArrayLength}</span>
    </div>
  }