import { useMemo } from "react";

const useAverageRating = (rates = []) => {
    return useMemo(() => {
        if (!Array.isArray(rates) || rates.length === 0) return 0;
        const total = rates.reduce((acc, rateObj) => acc + rateObj.rated, 0);
        const average = total / rates.length;
        return Math.round(average * 2) / 2;
    }, [rates]);
};

export default useAverageRating;
