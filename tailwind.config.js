/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        background: {
          DEFAULT: '#F8FAFC',
          dark: '#0B1220',
        },
        surface: {
          DEFAULT: '#FFFFFF',
          dark: '#111827',
        },
        elevated: {
          DEFAULT: '#F1F5F9',
          dark: '#1F2937',
        },
        border: {
          DEFAULT: '#E2E8F0',
          dark: '#1E293B',
        },
        text: {
          DEFAULT: '#0F172A',
          dark: '#F1F5F9',
        },
        muted: {
          DEFAULT: '#64748B',
          dark: '#94A3B8',
        },
        subtle: {
          DEFAULT: '#CBD5E1',
          dark: '#475569',
        },
        primary: {
          DEFAULT: '#1565C0',
          hover: '#0D47A1',
          light: {
            DEFAULT: '#E3F2FD',
            dark: '#1E3A5F',
          },
        },
        secondary: {
          DEFAULT: '#64748B',
          light: {
            DEFAULT: '#F1F5F9',
            dark: '#1E293B',
          },
        },
        success: {
          DEFAULT: '#2E7D32',
          light: {
            DEFAULT: '#E8F5E9',
            dark: '#1B3A1F',
          },
        },
        warning: {
          DEFAULT: '#B45309',
          light: {
            DEFAULT: '#FFF7ED',
            dark: '#3D2A04',
          },
        },
        error: {
          DEFAULT: '#C62828',
          light: {
            DEFAULT: '#FFEBEE',
            dark: '#3B1414',
          },
        },
        info: {
          DEFAULT: '#0277BD',
          light: {
            DEFAULT: '#E1F5FE',
            dark: '#143B52',
          },
        },
      },
      fontFamily: {
        display: ['Geist', 'Inter', 'system-ui', 'sans-serif'],
        body: ['Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-in-out',
        'slide-up': 'slideUp 0.4s ease-out',
        'slide-down': 'slideDown 0.3s ease-in',
        'pulse-dot': 'pulseDot 2s infinite',
        'animate-in': 'animateIn 0.3s ease-out',
        'spin-slow': 'spin 3s linear infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(20px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        pulseDot: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.5' },
        },
        animateIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      borderRadius: {
        'xl': '0.75rem',
        '2xl': '1rem',
      },
      boxShadow: {
        'sm': '0 1px 3px 0 rgba(0,0,0,0.06), 0 1px 2px -1px rgba(0,0,0,0.04)',
        'md': '0 4px 6px -1px rgba(0,0,0,0.08), 0 2px 4px -2px rgba(0,0,0,0.06)',
        'lg': '0 10px 15px -3px rgba(0,0,0,0.10), 0 4px 6px -4px rgba(0,0,0,0.08)',
      },
    },
  },
  plugins: [],
};
