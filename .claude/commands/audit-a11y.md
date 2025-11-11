---
description: Perform comprehensive accessibility audit on a component using WCAG and A11y best practices
---

You are an accessibility expert conducting a comprehensive audit of a React component based on WCAG 2.2 (W3C) guidelines and A11y Project best practices.

## Component to Audit

The component to audit is: #$ARGUMENTS

## Accessibility Audit Framework

Perform a thorough accessibility review following WCAG 2.2 principles (Perceivable, Operable, Understandable, Robust) and A11y Project guidelines.

### 1. Perceivable - Information must be presentable to users

#### 1.1 Text Alternatives (WCAG 1.1)
- [ ] **Images and Icons**: All non-decorative images/icons have text alternatives
  - Icon-only buttons have `aria-label` or `aria-labelledby`
  - Decorative icons have `aria-hidden="true"`
  - SVG icons have proper `role` and `title` when needed
- [ ] **Form Controls**: All inputs have associated labels
  - Programmatic label association via `htmlFor`/`id` or `aria-labelledby`
  - No reliance on placeholder text as labels

#### 1.2 Time-based Media (WCAG 1.2)
- [ ] **Animations**: Motion respects `prefers-reduced-motion`
- [ ] **Auto-playing content**: User can pause, stop, or hide
- [ ] **Time limits**: User can extend or disable if present

#### 1.3 Adaptable (WCAG 1.3)
- [ ] **Semantic HTML**: Uses appropriate semantic elements
  - Buttons are `<button>`, not `<div onclick>`
  - Links are `<a>`, not `<span onclick>`
  - Lists use `<ul>/<ol>` and `<li>`
  - Headings use `<h1>`-`<h6>` in logical order
- [ ] **Info and Relationships**: Structure can be programmatically determined
  - Proper heading hierarchy
  - Related form fields grouped with `<fieldset>` and `<legend>`
  - Tables use proper structure (`<thead>`, `<tbody>`, `<th>`)
- [ ] **Meaningful Sequence**: Reading order is logical
- [ ] **Sensory Characteristics**: Instructions don't rely solely on shape, size, visual location, orientation, or sound

#### 1.4 Distinguishable (WCAG 1.4)
- [ ] **Color Contrast**: Text meets minimum contrast ratios
  - Normal text: 4.5:1 minimum (AAA: 7:1)
  - Large text (18pt+ or 14pt+ bold): 3:1 minimum (AAA: 4.5:1)
  - UI components and graphics: 3:1 minimum
- [ ] **Color Independence**: Information not conveyed by color alone
  - Error states use icons/text in addition to red color
  - Required fields marked with asterisk/text, not just color
- [ ] **Resize Text**: Component works when text is resized to 200%
- [ ] **Text Spacing**: Component works with increased spacing:
  - Line height: 1.5× font size
  - Paragraph spacing: 2× font size
  - Letter spacing: 0.12× font size
  - Word spacing: 0.16× font size
- [ ] **Focus Visible**: Clear focus indicators on all interactive elements
  - Focus outline is visible and meets 3:1 contrast
  - Custom focus styles don't remove default unless replaced

### 2. Operable - Interface components must be operable

#### 2.1 Keyboard Accessible (WCAG 2.1)
- [ ] **Keyboard Navigation**: All functionality available via keyboard
  - Tab/Shift+Tab moves through interactive elements
  - Enter/Space activates buttons
  - Arrow keys for radio groups, tabs, menus, listboxes
  - Escape closes modals, dropdowns, tooltips
- [ ] **No Keyboard Trap**: Users can navigate away from any component
- [ ] **Focus Order**: Tab order is logical and intuitive
- [ ] **Shortcut Keys**: Character-key shortcuts can be disabled/remapped if present

#### 2.2 Enough Time (WCAG 2.2)
- [ ] **Timing Adjustable**: User can turn off, adjust, or extend time limits
- [ ] **Pause, Stop, Hide**: Auto-updating content can be paused/stopped

#### 2.3 Seizures and Physical Reactions (WCAG 2.3)
- [ ] **Flashing Content**: Nothing flashes more than 3 times per second
- [ ] **Motion**: Animations can be disabled via `prefers-reduced-motion`

#### 2.4 Navigable (WCAG 2.4)
- [ ] **Bypass Blocks**: Skip links or landmarks for repetitive content
- [ ] **Page Titled**: Page/view has descriptive title (if applicable)
- [ ] **Focus Order**: Logical and intuitive
- [ ] **Link Purpose**: Link text describes destination
- [ ] **Multiple Ways**: More than one way to locate content (if applicable)
- [ ] **Headings and Labels**: Descriptive and clear
- [ ] **Focus Visible**: Keyboard focus indicator is clearly visible

#### 2.5 Input Modalities (WCAG 2.5)
- [ ] **Pointer Gestures**: Multi-point or path-based gestures have single-pointer alternative
- [ ] **Pointer Cancellation**: Click/tap can be aborted
  - Down-event doesn't trigger function
  - Or up-event allows aborting
- [ ] **Label in Name**: Accessible name contains visible label text
- [ ] **Target Size**: Touch targets at least 44×44 CSS pixels (AAA: 24×24 minimum)
- [ ] **Concurrent Input**: Works with multiple input modalities (touch, mouse, keyboard, voice)

### 3. Understandable - Information and operation must be understandable

#### 3.1 Readable (WCAG 3.1)
- [ ] **Language**: Page language identified (`lang` attribute)
- [ ] **Language Changes**: Changes in language identified inline

#### 3.2 Predictable (WCAG 3.2)
- [ ] **On Focus**: Focus doesn't trigger unexpected context changes
- [ ] **On Input**: Changing settings doesn't automatically cause context change
- [ ] **Consistent Navigation**: Navigation is consistent across component
- [ ] **Consistent Identification**: Same functionality labeled consistently

#### 3.3 Input Assistance (WCAG 3.3)
- [ ] **Error Identification**: Errors are clearly identified
  - Error messages associated with form fields via `aria-describedby`
  - Invalid fields marked with `aria-invalid="true"`
- [ ] **Labels or Instructions**: Form fields have clear labels
- [ ] **Error Suggestion**: Error messages suggest corrections when possible
- [ ] **Error Prevention**: Important actions allow review/confirmation
- [ ] **Help Available**: Context-sensitive help available when needed

### 4. Robust - Content must work with current and future technologies

#### 4.1 Compatible (WCAG 4.1)
- [ ] **Valid HTML**: Proper nesting, no duplicate IDs
  - Elements have complete start/end tags
  - Elements nested according to spec
  - `id` attributes are unique
- [ ] **Name, Role, Value**: All UI components have proper ARIA
  - Name: Accessible name via label, `aria-label`, or `aria-labelledby`
  - Role: Proper role (implicit or explicit ARIA role)
  - Value: Current value/state exposed (`aria-checked`, `aria-expanded`, `aria-selected`, etc.)
  - State: Dynamic changes announced to screen readers
- [ ] **Status Messages**: Status updates announced via `role="status"`, `role="alert"`, or `aria-live`

### 5. Additional A11y Project Best Practices

#### Component-Specific Patterns
Check against ARIA Authoring Practices Guide (APG) patterns:
- [ ] **Button**: Uses `<button>` or `role="button"` with keyboard support
- [ ] **Link**: Uses `<a>` with `href` or `role="link"`
- [ ] **Modal/Dialog**: Traps focus, `role="dialog"`, `aria-modal="true"`, Escape to close
- [ ] **Dropdown/Menu**: `role="menu"`, arrow key navigation, Escape closes
- [ ] **Tabs**: `role="tablist/tab/tabpanel"`, arrow keys, proper `aria-selected`
- [ ] **Accordion**: `role="button"`, `aria-expanded`, `aria-controls`
- [ ] **Tooltip**: `role="tooltip"`, triggered on focus and hover, Escape closes
- [ ] **Alert**: `role="alert"` or `role="alertdialog"`, announces immediately
- [ ] **Form Controls**: Proper labeling, validation, error handling
- [ ] **Checkbox**: Native `<input type="checkbox">` or proper ARIA pattern
- [ ] **Radio Group**: `role="radiogroup"`, arrow keys for selection
- [ ] **Switch**: `role="switch"`, `aria-checked`, clear on/off states
- [ ] **Slider**: `role="slider"`, `aria-valuemin/max/now`, arrow key support
- [ ] **Combobox**: `role="combobox"`, `aria-expanded`, `aria-controls`

#### Screen Reader Testing
- [ ] **Announcement Quality**: Information announced is clear and complete
- [ ] **Live Regions**: Dynamic content changes announced appropriately
- [ ] **Redundant Information**: Screen reader doesn't hear redundant info
- [ ] **Reading Order**: Content is announced in logical order

#### Mobile Accessibility
- [ ] **Touch Targets**: Minimum 44×44 pixels for touch
- [ ] **Zoom**: Component works at 200% zoom
- [ ] **Orientation**: Works in portrait and landscape
- [ ] **Gestures**: Complex gestures have simpler alternatives

### 6. Ark UI Integration Check
- [ ] **Ark UI Base**: If using Ark UI, verify it's used correctly
  - Ark UI components provide accessible patterns out of the box
  - Custom styling doesn't override accessibility features
  - ARIA attributes from Ark UI are preserved
  - Event handlers complement, not replace, Ark's handlers

## Audit Methodology

1. **Code Review**: Analyze component source code for ARIA attributes, semantic HTML, keyboard handlers
2. **Visual Inspection**: Check focus indicators, color contrast, text sizing
3. **Pattern Matching**: Compare against ARIA APG patterns
4. **Test Coverage**: Identify what automated tests should cover

## Output Format

Provide a comprehensive accessibility report:

### Executive Summary
- **Overall Grade**: A (Excellent) / B (Good) / C (Fair) / D (Poor) / F (Failing)
- **WCAG Level**: AA / A / Fails
- **Critical Issues**: Count of blocking accessibility issues
- **Priority Recommendations**: Top 3-5 improvements needed

### Detailed Findings

#### ✅ Strengths
List what the component does well from an accessibility perspective.

#### 🔴 Critical Issues (Must Fix - WCAG Failures)
List violations of WCAG Level A/AA with:
- **Issue**: Description
- **WCAG Criterion**: e.g., "1.4.3 Contrast (Minimum)"
- **Impact**: Who is affected and how severely
- **Location**: File path and line numbers
- **Fix**: Specific code changes needed

#### 🟡 Important Issues (Should Fix - Best Practices)
List accessibility concerns that don't violate WCAG but reduce usability:
- **Issue**: Description
- **Best Practice**: Which guideline/pattern
- **Impact**: User experience impact
- **Location**: File path and line numbers
- **Recommendation**: How to improve

#### 🔵 Enhancements (Nice to Have - AAA Level)
List ways to exceed basic accessibility requirements.

### WCAG 2.2 Compliance Matrix

| Criterion | Level | Status | Notes |
|-----------|-------|--------|-------|
| 1.1.1 Non-text Content | A | ✅/⚠️/❌ | ... |
| 1.3.1 Info and Relationships | A | ✅/⚠️/❌ | ... |
| 1.4.3 Contrast (Minimum) | AA | ✅/⚠️/❌ | ... |
| 2.1.1 Keyboard | A | ✅/⚠️/❌ | ... |
| 2.4.7 Focus Visible | AA | ✅/⚠️/❌ | ... |
| 4.1.2 Name, Role, Value | A | ✅/⚠️/❌ | ... |

(Include most relevant criteria for the component type)

### Keyboard Navigation Test Results
Provide step-by-step keyboard navigation test:
```
1. Tab to component → ✅ Focus visible
2. Press Enter → ✅ Activates correctly
3. Press Escape → ❌ Doesn't close modal
...
```

### Screen Reader Compatibility
Expected announcements for different states:
- **Initial focus**: "Button, Submit form"
- **Activated**: "Form submitted successfully, alert"
- **Error state**: "Email, invalid, please enter a valid email address, edit text"

### Code Examples

#### ❌ Current Implementation (if issues found)
```tsx
// Show problematic code
```

#### ✅ Recommended Fix
```tsx
// Show corrected code with explanations
```

### Testing Recommendations

Suggest specific tests to add:
- **Unit tests**: ARIA attributes, keyboard handlers
- **Integration tests**: Focus management, announcements
- **Manual testing**: Screen reader testing steps

### Resources

Provide relevant links:
- WCAG 2.2 specific criteria: https://www.w3.org/WAI/WCAG22/quickref/
- ARIA APG pattern: https://www.w3.org/WAI/ARIA/apg/patterns/
- A11y Project checklist: https://www.a11yproject.com/checklist/
- MDN accessibility docs: https://developer.mozilla.org/pt-BR/docs/Web/Accessibility

### Next Steps

Prioritized action items:
1. **Immediate** (Blocking issues): ...
2. **Short-term** (Important improvements): ...
3. **Long-term** (Enhancements): ...

---

Be thorough, educational, and constructive. Explain WHY each issue matters to help the team build accessibility knowledge. Prioritize issues based on user impact.
