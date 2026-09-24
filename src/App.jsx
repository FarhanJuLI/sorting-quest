import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import WorldMap from './pages/WorldMap'
import BubbleValley from './pages/BubbleValley'
import BubbleLevel1 from './pages/BubbleLevel1'

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/world-map" element={<WorldMap />} />
        <Route path="/bubble-valley" element={<BubbleValley />} />
        <Route path="/bubble-valley/level-1" element={<BubbleLevel1 />} />
      </Routes>
    </BrowserRouter>
  )
}

export default App