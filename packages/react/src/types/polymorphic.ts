export type PolymorphicProps<T extends React.ElementType, Props = {}> = Props & {
  as?: T
} & Omit<React.ComponentProps<T>, keyof Props | 'as'>
