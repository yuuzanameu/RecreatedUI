import { createContext, useState, useEffect} from 'react';

export type CardFields = {
    id: string; 
    name: string;
    role: string;
    email: string;
    phone: string;
    course: string;
    status: string;
};

type GlobalContextType = {
    cards: CardFields[];
    addCard: (card: CardFields) => void;
    deleteCard: (id: string) => void; 
};

export const GlobalContext = createContext<GlobalContextType>({
    cards: [],
    addCard: () => {},
    deleteCard: () =>{}
});


export const GlobalProvider: React.FC<{children: React.ReactNode}> = ({ children }) => {
    const [cards, setCards] = useState<CardFields[]>([]);

    const addCard = (card: CardFields) => {
        setCards((prevCards) => [...prevCards, card]);
    };
    
    const deleteCard = (id: string) => {
        setCards((prevCards) => prevCards.filter((card) => card.id !== id));
    }

    useEffect(() => {
        const fetchCards = async () => {
            const response = await fetch('http://project.editnow.site/api/cards');
            const data: CardFields[] = await response.json();
            setCards(data);
        };
        fetchCards();
    }, []);


    return (
        <GlobalContext.Provider value={{ cards, addCard, deleteCard }}>
            {children}
        </GlobalContext.Provider>
    );
};

