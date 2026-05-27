/** @type {import('tailwindcss').Config} */
export default {
    darkMode: 'selector',
    theme: {
        extend: {
            colors: {
                light: {
                    bg: '#ffffff',
                    text: '#000000',
                    primary: '#ffffff',
                    secondary: '#87ceeb',
                    accent: '#87ceeb',
                },
                dark: {
                    bg: '#000000',
                    text: '#ffffff',
                    primary: '#000000',
                    secondary: '#ffd700',
                    accent: '#ffd700',
                },
            },
        },
    },
    plugins: [],
};
