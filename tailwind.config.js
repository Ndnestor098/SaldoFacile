import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Figtree', ...defaultTheme.fontFamily.sans],
            },
            colors: {
                primary: '#F8FAFC',
                secondary: '#D9EAFD',
                tertiary: '#BCCCDC',
                quaternary: '#4d4d4d',
                sixth: '#5d708e',
                seventh: '#385d81',
                fifth: '#526980',
                green_primary: '#BBD8A3',
                red_primary: '#FF8383',
            },
        },
    },

    darkMode: 'class',

    plugins: [forms],
};
