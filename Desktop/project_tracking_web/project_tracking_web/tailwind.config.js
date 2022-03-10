module.exports = {
  content: [
    './pages/**/*.{js,jsx,ts,tsx}',
    // './components/**/*.{js,jsx,ts,tsx}',
    './shared/**/*.{js,jsx,ts,tsx}'
  ],
  theme: {
    extend: {
        colors: {
            'bgcolor': '#F1D7F3',
            'textwhite': '#fff',  
            'primary': '#6C7EB5',  
            'secondary': '#95B0FF',  
            'field': '#97b0fb36',
            'btncolor': '#CE89BC',
            'para': ' #000000ab',
            'bgbox': ' #DEE3FE',
            'bggray': '  #c4c4c466',
            'bgblue': '  #4E4EE7',  
        },
        fontFamily: ['Eudoxus Sans', 'Inter']
    },
},
  plugins: [],
}