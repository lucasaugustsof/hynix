type PreviewComponentProps = {
  children: React.ReactNode
  title: string
}

export function PreviewComponent({ children, title }: PreviewComponentProps) {
  return (
    <div className="overflow-hidden rounded-xl border">
      <header className="flex h-12 items-center border-b bg-surface-1 px-4">
        <h3 className="font-normal font-sans text-base text-fg-1">{title}</h3>
      </header>

      <div className="bg-surface-2 p-6">{children}</div>
    </div>
  )
}
