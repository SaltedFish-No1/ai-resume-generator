// scripts/print-structure.js
const fs = require('fs')
const path = require('path')

const IGNORE = ['node_modules', '.next', '.git', 'public', 'out']
const ROOT = './src'

function walk(dir, prefix = '') {
  const files = fs.readdirSync(dir).filter(f => !IGNORE.includes(f))
  const total = files.length

  files.forEach((file, index) => {
    const filepath = path.join(dir, file)
    const stat = fs.statSync(filepath)
    const isDir = stat.isDirectory()
    const isLast = index === total - 1

    const linePrefix = isLast ? '|-- ' : '|-- '
    const nextPrefix = prefix + (isLast ? '    ' : '|   ')
    const display = isDir ? `${file}/` : file

    console.log(prefix + linePrefix + display)

    if (isDir) {
      walk(filepath, nextPrefix)
    }
  })
}

console.log('src/')
walk(ROOT, '')
