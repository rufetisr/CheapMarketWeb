import { useEffect, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaMapMarkerAlt, FaRegStar, FaStar } from "react-icons/fa";
import Loader from "../components/Loader";
import { useAppContext, type Product } from "../context/Context";
import { HiOutlineRefresh } from "react-icons/hi";
import { Link } from "react-router";

const Products = () => {

  const { products, setProducts, favorites, setFavorites } = useAppContext()

  const [searchInput, setSearchInput] = useState<string>('');
  const [filter, setFilter] = useState<string>('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);


  // const apiUrl = import.meta.env.VITE_API_URL
  const apiUrl = import.meta.env.VITE_API_URL

  useEffect(() => {
    console.log('get fav useefect');

    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));
  }, [])

  useEffect(() => {
    console.log('fav change usefect');

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {
    console.log('products came');

    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, [setProducts]);

  const fetchProducts = async () => {
    try {

      setLoading(true)
      const res = await fetch(`${apiUrl}/scrape?productName=${searchInput}`);
      const data = await res.json();

      setProducts(data);
      setSearchInput('')

    }
    catch (error) {
      setError('An error occurred');
    }
    finally {
      setLoading(false)
    }

  }

  const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      searchProduct(e);
      setFilter('')
    }
  }

  const searchProduct = (e: any) => {
    e.preventDefault();
    if (searchInput.trim() === '') {

      toast.error('Please enter a product!');
      return;
    }
    else {
      fetchProducts();
      setFilter('')
    }
  }

  const toggleFavorite = (product: Product | any, marketName: string) => {
    const exists = favorites.some((fav) => fav.id === product.id)

    let updated;


    if (exists) {
      updated = favorites.filter((fav) => fav.id != product.id);
      setFavorites(updated)
    }
    else {
      updated = [...favorites, {...product, marketName}]
      setFavorites(updated);
    }
    console.log(updated);
    
    localStorage.setItem('favorites', JSON.stringify(updated));

  }

  const getFilteredProducts = (filterType: string) => {

    let filtered: any = {};


    Object.entries(products).forEach(([marketName, marketProducts]) => {
      let sorted = [...marketProducts]

      if (filterType == 'lowest') {
        sorted.sort((a, b) => parseFloat(a.salePrice) - parseFloat(b.salePrice));
      } else if (filterType === "highest") {
        sorted.sort((a, b) => parseFloat(b.salePrice) - parseFloat(a.salePrice));
      } else if (filterType === "discount") {
        sorted = sorted.filter((p) => p.previousPrice);
      }

      filtered[marketName] = sorted;
    })

    setProducts(filtered)

  }

  useEffect(() => {

    if (Object.keys(products).length > 0) {
      localStorage.setItem("products", JSON.stringify(products));
    }
  }, [products]);

  if (error) {
    return (
      <div className='text-center px-4 py-8'>
        <p className='text-red-600 text-xl'>Error: {error}</p>
        <button
          onClick={fetchProducts}
          className='flex items-center gap-1.5 cursor-pointer mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
        >
          <HiOutlineRefresh />
          Retry
        </button>
      </div>
    );
  }

  // const filteredProducts = getFilteredProducts();

  return (
    !loading ? (<div className="w-full max-w-3xl m-auto">
      <p className='text-2xl mb-6'>Products</p>

      <div className='relative'>
        <form onSubmit={searchProduct} className="flex flex-wrap items-center gap-3">
          <div className="relative " >

            <input
              type="text"
              onChange={(e) => setSearchInput(e.target.value)}
              className='text-md pl-12 py-3 text-gray-700 bg-gray-200 rounded-xl p-2 focus:outline-none focus:border-2 border-transparent focus:border-blue-500 transition-colors'
              placeholder='Məhsul axtar...'
              value={searchInput}
              onKeyDown={handleKeyDown}
            />
            <i className='text-gray-500 text-3xl bx  bx-search absolute left-3 top-1/2 -translate-y-1/2'  ></i>
          </div>

          <button
            className='cursor-pointer active:scale-95 duration-150 text-md bg-blue-500 text-white px-4 py-3 rounded-lg ml-3 hover:bg-blue-600 transition-colors'>
            Axtar
          </button>

          <select
            value={filter}
            onChange={(e) => {
              setFilter(e.target.value);
              getFilteredProducts(e.target.value);
            }}

            className="cursor-pointer bg-gray-200 text-ggray-700 py-3 px-3 rounded-lg focus:outline-none">
            <option value="" disabled >Filter</option>
            <option value="lowest">Lowest to Highest</option>
            <option value="highest">Highest to Lowest</option>
            <option value="discount">Discounts Only</option>

          </select>

          <Link to={'/favorites'} title="Favorites">
            <button className="self-baseline cursor-pointer bg-amber-400 rounded px-2 py-2  text-red-500 hover:scale-120 transition-transform"
            >
              <FaStar size={26} />
            </button>
          </Link>
        </form>
      </div>


      {
        Object.entries(products).map(([marketName, marketProducts]) => (
          <div className="mt-8" key={marketName}>

            {
              marketProducts.map((product: any, index: number) => (
                <div key={index} className="text-sm sm:text-lg md:text-2xl border rounded-lg border-gray-300 p-4 mb-3 flex items-center gap-4">

                  <img className="w-20 h-20 object-contain" src={product.imgSrc.startsWith('//') ? `https:${product.imgSrc}` : product.imgSrc} alt={product.name} />
                  <div className="flex flex-col">

                    <h2 className="text-lg text-gray-800 font-semibold ">{product.name}</h2>
                    <p className="font-bold text-lg text-blue-600">{product.salePrice}</p>
                    <p className="text-lg text-gray-600 line-through">  {product.previousPrice != '' && product.previousPrice}</p>

                    <p className="font-semibold text-sm text-gray-600 flex items-center">
                      <FaMapMarkerAlt className="text-gray-500 inline mr-1" />
                      {marketName}
                    </p>
                  </div>
                  <div className="ml-auto flex flex-col gap-3.5 self-baseline">
                    <button
                    title="Add to Favorite"
                      className="self-baseline ml-auto cursor-pointer text-red-500 hover:scale-120 transition-transform"
                      onClick={() => toggleFavorite(product, marketName)}

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
              ))
            }
          </div>

        ))


      }
      <ToastContainer position="top-center" hideProgressBar={false} autoClose={2200} />

    </div>) : <Loader />
  )
}

export default Products