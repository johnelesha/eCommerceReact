import PriceFilter from "./PriceFilter";
import SearchBar from "./SearchBar";
import GenderDropdown from "./GenderDropdown";
import AllCategoriesDropdown from "./AllCategoriesDropdown";
import useTheme from "../../hooks/useTheme";

const FilterBar = ({ searchTerm, onSearch, onFilterSelect, onPriceChange }) => {
    const categories = [
        "Skincare",
        "Haircare",
        "Shaving",
        "Perfumes",
        "Makeup",
        "Body Care"
    ];
    const theme = useTheme();
    const bgCard = theme === "night" ? "bg-base-200" : "bg-gray-100";
    const dropdownBtnClass = `btn border-0 hover:border-b-4 hover:border-b-gray-400 ${bgCard} transition-all duration-200 md:btn-md lg:btn-lg xl:btn-xl w-full outline-none`;

    return (
        <>
            <div className={`flex flex-col md:flex-row justify-between items-center gap-4 py-5 px-2 ${bgCard} border-b-2 border-b-base-300 shadow-xs shadow-neutral-content mb-3`}>
                <div className="flex flex-col md:flex-row gap-0 md:gap-2 lg:gap-4">
                    <div className="w-60 md:w-30">
                        <AllCategoriesDropdown onFilterSelect={onFilterSelect}
                            categories={categories}
                            dropdownClass={dropdownBtnClass} />
                    </div>
                    <div className="w-60 md:w-30">
                        <GenderDropdown gender="Men"
                            onFilterSelect={onFilterSelect}
                            categories={categories}
                            dropdownClass={dropdownBtnClass} />
                    </div>
                    <div className="w-60 md:w-30">
                        <GenderDropdown gender="Women" onFilterSelect={onFilterSelect}
                            categories={categories}
                            dropdownClass={dropdownBtnClass} />
                    </div>
                </div>
                <div className="flex gap-3 md:gap-4 lg:gap-10 items-center flex-col md:flex-row w-full md:w-auto">
                    <div className="w-60 md:w-40 lg:w-60">
                        <PriceFilter onPriceChange={onPriceChange} />
                    </div>
                    <div className="w-60 md:w-50">
                        <SearchBar searchTerm={searchTerm} onSearch={onSearch} />
                    </div>
                </div>
            </div>
        </>
    );
};

export default FilterBar;