import { Link } from 'react-router'
import marketImg from '../assets/images/markets-old.png'
import { FiArrowRight } from 'react-icons/fi'

const Home = () => {
    return (
        <div className='py-16 px-12'>

            <div className="md:flex items-center justify-between">
                <div >
                    <p className="text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500">
                        Ucuz Market Axtar'a xoş gəlmisiniz!
                    </p>
                    <p className='lg:text-2xl'>Qiymətləri marketlər arasında müqayisə et, ən ucuz marketdən məhsulu al!

                        <br></br>Endirimlərdən yararlan və büdcənə qənaət et.</p>
                </div>

                <img src={marketImg} alt="img" className='md:w-90' />


            </div>
            <Link to={'/products'} >
                <button className="cursor-pointer group relative flex items-center gap-1.5 overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-10 py-4 text-2xl font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700 hover:shadow-green-200 active:scale-95">
                    <span>Başla</span>
                    <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-3" />

                    {/* Subtle shine effect on hover */}
                    <div className="absolute inset-0 -translate-x-full bg-gradient-to-r from-transparent via-white/20 to-transparent transition-transform duration-500 group-hover:translate-x-full" />
                </button>
            </Link>
        </div>
    )
}

export default Home