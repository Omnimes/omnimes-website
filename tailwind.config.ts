const { nextui } = require('@nextui-org/react')
const { fontFamily } = require('tailwindcss/defaultTheme')
const colors = require('tailwindcss/colors')

/** @type {import("tailwindcss/types").Config } */
module.exports = {
  content: [
    './src/**/*.{html,js,jsx,tsx}',
    './node_modules/pliny/**/*.js',
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layouts/**/*.{js,ts,tsx}',
    './src/contexts/**/*.{js,ts,tsx}',
    './src/data/**/*.mdx',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      flex: {
        '0a': '0 auto',
      },
      boxShadow: {
        video: '0 0px 25px 10px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1)',
        'video-dark':
          '0 0px 25px 10px rgb(255 255 255 / 0.1), 0 4px 6px -4px rgb(255 255 255 / 0.1)',
      },
      animation: {
        "accordion-down": "accordion-down 0.2s ease-out",
        "accordion-up": "accordion-up 0.2s ease-out",
        'infinite-scroll': 'infinite-scroll 25s linear infinite',
        'text-slide': 'text-slide 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        'text-slide-2': 'text-slide-2 5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        'text-slide-3': 'text-slide-3 7.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        'text-slide-4': 'text-slide-4 10s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        'text-slide-5': 'text-slide-5 12.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        'text-slide-6': 'text-slide-6 15s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        'text-slide-7': 'text-slide-7 17.5s cubic-bezier(0.83, 0, 0.17, 1) infinite',
        'text-slide-8': 'text-slide-8 20s cubic-bezier(0.83, 0, 0.17, 1) infinite',
      },
      keyframes: {
        "accordion-down": {
          from: { height: "0" },
          to: { height: "var(--radix-accordion-content-height)" },
        },
        "accordion-up": {
          from: { height: "var(--radix-accordion-content-height)" },
          to: { height: "0" },
        },
        'infinite-scroll': {
          from: { transform: 'translateX(0)' },
          to: { transform: 'translateX(-100%)' },
        },
        'text-slide': {
          '0%, 16%': {
            transform: 'translateY(0%)',
          },
          '20%, 36%': {
            transform: 'translateY(-16.66%)',
          },
          '40%, 56%': {
            transform: 'translateY(-33.33%)',
          },
          '60%, 76%': {
            transform: 'translateY(-50%)',
          },
          '80%, 96%': {
            transform: 'translateY(-66.66%)',
          },
          '100%': {
            transform: 'translateY(-83.33%)',
          },
        },
        'text-slide-2': {
          '0%, 40%': {
            transform: 'translateY(0%)',
          },
          '50%, 90%': {
            transform: 'translateY(-33.33%)',
          },
          '100%': {
            transform: 'translateY(-66.66%)',
          },
        },
        'text-slide-3': {
          '0%, 26.66%': {
            transform: 'translateY(0%)',
          },
          '33.33%, 60%': {
            transform: 'translateY(-25%)',
          },
          '66.66%, 93.33%': {
            transform: 'translateY(-50%)',
          },
          '100%': {
            transform: 'translateY(-75%)',
          },
        },
        'text-slide-4': {
          '0%, 20%': {
            transform: 'translateY(0%)',
          },
          '25%, 45%': {
            transform: 'translateY(-20%)',
          },
          '50%, 70%': {
            transform: 'translateY(-40%)',
          },
          '75%, 95%': {
            transform: 'translateY(-60%)',
          },
          '100%': {
            transform: 'translateY(-80%)',
          },
        },
        'text-slide-5': {
          '0%, 16%': {
            transform: 'translateY(0%)',
          },
          '20%, 36%': {
            transform: 'translateY(-16.66%)',
          },
          '40%, 56%': {
            transform: 'translateY(-33.33%)',
          },
          '60%, 76%': {
            transform: 'translateY(-50%)',
          },
          '80%, 96%': {
            transform: 'translateY(-66.66%)',
          },
          '100%': {
            transform: 'translateY(-83.33%)',
          },
        },
        'text-slide-6': {
          '0%, 13.33%': {
            transform: 'translateY(0%)',
          },
          '16.66%, 30%': {
            transform: 'translateY(-14.28%)',
          },
          '33.33%, 46.66%': {
            transform: 'translateY(-28.57%)',
          },
          '50%, 63.33%': {
            transform: 'translateY(-42.85%)',
          },
          '66.66%, 80%': {
            transform: 'translateY(-57.14%)',
          },
          '83.33%, 96.66%': {
            transform: 'translateY(-71.42%)',
          },
          '100%': {
            transform: 'translateY(-85.71%)',
          },
        },
        'text-slide-7': {
          '0%, 11.43%': {
            transform: 'translateY(0%)',
          },
          '14.28%, 25.71%': {
            transform: 'translateY(-12.5%)',
          },
          '28.57%, 40%': {
            transform: 'translateY(-25%)',
          },
          '42.85%, 54.28%': {
            transform: 'translateY(-37.5%)',
          },
          '57.14%, 68.57%': {
            transform: 'translateY(-50%)',
          },
          '71.42%, 82.85%': {
            transform: 'translateY(-62.5%)',
          },
          '85.71%, 97.14%': {
            transform: 'translateY(-75%)',
          },
          '100%': {
            transform: 'translateY(-87.5%)',
          },
        },
        'text-slide-8': {
          '0%, 10%': {
            transform: 'translateY(0%)',
          },
          '12.5%, 22.5%': {
            transform: 'translateY(-11.11%)',
          },
          '25%, 35%': {
            transform: 'translateY(-22.22%)',
          },
          '37.5%, 47.5%': {
            transform: 'translateY(-33.33%)',
          },
          '50%, 60%': {
            transform: 'translateY(-44.44%)',
          },
          '62.5%, 72.5%': {
            transform: 'translateY(-55.55%)',
          },
          '75%, 85%': {
            transform: 'translateY(-66.66%)',
          },
          '87.5%, 97.5%': {
            transform: 'translateY(-77.77%)',
          },
          '100%': {
            transform: 'translateY(-88.88%)',
          },
        },
      },
      lineHeight: {
        11: '2.75rem',
        12: '3rem',
        13: '3.25rem',
        14: '3.5rem',
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      fontFamily: {
        sans: ['var(--font-space-grotesk)', ...fontFamily.sans],
        caveat: ['Caveat', 'cursive'],
      },
      colors: {
        primary: colors.pink,
        gray: colors.gray,
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        border: 'hsl(var(--border)) !important',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        success: {
          '50': '#f0fdf5',
          '100': '#dcfce8',
          '200': '#bbf7d1',
          '300': '#86efad',
          '400': '#4ade81',
          '500': '#22c55e',
          '600': '#16a34a',
          '700': '#15803c',
          '800': '#166533',
          '900': '#14532b',
          '950': '#052e14',
        },
      },
      typography: ({ theme }: any) => ({
        DEFAULT: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.600')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2': {
              fontWeight: '700',
              letterSpacing: theme('letterSpacing.tight'),
            },
            h3: {
              fontWeight: '600',
            },
            code: {
              color: theme('colors.indigo.500'),
            },
          },
        },
        invert: {
          css: {
            a: {
              color: theme('colors.primary.500'),
              '&:hover': {
                color: `${theme('colors.primary.400')}`,
              },
              code: { color: theme('colors.primary.400') },
            },
            'h1,h2,h3,h4,h5,h6': {
              color: theme('colors.gray.100'),
            },
          },
        },
      }),
    },
  },
  plugins: [require('@tailwindcss/forms'), require('@tailwindcss/typography'), nextui()],
}
