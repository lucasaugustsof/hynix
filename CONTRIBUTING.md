# Contributing to Hynix

Thank you for considering contributing to Hynix! We welcome contributions from
everyone and appreciate your effort to improve the project. To ensure a smooth
process, please follow these guidelines:

## **How Can You Contribute?**

### 1. Reporting Bugs

- Ensure the issue is reproducible and provide clear steps to reproduce it.
- Include information such as:
  - Hynix version
  - Environment details (e.g., operating system, browser, Node.js version)
  - Screenshots or logs, if applicable.
- Submit bug reports via the
  [GitHub Issues](https://github.com/lucasaugustsof/hynix/issues) section.

### 2. Suggesting Features

- Check the [existing issues](https://github.com/lucasaugustsof/hynix/issues) to
  avoid duplicates.
- Clearly explain the feature and why it would be beneficial.
- Provide examples or references to similar implementations, if possible.

### 3. Improving Documentation

- Found typos, formatting issues, or missing details? Feel free to update the
  documentation.

### 4. Submitting Code Contributions

- Follow the steps below for a successful contribution.

## **Development Workflow**

### 1. Setting Up the Project

1. Fork the repository and clone your fork:
   ```bash
   git clone https://github.com/lucasaugustsof/hynix.git
   ```
2. Install dependencies (we use `pnpm` as the package manager):
   ```bash
   pnpm install
   ```
3. Start the development server:
   ```bash
   pnpm run dev
   ```

### 2. Working on a Contribution

- Follow the [GitFlow](./GITFLOW.md):
  - Use `feat/<description>` for new features.
  - Use `fix/<description>` for bug fixes.
  - Use `docs/<description>` for documentation updates.
- Write clear commit messages:
  - Example: `feat(...): add Button component` or
    `fix(...): resolve input focus bug`.
- Add tests for your changes, if applicable.

### 3. Submitting a Pull Request (PR)

1. Push your changes to your forked repository:
   ```bash
   git push origin <branch-name>
   ```
2. Open a PR to the `develop` branch in the original repository.
3. Ensure your PR:
   - Includes a detailed description of the changes.
   - Links to related issues, if applicable.
   - Passes all automated checks (e.g., linting, tests).

### 4. Code Reviews

- PRs will be reviewed by maintainers.
- Be open to feedback and make necessary adjustments promptly.

## **Code Guidelines**

- **Language:** TypeScript
- **Package Manager:** pnpm (minimum version: `pnpm@10.0.0`)
- **Styling:** Follow the Biome configurations provided in the repository.
- **Components:**
  - Keep components modular and reusable.
  - Prioritize accessibility (use ARIA attributes and semantic HTML).

## **Available Scripts**

Use the following commands to facilitate development:

- `pnpm dev`: Starts the development server.
- `pnpm lint`: Checks the code for style issues.
- `pnpm test`: Runs automated tests.
- `pnpm storybook`: Launches the Storybook environment.
- `pnpm build-storybook`: Generates the static version of Storybook.
- `pnpm clean`: Removes unnecessary files and directories using `npkill`.

## **Code of Conduct**

By contributing, you agree to follow the
[Code of Conduct](./CODE_OF_CONDUCT.md).

We’re excited to see your contributions! Thank you for helping make Hynix better
for everyone.
