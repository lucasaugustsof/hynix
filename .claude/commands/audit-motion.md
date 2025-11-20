---
description: Perform comprehensive animation audit on a component using performance and UX best practices
---

You are an animation and performance expert conducting a comprehensive audit of a React component's animations and transitions.

## Component to Audit

The component to audit is: #$ARGUMENTS

## Animation Audit Framework

Perform a thorough animation review following performance optimization guidelines, UX best practices, and accessibility standards.

### 1. Speed & Duration

#### 1.1 Animation Duration
- [ ] **No animations longer than 1s**: Unless illustrative, animations should be fast
- [ ] **Default duration 200-300ms**: Most animations should fall in this range
- [ ] **Hover transitions 200ms**: Simple hover effects should use 200ms duration
- [ ] **Complex animations 300-500ms**: Multi-step or complex animations can be slightly longer

**Check for:**
```tsx
// ❌ Too slow
transition={{ duration: 1.5 }}
transition-duration: 1200ms

// ✅ Good speed
transition={{ duration: 0.3 }}
transition-duration: 200ms
```

### 2. Easing Functions

#### 2.1 CSS Built-in Easings
- [ ] **Avoid built-in easings**: Only use `ease` or `linear`, avoid `ease-in`, `ease-out`, `ease-in-out` built-ins
- [ ] **Use custom cubic-bezier**: Implement custom easing curves for better control

#### 2.2 Ease-Out (Entering Elements)
**Use for**: Elements entering screen, user-initiated interactions
- [ ] `ease-out-quad`: `cubic-bezier(.25, .46, .45, .94)`
- [ ] `ease-out-cubic`: `cubic-bezier(.215, .61, .355, 1)`
- [ ] `ease-out-quart`: `cubic-bezier(.165, .84, .44, 1)`
- [ ] `ease-out-quint`: `cubic-bezier(.23, 1, .32, 1)`
- [ ] `ease-out-expo`: `cubic-bezier(.19, 1, .22, 1)`
- [ ] `ease-out-circ`: `cubic-bezier(.075, .82, .165, 1)`

#### 2.3 Ease-In-Out (Moving Elements)
**Use for**: Elements moving within screen, repositioning
- [ ] `ease-in-out-quad`: `cubic-bezier(.455, .03, .515, .955)`
- [ ] `ease-in-out-cubic`: `cubic-bezier(.645, .045, .355, 1)`
- [ ] `ease-in-out-quart`: `cubic-bezier(.77, 0, .175, 1)`
- [ ] `ease-in-out-quint`: `cubic-bezier(.86, 0, .07, 1)`
- [ ] `ease-in-out-expo`: `cubic-bezier(1, 0, 0, 1)`
- [ ] `ease-in-out-circ`: `cubic-bezier(.785, .135, .15, .86)`

#### 2.4 Ease-In (Avoid Generally)
**Warning**: Makes UI feel slow, use sparingly
- [ ] Should be avoided in most cases
- [ ] If used, document why it's necessary

**Check for:**
```tsx
// ❌ Built-in easings
transition: all 0.3s ease-in-out;
transition={{ ease: "easeOut" }}

// ✅ Custom cubic-bezier
transition: all 0.3s cubic-bezier(.215, .61, .355, 1);
transition={{ ease: [0.215, 0.61, 0.355, 1] }}
```

### 3. Hover Transitions

#### 3.1 Simple Hover Effects
- [ ] **Use built-in `ease`**: For simple properties (color, background, opacity)
- [ ] **200ms duration**: Standard hover duration
- [ ] **Touch device handling**: Disable on touch devices with media query

**Check for:**
```tsx
// ❌ Missing touch device handling
.button {
  transition: background-color 200ms ease;
}

// ✅ Proper hover handling
@media (hover: hover) and (pointer: fine) {
  .button {
    transition: background-color 200ms ease;
  }
}
```

#### 3.2 Complex Hover Effects
- [ ] **Fall back to easing rules**: Use custom cubic-bezier for complex hovers
- [ ] **Multiple properties**: Ensure all properties transition smoothly

### 4. Accessibility

#### 4.1 Prefers-Reduced-Motion
- [ ] **Transform animations**: Must be disabled with `prefers-reduced-motion`
- [ ] **Instant state changes**: Provide immediate visual feedback
- [ ] **Preserve functionality**: Component still works without animations

**Critical Check:**
```tsx
// ❌ No reduced motion support
.element {
  transform: translateY(0);
  transition: transform 300ms cubic-bezier(.215, .61, .355, 1);
}

// ✅ Reduced motion support
.element {
  transform: translateY(0);
  transition: transform 300ms cubic-bezier(.215, .61, .355, 1);
}

@media (prefers-reduced-motion: reduce) {
  .element {
    transform: none;
    transition: none;
  }
}
```

**For Framer Motion:**
```tsx
// ❌ No reduced motion
<motion.div animate={{ y: 0 }} />

// ✅ Reduced motion support
const shouldReduceMotion = useReducedMotion()
<motion.div
  animate={{ y: shouldReduceMotion ? undefined : 0 }}
  transition={{ duration: shouldReduceMotion ? 0 : 0.3 }}
/>
```

### 5. Origin-Aware Animations

#### 5.1 Transform Origin
- [ ] **Animate from trigger**: Dropdowns/popovers should animate from button
- [ ] **Dynamic transform-origin**: Adjust based on trigger position
- [ ] **Proper anchor points**: Set origin before animation starts

**Check for:**
```tsx
// ❌ Fixed origin
.dropdown {
  transform-origin: top;
  animation: slideDown 300ms;
}

// ✅ Dynamic origin based on position
.dropdown[data-placement="bottom"] {
  transform-origin: top;
}
.dropdown[data-placement="top"] {
  transform-origin: bottom;
}
.dropdown[data-placement="left"] {
  transform-origin: right;
}
.dropdown[data-placement="right"] {
  transform-origin: left;
}
```

### 6. Performance Optimization

#### 6.1 GPU-Accelerated Properties
- [ ] **Use `transform` over position**: Animate with `transform` not `top`/`left`
- [ ] **Use `opacity`**: Hardware accelerated
- [ ] **Avoid layout thrashing**: Don't animate width, height, margin, padding

**Check for:**
```tsx
// ❌ Layout-triggering animations
transition: left 300ms, top 300ms, width 300ms;
animate={{ x: 100, width: 200 }}

// ✅ GPU-accelerated
transition: transform 300ms, opacity 300ms;
animate={{ transform: "translateX(100px)", opacity: 1 }}
```

#### 6.2 Will-Change Property
- [ ] **Use sparingly**: Only for actively animating elements
- [ ] **Limited properties**: Only `transform`, `opacity`, `clip-path`, `filter`
- [ ] **Remove when done**: Don't leave `will-change` on elements permanently

**Check for:**
```tsx
// ❌ Too many properties or permanent
.element {
  will-change: transform, opacity, width, height, color;
}

// ✅ Specific properties, conditionally applied
.element:hover,
.element.is-animating {
  will-change: transform, opacity;
}
```

#### 6.3 Blur Performance
- [ ] **Max 20px blur**: Higher values cause performance issues
- [ ] **Avoid animating blur**: If needed, keep values low

**Check for:**
```tsx
// ❌ High blur values
backdrop-filter: blur(40px);
filter: blur(50px);

// ✅ Performance-friendly blur
backdrop-filter: blur(12px);
filter: blur(8px);
```

#### 6.4 Framer Motion Optimizations
- [ ] **Use `transform` not `x`/`y`**: For hardware acceleration
- [ ] **Avoid CSS variables in animations**: Don't animate drag with CSS vars
- [ ] **Prefer GPU properties**: Stick to transform and opacity

**Check for:**
```tsx
// ❌ Not hardware accelerated
<motion.div animate={{ x: 100, y: 50 }} />
<motion.div style={{ '--x': x }} />

// ✅ Hardware accelerated
<motion.div animate={{ transform: "translate(100px, 50px)" }} />
<motion.div animate={{ x: 100 }} style={{ translateX: x }} />
```

### 7. Spring Animations

#### 7.1 Framer Motion Springs
- [ ] **Default to springs**: Use spring animations by default in Motion
- [ ] **Avoid bouncy springs**: Unless working with drag gestures
- [ ] **Appropriate stiffness**: Tune springs for the interaction

**Check for:**
```tsx
// ❌ Bouncy springs for simple transitions
<motion.div
  animate={{ opacity: 1 }}
  transition={{ type: "spring", bounce: 0.8 }}
/>

// ✅ Appropriate spring config
<motion.div
  animate={{ opacity: 1 }}
  transition={{ type: "spring", stiffness: 300, damping: 30 }}
/>

// ✅ Bouncy for drag gestures only
<motion.div
  drag
  dragElastic={0.2}
  transition={{ type: "spring", bounce: 0.5 }}
/>
```

### 8. Common Anti-Patterns

#### 8.1 Avoid These
- [ ] **Animating layout properties**: width, height, margin, padding, top, left
- [ ] **Transition: all**: Be specific about properties
- [ ] **Too many simultaneous animations**: Max 3-4 properties at once
- [ ] **No easing on important transitions**: Always define easing
- [ ] **Animations blocking interaction**: Don't prevent clicks during animations

**Check for:**
```tsx
// ❌ Anti-patterns
transition: all 1s ease-in-out;
animation: rotate 2s linear infinite;
pointer-events: none; // During animation

// ✅ Best practices
transition: transform 300ms cubic-bezier(.215, .61, .355, 1),
            opacity 300ms cubic-bezier(.215, .61, .355, 1);
```

## Audit Methodology

1. **Code Review**: Search for `transition`, `animation`, `motion.`, `animate`, `variants`
2. **Performance Analysis**: Check for layout-triggering properties
3. **Accessibility Check**: Verify `prefers-reduced-motion` support
4. **Visual Testing**: Test animations feel fast and responsive
5. **Device Testing**: Test on low-end devices and touch screens

## Output Format

Provide a comprehensive animation audit report:

### Executive Summary
- **Overall Grade**: A (Excellent) / B (Good) / C (Fair) / D (Poor) / F (Failing)
- **Performance Impact**: Low / Medium / High
- **Critical Issues**: Count of performance-blocking issues
- **Priority Recommendations**: Top 3-5 improvements needed

### Detailed Findings

#### ✅ Strengths
List what the component does well from an animation perspective.

#### 🔴 Critical Issues (Must Fix - Performance/Accessibility)
List critical animation issues with:
- **Issue**: Description
- **Category**: Performance / Accessibility / UX
- **Impact**: How it affects users
- **Location**: File path and line numbers
- **Fix**: Specific code changes needed

#### 🟡 Important Issues (Should Fix - Best Practices)
List animation concerns that should be addressed:
- **Issue**: Description
- **Best Practice**: Which guideline violated
- **Impact**: User experience impact
- **Location**: File path and line numbers
- **Recommendation**: How to improve

#### 🔵 Enhancements (Nice to Have - Polish)
List ways to improve animations further.

### Animation Compliance Matrix

| Guideline | Status | Notes |
|-----------|--------|-------|
| Duration ≤ 1s | ✅/⚠️/❌ | ... |
| Custom easing curves | ✅/⚠️/❌ | ... |
| Prefers-reduced-motion | ✅/⚠️/❌ | ... |
| GPU-accelerated properties | ✅/⚠️/❌ | ... |
| Transform origin awareness | ✅/⚠️/❌ | ... |
| Touch device handling | ✅/⚠️/❌ | ... |
| Will-change optimization | ✅/⚠️/❌ | ... |
| Spring configuration | ✅/⚠️/❌ | ... |

### Performance Analysis

**Properties Being Animated:**
- ✅ Transform: `translateY`, `scale`
- ❌ Layout: `width`, `height`
- ✅ Paint: `opacity`
- ⚠️ Composite: `filter` (check blur values)

**Optimization Opportunities:**
List specific optimizations that could be applied.

### Code Examples

#### ❌ Current Implementation (if issues found)
```tsx
// Show problematic code with line numbers
```

#### ✅ Recommended Fix
```tsx
// Show corrected code with explanations
```

### Testing Recommendations

Suggest specific tests to add:
- **Performance tests**: Frame rate monitoring, layout thrashing detection
- **Accessibility tests**: Reduced motion preference handling
- **Manual testing**: Test on low-end devices, test with animations disabled

### Animation Inventory

Create a table of all animations found:

| Element | Property | Duration | Easing | Trigger | Issues |
|---------|----------|----------|--------|---------|--------|
| Button | background-color | 200ms | ease | hover | ✅ |
| Modal | transform | 300ms | cubic-bezier(...) | mount | ⚠️ No reduced motion |
| Dropdown | opacity, scale | 250ms | spring | click | ✅ |

### Resources

Provide relevant links:
- Web Animation Performance Guide: https://web.dev/animations/
- Framer Motion Best Practices: https://www.framer.com/motion/
- Prefers-Reduced-Motion: https://web.dev/prefers-reduced-motion/
- CSS Triggers (Layout/Paint/Composite): https://csstriggers.com/
- Animation Principles: https://www.youtube.com/watch?v=1MCXIMQ-ops (Material Design)

### Next Steps

Prioritized action items:
1. **Immediate** (Critical performance/a11y issues): ...
2. **Short-term** (Important UX improvements): ...
3. **Long-term** (Polish and enhancements): ...

---

Be thorough, educational, and constructive. Explain WHY each issue matters for performance and user experience. Prioritize issues based on impact to performance and accessibility.
