import { useNavigate } from 'react-router-dom'

function Home() {
  const navigate = useNavigate()

  return (
    <main>
      <h1>Sorting Quest</h1>

      <p>
        Jelajahi dunia algoritma sorting dan pelajari setiap langkah melalui
        tantangan interaktif.
      </p>

      <button
        type="button"
        onClick={() => navigate('/world-map')}
      >
        Mulai Petualangan
      </button>
    </main>
  )
}

export default Home