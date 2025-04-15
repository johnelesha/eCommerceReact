import { useState, useEffect } from "react";
import { Range } from "react-range";
import useTheme from "../../hooks/useTheme";

const PriceFilter = ({ onPriceChange }) => {
    const theme = useTheme();
    const oneTheme = theme === "winter" ? "from-sky-900" : "from-gray-300";
    const twoTheme = theme === "winter" ? "to-sky-950" : "to-gray-400";
    const thumbTheme = theme === "winter" ? "bg-sky-950" : "bg-gray-300";

    const MIN = 0;
    const MAX = 200;

    const [values, setValues] = useState([MIN, MAX]);

    useEffect(() => {
        onPriceChange(values);
    }, [values]);

    return (
        <>
            <div className="flex flex-col items-center gap-2 w-full max-w-sm">
                <label className="font-semibold">Filter by Price</label>

                <Range
                    step={1}
                    min={MIN}
                    max={MAX}
                    values={values}
                    onChange={setValues}
                    renderTrack={({ props, children }) => (
                        <div
                            {...props}
                            className={`rounded-md bg-gradient-to-r ${oneTheme} ${twoTheme} h-2 w-full`}
                        >
                            {children}
                        </div>
                    )}
                    renderThumb={({ props }) => {
                        const { key, ...restProps } = props;
                        return (
                            <div
                                key={key}
                                {...restProps}
                                className={`${thumbTheme} border-2 border-base-100 h-6 w-6 rounded-full cursor-pointer`}
                            />
                        );
                    }}
                />

                <div className="text-sm text-gray-400">
                    ${values[0]} - ${values[1]}
                </div>
            </div>
        </>
    );
};

export default PriceFilter;
