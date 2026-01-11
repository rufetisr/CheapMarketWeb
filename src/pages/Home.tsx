import { Link } from 'react-router'
import marketImg from '../assets/images/markets-old.png'
// import mylogo from '../assets/images/logo.png'
import { FiArrowRight, FiCreditCard } from 'react-icons/fi'
import DemoVideo from '../components/DemoVideo'
import { motion } from 'framer-motion'
import InstallPWAButton from "../components/InstallPWA";

const Home = () => {

    // 2. Define a simple reveal variant
    const fadeIn = {
        hidden: { opacity: 0, y: 30 },
        visible: { opacity: 1, y: 0 }
    }


    return (
        <main className="py-16 px-4 md:px-12 overflow-hidden">
            <InstallPWAButton />
            <section className="flex flex-col md:flex-row items-center justify-between gap-8">
                <motion.header
                    className="flex-1"
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.4 }}
                    transition={{ duration: 0.6 }}
                    variants={fadeIn}>
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
                </motion.header>

                <motion.aside
                    className="flex-1 flex justify-center items-center"
                    initial={{ opacity: 0, x: 50 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ duration: 0.7, delay: 0.2 }}>
                    <img
                        src={marketImg}
                        alt="Market"
                        className="w-full max-w-xs md:max-w-md lg:max-w-lg xl:max-w-xl h-auto object-contain"
                        loading="lazy"
                    />
                </motion.aside>
            </section>
            <motion.section
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true, amount: 0.6 }}
                transition={{ duration: 0.7 }}
                className="mt-20"
            >
                <DemoVideo />
            </motion.section>

            {/* NEW WALLET PROMO SECTION */}
            <motion.section
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.4 }}// Trigger once when 60% is visible
                transition={{ duration: 0.8 }}
                variants={fadeIn}
                className="bg-white rounded-3xl p-8 md:p-12 shadow-xl border border-gray-100 flex flex-col md:flex-row items-center gap-10"
            >
                <div className="flex-1 space-y-6">
                    <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 text-purple-600 rounded-full font-semibold text-sm">
                        <FiCreditCard />
                        YENİ: Rəqəmsal Pulqabı
                    </div>
                    <h2 className="text-3xl font-bold text-gray-800">
                        Bonus kartlarını artıq evdə qoymağa son!
                    </h2>
                    <p className="text-gray-600 text-lg">
                        Bonus kartlarını (Bir bonus, Umico, Bravo, Bazarstore, Araz və s.) tətbiqə əlavə et.
                        Kassada telefonla sadəcə barkodu göstər və bonusları topla.
                    </p>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 text-gray-700">
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-green-600 p-1 rounded-full text-xs">✓</span>
                            Barkodu skan et və ya əl ilə nömrəni əlavə et
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-green-600 p-1 rounded-full text-xs">✓</span>
                            Kartın şəklini çəkib saxla
                        </div>
                        {/* <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-green-600 p-1 rounded-full text-xs">✓</span>
                            Oflayn rejimdə işləyir
                        </div>
                        <div className="flex items-center gap-2">
                            <span className="bg-green-100 text-green-600 p-1 rounded-full text-xs">✓</span>
                            Məlumatlar yalnız cihazda qalır
                        </div> */}
                    </div>

                    <div className="flex gap-4">
                        <Link to="/my-wallet" className="flex-1 sm:flex-none">
                            <button className="cursor-pointer w-full sm:w-auto px-8 py-3 bg-blue-600 text-white rounded-xl font-bold shadow-lg shadow-purple-200 hover:bg-blue-700 transition active:scale-95">
                                Pulqabıya get
                            </button>
                        </Link>
                        {/* <Link to="/add-card" className="flex-1 sm:flex-none">
                            <button className="cursor-pointer w-full sm:w-auto px-8 py-3 border-2 border-blue-600 text-blue-600 rounded-xl font-bold hover:bg-purple-50 transition flex items-center justify-center gap-2 active:scale-95">
                                <FiPlusCircle /> Kart əlavə et
                            </button>
                        </Link> */}
                    </div>
                </div>

                {/* Decorative Visual for Wallet Section */}
                <div className="flex-1 flex justify-center">
                    <div className="relative">
                        <div className="absolute -inset-4 bg-gradient-to-r from-purple-400 to-blue-600 rounded-3xl blur opacity-20 animate-pulse"></div>
                        <div className="relative bg-gray-900 text-white p-6 rounded-[2.5rem] w-64 h-[400px] border-[8px] border-gray-800 shadow-2xl flex flex-col items-center pt-10">
                            <div className="w-12 h-1 bg-gray-700 rounded-full mb-8"></div>
                            <div className="w-full h-32 bg-gradient-to-br from-purple-500 to-indigo-600 rounded-2xl mb-4 p-4 flex flex-col justify-between">
                                <div className="text-[10px] uppercase opacity-80">Bonus Card</div>
                                <div className="text-xs font-bold">CheapMarket User</div>
                                <div className="h-6 w-full bg-white opacity-20 rounded"></div>
                            </div>
                            <div className="w-full bg-white p-2 rounded-lg mt-4">
                                <div className="h-16 w-full bg-[repeating-linear-gradient(90deg,black,black_2px,white_2px,white_4px)]"></div>
                            </div>
                            <p className="mt-4 text-[10px] opacity-60">READY TO SCAN</p>
                        </div>
                    </div>
                </div>
            </motion.section>
        </main>
    )
}

export default Home