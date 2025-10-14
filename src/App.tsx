
import { Route, Routes } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import FindClosestMarket from './pages/FindClosestMarket'
import Journals from './pages/Journals'


function App() {



  return (
    <>
      <div className='w-full block h-full absolute'>

        <Navbar />
        <Routes>
          <Route path='/' element={<Home />} />
          <Route path='/products' element={<Products />} />
          <Route path='/contact' element={<Contact />} />
          <Route path='/find-closest-market' element={<FindClosestMarket />} />
          <Route path='/journals' element={<Journals />} />
        </Routes>

      </div>
    </>

  )
}

export default App