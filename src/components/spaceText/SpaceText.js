import { useEffect, useRef, useState } from "react";
import "./SpaceText.css"
import "./Stars.css"
import { makeStars } from "../functions/stars.js"
import { lightUpStars } from "../functions/stars.js"

export const SpaceText = () => {

    /* 1 */ const textView1 = useRef(null)
    /* 2 */ const textView2 = useRef(null)
    /* 3 */ const textView3 = useRef(null)
    /* 4 */ const textView4 = useRef(null)
    /* 5 */ const textView5 = useRef(null)

    const scrollTo = (view) => {
        view.current.scrollIntoView({ behavior: 'smooth' })
        // for (const star of stars) {
        //     star.top -= 15
        //     document.getElementById(`star-${star.id}`).style.top = `${(star.top)}vh`
        // }
    }

    // const scrollUp = (view) => {
    //     view.current.scrollIntoView({ behavior: 'smooth' })
    //     for (const star of stars) {
    //         star.top += 15
    //         document.getElementById(`star-${star.id}`).style.top = `${(star.top)}vh`
    //     }
    // }

    const starCount = 500

    /* 6 */ const [textViews, setTextViews] = useState([
        {
            viewNum: 1,
            text: "hi.",
            textArray: ['h', 'i', '.'],
            foundChars: []
        },
        {
            viewNum: 2,
            text: "welcome.",
            textArray: ['w', 'e', 'l', 'c', 'o', 'm', 'e', '.'],
            foundChars: []
        },
        {
            viewNum: 3,
            text: "few text. big space.",
            textArray: ['f', 'e', 'w', ' ', 't', 'e', 'x', 't', '.', ' ', 'b', 'i', 'g', ' ', 's', 'p', 'a', 'c', 'e', '.'],
            foundChars: []
        },
        {
            viewNum: 4,
            text: "There isn't much to see on this site.",
            textArray: ['T', 'h', 'e', 'r', 'e', ' ', 'i', 's', 'n', "'", 't', ' ', 'm', 'u', 'c', 'h', ' ', 't', 'o', ' ', 's', 'e', 'e', ' ', 'o', 'n', ' ', 't', 'h', 'i', 's', ' ', 's', 'i', 't', 'e', '.'],
            foundChars: []
        },
        {
            viewNum: 5,
            text: "But you can learn a bit about me.",
            textArray: ['B', 'u', 't', ' ', 'y', 'o', 'u', ' ', 'c', 'a', 'n', ' ', 'l', 'e', 'a', 'r', 'n', ' ', 'a', ' ', 'b', 'i', 't', ' ', 'a', 'b', 'o', 'u', 't', ' ', 'm', 'e', '.'],
            foundChars: []
        }
    ])
    /* 7 */ const [totalCharCount, setTotalCharCount] = useState(0)
    /* 8 */ const [stars, setStars] = useState([])
    const viewsToStarsRatio = Math.floor(stars.length / textViews.length)
    /* 9 */ const [score, setScore] = useState(0)

    const getTotalCharCount = () => {
        let charCount = 0
        for (const view of textViews) {
            charCount += view.textArray.length
        }
        setTotalCharCount(charCount)
    }

    useEffect(
        () => {
            setScore(0)
            setStars(makeStars(starCount))
            getTotalCharCount()
        },
        []
    )

    const charGrow = (viewNum, charIndex) => {
        document.getElementById(`char-${viewNum}-${charIndex}`).classList.add("grow")
        setTimeout(charShrink, 150, viewNum, charIndex)
    }

    const charShrink = (viewNum, charIndex) => {
        document.getElementById(`char-${viewNum}-${charIndex}`).classList.remove("grow")
    }

    const charCompleteAnimation = (viewNum, viewIndex) => {
        let timeDelay = 500
        const charIndexes = textViews[viewIndex].foundChars.sort((a,b) => a-b)
        for (const index of charIndexes) {
            setTimeout(charGrow, timeDelay, viewNum, index)
            timeDelay += 50
        }
    }

    const viewComplete = (viewButtonId) => {
        document.getElementById(viewButtonId).classList.add("view-complete")
    }

    const allViewsComplete = () => {
        for (const view of textViews) {
            document.getElementById(`view-button-${view.viewNum}`).classList.add("all-complete")
        }
    }

    const charComplete = (viewNum, viewIndex) => {
        setTimeout(viewComplete, 500, `view-button-${viewNum}`)
        charCompleteAnimation(viewNum, viewIndex)
        lightUpStars(viewNum, viewsToStarsRatio)
        if (score === totalCharCount) {
            document.getElementById('score').classList.add("complete")
            allViewsComplete()
        }
    }

    const addCharIndex = (viewIndex, index) => {
        const foundCharIndex = textViews[viewIndex].foundChars.find(i => i == index)
        if (foundCharIndex === undefined) {
            const copyArray = textViews
            copyArray[viewIndex].foundChars.push(index)
            setTextViews(copyArray)
            setScore(score + 1)
        }
    }

    useEffect(
        () => {
            let currentScore = 0
            for (let i = 0; i < textViews.length; i++) {
                const currentView = textViews[i]
                currentScore += currentView.foundChars.length
                if (currentView.foundChars.length === currentView.textArray.length) {
                    charComplete(currentView.viewNum, i)
                }
            }
            setScore(currentScore)
        },
        [score]
    )

  
    return <div id="text-view-container" className="text-view-container">
        
        <section id="text-view-1" className="text-view" ref={textView1}>
            <p className="text">
                {
                    textViews[0].textArray.map((char, index) => {
                        return <span
                            key={`char-1-${index}`}
                            id={`char-1-${index}`}
                            className="char"
                            onMouseOver={() => {{
                                document.getElementById(`char-1-${index}`).classList.add("bright")}
                                addCharIndex(0, index)
                            }}>
                            {char}
                        </span>
                    })
                }
            </p>
        </section>

        <section id="text-view-2" className="text-view" ref={textView2}>
            <p className="text">
                {
                    textViews[1].textArray.map((char, index) => {
                        return <span
                            key={`char-2-${index}`}
                            id={`char-2-${index}`}
                            className="char"
                            onMouseOver={() => {{
                                document.getElementById(`char-2-${index}`).classList.add("bright")}
                                addCharIndex(1, index)
                            }}>
                            {char}
                        </span>
                    })
                }
            </p>
        </section>

        <section id="text-view-3" className="text-view" ref={textView3}>
            <p className="text">
                {
                    textViews[2].textArray.map((char, index) => {
                        return <span
                            key={`char-3-${index}`}
                            id={`char-3-${index}`}
                            className="char"
                            onMouseOver={() => {{
                                document.getElementById(`char-3-${index}`).classList.add("bright")}
                                addCharIndex(2, index)
                            }}>
                            {char}
                        </span>
                    })
                }
            </p>
        </section>

        <section id="text-view-4" className="text-view" ref={textView4}>
            <p className="text">
                {
                    textViews[3].textArray.map((char, index) => {
                        return <span
                            key={`char-4-${index}`}
                            id={`char-4-${index}`}
                            className="char"
                            onMouseOver={() => {{
                                document.getElementById(`char-4-${index}`).classList.add("bright")}
                                addCharIndex(3, index)
                            }}>
                            {char}
                        </span>
                    })
                }
            </p>
        </section>

        <section id="text-view-5" className="text-view" ref={textView5}>
            <p className="text">
                {
                    textViews[4].textArray.map((char, index) => {
                        return <span
                            key={`char-5-${index}`}
                            id={`char-5-${index}`}
                            className="char"
                            onMouseOver={() => {{
                                document.getElementById(`char-5-${index}`).classList.add("bright")}
                                addCharIndex(4, index)
                            }}>
                            {char}
                        </span>
                    })
                }
            </p>
        </section>

        <ul id="view-button-container" className="view-button-container">
            <li id="view-button-1" className="view-button" onClick={() => {scrollTo(textView1)}}>1</li>
            <li id="view-button-2" className="view-button" onClick={() => {scrollTo(textView2)}}>2</li>
            <li id="view-button-3" className="view-button" onClick={() => {scrollTo(textView3)}}>3</li>
            <li id="view-button-4" className="view-button" onClick={() => {scrollTo(textView4)}}>4</li>
            <li id="view-button-5" className="view-button" onClick={() => {scrollTo(textView5)}}>5</li>
        </ul>

        <span className="score" id="score">{score}</span>

        {
            stars.map(star => {
                return <span
                    style={{
                        left: `${star.left}vw`,
                        top: `${star.top}vh`,
                        width: `${star.size}px`,
                        height: `${star.size}px`
                    }}
                    key={`star-${star.id}`}
                    id={`star-${star.id}`}
                    className={`star ${star.twinkleClass}`}
                ></span>
            })
        }
    </div>
}