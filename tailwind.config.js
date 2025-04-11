// tailwind.config.js
const { fontFamily } = require("tailwindcss/defaultTheme");

module.exports = {
  darkMode: "class",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./src/app/**/*.{js,ts,jsx,tsx}",
    "./src/components/**/*.{js,ts,jsx,tsx}",
    "./src/ui/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      /** ① 全局 CSS 变量 —— 一处改，全站同步 **/
      colors: {
        /* 中性色（Zinc 灰阶） */
        zinc: {
          50: "hsl(var(--zinc-50) / <alpha-value>)",
          100: "hsl(var(--zinc-100) / <alpha-value>)",
          200: "hsl(var(--zinc-200) / <alpha-value>)",
          300: "hsl(var(--zinc-300) / <alpha-value>)",
          400: "hsl(var(--zinc-400) / <alpha-value>)",
          500: "hsl(var(--zinc-500) / <alpha-value>)",
          600: "hsl(var(--zinc-600) / <alpha-value>)",
          700: "hsl(var(--zinc-700) / <alpha-value>)",
          800: "hsl(var(--zinc-800) / <alpha-value>)",
          900: "hsl(var(--zinc-900) / <alpha-value>)",
        },

        /* 品牌/交互色 */
        primary: {
          DEFAULT: "hsl(var(--primary) / <alpha-value>)",        // #0071E3
          hover: "hsl(var(--primary-hover) / <alpha-value>)",  // #0064CC
          active: "hsl(var(--primary-active) / <alpha-value>)", // #005BB8
          subtle: "hsl(var(--primary-subtle) / <alpha-value>)", // #E5F1FF
        },

        /* 语义色 */
        success: {
          DEFAULT: "hsl(var(--success) / <alpha-value>)",        // #34C759
          subtle: "hsl(var(--success-subtle) / <alpha-value>)", // #E7F8EF
        },
        warning: {
          DEFAULT: "hsl(var(--warning) / <alpha-value>)",        // #FF9F0A
          subtle: "hsl(var(--warning-subtle) / <alpha-value>)", // #FFF6E5
        },
        danger: {
          DEFAULT: "hsl(var(--danger) / <alpha-value>)",         // #FF3B30
          subtle: "hsl(var(--danger-subtle) / <alpha-value>)",  // #FFEDEE
        },

        /* 背景 / 文本 / 边框语义 */
        bg: "hsl(var(--bg) / <alpha-value>)",
        surface: "hsl(var(--surface) / <alpha-value>)",
        fg: "hsl(var(--fg) / <alpha-value>)",
        muted: "hsl(var(--muted) / <alpha-value>)",
        border: "hsl(var(--border) / <alpha-value>)",
        highlight: "hsl(var(--highlight) / <alpha-value>)",
      },

      /** ② 默认字体稍微 Apple 味儿一点 **/
      fontFamily: {
        sans: ["SF Pro Text", ...fontFamily.sans],
      },
      /** ③ 默认圆角稍微大一点 **/
      ringColor: {
        primary: 'hsl(var(--primary) / <alpha-value>)',
      },

      /** ④ 自定义动画 **/
      animation: {
        'pulse-slow': 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'orbit': 'orbit 1.2s linear infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
      },
      keyframes: {
        orbit: {
          '0%': { transform: 'rotate(0deg) scale(1)' },
          '50%': { transform: 'rotate(180deg) scale(1.05)' },
          '100%': { transform: 'rotate(360deg) scale(1)' },
        },
        fadeIn: {
          from: { opacity: 0 },
          to: { opacity: 1 },
        },
      },
      animation: {
        firefly: 'firefly 4s ease-in-out infinite alternate',
        pulseSlow: 'pulse 6s ease-in-out infinite',
      },
      keyframes: {
        firefly: {
          '0%': { transform: 'translate(0, 0) scale(1)' },
          '50%': { transform: 'translate(4px, -6px) scale(1.2)' },
          '100%': { transform: 'translate(-4px, 6px) scale(0.8)' },
        },
      },
    },
  },
  plugins: [require("tailwindcss-animate")],


};


