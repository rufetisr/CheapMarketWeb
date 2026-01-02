import { Link } from 'react-router'
import marketImg from '../assets/images/markets-old.png'
// import mylogo from '../assets/images/logo.png'
import { FiArrowRight } from 'react-icons/fi'
import DemoVideo from '../components/DemoVideo'

const Home = () => {
    return (
        <main className="py-16 px-4 md:px-12">
            <section className="flex flex-col md:flex-row items-center justify-between gap-8">
                <header className="flex-1">
                    <h1 className="text-3xl lg:text-4xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500 mb-4">
                        Ucuz Marketə xoş gəlmisiniz!
                    </h1>
                    <p className="lg:text-2xl text-gray-700 mb-6">
                        Qiymətləri marketlər arasında müqayisə et, ən ucuz marketdən məhsulu al!<br />
                        Endirimlərdən yararlan və büdcənə qənaət et.
                    </p>
                    <Link to="/products">
                        <button
                            type="button"
                            className="cursor-pointer group relative flex items-center gap-1.5 overflow-hidden rounded-2xl bg-gradient-to-r from-green-500 to-green-600 px-10 py-4 text-xl font-semibold text-white shadow-lg transition-all hover:from-green-600 hover:to-green-700 hover:shadow-green-200 active:scale-95"
                            aria-label="Başla - Məhsullara keçid"
                        >
                            <span>Başla</span>
                            <FiArrowRight className="transition-transform duration-300 group-hover:translate-x-3" />
                        </button>
                    </Link>
                </header>
                <aside className="flex-1 flex justify-center items-center">
                    <img
                        src={marketImg}
                        alt="Market"
                        className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                        loading="lazy"
                    />
                </aside>
            </section>
            <section>
                <DemoVideo />
            </section>
        </main>
    )
}

export default Home