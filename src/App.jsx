import { useState } from 'react'
import reactLogo from './assets/react.svg'
import AgricultureNews from "./AgricultureUpdates"

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
     <AgricultureNews/>
    </>
  )
}

export default App
  