/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        bg: {
          primary: '#F7F3EA',
          secondary: '#EFE9DC',
          card: '#FFFFFF',
          subtle: '#EAE3D2',
        },
        ink: {
          primary: '#171717',
          secondary: '#77736C',
          muted: '#9E9A92',
        },
        accent: {
          orange: '#F47B35',
          'orange-hover': '#DF6622',
          yellow: '#F5D77E',
          'yellow-light': '#FDF5D8',
          green: '#2DA44E',
        },
        borderline: {
          DEFAULT: '#E3DCCF',
          dark: '#171717',
          light: '#ECE5D8',
        }
      },
      fontFamily: {
        grotesk: ['"Space Grotesk"', 'sans-serif'],
        sans: ['"DM Sans"', 'sans-serif'],
        editorial: ['"Playfair Display"', 'serif'],
      },
      boxShadow: {
        'brutal': '4px 4px 0px #171717',
        'brutal-lg': '8px 8px 0px #171717',
        'brutal-sm': '2px 2px 0px #171717',
        'brutal-orange': '4px 4px 0px #F47B35',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
        'pulse-subtle': 'pulseSubtle 3s ease-in-out infinite',
        'spin-slow': 'spin 20s linear infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-10px)' },
        },
        pulseSubtle: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.85', transform: 'scale(1.03)' },
        }
      }
    },
  },
  plugins: [],
}

