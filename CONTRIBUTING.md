# Contributing Guide
*last updated: 2025-11-03*

Thank you for your interest in contributing to the component library!

## Introduction

Here's how you can contribute to the component library:

- **Documentation improvements** - Add new information or fix errors in the documentation
- **Create blocks** - Build new composition blocks using existing components
- **Bug fixes** - Identify and fix existing issues in the component library
- **New component proposals** - Suggest new components for the library via GitHub Discussions

> **Note:** We currently do not accept direct contributions for new components. We believe each component should be carefully selected to ensure quality and consistency across the library. However, all contributions are welcome and can help improve the project.

## Architecture

The project is built with TypeScript, React, Tailwind CSS, and Ark UI. We follow a monorepo structure to facilitate collaboration and dependency management between components.

For detailed technical information, see [ARCHITECTURE.md](./ARCHITECTURE.md).

## Local Setup

Before contributing, ensure your development environment is properly configured.

### Prerequisites

- Node.js `22` or higher
- pnpm `10` or higher

### Setup Steps

1. **Fork and clone the repository:**
   ```bash
   git clone https://github.com/your-username/ui.git
   cd ui
   ```

2. **Create a new branch for your changes:**
   ```bash
   git checkout -b feat/your-feature-name
   ```

3. **Install dependencies:**
   ```bash
   pnpm install
   ```

4. **Start Storybook to view and test components:**
   ```bash
   pnpm storybook
   ```

   Storybook will be available at `http://localhost:6006`

## Extensions Recommended

- [Tailwind CSS IntelliSense](https://marketplace.visualstudio.com/items?itemName=bradlc.vscode-tailwindcss)
- [Biome](https://marketplace.visualstudio.com/items?itemName=biomejs.biome)
