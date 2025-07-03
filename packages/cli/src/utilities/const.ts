export const PROCESS_CWD = process.cwd()
export const MANIFEST_FILE = 'ui.json'

export const IS_DEV = process.env.NODE_ENV === 'development'

export const DEFAULT_CSS_PATH = './src/styles/globals.css'
export const DEFAULT_COMPONENTS_ALIAS = '@/components/ui'
export const DEFAULT_HOOKS_ALIAS = '@/hooks'
export const DEFAULT_UTILITIES_ALIAS = '@/utilities'

export const NAME_TAILWIND_DEPENDENCY = 'tailwindcss'
export const TAILWIND_V4_REGEX =
  /^\s*(?:\^|~|>=|<=|>|<|=)?\s*4(?:\.\d+){0,2}(?:-[0-9A-Za-z.-]+)?\s*$/

export const FS_ERROR_CODES = {
  PERMISSION_DENIED: 'EACCES',
  OPERATION_NOT_PERMITTED: 'EPERM',
  NO_SUCH_FILE_OR_DIRECTORY: 'ENOENT',
  IS_A_DIRECTORY: 'EISDIR',
}

export const REQUIRED_DEPENDENCIES = [
  '@ark-ui/react',
  'motion',
  'clsx',
  'tailwind-merge',
  'tailwind-variants',
  'tw-animate-css',
]

// @TODO: Take this Github API code.
export const HOOKS = {
  useInjectPropsToChildren: String.raw`
    import * as React from 'react'

    import { injectPropsToChildren } from '@/utilities/inject-props-to-children'

    export function useInjectPropsToChildren<T extends object>(
      children: React.ReactNode,
      {
        targets,
        props,
        asChild,
      }: {
        targets: string[]
        props: T
        asChild?: boolean
      },
    ) {
      const keyPrefix = React.useId()

      return injectPropsToChildren(children, {
        props,
        targets,
        asChild,
        keyPrefix,
      })
    }
  `,
}

export const UTILITIES = {
  cn: String.raw`
import { type ClassValue, clsx } from 'clsx'
import { twMerge } from 'tailwind-merge'

export const cn = (...input: ClassValue[]) => twMerge(clsx(...input))
`,

  tv: String.raw`
import { type VariantProps, createTV } from 'tailwind-variants'

export const tv = createTV({
  twMerge: false,
})

export type { VariantProps }
`,

  injectPropsToChildren: String.raw`
import * as React from 'react'

type InjectPropsToChildrenOptions<T = unknown> = {
  /**
   * List of component displayNames to match.
   * Props will only be injected into components matching these names.
   */
  targets: string[]

  /**
   * Props to inject into the matched components.
   */
  props: Partial<T>

  /**
   * Optional key prefix for cloned elements.
   */
  keyPrefix?: string

  /**
   * Whether to return only the first child (e.g. for Slot-like behavior).
   */
  asChild?: boolean
}

/**
 * Recursively injects props into React children whose displayName matches a list of target names.
 *
 * This is useful for compound component patterns where parent-level props need to reach
 * specific nested children without direct prop drilling.
 *
 * @param children - The children tree to traverse.
 * @param options - Match configuration and props to inject.
 * @returns The cloned React nodes with props injected into matching components.
 */
export function injectPropsToChildren<T = unknown>(
  children: React.ReactNode,
  options: InjectPropsToChildrenOptions<T>,
): React.ReactNode {
  const { targets, props, keyPrefix = 'inject', asChild } = options

  const cloned = React.Children.map(children, (child, index) => {
    if (!React.isValidElement(child)) return child

    const displayName = (child.type as React.ComponentType)?.displayName ?? ''
    const shouldInject = targets.includes(displayName)

    const childProps = child.props as {
      children?: React.ReactNode
      asChild?: boolean
    }

    return React.cloneElement(
      child,
      {
        ...(shouldInject ? props : {}),
        key: index,
      },
      injectPropsToChildren(childProps?.children, {
        targets,
        props,
        keyPrefix,
        asChild: childProps?.asChild,
      }),
    )
  })

  return asChild ? cloned?.[0] : cloned
}
`,
}

// @TODO: Create a function in the future to read AST and add the file without modifying the current one.
export const CSS_FILE = String.raw`
  @import "tailwindcss";
  @import "tw-animate-css";

  @variant dark (&:where(.dark, .dark *));

  @theme {
	--color-surface-1: var(--surface-1);
	--color-surface-2: var(--surface-2);

	--color-fill-1: var(--fill-1);
	--color-fill-2: var(--fill-2);
	--color-fill-3: var(--fill-3);
	--color-fill-4: var(--fill-4);
	--color-fill-5: var(--fill-5);

	--color-border: var(--border);
	--color-disabled: var(--disabled);

	--color-fg-1: var(--fg-1);
	--color-fg-2: var(--fg-2);

	--color-brand: var(--brand);
	--color-highlight: var(--highlight);
	--color-danger: var(--danger);
	--color-success: var(--success);

	--font-sans: var(--ff-sans);

	--breakpoint-sm: 22.5rem;
	--breakpoint-md: 60rem;
	--breakpoint-lg: 90rem;
  }

  :root {
	--surface-1: oklch(100% 0 0);
	--surface-2: oklch(99.11% 0 0);

	--fill-1: oklch(96.74% 0.0013 286.38);
	--fill-2: oklch(91% 0.0013 286.37);
	--fill-3: oklch(85.88% 0.0055 286.28);
	--fill-4: oklch(71.18% 0.0129 286.07);
	--fill-5: oklch(44.19% 0.0146 285.79);

	--border: oklch(91% 0.0013 286.37);
	--disabled: oklch(21.78% 0 0 / 18%);

	--fg-1: oklch(21.78% 0 0);
	--fg-2: oklch(100% 0 0);

	--brand: oklch(21.78% 0 0);
	--highlight: oklch(0.64 0.1893 41.55);
	--danger: oklch(57.85% 0.2138 27.17);
	--success: oklch(57.29% 0.1544 149.22);

	--ff-sans: "Inter", sans-serif;
  }

  .dark {
	--surface-1: oklch(19.3% 0 0);
	--surface-2: oklch(24.45% 0.0061 17.58);

	--fill-1: oklch(32.11% 0 0);
	--fill-2: oklch(36.08% 0 0);
	--fill-3: oklch(48.32% 0 0);
	--fill-4: oklch(55.47% 0 0);
	--fill-5: oklch(69.13% 0 0);

	--border: oklch(36.08% 0 0);
	--disabled: oklch(100% 0 106.37 / 18%);

	--fg-1: oklch(100% 0 0);
	--fg-2: oklch(21.78% 0 0);

	--brand: oklch(100% 0 106.37);
	--highlight: oklch(0.84 0.1181 67);
	--danger: oklch(0.73 0.1689 22.18);
	--success: oklch(92.46% 0.0811 155.98);
  }

  @layer base {
	*,
	*::after,
	*::before {
		@apply border-border/60 antialiased;

		font-synthesis-weight: none;
		text-rendering: optimizeLegibility;
	}

	html {
		@apply scroll-smooth;
	}

	body {
		@apply bg-surface-1 text-fg-1;
	}

	::placeholder {
		@apply text-fg-1/70;
	}

	textarea::-webkit-resizer {
		@apply hidden;
	}
  }

  @keyframes accordion-expand {
	from {
		height: 0;
		opacity: 0.1;
	}
	to {
		height: var(--height);
		opacity: 1;
	}
  }

  @keyframes accordion-collapse {
	from {
		height: var(--height);
		opacity: 1;
	}
	to {
		height: 0;
		opacity: 0.1;
	}
  }

  [data-scope="accordion"][data-part="item-content"][data-state="open"] {
	animation: accordion-expand 200ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }

  [data-scope="accordion"][data-part="item-content"][data-state="closed"] {
	animation: accordion-collapse 180ms cubic-bezier(0.25, 0.1, 0.25, 1);
  }
`
