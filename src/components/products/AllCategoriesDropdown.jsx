const AllCategoriesDropdown = ({ onFilterSelect, categories, dropdownClass }) => {
    return (
        <>
            <div className="dropdown dropdown-hover w-full md:w-30">
                <div tabIndex={0} role="button" className={dropdownClass}>All</div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-200 rounded-box w-full md:w-30">
                    <li><a onClick={() => onFilterSelect("", "")}>Clear ..</a></li>
                    {categories.map((cat, i) => (
                        <li key={i}>
                            <a onClick={() => onFilterSelect("", cat)}>{cat}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default AllCategoriesDropdown;
