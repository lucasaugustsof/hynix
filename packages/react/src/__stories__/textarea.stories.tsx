import * as React from 'react'

import type { Meta, StoryObj } from '@storybook/react-vite'

import { Field } from '@/components/field'
import { HintText } from '@/components/hint-text'
import { Label } from '@/components/label'
import { Textarea, type TextareaRootProps } from '@/components/textarea'

export default {
  title: 'Components/Textarea',
  component: Textarea.Root,
  decorators: [
    Story => (
      <div className="max-w-96">
        <Story />
      </div>
    ),
  ],
} satisfies Meta<TextareaRootProps>

type TextareaStory = StoryObj<TextareaRootProps>

export const Default: TextareaStory = {
  render() {
    const [value, setValue] = React.useState('')
    const MAX_LENGTH = 280

    return (
      <Field.Root>
        <Label.Root>
          <Label.Text>Post a comment</Label.Text>
        </Label.Root>

        <Textarea.Root
          placeholder="Share your thoughts..."
          value={value}
          onChange={event => setValue(event.target.value)}
          maxLength={MAX_LENGTH}
        >
          <Textarea.CharCounter max={MAX_LENGTH} current={value.length} />
        </Textarea.Root>

        <HintText leftIcon>Be respectful and constructive in your feedback.</HintText>
      </Field.Root>
    )
  },
}

export const FeedbackForm: TextareaStory = {
  render() {
    const [feedback, setFeedback] = React.useState('')
    const MAX_LENGTH = 500

    return (
      <Field.Root>
        <Label.Root>
          <Label.Text>Product Feedback</Label.Text>
          <Label.Asterisk />
        </Label.Root>

        <Textarea.Root
          placeholder="Tell us what you think about our product..."
          value={feedback}
          onChange={event => setFeedback(event.target.value)}
          maxLength={MAX_LENGTH}
          required
        >
          <Textarea.CharCounter max={MAX_LENGTH} current={feedback.length} />
        </Textarea.Root>

        <HintText leftIcon>Your feedback helps us improve our product.</HintText>
      </Field.Root>
    )
  },
}

export const BioEditor: TextareaStory = {
  render() {
    const [bio, setBio] = React.useState(
      'Senior Product Designer passionate about creating accessible and delightful user experiences.'
    )
    const MAX_LENGTH = 160

    return (
      <Field.Root>
        <Label.Root>
          <Label.Text>Bio</Label.Text>
          <Label.SubText>(Optional)</Label.SubText>
        </Label.Root>

        <Textarea.Root
          placeholder="Write a short bio about yourself..."
          value={bio}
          onChange={event => setBio(event.target.value)}
        >
          <Textarea.CharCounter
            max={MAX_LENGTH}
            current={bio.length}
            invalid={bio.length > MAX_LENGTH}
          />
        </Textarea.Root>

        <HintText>Brief description that appears on your profile.</HintText>
      </Field.Root>
    )
  },
}

export const WithoutResize: TextareaStory = {
  render() {
    const [message, setMessage] = React.useState('')

    return (
      <Field.Root>
        <Label.Root>
          <Label.Text>Quick Note</Label.Text>
        </Label.Root>

        <Textarea.Root
          placeholder="Add a quick note..."
          value={message}
          onChange={event => setMessage(event.target.value)}
          allowResize={false}
        />

        <HintText>This note is only visible to you.</HintText>
      </Field.Root>
    )
  },
}

export const Disabled: TextareaStory = {
  render() {
    return (
      <Field.Root>
        <Label.Root>
          <Label.Text>Comments</Label.Text>
        </Label.Root>

        <Textarea.Root
          placeholder="Comments are currently disabled..."
          value="This feature is temporarily unavailable."
          disabled
        />

        <HintText>Commenting will be re-enabled soon.</HintText>
      </Field.Root>
    )
  },
}
