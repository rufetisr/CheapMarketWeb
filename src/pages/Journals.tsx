import { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { useAppContext } from '../context/Context';
import { HiOutlineRefresh } from "react-icons/hi";




const Journals = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { journals, setJournals } = useAppContext()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const saved = localStorage.getItem("journals");
        const savedTime = localStorage.getItem("journalsTimestamp");
        const now = Date.now();

        // Check if cache is valid (< 24h old)
        if (saved && savedTime && now - Number(savedTime) < 24 * 60 * 60 * 1000) {
            setJournals(JSON.parse(saved));
        } else {
            fetchJournals();
        }
    }, [])



    const fetchJournals = async () => {

        try {
            setLoading(true)
            const res = await fetch(`${apiUrl}/scrape-journal`)
            if (!res.ok) {
                throw new Error('Failed to fetch journals');
            }

            const data = await res.json()

            setJournals(data);

            localStorage.setItem("journals", JSON.stringify(data));
            localStorage.setItem("journalsTimestamp", Date.now().toString());

        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    }


    const handleRefresh = () => {
        localStorage.removeItem("journals");
        localStorage.removeItem("journalsTimestamp");
        fetchJournals();
    };


    if (loading) {
        return <Loader />;
    }

    if (error) {
        return (
            <div className='text-center'>
                <p className='text-red-600 text-xl'>Error: {error}</p>
                <button
                    onClick={fetchJournals}
                    className='cursor-pointer mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700'
                >
                    <HiOutlineRefresh />

                    Retry
                </button>
            </div>
        );
    }
    return (
        <div className='text-center '>
            <p className='text-2xl mb-6'>Journals</p>

            <button
                onClick={handleRefresh}
                className='ml-auto cursor-pointer flex items-center gap-1.5 mb-6 px-4 py-2 bg-green-600 text-white rounded hover:bg-green-700 active:scale-95 transition-all'
            >
                <HiOutlineRefresh className='text-2xl'/>
                Refresh Journals
            </button>

            <div className='flex flex-wrap justify-center gap-4'>
                {
                    journals.length > 0 ?
                        (
                            journals.map((journal, i) => {
                                return (
                                    <div key={i} className='w-full max-w-[260px] mx-auto'>
                                        <a href={journal?.journalUrl} target='_blank' >
                                            <img className='w-full h-auto hover:scale-105' src={journal?.imgUrl} alt="Market Journal" />
                                        </a>
                                    </div>

                                )
                            })
                        ) : <p>No journals available</p>
                }


            </div>
        </div>

    )
}

export default Journals