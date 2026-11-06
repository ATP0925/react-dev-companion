# Contributing to React Dev Companion

First off, thank you for taking the time to contribute! Contributions are what make the open-source community an amazing place to learn, inspire, and create. 

All contributions to this repository must follow the guidelines outlined below.

---

## Code of Conduct

This project and everyone participating in it is governed by our effort to keep a welcoming, respectful, and professional environment. Please treat all contributors with respect, constructiveness, and professional courtesy.

---

## How Can I Contribute?

### Reporting Bugs

Before creating a bug report, please check the existing issues to see if the problem has already been reported. When creating a bug report, please include as much detail as possible:

1. **Use a clear and descriptive title.**
2. **Describe the exact steps to reproduce the problem.**
3. **Provide expected vs actual behavior.**
4. **Include environment details** (Node.js version, browser, framework version like React 18/19 or Next.js 14/15).

### Suggesting Enhancements

Enhancement suggestions are tracked as GitHub Issues. When creating a feature request:

1. Use a clear title explaining the proposed feature.
2. Provide a step-by-step explanation of the feature and its value to developers.
3. Describe alternative solutions or workarounds if applicable.

---

## Development Setup

### Prerequisites

- **Node.js** `>= 18.0.0`
- **npm** `>= 9.0.0` (or `pnpm` / `yarn`)
- **Git**

### Local Environment Setup

1. **Fork the Repository** on GitHub.
2. **Clone your fork** locally:
   ```bash
   git clone https://github.com/YOUR-USERNAME/react-dev-companion.git
   cd react-dev-companion
   ```
3. **Install Dependencies**:
   ```bash
   npm install
   ```
4. **Verify the Build**:
   ```bash
   npm run build
   ```

---

## Commit Guidelines

This project enforces [Conventional Commits](https://www.conventionalcommits.org/) using **Husky** and **Commitlint**. Pre-commit hooks will automatically validate your commit messages before accepting them.

### Format

```text
<type>(<scope>): <short summary>
```

*(Scope is optional)*

### Allowed Types

- `feat`: A new feature
- `fix`: A bug fix
- `docs`: Documentation only changes
- `style`: Changes that do not affect the meaning of the code (white-space, formatting, etc)
- `refactor`: A code change that neither fixes a bug nor adds a feature
- `perf`: A code change that improves performance
- `test`: Adding missing tests or correcting existing tests
- `chore`: Build process, auxiliary tool, or dependency updates

### Examples

- `feat: add localStorage and cookie inspector tab`
- `fix(fetch): capture network error response status correctly`
- `docs: update installation instructions in README`

---

## Pull Request Process

1. **Create a Feature Branch** off `main`:
   ```bash
   git checkout -b feat/your-feature-name
   ```
2. **Make your changes** adhering to TypeScript strict mode and clean code standards.
3. **Commit your changes** following the Conventional Commits format.
4. **Push to your fork**:
   ```bash
   git push origin feat/your-feature-name
   ```
5. **Open a Pull Request** against the `main` branch of the main repository.
6. **Ensure CI Checks Pass**: The automated CI workflow will run typechecking and build validation.
7. Address any code review feedback provided by maintainers.

Thank you for contributing to **React Dev Companion**!