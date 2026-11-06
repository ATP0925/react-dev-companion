# React Dev Companion

![CI](https://img.shields.io/github/actions/workflow/status/Kickz1nn/react-dev-companion/ci.yml?branch=main)
![npm bundle size](https://img.shields.io/bundlephobia/minzip/react-dev-companion)
![License](https://img.shields.io/github/license/Kickz1nn/react-dev-companion)
![GitHub issues](https://img.shields.io/github/issues/Kickz1nn/react-dev-companion)

React Dev Companion is an embeddable, zero-dependency developer tools panel for React and Next.js applications. It intercepts outgoing network requests in real-time, inspects runtime environments, and provides client-side visibility during development without relying on browser extensions.

---

## Features

- **Real-Time API Interception:** Monitors outgoing `window.fetch` calls and logs HTTP methods, request status, and target URLs.
- **Framework Agnostic Support:** Compatible with React SPA setups (Vite, CRA) and SSR frameworks (Next.js client components).
- **Non-Intrusive Overlay:** Floating UI widget designed to stay out of the way of primary application elements.
- **Zero Heavy Dependencies:** Lightweight footprint focused on developer experience and minimal bundle impact.

---

## Installation

Install the package via `npm`, `yarn`, or `pnpm`:

```bash
npm install react-dev-companion
```

Or using yarn:

```bash
yarn add react-dev-companion
```

---

## Usage

Import and render the component within your application tree. It is recommended to load the component conditionally in development environments.

### Next.js (App Router / Client Component)

```tsx
'use client';

import { DevCompanion } from 'react-dev-companion';

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>
        {children}
        {process.env.NODE_ENV === 'development' && <DevCompanion/>}
      </body>
    </html>
  );
}
```

### Vite / Standard React SPA

```tsx
import React from 'react';
import { DevCompanion } from 'react-dev-companion';

export function App() {
  return (
    <div>
      <MainContent/>
      {import.meta.env.DEV && <DevCompanion/>}
    </div>
  );
}
```

---

## API Reference

### `<DevCompanion/>`

| Prop | Type | Default | Description |
| :--- | :--- | :--- | :--- |
| `position` | `'bottom-right' \| 'bottom-left'` | `'bottom-right'` | Position of the floating overlay trigger. |

---

## Architecture Overview

React DevCompanion hooks into the global `window.fetch` object upon mounting, wrapping original request handlers with event emitters. Captured metrics are streamed directly into an isolated local state container to ensure application state remains completely decoupled from devtools inspection logic.

---

## Contributing

Contributions are welcome. Please read our `CONTRIBUTING.md` guide before submitting a Pull Request.

### Development Workflow

1. Fork and clone the repository.
2. Install dependencies:
   ```bash
   npm install
   ```
3. Run local build checks:
   ```bash
   npm run build
   ```

Note: This project enforces [Conventional Commits](https://www.conventionalcommits.org/). Commits are verified locally using Husky and Commitlint prior to stage completion.

---

## License

Distributed under the MIT License. See `LICENSE` for more information.