import * as React from 'react'

// import { Presence as ArkPresence } from '@ark-ui/react/presence'

import type { Meta, StoryObj } from '@storybook/react-vite'
import { action } from 'storybook/actions'

import {
  // RiCheckboxCircleFill,
  RiInformation2Fill,
  // RiLinksLine,
  // RiLoader4Line,
  RiMailLine,
  RiSettings2Line,
} from '@remixicon/react'
// import { AnimatePresence, MotionConfig, motion } from 'motion/react'
import { Button } from '@/components/button'
// import { Checkbox } from '@/components/checkbox'
// import { ContentLabel } from '@/components/content-label'
import { Field } from '@/components/field'
import { Label } from '@/components/label'
// import { LinkButton } from '@/components/link-button'
import {
  Modal,
  type ModalRootProps,
  // useDialog
} from '@/components/modal'
// import { Switch } from '@/components/switch'
// import { cn } from '@/lib/cn'

export default {
  title: 'Components/Overlays/Modal',
} satisfies Meta<ModalRootProps>

type ModalStory<T = {}> = StoryObj<ModalRootProps & T>

export const Default: ModalStory = {
  render: () => {
    const fieldInputRef = React.useRef<HTMLInputElement>(null)

    return (
      <Modal.Root
        initialFocusEl={() => fieldInputRef.current}
        onOpenChange={action('onOpenChange')}
      >
        <Modal.Trigger asChild>
          <Button.Root variant="secondary">Open Modal</Button.Root>
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
                  <Field.Icon asChild>
                    <RiMailLine />
                  </Field.Icon>

                  <Field.Input type="email" ref={fieldInputRef} placeholder="contact@hynix.cc" />

                  <Field.Icon asChild>
                    <RiInformation2Fill />
                  </Field.Icon>
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

// export const Status: ModalStory<{
//   alignment: 'horizontal' | 'vertical'
//   type: 'information' | 'success' | 'warning' | 'error'
// }> = {
//   args: {
//     alignment: 'horizontal',
//     type: 'information',
//   },
//   argTypes: {
//     alignment: {
//       control: 'select',
//       options: ['horizontal', 'vertical'],
//       description: 'Status icon alignment',
//       table: {
//         category: 'Layout',
//       },
//     },
//     type: {
//       control: 'select',
//       options: ['information', 'success', 'warning', 'error'],
//       description: 'Status type',
//       table: {
//         category: 'Status',
//       },
//     },
//   },
//   render: args => {
//     const isHorizontal = args.alignment === 'horizontal'
//     const checkboxId = `status-${args.type}-checkbox`

//     const statusContent = {
//       information: {
//         title: 'Update Available',
//         description: 'Version 2.4.0 includes bug fixes and performance improvements.',
//         checkboxLabel: "Don't show it again",
//         cancelButton: 'Later',
//         actionButton: 'Update',
//       },
//       success: {
//         title: 'Payment Successful',
//         description: 'Your transaction has been completed successfully.',
//         checkboxLabel: 'Save payment method',
//         cancelButton: 'Close',
//         actionButton: 'View Receipt',
//       },
//       warning: {
//         title: 'Storage Almost Full',
//         description: 'You are using 95% of your available storage space.',
//         checkboxLabel: "Don't warn me again",
//         cancelButton: 'Dismiss',
//         actionButton: 'Upgrade',
//       },
//       error: {
//         title: 'Connection Failed',
//         description: 'Unable to connect to the server. Please try again.',
//         checkboxLabel: 'Work offline',
//         cancelButton: 'Cancel',
//         actionButton: 'Retry',
//       },
//     }

//     const content = statusContent[args.type]

//     return (
//       <Modal.Root onOpenChange={action('onOpenChange')}>
//         <Modal.Trigger asChild>
//           <Button.Root variant="secondary">Open Status Modal</Button.Root>
//         </Modal.Trigger>

//         <Modal.Overlay />
//         <Modal.Content className="w-110">
//           <Modal.Body>
//             <div
//               className={cn(
//                 isHorizontal
//                   ? 'grid grid-cols-[auto_1fr] items-start gap-x-4'
//                   : 'flex flex-col items-center justify-center gap-y-4'
//               )}
//             >
//               <Modal.Status type={args.type} />

//               <div className={cn('space-y-1', !isHorizontal && 'text-center')}>
//                 <Modal.Title className="text-base tracking-[-0.011rem]">
//                   {content.title}
//                 </Modal.Title>

//                 <Modal.Description className="text-sm tracking-[-0.00525rem]">
//                   {content.description}
//                 </Modal.Description>
//               </div>
//             </div>
//           </Modal.Body>

//           <Modal.Footer>
//             <Checkbox.Root id={checkboxId} className="flex items-center gap-x-2">
//               <Checkbox.Control />

//               <Label.Root htmlFor={checkboxId}>
//                 <Label.Text className="font-normal">{content.checkboxLabel}</Label.Text>
//               </Label.Root>
//             </Checkbox.Root>

//             <Modal.Actions>
//               <Modal.CloseTrigger asChild>
//                 <Button.Root variant="secondary" size="sm">
//                   {content.cancelButton}
//                 </Button.Root>
//               </Modal.CloseTrigger>

//               <Button.Root size="sm">{content.actionButton}</Button.Root>
//             </Modal.Actions>
//           </Modal.Footer>
//         </Modal.Content>
//       </Modal.Root>
//     )
//   },
// }

// export const IntegrationSettings: ModalStory = {
//   render: () => {
//     type ApplyChangeState = 'idle' | 'saving' | 'saved'

//     type IntegrationConfig = {
//       key: string
//       label: string
//       description: string
//       iconSrc: string
//       defaultChecked: boolean
//     }

//     const INTEGRATIONS: IntegrationConfig[] = [
//       {
//         key: 'slack',
//         label: 'Slack',
//         description: 'Collaborate and stay updated in real-time.',
//         iconSrc: './assets/slack.svg',
//         defaultChecked: true,
//       },
//       {
//         key: 'notion',
//         label: 'Notion',
//         description: 'Centralize and organize educational resources.',
//         iconSrc: './assets/notion.svg',
//         defaultChecked: true,
//       },
//       {
//         key: 'zapier',
//         label: 'Zapier',
//         description: 'Automate tasks and workflows to boost productivity.',
//         iconSrc: './assets/zapier.svg',
//         defaultChecked: false,
//       },
//       {
//         key: 'dropbox',
//         label: 'Dropbox',
//         description: 'Sync and share files for easy access.',
//         iconSrc: './assets/dropbox.svg',
//         defaultChecked: false,
//       },
//     ]

//     const SUBMIT_BUTTON_LABELS: Record<ApplyChangeState, string> = {
//       idle: 'Apply Changes',
//       saving: 'Saving...',
//       saved: 'Saved',
//     }

//     const SAVE_DURATION = 2000
//     const CLOSE_DELAY = 2000

//     const dialogStore = useDialog()

//     const [submitState, setSubmitState] = React.useState<ApplyChangeState>('idle')

//     const getInitialIntegrations = React.useCallback(
//       () =>
//         INTEGRATIONS.reduce(
//           (acc, integration) => {
//             const data = acc

//             return {
//               ...data,
//               [integration.key]: integration.defaultChecked,
//             }
//           },
//           {} as Record<string, boolean>
//         ),
//       []
//     )

//     const [integrations, setIntegrations] = React.useState(getInitialIntegrations)

//     const handleToggle = React.useCallback((key: string) => {
//       setIntegrations(prev => ({
//         ...prev,
//         [key]: !prev[key],
//       }))
//     }, [])

//     const handleApplyChanges = React.useCallback(() => {
//       setSubmitState('saving')

//       setTimeout(() => {
//         setSubmitState('saved')
//       }, SAVE_DURATION)
//     }, [])

//     const handleExitComplete = React.useCallback(() => {
//       setSubmitState('idle')
//       setIntegrations(getInitialIntegrations())
//     }, [getInitialIntegrations])

//     React.useEffect(() => {
//       if (submitState === 'saved') {
//         const timer = setTimeout(() => {
//           dialogStore.setOpen(false)
//         }, CLOSE_DELAY)

//         return () => clearTimeout(timer)
//       }
//     }, [submitState, dialogStore])

//     return (
//       <Modal.RootProvider value={dialogStore} onExitComplete={handleExitComplete}>
//         <Modal.Trigger asChild>
//           <Button.Root variant="secondary">
//             <Button.Icon asChild>
//               <RiLinksLine />
//             </Button.Icon>
//             Integration Settings
//           </Button.Root>
//         </Modal.Trigger>

//         <Modal.Overlay />
//         <Modal.Content className="w-120">
//           <Modal.Header leftIcon={<RiLinksLine />} size="md">
//             <Modal.Title>Integration Settings</Modal.Title>
//             <Modal.Description>
//               Select preferred integrations to optimize workflow.
//             </Modal.Description>
//           </Modal.Header>

//           <Modal.Body className="space-y-5">
//             {INTEGRATIONS.map(integration => (
//               <ContentLabel
//                 key={integration.key}
//                 className="w-full"
//                 editLabel={integration.label}
//                 editDescription={integration.description}
//                 startSlot={<img src={integration.iconSrc} alt={integration.label} />}
//                 endSlot={
//                   <Switch.Root
//                     checked={integrations[integration.key]}
//                     onCheckedChange={() => handleToggle(integration.key)}
//                   >
//                     <Switch.Control />
//                   </Switch.Root>
//                 }
//               />
//             ))}
//           </Modal.Body>

//           <MotionConfig
//             transition={{
//               type: 'spring',
//               duration: 0.3,
//               bounce: 0,
//             }}
//           >
//             <Modal.Footer>
//               <LinkButton.Root href="#" underline size="md">
//                 Add Integration
//               </LinkButton.Root>

//               <Modal.Actions>
//                 <Modal.CloseTrigger asChild>
//                   <Button.Root variant="secondary" size="sm">
//                     Cancel
//                   </Button.Root>
//                 </Modal.CloseTrigger>

//                 <Button.Root
//                   size="sm"
//                   onClick={handleApplyChanges}
//                   className={cn('overflow-hidden', submitState !== 'idle' && 'pointer-events-none')}
//                   aria-busy={submitState === 'saving'}
//                   aria-live="polite"
//                 >
//                   <AnimatePresence mode="popLayout" initial={false}>
//                     <motion.span
//                       key={submitState}
//                       className="inline-flex items-center gap-x-[inherit]"
//                       initial={{
//                         y: -25,
//                         opacity: 0,
//                       }}
//                       animate={{
//                         y: 0,
//                         opacity: 1,
//                       }}
//                       exit={{
//                         y: 25,
//                         opacity: 0,
//                       }}
//                     >
//                       <ArkPresence present={submitState === 'saving' || submitState === 'saved'}>
//                         <Button.Icon
//                           className={cn(
//                             submitState === 'saving' ? 'animate-spin' : 'zoom-in-0 animate-in'
//                           )}
//                           aria-hidden
//                           asChild
//                         >
//                           {submitState === 'saving' ? <RiLoader4Line /> : <RiCheckboxCircleFill />}
//                         </Button.Icon>
//                       </ArkPresence>

//                       {SUBMIT_BUTTON_LABELS[submitState]}
//                     </motion.span>
//                   </AnimatePresence>
//                 </Button.Root>
//               </Modal.Actions>
//             </Modal.Footer>
//           </MotionConfig>
//         </Modal.Content>
//       </Modal.RootProvider>
//     )
//   },
// }
