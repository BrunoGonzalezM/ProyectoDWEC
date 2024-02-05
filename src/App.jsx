import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import "./App.css"
import Header from "./componentes/Header"
import Container from "./componentes/Container"

function App() {
  return (
    <>
      <div className="contenido">
          <Header />
          <Container />
      </div> 
    </>
  )
}

export default App
