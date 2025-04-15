import { useEffect, useState } from "react";
import { FaRegArrowAltCircleUp } from "react-icons/fa";
import { FaCircleArrowUp } from "react-icons/fa6";
import useTheme from "../../hooks/useTheme";

const BackToTop = () => {
    const [showButton, setShowButton] = useState(false);
    const theme = useTheme();

    useEffect(() => {
        const handleScroll = () => {
            setShowButton(window.scrollY > 300);
        };

        window.addEventListener("scroll", handleScroll);
        return () => window.removeEventListener("scroll", handleScroll);
    }, []);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: "smooth",
        });
    };

    const Icon = theme === "night" ? FaCircleArrowUp : FaRegArrowAltCircleUp;
    const bgColor = theme === "winter" ? "bg-base-content" : "bg-violet-600";

    return (
        <>
            {showButton && (
                <button
                    onClick={scrollToTop}
                    className={`btn btn-circle fixed bottom-15 right-5 text-3xl ${bgColor} text-white hover:bg-primary-focus shadow-lg transition-all z-50`}
                    aria-label="Back to top"
                >
                    <Icon />
                </button>
            )}
        </>
    );
};

export default BackToTop;
