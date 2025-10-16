import { createContext, useContext, useState } from "react";

interface Journal {
    journalUrl: string;
    imgUrl: string;
}

interface Product {
    name: string;
    imgSrc: string;
    salePrice: string;
    previousPrice?: string | null;
}
interface MarketProducts {
    [marketName: string]: Product[]
}

interface AppContextType {
    journals: Journal[],
    setJournals: React.Dispatch<React.SetStateAction<Journal[]>>,

    products: MarketProducts,
    setProducts: React.Dispatch<React.SetStateAction<MarketProducts>>
    //   loading: boolean
    //   setLoading: React.Dispatch<React.SetStateAction<boolean>>
    //   user: User | null
    //   setUser: React.Dispatch<React.SetStateAction<User | null>>
    //   theme: 'light' | 'dark'
    //   setTheme: React.Dispatch<React.SetStateAction<'light' | 'dark'>>
}



const AppContext = createContext<AppContextType | undefined>(undefined)


export const AppProvider = ({ children }: { children: any }) => {
    const [journals, setJournals] = useState<Journal[]>([])
    const [products, setProducts] = useState<MarketProducts>({})


    const data = {
        journals, setJournals,
        products, setProducts
    }


    return (
        <AppContext.Provider value={data}>
            {children}
        </AppContext.Provider>
    )
}

export const useAppContext = () => {
    const ctx = useContext(AppContext);
    if (!ctx) throw new Error('useAppContext must be used within AppProvider')
    return ctx;
}