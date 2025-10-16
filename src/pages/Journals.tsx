import { useEffect, useState } from 'react'
import Loader from '../components/Loader';
import { useAppContext } from '../context/Context';




const Journals = () => {
    const apiUrl = import.meta.env.VITE_API_URL;

    const { journals, setJournals } = useAppContext()

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        
        fetchJournals()
    }, [])

    const fetchJournals = async () => {

        if (journals.length > 0) {            
            return
        }        
        
        try {
            setLoading(true)
            const res = await fetch(`${apiUrl}/scrape-journal`)
            if (!res.ok) {
                throw new Error('Failed to fetch journals');
            }

            const data = await res.json()

            setJournals(data);

        } catch (err) {
            setError('An error occurred');
        } finally {
            setLoading(false);
        }
    }


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
                    Retry
                </button>
            </div>
        );
    }
    return (
        <div className='text-center '>
            <p className='text-2xl mb-6'>Journals</p>


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