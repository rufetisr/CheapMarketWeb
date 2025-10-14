import { Link } from 'react-router'
import marketImg from '../assets/images/markets-old.png'

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
                <button className='text-2xl cursor-pointer mt-4 px-7 py-4 bg-green-600 text-white rounded-2xl hover:bg-green-700'
                >
                    Başla
                </button>
            </Link>
        </div>
    )
}

export default Home