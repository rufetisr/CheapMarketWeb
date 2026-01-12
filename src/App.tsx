
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
import WalletFab from './components/WalletFab'
import Nutrition from './pages/Nutrition'
import Footer from './components/Footer'
import Wallet from './pages/Wallet'
import AddBonusCard from './pages/AddBonusCard'
import { CardDetails } from './pages/CardDetails'
import EditBonusCard from './pages/EditBonusCard'
import ScrollToTop from './components/ScrollToTop'
import { useScrollDirection } from './hooks/useScrollDirection'
import FabToggle from './components/FabToggle'


function App() {
  const location = useLocation()
  const { isVisible: isFabVisible, toggleVisibility } = useScrollDirection()

  const showNutriFabRoutes = ['/products']
  const showWalletFabRoutes = ['/products', '/favorites', '/journals', '/find-closest-market']
  const showFabToggleRoutes = [...new Set([...showNutriFabRoutes, ...showWalletFabRoutes])]

  // Determine bottom offset for WalletFab based on whether NutriFab is also visible
  const walletFabBottomOffset = showNutriFabRoutes.includes(location.pathname) 
    ? 'bottom-32' 
    : 'bottom-18'


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
            <Route path="/card/:id/edit" element={<EditBonusCard />} />

            <Route path="*" element={<div className="p-10 text-center text-red-500">Page Not Found!</div>} />
          </Routes>
        </div>

        {showNutriFabRoutes.includes(location.pathname) && <NutriFab visible={isFabVisible} />}
        {showWalletFabRoutes.includes(location.pathname) && (
          <WalletFab bottomOffset={walletFabBottomOffset} visible={isFabVisible} />
        )}

        {showFabToggleRoutes.includes(location.pathname) && (
          <FabToggle isVisible={isFabVisible} onToggle={toggleVisibility} />
        )}

        <Footer />
      </div>
    </>

  )
}

export default App