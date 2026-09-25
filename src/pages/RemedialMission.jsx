import { useState } from 'react'
import { AnimatePresence, motion } from 'framer-motion'

function RemedialMission() {
  const questions = [
    { left: 7, right: 4 },
    { left: 2, right: 6 },
    { left: 9, right: 3 },
  ]

  const [questionIndex, setQuestionIndex] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [score, setScore] = useState(0)
  const [mistakes, setMistakes] = useState(0)
  const [hp, setHp] = useState(3)
  const [combo, setCombo] = useState(0)
  const [xp, setXp] = useState(0)
  const [completed, setCompleted] = useState(false)

  const currentQuestion = questions[questionIndex]

  const level = Math.floor(xp / 50) + 1
  const xpInCurrentLevel = xp % 50

  function restartRemedial() {
    setQuestionIndex(0)
    setFeedback('')
    setScore(0)
    setMistakes(0)
    setHp(3)
    setCombo(0)
    setXp(0)
    setCompleted(false)
  }

  function handleAnswer(answer) {
    const shouldSwap = currentQuestion.left > currentQuestion.right
    const correctAnswer = shouldSwap ? 'swap' : 'no-swap'

    if (answer === correctAnswer) {
      const newScore = score + 1

      setScore(newScore)

      setXp((currentXp) => {
        const earnedXp = 10 + combo * 5
        return currentXp + earnedXp
      })

      setCombo((currentCombo) => currentCombo + 1)
      setFeedback('Benar!')

      if (questionIndex === questions.length - 1) {
        setTimeout(() => {
          setCompleted(true)
        }, 450)

        return
      }

      setTimeout(() => {
        setQuestionIndex((currentIndex) => currentIndex + 1)
        setFeedback('')
      }, 450)
    } else {
      setMistakes((count) => count + 1)
      setCombo(0)

      setHp((currentHp) => {
        const newHp = Math.max(currentHp - 1, 0)

        if (newHp === 0) {
          setTimeout(() => {
            setCompleted(true)
          }, 450)
        }

        return newHp
      })

      setFeedback('Belum tepat. HP berkurang!')
    }
  }

  if (completed) {
    const isGameOver = hp === 0

    const isMastered =
      score === questions.length &&
      mistakes === 0 &&
      !isGameOver

    return (
      <motion.main
        initial={{
          opacity: 0,
          scale: 0.95,
        }}
        animate={{
          opacity: 1,
          scale: 1,
        }}
        transition={{
          duration: 0.4,
        }}
      >
        <h1>
          {isGameOver ? 'Mission Failed' : 'Remedial Selesai!'}
        </h1>

        <h2>
          Skor: {score} / {questions.length}
        </h2>

        <p>Total Kesalahan: {mistakes}</p>

        <p>
          HP: {'❤️'.repeat(hp)}
          {'🤍'.repeat(3 - hp)}
        </p>

        <p>
          Combo Terakhir: x{combo}
        </p>

        <p>
          Total XP: {xp}
        </p>

        <p>
          Level Pemain: {level}
        </p>

        {isGameOver && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <h3>HP Kamu Habis</h3>

            <p>
              Kamu kehabisan HP sebelum menyelesaikan Remedial Mission.
              Pelajari kembali pola perbandingan dan coba lagi.
            </p>

            <button
              type="button"
              onClick={restartRemedial}
            >
              Coba Lagi
            </button>
          </motion.div>
        )}

        {!isGameOver && isMastered && (
          <motion.div
            initial={{
              opacity: 0,
              scale: 0.8,
            }}
            animate={{
              opacity: 1,
              scale: 1,
            }}
          >
            <h3>Latihan Dikuasai!</h3>

            <p>
              Kamu sudah memahami keputusan perbandingan pada Bubble Sort
              dengan baik.
            </p>

            <p>
              Perfect Run! Kamu menyelesaikan misi tanpa kehilangan HP.
            </p>
          </motion.div>
        )}

        {!isGameOver && !isMastered && (
          <motion.div
            initial={{
              opacity: 0,
              y: 20,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
          >
            <h3>Masih Perlu Latihan</h3>

            <p>
              Kamu berhasil menyelesaikan semua soal, tetapi masih melakukan
              beberapa kesalahan. Coba ulangi remedial sampai semua jawaban
              benar tanpa kehilangan HP.
            </p>

            <button
              type="button"
              onClick={restartRemedial}
            >
              Ulangi Remedial
            </button>
          </motion.div>
        )}
      </motion.main>
    )
  }

  return (
    <main>
      <h1>Remedial Mission</h1>

      <p>
        HP: {'❤️'.repeat(hp)}
        {'🤍'.repeat(3 - hp)}
      </p>

      <motion.p
        key={`combo-${combo}`}
        initial={{
          scale: 1,
        }}
        animate={{
          scale: combo > 0 ? [1, 1.2, 1] : 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        Combo: x{combo}
      </motion.p>

      <motion.p
        key={`xp-${xp}`}
        initial={{
          scale: 1,
        }}
        animate={{
          scale: xp > 0 ? [1, 1.15, 1] : 1,
        }}
        transition={{
          duration: 0.3,
        }}
      >
        XP: {xp}
      </motion.p>

      <p>
        Level: {level}
      </p>

      <div
        style={{
          width: '220px',
          height: '8px',
          background: '#333',
          borderRadius: '999px',
          margin: '8px auto 16px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{
            width: `${(xpInCurrentLevel / 50) * 100}%`,
          }}
          transition={{
            duration: 0.4,
          }}
          style={{
            height: '100%',
            background: '#a855f7',
          }}
        />
      </div>

      <p>
        XP ke level berikutnya: {xpInCurrentLevel} / 50
      </p>

      <p>
        Latihan ini membantu memperkuat pemahamanmu tentang keputusan
        perbandingan pada Bubble Sort.
      </p>

      <h2>
        Soal {questionIndex + 1} dari {questions.length}
      </h2>

      <div
        style={{
          width: '300px',
          height: '10px',
          background: '#333',
          borderRadius: '999px',
          margin: '10px auto 20px',
          overflow: 'hidden',
        }}
      >
        <motion.div
          animate={{
            width: `${((questionIndex + 1) / questions.length) * 100}%`,
          }}
          transition={{
            duration: 0.4,
          }}
          style={{
            height: '100%',
            background: '#22d3ee',
          }}
        />
      </div>

      <p>
        Apakah kedua angka ini perlu ditukar?
      </p>

      <AnimatePresence mode="wait">
        <motion.div
          key={questionIndex}
          initial={{
            opacity: 0,
            x: 60,
            scale: 0.9,
          }}
          animate={{
            opacity: 1,
            x: 0,
            scale: 1,
          }}
          exit={{
            opacity: 0,
            x: -60,
            scale: 0.9,
          }}
          transition={{
            duration: 0.35,
          }}
        >
          <motion.span
            animate={
              feedback === 'Benar!'
                ? {
                    scale: [1, 1.15, 1],
                  }
                : feedback
                  ? {
                      x: [0, -8, 8, -6, 6, 0],
                    }
                  : {}
            }
            transition={{
              duration: 0.35,
            }}
            style={{
              display: 'inline-block',
              margin: '0 8px',
              padding: '14px 18px',
              border: '2px solid #22d3ee',
              borderRadius: '10px',
            }}
          >
            {currentQuestion.left}
          </motion.span>

          <motion.span
            animate={
              feedback === 'Benar!'
                ? {
                    scale: [1, 1.15, 1],
                  }
                : feedback
                  ? {
                      x: [0, -8, 8, -6, 6, 0],
                    }
                  : {}
            }
            transition={{
              duration: 0.35,
            }}
            style={{
              display: 'inline-block',
              margin: '0 8px',
              padding: '14px 18px',
              border: '2px solid #22d3ee',
              borderRadius: '10px',
            }}
          >
            {currentQuestion.right}
          </motion.span>
        </motion.div>
      </AnimatePresence>

      <div
        style={{
          marginTop: '20px',
        }}
      >
        <button
          type="button"
          onClick={() => handleAnswer('no-swap')}
        >
          Tidak Tukar
        </button>

        <button
          type="button"
          onClick={() => handleAnswer('swap')}
        >
          Tukar
        </button>
      </div>

      <AnimatePresence mode="wait">
        {feedback && (
          <motion.p
            key={feedback}
            initial={{
              opacity: 0,
              y: 8,
            }}
            animate={{
              opacity: 1,
              y: 0,
            }}
            exit={{
              opacity: 0,
              y: -8,
            }}
            style={{
              color:
                feedback === 'Benar!'
                  ? '#22c55e'
                  : '#ef4444',
              fontWeight: 'bold',
            }}
          >
            {feedback}
          </motion.p>
        )}
      </AnimatePresence>

      <p>
        Skor: {score}
      </p>
    </main>
  )
}

export default RemedialMission