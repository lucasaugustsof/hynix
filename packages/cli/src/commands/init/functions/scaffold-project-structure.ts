import { promises as fs } from 'node:fs'
import path from 'node:path'

import pc from 'picocolors'

import type { HynixConfig } from '@/schemas/config'
import { logger } from '@/utils/logger'
import { resolveAliasToAbsolutePath } from '@/utils/resolve-alias-to-absolute-path'

type ScaffoldTemplateFile = {
  name: string
  content: string
}

type ScaffoldOptions = {
  force?: boolean
}

export async function scaffoldProjectStructure(config: HynixConfig, options: ScaffoldOptions = {}) {
  const { force = false } = options

  await Promise.all(
    Object.entries(config.aliases).map(async ([aliasKey, aliasPath]) => {
      const directoryPath = resolveAliasToAbsolutePath(aliasPath)

      await fs.mkdir(directoryPath, {
        recursive: true,
      })

      const templateFiles = SCAFFOLD_TEMPLATE[aliasKey]

      if (!templateFiles || templateFiles.length === 0) {
        logger.dim(`No template files defined for ${pc.cyan(aliasKey)} (${aliasPath})`)
        return
      }

      const fileWritePromises = templateFiles.map(async templateFile => {
        const filePath = path.join(directoryPath, templateFile.name)

        try {
          await fs.access(filePath)

          if (!force) {
            logger.dim(`Skipping ${pc.cyan(templateFile.name)} (already exists)`)
            return
          }

          logger.dim(`Overwriting ${pc.cyan(templateFile.name)}`)
        } catch {
          // File doesn't exist, safe to create
        }

        await fs.writeFile(filePath, templateFile.content, 'utf-8')
      })

      await Promise.all(fileWritePromises)
    })
  )
}

export const SCAFFOLD_TEMPLATE = {
  utils: [
    {
      name: 'cn.ts',
      content: `import { type ClassValue, clsx } from 'clsx'
import { extendTailwindMerge } from 'tailwind-merge'

type TwMergeConfig = Parameters<typeof extendTailwindMerge>[0]

const typographyVariants = {
  title: ['h1', 'h2', 'h3', 'h4', 'h5', 'h6'],
  label: ['xl', 'lg', 'md', 'sm', 'xs'],
  paragraph: ['xl', 'lg', 'md', 'sm', 'xs'],
  subheading: ['md', 'sm', 'xs', '2xs'],
}

const typographyClasses = Object.entries(typographyVariants).flatMap(([type, sizes]) => {
  return sizes.map(size => \`\${type}-\${size}\`)
})

export const twMergeConfig: TwMergeConfig = {
  extend: {
    classGroups: {
      'font-size': [
        {
          text: typographyClasses,
        },
      ],
    },
  },
}

const customTwMerge = extendTailwindMerge(twMergeConfig)

export const cn = (...input: ClassValue[]) => customTwMerge(clsx(...input))
`,
    },
    {
      name: 'tv.ts',
      content: `import { createTV, type VariantProps } from 'tailwind-variants'

import { twMergeConfig } from './cn'

export const tv = createTV({
  twMergeConfig,
})

export type { VariantProps }
`,
    },
    {
      name: 'polymorphic.ts',
      content: `export type PolymorphicProps<T extends React.ElementType, Props = {}> = {
  as?: T
} & Omit<React.ComponentPropsWithRef<T>, keyof Props> &
  Props
`,
    },
    {
      name: 'render-children.ts',
      content: `import * as React from 'react'

type RenderChildrenOptions<TProps extends Record<string, unknown>> = {
  /**
   * The children to be rendered
   */
  children: React.ReactNode
  /**
   * The props to be injected into children that match the \`displayNames\`
   */
  props: TProps
  /**
   * List of \`displayName\` of child components that should receive the props
   */
  displayNames: string[]
}

/**
 * Renders children by injecting specific props from the parent.
 *
 * This function iterates through children and, for each component that has
 * a \`displayName\` matching the provided list, injects the props specified
 * via \`props\`.
 *
 * @example
 * \`\`\`tsx
 * const ParentComponent = ({ size, children }) => {
 *   return (
 *     <div>
 *       {renderChildren({
 *         children,
 *         props: { size },
 *         displayNames: ['Child.Item', 'Child.Icon'],
 *       })}
 *     </div>
 *   )
 * }
 * \`\`\`
 */
export function renderChildren<TProps extends Record<string, unknown>>({
  children,
  props,
  displayNames,
}: RenderChildrenOptions<TProps>): React.ReactNode {
  return React.Children.map(children, child => {
    if (!React.isValidElement(child)) {
      return child
    }

    const childType = child.type as {
      displayName?: string
    }

    const childDisplayName = childType.displayName

    if (childDisplayName && displayNames.includes(childDisplayName)) {
      return React.cloneElement(child, {
        ...props,
        ...(child.props ?? {}),
      })
    }

    const childProps = child.props as {
      children?: React.ReactNode
    }

    if (childProps.children) {
      const newChildren = renderChildren({
        children: childProps.children,
        props,
        displayNames,
      })

      return React.cloneElement(child, undefined, newChildren)
    }

    return child
  })
}
`,
    },
  ],
  styles: [
    {
      name: 'globals.css',
      content: `@import "tailwindcss";
@import "tw-animate-css";

@custom-variant dark (&:where(.dark, .dark *));

@theme inline {
  --color-surface-1: var(--surface-1);
  --color-surface-2: var(--surface-2);

  --color-fg-1: var(--fg-1);
  --color-fg-2: var(--fg-2);

  --color-fill-1: var(--fill-1);
  --color-fill-2: var(--fill-2);
  --color-fill-3: var(--fill-3);
  --color-fill-4: var(--fill-4);
  --color-fill-5: var(--fill-5);

  --color-border: var(--border);
  --color-disabled: var(--disabled);

  --color-brand: var(--brand);

  --color-danger: var(--danger);
  --color-success: var(--success);
  --color-warning: var(--warning);
  --color-information: var(--information);

  --font-sans: "Inter", sans-serif;

  --text-title-h1: 3.5rem;
  --text-title-h1--font-weight: 500;
  --text-title-h1--line-height: 4rem;
  --text-title-h1--letter-spacing: -1%;

  --text-title-h2: 3rem;
  --text-title-h2--font-weight: 500;
  --text-title-h2--line-height: 3.5rem;
  --text-title-h2--letter-spacing: -1%;

  --text-title-h3: 2.5rem;
  --text-title-h3--font-weight: 500;
  --text-title-h3--line-height: 3rem;
  --text-title-h3--letter-spacing: -1%;

  --text-title-h4: 2rem;
  --text-title-h4--font-weight: 500;
  --text-title-h4--line-height: 2.5rem;
  --text-title-h4--letter-spacing: -0.5%;

  --text-title-h5: 1.5rem;
  --text-title-h5--font-weight: 500;
  --text-title-h5--line-height: 2rem;
  --text-title-h5--letter-spacing: 0%;

  --text-title-h6: 1.25rem;
  --text-title-h6--font-weight: 500;
  --text-title-h6--line-height: 1.75rem;
  --text-title-h6--letter-spacing: 0%;

  --text-label-xl: 1.5rem;
  --text-label-xl--font-weight: 500;
  --text-label-xl--line-height: 2rem;
  --text-label-xl--letter-spacing: -1.5%;

  --text-label-lg: 1.125rem;
  --text-label-lg--font-weight: 500;
  --text-label-lg--line-height: 1.5rem;
  --text-label-lg--letter-spacing: -1.5%;

  --text-label-md: 1rem;
  --text-label-md--font-weight: 500;
  --text-label-md--line-height: 1.5rem;
  --text-label-md--letter-spacing: -1.1%;

  --text-label-sm: 0.875rem;
  --text-label-sm--font-weight: 500;
  --text-label-sm--line-height: 1.25rem;
  --text-label-sm--letter-spacing: -0.6%;

  --text-label-xs: 0.75rem;
  --text-label-xs--font-weight: 500;
  --text-label-xs--line-height: 1rem;
  --text-label-xs--letter-spacing: 0%;

  --text-paragraph-xl: 1.5rem;
  --text-paragraph-xl--font-weight: 400;
  --text-paragraph-xl--line-height: 2rem;
  --text-paragraph-xl--letter-spacing: -1.5%;

  --text-paragraph-lg: 1.125rem;
  --text-paragraph-lg--font-weight: 400;
  --text-paragraph-lg--line-height: 1.5rem;
  --text-paragraph-lg--letter-spacing: -1.5%;

  --text-paragraph-md: 1rem;
  --text-paragraph-md--font-weight: 400;
  --text-paragraph-md--line-height: 1.5rem;
  --text-paragraph-md--letter-spacing: -1.1%;

  --text-paragraph-sm: 0.875rem;
  --text-paragraph-sm--font-weight: 400;
  --text-paragraph-sm--line-height: 1.25rem;
  --text-paragraph-sm--letter-spacing: -0.6%;

  --text-paragraph-xs: 0.75rem;
  --text-paragraph-xs--font-weight: 400;
  --text-paragraph-xs--line-height: 1rem;
  --text-paragraph-xs--letter-spacing: 0%;

  --text-subheading-md: 1rem;
  --text-subheading-md--font-weight: 500;
  --text-subheading-md--line-height: 1.5rem;
  --text-subheading-md--letter-spacing: 6%;

  --text-subheading-sm: 0.875rem;
  --text-subheading-sm--font-weight: 500;
  --text-subheading-sm--line-height: 1.25rem;
  --text-subheading-sm--letter-spacing: 6%;

  --text-subheading-xs: 0.75rem;
  --text-subheading-xs--font-weight: 500;
  --text-subheading-xs--line-height: 1rem;
  --text-subheading-xs--letter-spacing: 4%;

  --text-subheading-2xs: 0.625rem;
  --text-subheading-2xs--font-weight: 500;
  --text-subheading-2xs--line-height: 0.75rem;
  --text-subheading-2xs--letter-spacing: 2%;
}

:root,
[data-theme="light"] {
  color-scheme: light only;

  --surface-1: light-dark(oklch(1 0 0), oklch(0.1913 0 0));
  --surface-2: light-dark(oklch(0.9911 0 0), oklch(0.2438 0.0061 17.58));

  --fg-1: light-dark(oklch(0.2178 0 0), oklch(1 0 0));
  --fg-2: light-dark(oklch(1 0 0), oklch(0.2178 0 0));

  --fill-1: light-dark(oklch(0.9674 0.0013 286.37), oklch(0.3211 0 0));
  --fill-2: light-dark(oklch(0.91 0.0013 286.37), oklch(0.36 0 0));
  --fill-3: light-dark(oklch(0.8588 0.0055 286.28), oklch(0.4855 0 0));
  --fill-4: light-dark(oklch(0.7118 0.0129 286.07), oklch(0.559 0 0));
  --fill-5: light-dark(oklch(0.4419 0.0146 285.79), oklch(0.6895 0 0));

  --border: light-dark(oklch(0.91 0.0013 286.37), oklch(0.36 0 0));
  --disabled: light-dark(oklch(0.2178 0 0 / 18%), oklch(1 0 0 / 18%));

  --brand: light-dark(oklch(0.2178 0 0), oklch(1 0 0));

  --danger: light-dark(oklch(0.5785 0.2138 27.17), oklch(0.6989 0.1919 23.47));
  --success: light-dark(oklch(0.5729 0.1544 149.22), oklch(0.8003 0.1821 151.71));
  --warning: light-dark(oklch(0.702 0.1832 48.56), oklch(0.7576 0.159 55.93));
  --information: light-dark(oklch(0.523 0.2282 262.64), oklch(0.7015 0.1596 253.87));
}

[data-theme="dark"] {
  color-scheme: dark only;
}

@layer base {
  * {
    @apply antialiased border-border;
  }

  html {
    @apply scroll-smooth;
  }

  body {
    @apply bg-surface-1 text-fg-1;
    text-rendering: optimizeLegibility;
  }

  ::placeholder {
    @apply text-fg-1/40;
  }
}

@utility focus-outline {
  --outline-width: 0.125rem;

  outline-offset: var(--outline-width);
  outline: var(--outline-width) solid --alpha(var(--focus-outline-color, var(--color-brand)) / 0.15);
}

@utility scroll-hidden {
  -ms-overflow-style: none;
  scrollbar-width: none;

  &::-webkit-scrollbar {
    display: none;
  }
}
`,
    },
  ],
} as Record<string, ScaffoldTemplateFile[]>
