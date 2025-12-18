# @hynix/react

## 1.1.0

### Minor Changes

- ## New Components

  - **Modal**: Accessible dialog component built on Ark UI Dialog with full keyboard navigation and focus management
  - **Textarea**: Flexible textarea component with character counter and resize handle support
  - **SegmentedControl**: Segmented control component for mutually exclusive selections with horizontal orientation

  ## Breaking Changes

  - **Removed `useCloneChildren` hook**: Replaced with the more robust `cloneChildrenWithProps` utility function
  - **Removed `PolymorphicProps` type**: All components now use Ark UI's `asChild` factory pattern for polymorphic behavior, providing better type safety and consistency

  ## Improvements

  - **New `cloneChildrenWithProps` function**: Enhanced props injection system that prevents overwriting predefined child properties while maintaining type safety

## 1.0.0

### Major Changes

- # Initial Release

  First stable release of `@hynix/react` - a modern React component library built with TypeScript, Tailwind CSS v4, and Ark UI.

  ## Features

  - Accessible components built on Ark UI primitives
  - Tailwind CSS v4 with light/dark theme support
  - Compound component pattern with full TypeScript support
  - OKLCH color space for better color perception

  ## Components

  This release includes 11 foundational components:

  - **Alert** - Display important messages with severity variants
  - **Avatar** - User profile pictures with fallback
  - **Badge** - Compact labels for status and tags
  - **Button** - Primary interactive element with variants
  - **LinkButton** - Navigation button styled as link
  - **Checkbox** - Binary input with indeterminate state
  - **Switch** - Toggle control for on/off states
  - **Field** - Form field wrapper with validation
  - **Label** - Accessible form labels
  - **HintText** - Helper text for inputs
  - **ContentLabel** - Content labeling component
