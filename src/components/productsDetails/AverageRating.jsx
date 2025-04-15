const AverageRating = ({ averageRating }) => {
    return (
        <>
            <div className="flex items-center gap-1">
                <span className="font-bold text-sm">{averageRating.toFixed(1)}</span>
                <div className="rating rating-xs rating-half pointer-events-none">
                    {Array.from({ length: 10 }, (_, i) => {
                        const starValue = (i + 1) / 2;
                        const isFilled = averageRating >= starValue;
                        return (
                            <input
                                key={i}
                                type="radio"
                                name="average-rating"
                                className={`mask mask-star-2 ${i % 2 === 0 ? "mask-half-1" : "mask-half-2"} ${isFilled ? "bg-yellow-400 opacity-100" : "bg-gray-300 opacity-50"}`}
                                checked={false}
                                readOnly
                            />
                        );
                    })}
                </div>
            </div>
        </>
    );
};

export default AverageRating;
