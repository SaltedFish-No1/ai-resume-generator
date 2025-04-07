export default function Hero() {
  return (
    <section className="w-full py-24 px-6 text-center bg-gradient-to-br from-indigo-900 via-black to-gray-900 text-white">
      <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-6">
        Generate Resumes with <span className="text-cyan-400">AI</span> in Seconds
      </h1>
      <p className="text-lg md:text-xl max-w-2xl mx-auto text-gray-300">
        使用人工智能快速生成专业英文简历，支持内容定制与一键导出 PDF。提升求职效率，从这里开始。
      </p>
      <div className="mt-8 flex justify-center gap-4 flex-wrap">
        <a
          href="/builder"
          className="px-6 py-3 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-xl shadow-md transition"
        >
          🚀 开始体验
        </a>
        <a
          href="#features"
          className="px-6 py-3 border border-gray-300 hover:border-white text-white rounded-xl transition"
        >
          查看功能
        </a>
      </div>
    </section>
  )
}
