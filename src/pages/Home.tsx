import marketImg from '../assets/images/markets.png'

const Home = () => {
    return (
        <div className="py-16 px-12  md:flex items-center justify-between">
            <div >
                <p className="text-3xl lg:text-4xl bg-clip-text text-transparent bg-gradient-to-r from-red-500 to-purple-500">
                    Ucuz Market Axtar'a xoş gəlmisiniz!
                </p>
                <p className='lg:text-2xl'>Qiymətləri marketlər arasında müqayisə et, ən ucuz marketdən məhsulu al!
                    
                    <br></br>Endirimlərdən yararlan və büdcənə qənaət et.</p>
            </div>

            <img src={marketImg} alt="img" className='md:w-90'/>
        </div>
    )
}

export default Home