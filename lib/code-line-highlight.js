'use strict'

/**
 * Asciidoctor extension (registered in antora-playbook.yml) that makes the standard
 * `highlight` attribute work on code blocks when Antora uses highlight.js.
 *
 *   [source,java,highlight=10]          -> line 10
 *   [source,java,highlight="3,10..12"]  -> line 3 and lines 10 to 12 (quote values that contain commas)
 *   [source,java,highlight=3;10..12]    -> same, using semicolons
 *   [source,java,highlight=5..]         -> line 5 to the end
 *   [source,java,highlight="1..9,!4"]   -> lines 1 to 9 except 4
 *
 * Asciidoctor only applies `highlight` itself for build-time highlighters, so this
 * extension turns the line list into roles (CSS classes) such as `hl-10` or `hl-10-12`
 * on the block. The UI's site.js reads those classes and marks the lines.
 */
function resolveLines (spec, lineCount) {
  const lines = new Set()
  String(spec)
    .split(/[,;\s]+/)
    .map((entry) => entry.trim())
    .filter(Boolean)
    .forEach((entry) => {
      const negate = entry.startsWith('!')
      if (negate) entry = entry.slice(1)
      const delim = entry.includes('..') ? '..' : entry.includes('-') ? '-' : null
      let from
      let to
      if (delim) {
        const [start, end] = entry.split(delim)
        from = parseInt(start, 10)
        to = end === '' || end === undefined ? lineCount : parseInt(end, 10)
        if (to < 0) to = lineCount
      } else {
        from = to = parseInt(entry, 10)
      }
      if (!Number.isInteger(from) || !Number.isInteger(to)) return
      for (let n = Math.max(1, from); n <= Math.min(to, lineCount); n++) {
        if (negate) lines.delete(n)
        else lines.add(n)
      }
    })
  return [...lines].sort((a, b) => a - b)
}

// Collapse [3, 10, 11, 12] into ['hl-3', 'hl-10-12'] so long ranges stay short.
function toRoles (lines) {
  const roles = []
  for (let i = 0; i < lines.length; i++) {
    const start = lines[i]
    while (i + 1 < lines.length && lines[i + 1] === lines[i] + 1) i++
    roles.push(start === lines[i] ? `hl-${start}` : `hl-${start}-${lines[i]}`)
  }
  return roles
}

function register (registry) {
  registry.treeProcessor(function () {
    this.process(function (doc) {
      doc.findBy({ context: 'listing' }).forEach((block) => {
        const spec = block.getAttribute('highlight')
        if (spec === undefined || spec === null || spec === '') return
        toRoles(resolveLines(spec, block.getSourceLines().length)).forEach((role) => block.addRole(role))
      })
      return doc
    })
  })
}

module.exports = { register, resolveLines, toRoles }
