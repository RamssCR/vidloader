import { BrowserRouter, Routes, Route } from 'react-router-dom'
import Header from './components/Header'
import Register from './views/Register'
import Login from './views/Login'
import Protected from './Protected'
import Dashboard from './views/Dashboard'
import ViewVideo from './views/ViewVideo'
import Upload from './views/Upload'
import Footer from './components/Footer'

function App() {
  return (
    <BrowserRouter>
      <main className="main-container">
        <Header />
        <Routes>
            <Route path='/register' element={<Register />} />
            <Route path='/login' element={<Login />} />
            <Route element={<Protected />}>
              <Route path='/app' element={<Dashboard />} />
              <Route path='/app/watch' element={<ViewVideo />} />
              <Route path='/app/upload' element={<Upload />}  />
            </Route>
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  )
}

export default App
