import { useEffect, useState } from 'react';
import { useAppContext, type Product } from '../context/Context'
import { FaMapMarkerAlt, FaRegStar, FaStar } from "react-icons/fa";
import Loader from '../components/Loader';

const Favorites = () => {

    const { products, favorites, setFavorites } = useAppContext();
    const [loading, setLoading] = useState(true);

    console.log('products', products);


    useEffect(() => {
        console.log('usefect favou');

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

    // useEffect(() => {

    //     const savedProducts = localStorage.getItem("products");
    //     if (savedProducts) {
    //         setProducts(JSON.parse(savedProducts));
    //     }
    // }, [setProducts]);

    // const favoriteProducts = Object.entries(products)
    //     .map(([marketName, marketProducts]) => ({
    //         market: marketName,
    //         products: marketProducts.filter(p =>
    //             favorites.some(fav => fav.id === p.id)
    //         )
    //     }))
    //     .filter(item => item.products.length > 0); // Remove markets with no favorites

    // console.log(favoriteProducts);

    // const toggleFavorite = (selectedId: string) => {
    //     // console.log(prId);

    //     let updated;
    //     if (favorites.includes(selectedId)) {
    //         updated = favorites.filter(id => id !== selectedId);
    //     } else {
    //         updated = [...favorites, selectedId];
    //     }
    //     setFavorites(updated);
    //     localStorage.setItem('favorites', JSON.stringify(updated));


    // }

    if (loading) {
        return <Loader />
    }
    return (
        <div className='w-full max-w-3xl m-auto'>
            <h2 className='text-2xl flex items-center justify-center text-red-500'>
                My Favorites <FaStar />

            </h2>

            {
                // Object.entries(favoriteProducts).filter(([marketName, marketProducts]) => {
                // favoriteProducts.map((marketGroup: any, index: number) => (
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
                // ))
            }
        </div>
    )
}

export default Favorites