import { useEffect, useState } from 'react';

function useTheme() {
    const [theme, setTheme] = useState('winter');

    useEffect(() => {
        const updateTheme = () => {
            const current = document.documentElement.getAttribute('data-theme');
            setTheme(current || 'winter');
        };

        // Run once on mount
        updateTheme();

        const observer = new MutationObserver(() => {
            const currentTheme = document.documentElement.getAttribute('data-theme');
            setTheme(currentTheme || 'winter');
        });
        observer.observe(document.documentElement, {
            attributes: true,
            attributeFilter: ['data-theme'],
        });

        return () => observer.disconnect();
    }, []);

    return theme;
}

export default useTheme;