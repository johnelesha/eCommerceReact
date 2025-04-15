const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
            <div className="flex items-center gap-4 text-6xl font-semibold text-gray-800 shadow-lg p-6 rounded-lg">
                <span>Loading</span>
                <span className="loading loading-spinner text-success w-20 h-20"></span>
            </div>
        </div>
    );
};

export default LoadingPage;


/* const LoadingPage = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-base-100">
            <div className="flex items-center gap-4 p-8 bg-white rounded-xl shadow-2xl drop-shadow-lg">
                <span className="text-6xl font-extrabold drop-shadow text-gray-800">Loading</span>
                <span className="loading loading-spinner text-success w-20 h-20"></span>
            </div>
        </div>
    );
};

export default LoadingPage; */
