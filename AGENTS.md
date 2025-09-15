# Repository Guidelines

## Project Structure & Module Organization
- Root workspace managed by `pnpm` (`pnpm-workspace.yaml`).
- UI library in `packages/ui` (React + Tailwind). Stories live in `packages/ui/__stories__` and source in `packages/ui/src` (import alias `@` → `packages/ui/src`).
- Figma plugin in `apps/figma-token-system` (TypeScript + `tsup`).
- Design tokens in `apps/token-system` (`__tokens__` JSON plus `src`).

## Build, Test, and Development Commands
- Storybook: `pnpm storybook` (dev) • `pnpm build:storybook` (static build). Scans `packages/ui/__stories__`.
- Lint/Format (repo-wide): `pnpm -r run lint` • `pnpm -r run format` • `pnpm -r run check` (where defined).
- Package-specific: `pnpm -F @hynix/figma-token-system build` or `watch` to compile the Figma plugin.
- Node/PM: Use `pnpm@10` (see `packageManager`), Node 18+ recommended.

## Coding Style & Naming Conventions
- Formatter/Linter: Biome (`biome.json`) with 2-space indent, JS single quotes, JSX double quotes, semicolons as needed, LF endings.
- Tailwind: class order is enforced; use `className`/`cn()`; run `pnpm -r run lint` to autofix.
- Files: component files lower-case (e.g., `button.tsx`); exported component names in PascalCase (`Button`). Utilities camelCase (e.g., `cn.ts`).
- Imports: prefer alias `@/...` for UI code.

## Testing Guidelines
- No unit test runner configured yet. For UI, add/verify stories in `__stories__` and validate via Storybook.
- If introducing tests, prefer Vitest + Testing Library; co-locate as `*.test.ts(x)` next to sources.

## Commit & Pull Request Guidelines
- Commits: Conventional Commits enforced by commitlint (e.g., `feat(ui): add Button variants`).
- PRs: include purpose, scope (packages affected), screenshots or Storybook link for UI changes, and linked issues. Ensure Biome passes and Storybook builds locally.

## Security & Configuration Tips
- Do not commit credentials or Figma tokens. Keep plugin payloads/sample data in versioned JSON only.
- Respect the Vite alias in `vite.config.ts` when moving files to avoid broken imports.
