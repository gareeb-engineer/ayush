'use strict'

// Antora loads every helpers/*.js file in the UI bundle and registers it as a
// Handlebars helper named after the file. This one turns the page attributes
//
//   :page-difficulty: Medium
//   :page-tags: Data Structure, Dynamic Programming, Java
//
// into a single list the template can iterate, so article authors never write
// HTML for the chip row:
//
//   [{ label: 'Medium', cls: 'chip-difficulty chip-medium' },
//    { label: 'Data Structure', cls: 'chip-tag' }, ...]
//
// Returning a plain array matters: Handlebars treats an empty array as falsy,
// so {{#with (chipList ...)}} renders nothing when neither attribute is set.

const slug = (value) =>
  String(value)
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, '-')
    .replace(/^-+|-+$/g, '')

module.exports = function (difficulty, tags) {
  const chips = []

  const add = (value, cls) => {
    // Page attributes with no value arrive as '' and must not become empty chips.
    const label = String(value == null ? '' : value).trim()
    if (label) chips.push({ label, cls })
  }

  // Handlebars appends an options object as the final argument, and unset page
  // attributes arrive as undefined, so only act on real strings.
  if (typeof difficulty === 'string') {
    add(difficulty, `chip-difficulty chip-${slug(difficulty)}`)
  }
  if (typeof tags === 'string') {
    tags.split(',').forEach((tag) => add(tag, 'chip-tag'))
  }

  return chips
}
