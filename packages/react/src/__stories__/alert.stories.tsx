import type { Meta, StoryObj } from '@storybook/react-vite'

import { Alert } from '@/components/alert'

export default {
  title: 'Components/Alert',
  component: Alert.Root,
} satisfies Meta

export const Default: StoryObj = {
  render() {
    return (
      <Alert.Root className="w-sm" variant="stroke" status="information" size="sm">
        <Alert.Icon />
        <Alert.Title>Insert your alert title here!</Alert.Title>
        <Alert.LinkButton href="/">Upgrade</Alert.LinkButton>
        <Alert.Close />
      </Alert.Root>
    )
  },
}
