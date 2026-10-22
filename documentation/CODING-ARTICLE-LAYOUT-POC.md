# POC report — screenshot-style coding article layout

**Verdict: yes, the design in the screenshot is implementable, and it is now working in this repository.**
The whole layout is driven by ordinary AsciiDoc. No HTML, no `++++` passthrough blocks, and no
per-article styling live in the `.adoc` file.

- Live POC page: `gareeb-engineer/modules/Data-Structure/pages/dynamic-programming/fibonacci-series.adoc`
- Rendered result: `build-output/gareeb-engineer/v1.0/Data-Structure/dynamic-programming/fibonacci-series.html`
- Evidence: [collapsed](previews/coding-article-collapsed.png) · [expanded](previews/coding-article-expanded.png)

---

## 1. What the screenshot needs, and where each piece comes from

| Screenshot element | Source | Authoring cost |
|---|---|---|
| Breadcrumbs `Home / Data Structure / …` | Already in `default.hbs` | none |
| Page title | AsciiDoc `= Fibonacci Series` | none |
| Grey one-line subtitle | `:page-subtitle:` | 1 attribute |
| `Medium` + topic chips | `:page-difficulty:` + `:page-tags:` | 2 attributes |
| Blue numbered circles ①–⑤ | CSS counter on `h2` | none — automatic |
| Question / Approach / Complexity / Output callouts | Block role, e.g. `[.cp-box.cp-question]` | 1 line per block |
| Lightbulb / bar-chart / terminal icons | CSS, keyed off the role | none |
| `Show Code (Java Solution)` collapsible bar | AsciiDoc `[%collapsible]` | 2 lines |
| `</> Java` and `~ 39 lines` badges | JS reads them off the code | none — automatic |
| Dark code card, Copy / Open, line numbers, syntax colours | Already in the bundle | none |
| Sidebar, filter box, "On this page" | Already in the bundle | none |

The two "automatic" rows matter most for maintenance:

- **Step numbers are a CSS counter.** Inserting a new `==` section, deleting one, or reordering
  them renumbers the page with zero edits. Nothing in the article states that Question is step 1.
- **The code badges are derived.** The language comes from the `data-lang` the AsciiDoc
  `[source,java]` block already produces, and the line count is counted at render time, so the
  `~ 39 lines` badge cannot drift out of sync with the code.

## 2. The authoring template

This is the complete source pattern. Copy it for each new problem page.

```asciidoc
= Fibonacci Series
:page-role: coding-page
:page-subtitle: Print the first N numbers in the Fibonacci series using different approaches.
:page-difficulty: Medium
:page-tags: Data Structure, Dynamic Programming, Java

== Question

[.cp-box.cp-question]
--
Given an integer `N`, print the first N numbers of the Fibonacci series.

* `F(0) = 0`
* `F(n) = F(n-1) + F(n-2)` for `n > 1`
--

== Approach to Solve

[.cp-box.cp-approach]
--
* *Tabulation (Bottom-Up DP)* -- builds the solution iteratively (`O(N)`).
--

== Java Implementation

.Show Code (Java Solution)
[%collapsible]
====
[source,java]
----
// your solution
----
====

== Complexity Analysis

[.cp-box.cp-complexity]
--
* *Time Complexity*: `O(N)`
--

== Output Example

[.cp-box.cp-output]
--
[.cp-io]
Input:: `N = 7`
Output:: `0 1 1 2 3 5 8`
--
```

### Reference

**Page attributes**

| Attribute | Effect |
|---|---|
| `:page-role: coding-page` | Switches on this whole layout. Required. |
| `:page-subtitle:` | Grey line under the title. |
| `:page-difficulty:` | Rating chip. `Easy` green, `Medium` blue, `Hard` red. |
| `:page-tags:` | Comma-separated topic chips. |

**Block roles**

| Role | Appearance |
|---|---|
| `[.cp-box.cp-question]` | Blue rule, tinted panel |
| `[.cp-box.cp-approach]` | Green rule, lightbulb |
| `[.cp-box.cp-complexity]` | Slate rule, bar chart |
| `[.cp-box.cp-output]` | Blue rule, terminal |
| `[.cp-io]` | `Input::` / `Output::` rows |

Two notes on AsciiDoc syntax:

- Write `O(2^N)` as `` `+O(2^N)+` ``. Inside plain backticks the `^` is superscript markup.
- `--` only closes an open block when it is alone on a line, so ` -- ` as an em dash inside a
  sentence is safe.

## 3. What changed in the UI

Edited in `documentation/ui-source/`, then repackaged into the bundle with
`documentation/tools/build_ui_bundle.py`.

| File | Change |
|---|---|
| `helpers/chipList.js` | **New.** Turns `:page-difficulty:`/`:page-tags:` into a list the template can loop. Antora auto-registers any `helpers/*.js` in the bundle. |
| `layouts/default.hbs` | Renders subtitle + chips; copies `:page-role:` onto `.article-body`. Asset tokens bumped. |
| `css/site.css` | New `v19` section: counters, callouts, chips, collapsible bar, IO rows, phone rules. |
| `js/site.js` | New `enhanceCollapsibleCode()`, called from `enhanceContent()`. |
| `layouts/portfolio.hbs` | Script token bumped to match. |

Three deliberate choices:

1. **`:page-role:` is generic.** `default.hbs` copies any `page-role` value onto the article, so
   future layouts (`:page-role: adr-page`) need no further template work.
2. **The chip row and subtitle are not scoped to coding pages.** Any article can set
   `:page-subtitle:` and get the same treatment.
3. **`enhanceCollapsibleCode()` is called from `enhanceContent()`**, the one function this UI
   already re-runs after an in-place page swap, so the badges survive single-page navigation. It
   exits early when badges exist, so a repeat call cannot double them up.

## 4. Verification performed

Build, from the repo root, Antora 3.1.10 / Node 22:

- `antora antora-playbook.yml` completes with **no warnings and no errors**.
- Generated markup confirmed: `<article class="article-body coding-page">`, chips as
  `<li class="chip chip-difficulty chip-medium">`, roles landing as
  `class="openblock cp-box cp-question"`, and `[%collapsible]` producing
  `<details><summary class="title">`.
- Code block fidelity checked programmatically: 39 rendered lines against 39 source lines,
  blank lines preserved.
- `helpers/` is build-time only and is correctly **not** published into `build-output/_/`.

Browser, headless Chrome at 1280px:

- Collapsed and expanded states both render as in the screenshot, including chevron rotation,
  the `</> Java` / `~ 39 lines` badges, line numbers 1–39, and syntax colours.

Not verified:

- **Single-page-navigation path.** The badge code is wired into `enhanceContent()` and guards
  against duplicates, but I confirmed that by reading the call sites, not by clicking through a
  live SPA swap.
- Real iOS/Android devices, Firefox and Safari. Phone CSS rules are written but only checked by
  narrowing the viewport.

## 5. Gaps against the screenshot

These are content gaps, not UI limitations:

- The screenshot header has a **Résumé** link; the site currently has Contact, LinkedIn, GitHub.
  Add one line to `gareeb-engineer/modules/headers/pages/header-links.adoc`.
- The screenshot sidebar lists **Queues**, **Heaps**, and sibling DP pages (Introduction, Longest
  Common Subsequence, Knapsack Problem). Those pages do not exist yet.
- Most `Data-Structure` pages are currently **0 bytes**, which is why the sidebar is thinner than
  the mock-up.

One real limitation: the sidebar filter box matches **navigation labels only**, not article text.
Full-text search across problems needs a separate index or service.

## 6. Rolling this out

1. Copy the template in section 2 into a new `.adoc` under the relevant module.
2. Add its `xref:` line to that module's `nav.adoc`.
3. Build and check.

`:page-role: coding-page` is per page by design. Antora can set attributes site-wide in the
playbook or per component in `antora.yml`, but not per module, so there is no way to make
"everything under `Data-Structure/`" a coding page without either repeating the attribute or
scoping the CSS by module instead. Repeating one attribute line is the smaller cost and keeps the
layout usable for coding problems that live outside this module.
