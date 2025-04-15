import useTheme from "../../hooks/useTheme";

const SearchBar = ({ searchTerm, onSearch }) => {
    const theme = useTheme();
    const textBarColor = theme === "winter" ? "text-neutral" : "text-neutral";
    const bgBarBg = theme === "winter" ? "bg-gray-100" : "bg-base-content";

    return (
        <>
            <input
                type="text"
                placeholder="Search by name"
                className={`input input-bordered w-full md:w-auto ${bgBarBg} ${textBarColor} border-gray-400 rounded-3xl`}
                value={searchTerm}
                onChange={(e) => onSearch(e.target.value)}
            />
        </>
    );
};

export default SearchBar;
