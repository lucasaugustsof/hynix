export type PolymorphicProps<T extends React.ElementType, Props = {}> = {
  as?: T
} & Omit<React.ComponentPropsWithRef<T>, keyof Props> &
  Props
