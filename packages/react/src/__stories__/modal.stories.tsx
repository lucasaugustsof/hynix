import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { RiInformation2Fill, RiMailLine, RiSettings2Line } from '@remixicon/react'
import { Button } from '@/components/button'
import { Field } from '@/components/field'
import { Label } from '@/components/label'
import { Modal } from '@/components/modal'

export default {
  title: 'Components/Modal',
} satisfies Meta

export const Basic: StoryObj = {
  render: () => {
    const fieldInputRef = React.useRef<HTMLInputElement>(null)

    return (
      <Modal.Root initialFocusEl={() => fieldInputRef.current}>
        <Modal.Trigger asChild>
          <Button.Root>Open Modal</Button.Root>
        </Modal.Trigger>

        <Modal.Overlay />
        <Modal.Content className="w-sm" asChild>
          <form noValidate onSubmit={event => event.preventDefault()}>
            <Modal.Header leftIcon={<RiSettings2Line />} size="md">
              <Modal.Title>Email Verification</Modal.Title>
              <Modal.Description>Enter your email to get a verification code.</Modal.Description>
            </Modal.Header>

            <Modal.Body>
              <Field.Root size="md" required>
                <Label.Root>
                  <Label.Text>Email Address</Label.Text>
                  <Label.Asterisk />
                  <Label.SubText>(Optional)</Label.SubText>
                  <Label.Info />
                </Label.Root>

                <Field.Control>
                  <Field.Icon as={RiMailLine} />
                  <Field.Input type="email" ref={fieldInputRef} placeholder="contact@hynix.cc" />
                  <Field.Icon as={RiInformation2Fill} />
                </Field.Control>
              </Field.Root>
            </Modal.Body>

            <Modal.Footer>
              <Modal.Actions className="grid grid-cols-2">
                <Modal.CloseTrigger asChild>
                  <Button.Root variant="secondary" size="sm">
                    Cancel
                  </Button.Root>
                </Modal.CloseTrigger>

                <Button.Root size="sm">Send Code</Button.Root>
              </Modal.Actions>
            </Modal.Footer>
          </form>
        </Modal.Content>
      </Modal.Root>
    )
  },
}
