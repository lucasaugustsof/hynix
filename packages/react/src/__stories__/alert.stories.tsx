import type { Meta, StoryObj } from '@storybook/react-vite'

import { Info } from 'lucide-react'
import { Alert } from '@/components/alert'

export default {
  title: 'Components/Alert',
  component: Alert.Root,
} satisfies Meta

export const Default: StoryObj = {
  render() {
    return (
      <Alert.Root className="w-[24.375rem]" variant="filled" status="information">
        <Alert.Icon as={Info} />
        <Alert.Title>Insert your alert title here!</Alert.Title>
        <Alert.LinkButton href="/">Upgrade</Alert.LinkButton>
        <Alert.Close />
      </Alert.Root>
    )
  },
}
