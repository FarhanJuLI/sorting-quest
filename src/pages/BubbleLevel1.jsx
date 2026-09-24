import { useState } from 'react'
import { getBubbleSortSteps } from '../engines/bubbleSortEngine'
import { classifyError } from '../engines/errorClassifier'

function BubbleLevel1() {
  const numbers = [5, 3, 8, 1]

  const allSteps = getBubbleSortSteps(numbers)
  const steps = allSteps.filter((step) => step.type === 'compare')

  const [currentStepIndex, setCurrentStepIndex] = useState(0)
  const [feedback, setFeedback] = useState('')
  const [isCompleted, setIsCompleted] = useState(false)
  const [mistakeCount, setMistakeCount] = useState(0)
  const [errors, setErrors] = useState([])
  const [showWhy, setShowWhy] = useState(false)

  const currentStep = steps[currentStepIndex]

  function handleAnswer(answer) {
    const [leftIndex, rightIndex] = currentStep.indices

    const leftValue = currentStep.array[leftIndex]
    const rightValue = currentStep.array[rightIndex]

    const shouldSwap = leftValue > rightValue
    const correctAnswer = shouldSwap ? 'swap' : 'no-swap'

    if (answer === correctAnswer) {
      if (currentStepIndex === steps.length - 1) {
        setFeedback('Benar!')
        setIsCompleted(true)
        return
      }

      setFeedback('Benar!')
      setShowWhy(false)
      setCurrentStepIndex(currentStepIndex + 1)
    } else {
      setFeedback('Belum tepat, coba lagi.')

      setMistakeCount((count) => count + 1)

      const errorType = classifyError({
        actionType: currentStep.type,
        selectedAnswer: answer,
        correctAnswer,
      })

      const correctArray = [...currentStep.array]

      if (shouldSwap) {
        ;[correctArray[leftIndex], correctArray[rightIndex]] = [
          correctArray[rightIndex],
          correctArray[leftIndex],
        ]
      }

      setErrors((previousErrors) => [
        ...previousErrors,
        {
          step: currentStepIndex + 1,
          type: errorType,
          selectedAnswer: answer,
          correctAnswer,
          values: [leftValue, rightValue],
          arrayBefore: [...currentStep.array],
          correctArray,
        },
      ])
    }
  }

  if (isCompleted) {
    return (
      <main>
        <h1>Level Selesai!</h1>

        <p>
          Kamu berhasil menyelesaikan seluruh langkah Bubble Sort Level 1.
        </p>

        <p>Array berhasil diurutkan menjadi: 1 3 5 8</p>

        <p>Total Kesalahan: {mistakeCount}</p>

        <h2>Riwayat Kesalahan</h2>

        {errors.length === 0 ? (
          <p>Tidak ada kesalahan. Mantap!</p>
        ) : (
          <div>
            {errors.map((error, index) => (
              <div key={index}>
                <h3>
                  Step {error.step} - {error.type}
                </h3>

                <p>
                  Membandingkan {error.values[0]} dan {error.values[1]}
                </p>

                <p>
                  Keputusan kamu:{' '}
                  {error.selectedAnswer === 'swap' ? 'Tukar' : 'Tidak Tukar'}
                </p>

                <p>
                  Keputusan benar:{' '}
                  {error.correctAnswer === 'swap' ? 'Tukar' : 'Tidak Tukar'}
                </p>

                <p>
                  Sebelum keputusan: {error.arrayBefore.join(' ')}
                </p>

                <p>
                  Seharusnya menjadi: {error.correctArray.join(' ')}
                </p>

                <hr />
              </div>
            ))}
          </div>
        )}
      </main>
    )
  }

  return (
    <main>
      <h1>Bubble Valley - Level 1</h1>

      <p>
        Amati dua angka yang dibandingkan, lalu tentukan apakah perlu ditukar.
      </p>

      <p>Total Kesalahan: {mistakeCount}</p>

      <h2>
        Step {currentStepIndex + 1} dari {steps.length}
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
        <div
          style={{
            width: `${((currentStepIndex + 1) / steps.length) * 100}%`,
            height: '100%',
            background: '#22d3ee',
            transition: 'width 0.3s ease',
          }}
        />
      </div>

      <p>{currentStep.description}</p>

      <section>
        <div>
          {currentStep.array.map((number, index) => {
            const isActive = currentStep.indices.includes(index)

            return (
              <span
                key={index}
                style={{
                  display: 'inline-block',
                  margin: '0 6px',
                  padding: '10px 14px',
                  borderRadius: '8px',
                  border: isActive
                    ? '2px solid #22d3ee'
                    : '1px solid #555',
                  fontWeight: isActive ? 'bold' : 'normal',
                }}
              >
                {number}
              </span>
            )
          })}
        </div>

        <div>
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

          <button
            type="button"
            onClick={() => setShowWhy((show) => !show)}
          >
            Kenapa?
          </button>

          {showWhy && (
            <p>
              Saat ini kita membandingkan{' '}
              {currentStep.array[currentStep.indices[0]]} dan{' '}
              {currentStep.array[currentStep.indices[1]]}.{' '}
              {currentStep.array[currentStep.indices[0]] >
              currentStep.array[currentStep.indices[1]]
                ? 'Karena angka kiri lebih besar dari angka kanan, keduanya harus ditukar.'
                : 'Karena angka kiri tidak lebih besar dari angka kanan, keduanya tidak perlu ditukar.'}
            </p>
          )}
        </div>

        <p
          style={{
            color:
              feedback === 'Benar!'
                ? '#22c55e'
                : feedback
                  ? '#ef4444'
                  : 'inherit',
            fontWeight: 'bold',
            marginTop: '12px',
          }}
        >
          {feedback}
        </p>
      </section>
    </main>
  )
}

export default BubbleLevel1