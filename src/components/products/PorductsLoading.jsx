const ProductsLoading = () => {
    return (
        <>
            <div className="card p-4 bg-white shadow-md rounded-lg h-[430px] flex flex-col justify-between">
                <div>
                    {/* Image skeleton */}
                    <div className="skeleton h-44 w-full rounded-md mb-4"></div>

                    {/* Title & Rating */}
                    <div className="flex justify-between items-center mb-2">
                        <div className="skeleton h-5 w-32 rounded"></div>
                        <div className="skeleton h-5 w-10 rounded"></div>
                    </div>

                    {/* Description */}
                    <div className="space-y-2 mb-3">
                        <div className="skeleton h-4 w-full rounded"></div>
                        <div className="skeleton h-4 w-full rounded"></div>
                        <div className="skeleton h-4 w-3/4 rounded"></div>
                    </div>

                    {/* Price */}
                    <div className="skeleton h-5 w-20 rounded"></div>
                </div>

                {/* Bottom controls */}
                <div className="flex justify-between items-center gap-2 mt-3">
                    <div className="skeleton h-10 w-24 rounded"></div>
                    <div className="skeleton h-10 w-10 rounded-full"></div>
                </div>
            </div>
        </>
    );
};

export default ProductsLoading;
