import "./App.css"
import Container from "./componentes/Container"
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Header from "./componentes/Header";
function App() {
  return (
    <>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Container />} />
          <Route path="/pelicula"  />
          <Route path="/series"  />
          <Route path="/categorias"  />
        </Routes>
      </Router>
    </>
  )
}

export default App
