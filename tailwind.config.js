const defaultTheme = require('tailwindcss/defaultTheme');
const colors = require('tailwindcss/colors');

/** @type {import('tailwindcss').Config} */
module.exports = {
    content: ['./src/**/*.{js,ts,jsx,tsx}'],
    theme: {
        container: {
            center: true,
            padding: {
                DEFAULT: '0.5rem',
                sm: '1rem',
                md: '2rem',
                lg: '4rem',
                xl: '8rem',
                '2xl': '16rem',
            },
        },
        extend: {
            fontFamily: {
                primary: [
                    'var(--primary-font)',
                    ...defaultTheme.fontFamily.sans,
                ],
            },
            colors: {
                gray: colors.neutral,
                primary: colors.indigo,
            },
        },
    },
    plugins: [],
};
