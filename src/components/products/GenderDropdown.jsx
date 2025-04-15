const GenderDropdown = ({ gender, onFilterSelect, categories, dropdownClass }) => {
    return (
        <>
            <div className="dropdown dropdown-hover w-full md:w-30">
                <div tabIndex={0} role="button" className={dropdownClass}>{gender}</div>
                <ul tabIndex={0} className="dropdown-content menu p-2 shadow bg-base-100 rounded-box w-full md:w-30">
                    <li><a onClick={() => onFilterSelect(gender, "")}>All Products</a></li>
                    {categories.map((cat, i) => (
                        <li key={i}>
                            <a onClick={() => onFilterSelect(gender, cat)}>{cat}</a>
                        </li>
                    ))}
                </ul>
            </div>
        </>
    );
};

export default GenderDropdown;
