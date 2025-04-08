// postcss.config.mjs

export default {
  plugins: {
    // 顺序上先引入其他，再引入 Tailwind
    // 这个顺序可以根据项目需求做调整
    "autoprefixer": {},
    "@tailwindcss/postcss": {},
  },
}
