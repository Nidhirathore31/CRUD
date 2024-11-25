import { useState } from 'react'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import './App.css'
import Table from './components/Table'
import Form from './components/Form'
import Update from './components/Update'

function App() {
  const [formData, setFormData] = useState([])


  return (
    <>
      <Router>
        <Routes>
          <Route path='/' element={<Form setFormData={setFormData} />}></Route>
          <Route path='/table/:name/:email/:num' element={<Table formData={formData} />}></Route>
          <Route path='/update/:index' element={<Update />}></Route>
        </Routes>
      </Router>

    </>
  )
}

export default App
