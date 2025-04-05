import { useEffect, useRef, useState } from 'react'

import { Button } from 'registry/components/button'
import { Chip, ChipLabel } from 'registry/components/chip'
import {
  TooltipContent,
  TooltipRoot,
  TooltipTrigger,
} from 'registry/components/tooltip'

import { RiCheckLine, RiCodeLine, RiFileCopyLine } from '@remixicon/react'
import { motion, useAnimate } from 'motion/react'

import { codeToHtml } from 'shiki'

import { cn } from 'registry/utilities/cn'

const CODE_EXAMPLE = `import { cn } from 'registry/utilities/cn'
import { type VariantProps, tv } from 'registry/utilities/tv'

type LoaderProps = VariantProps<typeof loaderVariants>

function Loader({ size }: LoaderProps) {
  return (
    <div
      role="status"
      className={cn(
        loaderVariants({
          size,
        }),
      )}
      data-scope="loader"
    />
  )
}

export { Loader }
export type { LoaderProps }
`

function AnimatedIconWrapper({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <motion.div
      initial={{
        opacity: 0,
        scale: 0,
        filter: 'blur(var(--blur-xs))',
      }}
      animate={{
        opacity: 1,
        scale: 1,
        filter: 'blur(var(--blur-none))',
      }}
      exit={{
        opacity: 0,
        scale: 0,
      }}
      transition={{
        type: 'spring',
        bounce: 0.2,
        duration: 0.6,
      }}
    >
      {children}
    </motion.div>
  )
}

function CodeBlock() {
  const [highlightedCodeHtml, setHighlightedCodeHtml] = useState('')
  const [isCodeCollapsed, setIsCodeCollapsed] = useState(true)
  const [hasCopiedToClipboard, setHasCopiedToClipboard] = useState(false)
  const codeAreaRef = useRef<HTMLDivElement | null>(null)

  const [containerRef, animate] = useAnimate()

  function toggleCodeCollapse() {
    setIsCodeCollapsed(prev => !prev)

    animate(
      containerRef.current,
      {
        height: isCodeCollapsed ? 'auto' : 'calc(var(--spacing)*96)',
      },
      {
        type: 'spring',
        bounce: 0,
        duration: 0.4,
      },
    )
  }

  function handleCopyToClipboard() {
    setHasCopiedToClipboard(true)

    if (codeAreaRef.current) {
      const codeText = codeAreaRef.current.children[0].textContent

      if (codeText) {
        navigator.clipboard.writeText(codeText)
      }
    }
  }

  useEffect(() => {
    async function highlightCode() {
      const html = await codeToHtml(CODE_EXAMPLE, {
        lang: 'tsx',
        theme: 'vesper',
        tabindex: -1,
        defaultColor: false,
        colorReplacements: {
          '#101010': 'var(--color-surface-1)',
          '#fff': 'var(--color-fg-1)',
        },
      })

      setHighlightedCodeHtml(html)
    }

    highlightCode()
  }, [])

  useEffect(() => {
    if (!hasCopiedToClipboard) return

    const timeout = setTimeout(() => {
      setHasCopiedToClipboard(false)
    }, 2000)

    return () => clearTimeout(timeout)
  }, [hasCopiedToClipboard])

  return (
    <div
      ref={containerRef}
      className={cn(
        'relative h-96 w-[45rem] overflow-hidden rounded-lg border border-border',
      )}
    >
      <header
        className={cn(
          'relative flex items-center justify-between border-border border-b px-4 py-2',
        )}
      >
        <div>
          <Chip size="sm" activated>
            <RiCodeLine className="size-4 fill-fg-2" />
            <ChipLabel>loader.tsx</ChipLabel>
          </Chip>
        </div>

        <TooltipRoot
          positioning={{
            strategy: 'fixed',
            placement: 'top',
            offset: {
              mainAxis: 16,
            },
          }}
          openDelay={600}
          closeDelay={60}
        >
          <TooltipTrigger asChild>
            <Button
              variant="secondary"
              size="sm"
              iconOnly
              onClick={handleCopyToClipboard}
            >
              {hasCopiedToClipboard && (
                <AnimatedIconWrapper>
                  <RiCheckLine className={cn('fill-success')} />
                </AnimatedIconWrapper>
              )}

              {!hasCopiedToClipboard && (
                <AnimatedIconWrapper>
                  <RiFileCopyLine />
                </AnimatedIconWrapper>
              )}
            </Button>
          </TooltipTrigger>

          <TooltipContent className="z-10">
            <span>Copy code</span>
          </TooltipContent>
        </TooltipRoot>
      </header>

      <main className="relative flex-1 overflow-auto">
        <div
          ref={codeAreaRef}
          className="[&>pre]:px-4 [&>pre]:pt-3 [&>pre]:pb-16"
          dangerouslySetInnerHTML={{
            __html: highlightedCodeHtml,
          }}
        />
      </main>

      <footer className="mask-t-from-50% absolute bottom-0 flex w-full items-center justify-center bg-surface-1 p-4">
        <button
          type="button"
          className="cursor-pointer font-medium font-sans text-base text-fg-1"
          onClick={toggleCodeCollapse}
        >
          {isCodeCollapsed ? 'Expand' : 'Collapse'}
        </button>
      </footer>
    </div>
  )
}

export { CodeBlock }
