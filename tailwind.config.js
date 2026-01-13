/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./index.html",
        "./src/**/*.{js,ts,jsx,tsx}",
    ],
    theme: {
        extend: {
            colors: {
                'reflex-dark-card': '#1a1a1a',
                'reflex-border-light': '#333333',
                'reflex-teal': '#14b8a6',
                'reflex-button-text': '#ffffff',
            }
        },
    },
    plugins: [],
}

