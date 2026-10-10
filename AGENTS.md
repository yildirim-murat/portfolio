# Project Instructions

## Goal

Build a premium, production-quality personal portfolio website.

The result should feel intentionally designed, modern, minimal, fast, and polished — not like a generic template or an AI-generated landing page.

Prioritize:
- strong visual hierarchy
- excellent typography
- subtle interactions
- responsive design
- performance
- accessibility
- maintainable code
- refined UX details

## Tech Stack

- Next.js
- App Router
- TypeScript
- Tailwind CSS
- React Server Components where appropriate
- Use client components only when necessary
- Prefer built-in Next.js features over unnecessary dependencies

Before adding a new dependency, check whether the functionality can be implemented cleanly without it.

## Design Direction

The website should feel premium, minimal, modern, and developer-focused.

Avoid generic SaaS-style designs.

Do not overuse:
- gradients
- glassmorphism
- excessive rounded cards
- huge shadows
- unnecessary borders
- excessive animations
- decorative elements without purpose

Prefer:
- generous whitespace
- strong typography
- clean layouts
- subtle depth
- restrained color usage
- clear hierarchy
- thoughtful hover and focus states
- consistent spacing
- small polished details

Every section should feel intentionally composed.

## Responsive Design

Design mobile-first.

The website must work exceptionally well on:
- mobile
- tablet
- laptop
- large desktop screens

Avoid layouts that only look good at one viewport size.

Use fluid sizing and spacing where appropriate.

Prevent:
- horizontal overflow
- awkward text wrapping
- oversized headings on mobile
- broken grids
- cramped sections

## Components

Keep components small, reusable, and easy to understand.

Prefer a structure similar to:

- components/
- sections/
- lib/
- data/
- public/

Do not create unnecessary abstractions.

Do not put the entire page into one large component.

Extract components when they improve readability or reuse.

## Code Quality

Write clean, idiomatic TypeScript.

Requirements:
- avoid `any`
- use meaningful names
- avoid duplicated code
- remove unused code
- avoid unnecessary comments
- keep components focused
- prefer simple solutions over clever abstractions

Follow the conventions already established in the repository.

Do not rewrite unrelated code.

## Performance

Performance is a priority.

- Prefer Server Components where possible.
- Minimize client-side JavaScript.
- Optimize images using Next.js image tooling where appropriate.
- Avoid unnecessary re-renders.
- Avoid large dependencies for small features.
- Lazy-load expensive functionality when appropriate.
- Prevent layout shifts.
- Keep animations lightweight.

## Accessibility

Accessibility is required, not optional.

Use:
- semantic HTML
- proper heading hierarchy
- keyboard-accessible interactions
- visible focus states
- appropriate ARIA attributes when necessary
- sufficient color contrast
- descriptive alt text

Respect `prefers-reduced-motion`.

## SEO

Implement strong SEO fundamentals.

Include appropriate:
- metadata
- page title
- description
- Open Graph metadata
- Twitter metadata
- canonical URLs where appropriate
- sitemap
- robots configuration
- semantic page structure

Structured data can be added when useful.

## Portfolio Content

The site should clearly communicate:

1. Who I am
2. What I do
3. What technologies I work with
4. Selected projects
5. My experience
6. How to contact me

Projects should be one of the strongest parts of the website.

Project cards/pages should prioritize:
- what the project is
- what problem it solves
- my contribution
- technologies used
- screenshots or visuals
- live/demo link when available
- source code link when appropriate

Avoid meaningless technology badge overload.

## Animation

Animations should enhance the experience, not dominate it.

Prefer subtle:
- entrance transitions
- hover feedback
- section reveals
- navigation transitions
- micro-interactions

Avoid excessive scroll animations or effects that hurt readability or performance.

Do not animate everything.

## Images and Visuals

Use high-quality project visuals.

Maintain consistent:
- aspect ratios
- border radius
- image treatment
- spacing

Avoid placeholder-looking imagery in the final implementation.

## UX Details

Pay attention to:
- loading states
- hover states
- focus states
- empty states
- external-link behavior
- navigation feedback
- mobile navigation
- active section/page indication
- smooth but restrained transitions

Small details matter.

## Implementation Workflow

When implementing a feature:

1. Inspect the existing codebase first.
2. Understand the current architecture and design language.
3. Make a clear implementation decision.
4. Implement the feature completely.
5. Run relevant linting, type checking, and tests.
6. Fix issues you introduce.
7. Review the result for responsive behavior and accessibility.
8. Remove temporary or unused code.

Do not leave obvious TODOs when the work can be completed now.

## Decision Making

Do not ask for confirmation for minor implementation decisions.

Make reasonable professional decisions independently and continue working.

If multiple approaches are possible, prefer the solution that is:
1. simpler
2. easier to maintain
3. more performant
4. more consistent with the existing project

Ask only when a decision would significantly change the product direction or destroy/replace important existing work.

## Safety

Work only inside this repository.

Do not:
- modify files outside the repository
- expose secrets
- commit `.env` files
- hardcode credentials
- delete substantial existing functionality without a clear reason
- perform destructive Git operations unless explicitly requested

## Final Quality Bar

Before considering a task complete, verify:

- Does it look intentionally designed?
- Is it responsive?
- Is the typography polished?
- Is spacing consistent?
- Is the implementation accessible?
- Is unnecessary JavaScript avoided?
- Are there obvious performance issues?
- Are hover/focus states polished?
- Is the code maintainable?
- Does it feel like a high-quality professional portfolio rather than a template?

If not, refine it before finishing.