import { useNavigate } from 'react-router-dom'

function WorldMap() {
  const navigate = useNavigate()

  return (
    <main>
      <h1>Algorithm Kingdom</h1>
      <p>Pilih wilayah algoritma yang ingin kamu pelajari.</p>

      <section>
        <button
          type="button"
          onClick={() => navigate('/bubble-valley')}
        >
          Bubble Valley
        </button>

        <button type="button">
          Selection Forest
        </button>

        <button type="button">
          Insertion City
        </button>

        <button type="button">
          Quick Fortress
        </button>
      </section>
    </main>
  )
}

export default WorldMap