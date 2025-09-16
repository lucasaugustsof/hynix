# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Structure

This is a monorepo using pnpm workspaces with the following structure:

- `apps/figma-token-system/` - Figma plugin for extracting design tokens (variables and styles)
- `apps/token-system/` - Token processing system using Style Dictionary
- `packages/ui/` - Shared UI component library built with React, Tailwind CSS, and Ark UI

## Commands

### Development Commands

**Root level:**
- `pnpm storybook` - Start Storybook development server on port 6006
- `pnpm build:storybook` - Build Storybook for production

**Figma Token System (`apps/figma-token-system/`):**
- `pnpm build` - Build the Figma plugin using tsup
- `pnpm watch` - Build in watch mode for development
- `pnpm lint` - Lint code using Biome
- `pnpm format` - Format code using Biome

**UI Package (`packages/ui/`):**
- `pnpm format` - Format code using Biome
- `pnpm lint` - Lint code using Biome
- `pnpm check` - Run Biome check with auto-fix

### Code Quality

The project uses Biome for linting and formatting. Configuration is in `biome.json` at the root with custom rules for:
- Tailwind class sorting using `cn` and `tv` functions
- Import organization with specific groupings for React, Storybook, Ark UI
- 2-space indentation, single quotes, semicolons as needed

## Architecture

### Figma Token System
The Figma plugin extracts design tokens from Figma files:
- **Main entry:** `apps/figma-token-system/src/code.ts`
- **Functions:** Separate modules for fetching different token types:
  - `fetch-local-variables.ts` - Figma variables
  - `fetch-local-text-styles.ts` - Typography tokens
  - `fetch-local-paint-styles.ts` - Color tokens
  - `fetch-local-effect-styles.ts` - Effect tokens
- **Schema:** `tokens-schema.ts` defines the token output format
- **Build:** Uses tsup to bundle for Figma's plugin environment

### UI Package
Component library structure:
- `src/components/` - React components using Ark UI primitives
- `src/styles/` - Tailwind styles and theme configuration
- `src/utilities/` - Helper functions including `cn` for className merging
- `src/blocks/` and `src/widgets/` - Higher-level UI compositions

### Vite Configuration
The root `vite.config.ts` includes:
- Alias `@` pointing to `packages/ui/src` for easy imports
- React plugin for JSX support
- Tailwind CSS integration

## Package Manager

Uses pnpm with workspace configuration. Install dependencies from the root to maintain proper workspace linking.

## Git Workflow

Currently working on `feat/token-system` branch. The project uses conventional commits with commitlint and husky for git hooks.
