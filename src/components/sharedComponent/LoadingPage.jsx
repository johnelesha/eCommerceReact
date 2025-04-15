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
