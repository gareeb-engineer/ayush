# 05 — Write and publish AsciiDoc articles

## Create an article

Example: `modules/ROOT/pages/lld/parking-lot.adoc`:

```asciidoc
= Parking Lot — Low-Level Design
:page-navtitle: Parking Lot
:page-description: Thread-safe parking spot allocation in Java
:sectnums:

== Requirements

Support cars and bikes, issue tickets, and avoid double allocation.

=== Functional requirements

* Assign compatible parking spots
* Free spots on exit
* Calculate a fee

== Domain model

Define `Vehicle`, `ParkingSpot`, `Ticket`, `ParkingLot`.

== Java implementation

[source,java]
----
public interface ParkingStrategy {
    ParkingSpot findSpot(Vehicle vehicle);
}
----

== Concurrency

NOTE: Shared spot allocation needs a correct synchronization strategy.

== Next steps

See xref:ROOT:hld/url-shortener.adoc[URL Shortener HLD] for another design exercise.
```

## Common syntax

| Purpose | Example |
|---|---|
| Title | `= Page Title` |
| Section | `== Architecture` |
| Subsection | `=== Failure handling` |
| Bullets | `* One item` |
| Numbered list | `. First step` |
| Inline code | `` `Redis` `` |
| Bold | `*important*` |
| Admonition | `NOTE: ...` |
| Java code | `[source,java]` followed by a `----` fenced block |
| Table | `|===`, header row and cell lines, `|===` |
| Internal article link | `xref:ROOT:lld/parking-lot.adoc[Parking Lot]` |
| External link | `https://example.org[Reference]` |
| Download attachment | `xref:attachment$paper.pdf[Paper]` (when properly stored) |

## Add a diagram or picture

1. Put image at `modules/ROOT/assets/images/lld/parking-lot.png`.
2. In an article from the ROOT module:

   ```asciidoc
   image::lld/parking-lot.png[Parking lot component diagram, width=800]
   ```

Your Java module can use its own images under `modules/java/assets/images/`, e.g. `image::gc-flow.png[GC flow]`.

## Reuse a partial

Put a reusable fragment in `modules/ROOT/partials/common-definitions.adoc`, then reference it from another page in the same module with:

```asciidoc
include::partial$common-definitions.adoc[]
```

Antora handles resource-family resolution when the correct family prefix is supplied. Prefer `xref` over hardcoded generated `.html` URLs to survive version/layout changes.

## Tips for LLD/HLD case studies

**LLD template:** problem statement → clarifications → functional requirements → entity relationships → Java interfaces/classes → state transitions → concurrency → tests → design trade-offs → runnable repo link.

**HLD template:** functional requirements → nonfunctional requirements → scale assumptions → API contracts → data model → component diagram → partitioning/caching/messaging → failures → monitoring → cost/complexity trade-offs.

This repository can contain snippets, but interview-quality claims should have supporting implementation/testing when possible. Keep sample credentials, private architecture, or employer-sensitive details **out of public articles**.

## Publishing lifecycle

1. Create the `.adoc` under `pages/`.
2. Add assets under the corresponding module's `assets/images/`.
3. If auto nav: run `python tools/generate_nav.py --content-root .`.
4. If manual nav: add its `xref:` to `nav.adoc`.
5. Build Antora and test internal links, images, sidebar, and mobile layout.
6. Commit, push, deploy.

See [Navigation](06-navigation.md) for the difference between file discovery and sidebar visibility.
