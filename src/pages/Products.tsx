import { useEffect, useRef, useState } from "react";
import { toast, ToastContainer } from "react-toastify";
import { FaAngleDoubleUp, FaMapMarkerAlt, FaRegStar, FaStar } from "react-icons/fa";
import Loader from "../components/Loader";
import { useAppContext, type Product } from "../context/Context";
import { HiOutlineRefresh } from "react-icons/hi";
import { IoIosCloseCircle } from "react-icons/io";
import { Link } from "react-router";

const Products = () => {

  const { products, setProducts, favorites, setFavorites } = useAppContext()

  const [searchInput, setSearchInput] = useState<string>('');

  const [filter, setFilter] = useState<string>('');
  const [selectedMarkets, setSelectedMarkets] = useState<string[]>([]);

  const dropdownRef = useRef<HTMLDetailsElement | null>(null);


  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const [modal, setModal] = useState(false);
  const [showScrollTop, setShowScrollTop] = useState(false);


  const [selectedImg, setSelectedImg] = useState<string | null>(null)


  const apiUrl = import.meta.env.VITE_API_URL

  const toggleMarketSelection = (marketName: string) => {
    setSelectedMarkets((prev) => {
      if (prev.includes(marketName)) {
        return prev.filter((m) => m !== marketName);
      } else {
        return [...prev, marketName];
      }
    });
  };

  useEffect(() => {
    const handleScroll = () => {
      if (window.scrollY > 300) {
        setShowScrollTop(true);
      } else {
        setShowScrollTop(false);
      }
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const handleImageClick = (imgSrc: string) => {
    setSelectedImg(imgSrc.startsWith("//") ? `https:${imgSrc}` : imgSrc)
    setModal(true)
  }

  const closeModal = () => {
    setModal(false);
    setSelectedImg(null);
  };

  useEffect(() => {

    const saved = localStorage.getItem('favorites');
    if (saved) setFavorites(JSON.parse(saved));

    const handleClickOutside = (event: MouseEvent) => {
      if (
        dropdownRef.current &&
        !dropdownRef.current.contains(event.target as Node)
      ) {
        dropdownRef.current.removeAttribute("open"); // closes <details>

      }
    };

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [])

  useEffect(() => {

    localStorage.setItem('favorites', JSON.stringify(favorites));
  }, [favorites]);

  useEffect(() => {

    const savedProducts = localStorage.getItem("products");
    if (savedProducts) {
      setProducts(JSON.parse(savedProducts));
    }
  }, [setProducts]);

  const fetchProducts = async () => {
    try {

      setLoading(true)
      const res = await fetch(`${apiUrl}/proxy/scrape?productName=${searchInput}`);
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
      updated = [...favorites, { ...product, marketName }]
      setFavorites(updated);
    }

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

            {/* <optgroup label="Filter by Price"> */}
            <option value="" label="Filter" >Filter</option>
            <option value="lowest">Lowest to Highest</option>
            <option value="highest">Highest to Lowest</option>
            <option value="discount">Discounts Only</option>
            {/* </optgroup> */}

          </select>

          <div className="relative">
            <details ref={dropdownRef} className="bg-gray-200 rounded-lg px-3 py-3 cursor-pointer">

              <summary className="font-semibold text-gray-700"
              >
                Filter by Markets
              </summary>

              <div className="absolute bg-white border border-gray-300 rounded-lg mt-2 p-3 w-48 z-40 shadow-md">
                {Object.keys(products).length === 0 && (
                  <p className="text-gray-500 text-sm">No markets yet</p>
                )}
                {Object.keys(products).map((marketName) => (
                  <label key={marketName} className="flex items-center gap-2 py-1 cursor-pointer">
                    <input
                      type="checkbox"
                      checked={selectedMarkets.includes(marketName)}
                      onChange={() => toggleMarketSelection(marketName)}
                    />
                    <span className="text-gray-700">{marketName}</span>
                  </label>
                ))}
                {Object.keys(products).length > 1 && (
                  <button
                    type="button"
                    className="text-sm text-blue-600 mt-2 hover:underline"
                    onClick={() => {
                      if (selectedMarkets.length === Object.keys(products).length) {
                        setSelectedMarkets([]);
                      } else {
                        setSelectedMarkets(Object.keys(products));
                      }
                    }}
                  >
                    {selectedMarkets.length === Object.keys(products).length
                      ? "Clear All"
                      : "Select All"}
                  </button>
                )}
              </div>

            </details>
          </div>

          <Link to={'/favorites'} title="Favorites">
            <button className="self-baseline cursor-pointer bg-amber-400 rounded px-2 py-2  text-red-500 hover:scale-120 transition-transform"
            >
              <FaStar size={26} />
            </button>
          </Link>
        </form>
      </div>


      {
        Object.entries(products).filter(([marketName]) => selectedMarkets.length === 0 || selectedMarkets.includes(marketName)).map(([marketName, marketProducts]) => (
          <div className="mt-8" key={marketName}>

            {
              marketProducts.map((product: any, index: number) => (
                <div key={index} className="text-sm sm:text-lg md:text-2xl border rounded-lg border-gray-300 p-4 mb-3 flex items-center gap-4">

                  <img
                    className="cursor-pointer w-20 h-20 object-contain"
                    src={product.imgSrc ?
                      (product.imgSrc.startsWith('//') ? `https:${product.imgSrc}` : product.imgSrc) : null} alt={product.name}
                    onClick={() => handleImageClick(product.imgSrc)}
                  />
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

      {
        modal && selectedImg && (
          <div
            className="fixed inset-0 p-5 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50"
            onClick={closeModal}
          >
            <div
              className="relative bg-white p-2 rounded-xl shadow-lg"
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="cursor-pointer absolute top-2 right-3 text-black text-xl font-bold hover:text-red-600"
                onClick={closeModal}
              >
                <IoIosCloseCircle size={26} />
              </button>
              <img
                src={selectedImg}
                alt="Product"
                className="w-[420px] h-[420px] object-contain rounded-lg"
              />
            </div>
          </div>
        )
      }
      <ToastContainer position="top-center" hideProgressBar={false} autoClose={2200} />

      {
        showScrollTop && (
          <button
            onClick={scrollToTop}
            title="Scroll to Top"
            className="cursor-pointer fixed bottom-6 right-6 bg-blue-600 hover:bg-blue-700 text-white p-3 rounded-full shadow-lg transition-transform transform hover:scale-110"
          >
            <FaAngleDoubleUp size={20} />

          </button>)
      }
    </div>) : <Loader />
  )
}

export default Products