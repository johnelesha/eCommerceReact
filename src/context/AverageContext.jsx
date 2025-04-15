import { createContext, useState, useCallback } from "react";

export const AverageProvider = createContext();

const AverageContext = ({ children }) => {
    const [averageRates, setAverageRates] = useState({});

    const updateAverage = useCallback((productId, rates) => {
        if (!rates || rates.length === 0) return;

        const total = rates.reduce((acc, rateObj) => acc + rateObj.rated, 0);
        const average = Math.round((total / rates.length) * 2) / 2;

        setAverageRates((prev) => ({
            ...prev,
            [productId]: average,
        }));
    }, []);

    return (
        <AverageProvider.Provider value={{ averageRates, updateAverage }}>
            {children}
        </AverageProvider.Provider>
    );
};

export default AverageContext;
