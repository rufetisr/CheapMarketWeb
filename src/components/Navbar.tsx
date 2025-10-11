import { useEffect, useRef, useState } from 'react'
import marketLogo from '../assets/images/markets.png'
import { Link } from 'react-router-dom'


function Navbar() {
    const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false)
    const menuRef = useRef<HTMLDivElement | null>(null);
    const menuButtonRef = useRef<HTMLButtonElement | null>(null);


    const closeMenu = () => {
        setIsMenuOpen(false);
    };

    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (menuRef.current &&
                !menuRef.current.contains(event.target as Node)
                && menuButtonRef.current &&
                !menuButtonRef.current.contains(event.target as Node)
            ) {

                closeMenu();
            }
        }

        if (isMenuOpen) {

            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };

    }, [isMenuOpen]);



    return (

        <header className='flex justify-between items-center py-6 px-8
      md:px-32 bg-white drop-shadow-md sticky top-0 left-0 right-0 z-50'>

            <Link to={'/'}>
                <img src={marketLogo} alt="logo" className='w-15 hover:scale-105 transition-all' />
            </Link>

            <div className='hidden xl:flex items-center gap-12 font-semibold
        text-base'>
                <Link to={'/'} className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all'>
                    Home
                </Link>
                <Link to={'/products'} className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all'>
                    Products
                </Link>
                <Link to={'/contact'} className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all'>
                    Contact
                </Link>
                <Link to={'/find-closest-market'} className='p-3 hover:bg-sky-400 hover:text-white rounded-md transition-all'>
                    Find Closest Market
                </Link>
            </div>


            {/* <div className="relative hidden md:flex items-center justify-center gap-3">
                <i className='bx bx-search absolute left-3 top-2.5 text-2xl text-gray-500'></i>
                <input type="text" placeholder='Search...' className=
                    'py-2 pl-10 rounded-xl border-2 border-blue-300 focus:bg-slate-10 outline-sky-500' />
            </div> */}

            <i ref={menuButtonRef} onClick={() => { setIsMenuOpen(!isMenuOpen); }} className='z-10 bx bx-menu block xl:!hidden text-5xl cursor-pointer'></i>

            {
                isMenuOpen &&
                <div
                    ref={menuRef}
                    className={`absolute xl:hidden top-24 left-0 w-full bg-white flex flex-col items-center gap-6 font-semibold text-lg transform transition-transform 
                ${isMenuOpen ? 'opacity-100' : 'opacity-0'}`}
                    style={{ transition: 'transform 0.3s ease, opacity 0.3s ease' }}
                >
                    <Link to={'/'} onClick={closeMenu} className=' w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>
                        Home
                    </Link>
                    <Link to={'/products'} onClick={closeMenu} className='w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>
                        Products
                    </Link>
                    <Link to={'/contact'} onClick={closeMenu} className=' w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>
                        Contact
                    </Link>
                    <Link to={'/find-closest-market'} onClick={closeMenu} className=' w-full text-center p-4 hover:bg-sky-400 hover:text-white transition-all cursor-pointer'>
                        Find Closest Market
                    </Link>
                </div>
            }

        </header>


    )
}

export default Navbar