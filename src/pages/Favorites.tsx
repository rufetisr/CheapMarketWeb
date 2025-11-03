import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router';

import { useAppContext, type Product } from '../context/Context'
import Loader from '../components/Loader';

import { FaMapMarkerAlt, FaRegStar, FaStar } from "react-icons/fa";
import { GrLinkPrevious } from 'react-icons/gr';

const Favorites = () => {

    const { favorites, setFavorites } = useAppContext();
    const [loading, setLoading] = useState(true);

    const navigate = useNavigate();



    useEffect(() => {

        const stored = localStorage.getItem('favorites');
        if (stored) {
            setFavorites(JSON.parse(stored));
        }
        setLoading(false)
    }, []);

    const removeFavorite = (product: Product | any) => {
        const exists = favorites.some((fav) => fav.id == product.id)

        let updated;


        if (exists) {
            updated = favorites.filter((fav) => fav.id != product.id);
            setFavorites(updated)
        }
        localStorage.setItem('favorites', JSON.stringify(updated));

    }


    if (loading) {
        return <Loader />
    }

    return (
        <div className='w-full max-w-3xl m-auto'>

            <button
                onClick={() => { navigate(-1) }}
                className='flex items-center gap-1 mb-4 text-blue-600 hover:underline hover:scale-105 transition-transform cursor-pointer'
            >
                <GrLinkPrevious /> Back
            </button>
            <h2 className='text-2xl flex items-center justify-center text-red-500'>
                My Favorites <FaStar />

            </h2>

            {
                <div className="mt-8">

                    {favorites.map((product: any, i: number) => (

                        <div key={i} className="text-sm sm:text-lg md:text-2xl border rounded-lg border-gray-300 p-4 mb-3 flex items-center gap-4">

                            <img className="w-20 h-20 object-contain" src={product.imgSrc.startsWith('//') ? `https:${product.imgSrc}` : product.imgSrc} alt={product.name} />
                            <div className="flex flex-col">

                                <h2 className="text-lg text-gray-800 font-semibold ">{product.name}</h2>
                                <p className="font-bold text-lg text-blue-600">{product.salePrice}</p>
                                <p className="text-lg text-gray-600 line-through">  {product.previousPrice != '' && product.previousPrice}</p>

                                <p className="font-semibold text-sm text-gray-600 flex items-center">
                                    <FaMapMarkerAlt className="text-gray-500 inline mr-1" />
                                    {product.marketName}
                                </p>
                            </div>
                            <div className="ml-auto flex flex-col gap-3.5 self-baseline">
                                <button
                                    className="self-baseline ml-auto cursor-pointer text-red-500 hover:scale-120 transition-transform"
                                    onClick={() => removeFavorite(product)}

                                >
                                    {
                                        favorites.some(fav => fav.id === product.id) ? <FaStar size={26} /> : <FaRegStar size={26} />
                                    }
                                </button>
                                {
                                    product.previousPrice &&
                                    <p className="text-sm bg-yellow-300 p-1 rounded-sm">Endirim</p>
                                }

                            </div>
                        </div>
                    ))}


                </div>
            }
        </div>
    )
}

export default Favorites