// import { useState } from "react"
// import { clsx } from "clsx"
// import { languages } from "./languages"
// import { getFarewellText, getRandomWord } from "./utils"
// import Confetti from "react-confetti"
// //import "./game2.css"
// import { useNavigate } from "react-router-dom"


// export default function AssemblyEndgame() {
//     // State now holds both the question and answer from getRandomWord()
//     const [currentQnA, setCurrentQnA] = useState(() => getRandomWord())
//     const [guessedLetters, setGuessedLetters] = useState([])

//     // Destructure the state into clear variables for question and answer
//     const [question, answer] = currentQnA

//     // All logic is now updated to use 'answer' instead of 'currentWord'
//     const numGuessesLeft = languages.length - 1
//     const wrongGuessCount =
//         guessedLetters.filter(letter => !answer.includes(letter)).length
//     const isGameWon =
//         answer.split("").every(letter => guessedLetters.includes(letter))
//     const isGameLost = wrongGuessCount >= numGuessesLeft
//     const isGameOver = isGameWon || isGameLost
//     const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
//     const isLastGuessIncorrect = lastGuessedLetter && !answer.includes(lastGuessedLetter)

//     // Static values
//     const alphabet = "abcdefghijklmnopqrstuvwxyz"

//     // --- FUNCTIONS ---
//     function addGuessedLetter(letter) {
//         setGuessedLetters(prevLetters =>
//             prevLetters.includes(letter) ?
//                 prevLetters :
//                 [...prevLetters, letter]
//         )
//     }

//     function startNewGame() {
//         setCurrentQnA(getRandomWord())
//         setGuessedLetters([])
//     }

//     // --- JSX ELEMENTS ---
//     const languageElements = languages.map((lang, index) => {
//         const isLanguageLost = index < wrongGuessCount
//         const styles = {
//             backgroundColor: lang.backgroundColor,
//             color: lang.color
//         }
//         const className = clsx("chip", isLanguageLost && "lost")
//         return (
//             <span
//                 className={className}
//                 style={styles}
//                 key={lang.name}
//             >
//                 {lang.name}
//             </span>
//         )
//     })

//     const letterElements = answer.split("").map((letter, index) => {
//         const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
//         const letterClassName = clsx(
//             isGameLost && !guessedLetters.includes(letter) && "missed-letter"
//         )
//         return (
//             <span key={index} className={letterClassName}>
//                 {shouldRevealLetter ? letter.toUpperCase() : ""}
//             </span>
//         )
//     })

//     const keyboardElements = alphabet.split("").map(letter => {
//         const isGuessed = guessedLetters.includes(letter)
//         const isCorrect = isGuessed && answer.includes(letter)
//         const isWrong = isGuessed && !answer.includes(letter)
//         const className = clsx({
//             correct: isCorrect,
//             wrong: isWrong
//         })

//         return (
//             <button
//                 className={className}
//                 key={letter}
//                 disabled={isGameOver}
//                 aria-disabled={guessedLetters.includes(letter)}
//                 aria-label={`Letter ${letter}`}
//                 onClick={() => addGuessedLetter(letter)}
//             >
//                 {letter.toUpperCase()}
//             </button>
//         )
//     })

//     const gameStatusClass = clsx("game-status", {
//         won: isGameWon,
//         lost: isGameLost,
//         farewell: !isGameOver && isLastGuessIncorrect
//     })

//     function renderGameStatus() {
//         if (!isGameOver && isLastGuessIncorrect) {
//             return (
//                 <p className="farewell-message">
//                     {getFarewellText(languages[wrongGuessCount - 1].name)}
//                 </p>
//             )
//         }

//         if (isGameWon) {
//             return (
//                 <>
//                     <h2>You win!</h2>
//                     <p>Well done! 🎉</p>
//                 </>
//             )
//         }
//         if (isGameLost) {
//             return (
//                 <>
//                     <h2>Game over!</h2>
//                     <p>You lose! Better start learning Assembly 😭</p>
//                 </>
//             )
//         }

//         return null
//     }

//     return (
//         <main>
//             {
//                 isGameWon &&
//                 <Confetti
//                     recycle={false}
//                     numberOfPieces={1000}
//                 />
//             }
//             <header>
//                 <h1>Assembly: Endgame</h1>
//                 <p>Guess the word within 8 attempts to keep the
//                     world safe from Assembly!</p>
//             </header>

//             <section
//                 aria-live="polite"
//                 role="status"
//                 className={gameStatusClass}
//             >
//                 {renderGameStatus()}
//             </section>

//             <section className="language-chips">
//                 {languageElements}
//             </section>

//             <section className="question-display">
//                 <h2>{question}</h2>
//             </section>

//             <section className="word">
//                 {letterElements}
//             </section>

//             <section
//                 className="sr-only"
//                 aria-live="polite"
//                 role="status"
//             >
//                 <p>
//                     {answer.includes(lastGuessedLetter) ?
//                         `Correct! The letter ${lastGuessedLetter} is in the word.` :
//                         `Sorry, the letter ${lastGuessedLetter} is not in the word.`
//                     }
//                     You have {numGuessesLeft} attempts left.
//                 </p>
//                 <p>Current word: {answer.split("").map(letter =>
//                     guessedLetters.includes(letter) ? letter + "." : "blank.")
//                     .join(" ")}</p>

//             </section>

//             <section className="keyboard">
//                 {keyboardElements}
//             </section>

//             {isGameOver &&
//                 <button
//                     className="new-game"
//                     onClick={startNewGame}
//                 >New Game</button>}
//         </main>
//     )
// }

import { useState } from "react"
import { clsx } from "clsx"
import { languages } from "./languages"
import { getFarewellText, getRandomWord } from "./utils"
import Confetti from "react-confetti"
import styles from "./GameTwo.module.css" // CSS Modules import
import { useNavigate } from "react-router-dom"


export default function AssemblyEndgame() {
    // State now holds both the question and answer from getRandomWord()
    const [currentQnA, setCurrentQnA] = useState(() => getRandomWord())
    const [guessedLetters, setGuessedLetters] = useState([])

    // Destructure the state into clear variables for question and answer
    const [question, answer] = currentQnA

    // All logic is now updated to use 'answer' instead of 'currentWord'
    const numGuessesLeft = languages.length - 1
    const wrongGuessCount =
        guessedLetters.filter(letter => !answer.includes(letter)).length
    const isGameWon =
        answer.split("").every(letter => guessedLetters.includes(letter))
    const isGameLost = wrongGuessCount >= numGuessesLeft
    const isGameOver = isGameWon || isGameLost
    const lastGuessedLetter = guessedLetters[guessedLetters.length - 1]
    const isLastGuessIncorrect = lastGuessedLetter && !answer.includes(lastGuessedLetter)
    const navigate = useNavigate()

    // Static values
    const alphabet = "abcdefghijklmnopqrstuvwxyz"

    // --- FUNCTIONS ---
    function addGuessedLetter(letter) {
        setGuessedLetters(prevLetters =>
            prevLetters.includes(letter) ?
                prevLetters :
                [...prevLetters, letter]
        )
    }

    function startNewGame() {
        setCurrentQnA(getRandomWord())
        setGuessedLetters([])
    }

    // --- JSX ELEMENTS ---
    const languageElements = languages.map((lang, index) => {
        const isLanguageLost = index < wrongGuessCount
        const inlineStyles = {
            backgroundColor: lang.backgroundColor,
            color: lang.color
        }
        const className = clsx(styles.chip, isLanguageLost && styles.lost)
        return (
            <span
                className={className}
                style={inlineStyles}
                key={lang.name}
            >
                {lang.name}
            </span>
        )
    })

    const letterElements = answer.split("").map((letter, index) => {
        const shouldRevealLetter = isGameLost || guessedLetters.includes(letter)
        const letterClassName = clsx(
            isGameLost && !guessedLetters.includes(letter) && styles['missed-letter']
        )
        return (
            <span key={index} className={letterClassName}>
                {shouldRevealLetter ? letter.toUpperCase() : ""}
            </span>
        )
    })

    const keyboardElements = alphabet.split("").map(letter => {
        const isGuessed = guessedLetters.includes(letter)
        const isCorrect = isGuessed && answer.includes(letter)
        const isWrong = isGuessed && !answer.includes(letter)
        const className = clsx({
            [styles.correct]: isCorrect,
            [styles.wrong]: isWrong
        })

        return (
            <button
                className={className}
                key={letter}
                disabled={isGameOver}
                aria-disabled={guessedLetters.includes(letter)}
                aria-label={`Letter ${letter}`}
                onClick={() => addGuessedLetter(letter)}
            >
                {letter.toUpperCase()}
            </button>
        )
    })

    const gameStatusClass = clsx(styles['game-status'], {
        [styles.won]: isGameWon,
        [styles.lost]: isGameLost,
        [styles.farewell]: !isGameOver && isLastGuessIncorrect
    })

    function renderGameStatus() {
        if (!isGameOver && isLastGuessIncorrect) {
            return (
                <p className={styles['farewell-message']}>
                    {getFarewellText(languages[wrongGuessCount - 1].name)}
                </p>
            )
        }

        if (isGameWon) {
            return (
                <>
                    <h2>You win!</h2>
                    <p>Well done! 🎉</p>
                </>
            )
        }
        if (isGameLost) {
            return (
                <>
                    <h2>Game over!</h2>
                    <p>You lose! Better start learning Assembly 😭</p>
                </>
            )
        }

        return null
    }

    return (
        <div className={styles.gameWrapper}>
            {
                isGameWon &&
                <Confetti
                    recycle={false}
                    numberOfPieces={1000}
                />
            }
            <main>
                <header>
                    <h1>Assembly: Endgame</h1>
                    <p>Guess the word within 8 attempts to keep the
                        world safe from Assembly!</p>
                </header>

                <section
                    aria-live="polite"
                    role="status"
                    className={gameStatusClass}
                >
                    {renderGameStatus()}
                </section>

                <section className={styles['language-chips']}>
                    {languageElements}
                </section>

                <section className={styles['question-display']}>
                    <h2>{question}</h2>
                </section>

                <section className={styles.word}>
                    {letterElements}
                </section>

                <section
                    className={styles['sr-only']}
                    aria-live="polite"
                    role="status"
                >
                    <p>
                        {answer.includes(lastGuessedLetter) ?
                            `Correct! The letter ${lastGuessedLetter} is in the word.` :
                            `Sorry, the letter ${lastGuessedLetter} is not in the word.`
                        }
                        You have {numGuessesLeft} attempts left.
                    </p>
                    <p>Current word: {answer.split("").map(letter =>
                        guessedLetters.includes(letter) ? letter + "." : "blank.")
                        .join(" ")}</p>

                </section>

                <section className={styles.keyboard}>
                    {keyboardElements}
                </section>

                {isGameOver &&
                    <div className={styles.endGameActions}>
                        <button
                            className={styles['new-game']}
                            onClick={startNewGame}
                        >
                            New Game
                        </button>
                        <button
                            className={`${styles['new-game']} ${styles['secondary-button']}`}
                            onClick={() => navigate('/')}
                        >
                            Return to Home
                        </button>
                    </div>
                }
            </main>
        </div>
    )
}