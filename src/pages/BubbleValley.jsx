import { useNavigate } from 'react-router-dom'

function BubbleValley() {
  const navigate = useNavigate()

  return (
    <main>
      <h1>Bubble Valley</h1>
      <p>Pilih level untuk mempelajari Bubble Sort.</p>

      <section>
        <button
          type="button"
          onClick={() => navigate('/bubble-valley/level-1')}
        >
          Level 1
        </button>

        <button type="button">Level 2</button>
        <button type="button">Level 3</button>
      </section>
    </main>
  )
}

export default BubbleValley