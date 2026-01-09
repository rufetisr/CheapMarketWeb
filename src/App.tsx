
import { Route, Routes, useLocation } from 'react-router'
import './App.css'
import Navbar from './components/Navbar'
import Home from './pages/Home'
import Products from './pages/Products'
import Contact from './pages/Contact'
import FindClosestMarket from './pages/FindClosestMarket'
import Journals from './pages/Journals'
import Favorites from './pages/Favorites'
import NutriFab from './components/NutriFab'
import Nutrition from './pages/Nutrition'
import Footer from './components/Footer'
import Wallet from './pages/Wallet'
import AddBonusCard from './pages/AddBonusCard'
import { CardDetails } from './pages/CardDetails'
import ScrollToTop from './components/ScrollToTop'


function App() {
  const location = useLocation()

  const showInTheRoutes = ['/products']


  return (
    <>
      <div className='w-full block h-full absolute'>

        <Navbar />
        <ScrollToTop />
        
        <div className='mt-[110px] px-4 py-8'>
          <Routes>
            <Route path='/' element={<Home />} />
            <Route path='/products' element={<Products />} />
            <Route path='/contact' element={<Contact />} />
            <Route path='/find-closest-market' element={<FindClosestMarket />} />
            <Route path='/journals' element={<Journals />} />
            <Route path='/favorites' element={<Favorites />} />
            <Route path='/nutrition-analyzer' element={<Nutrition />} />

            <Route path='/my-wallet' element={<Wallet />} />
            <Route path='/add-card' element={<AddBonusCard />} />
            {/* Dynamic route for the specific card */}
            <Route path="/card/:id" element={<CardDetails />} />

            <Route path="*" element={<div className="p-10 text-center text-red-500">Page Not Found</div>} />
          </Routes>
        </div>

        {
          showInTheRoutes.includes(location.pathname) && <NutriFab />
        }

        <Footer />
      </div>
    </>

  )
}

export default App