import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'

import { Body } from "./pages/body/body";
import { Footer } from "./common/footer/footer";

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      <Body />
      <Footer />
    </>
  )
}

export default App
