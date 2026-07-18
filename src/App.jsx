import React from 'react'
import { Routes, Route } from 'react-router-dom'
import Home from './pages/Home'
import TodoApp from './pages/TodoApp'
import FlipCoinApp from './pages/FlipCoinApp'
import RightWrongGame from './pages/RightWrongGame'
import RightWrongGrid from './pages/RightWrongGrid'
import Navbar from './components/Navbar'
import TermsConditions from './pages/TermsConditions'
import Footer from './components/Footer'


const App = () => {
  return (
    <main>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/todos" element={<TodoApp />} />
        <Route path="/flip-coin" element={<FlipCoinApp />} />
        <Route path="/right-wrong" element={<RightWrongGame />} />
        <Route path="/right-wrong-grid" element={<RightWrongGrid />} />
        <Route path="/terms-conditions" element={<TermsConditions />} />
      </Routes>
      <Footer />

    </main>
  )
}

export default App