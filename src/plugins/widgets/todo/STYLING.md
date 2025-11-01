# Todo Widget Styling Guide

## Overview

The Todo widget uses SASS variables for consistent theming and easy customization. All global style values are defined in `_variables.sass`.

## File Structure

```
todo/
├── _variables.sass      # Global SASS variables
├── Todo.sass            # Main widget container styles
├── TodoList.sass        # List container styles
├── TodoItem.sass        # Individual todo item styles
├── Todo.tsx             # Main component
├── TodoList.tsx         # List component
└── TodoItem.tsx         # Item component
```

## Customization

### Colors

To customize the theme colors, edit the following variables in `_variables.sass`:

#### Primary Colors
- `$primary-color` - Main accent color (default: `#ff9500` - Orange)
- `$primary-gradient-start` - FAB gradient start
- `$primary-gradient-end` - FAB gradient end
- `$danger-color` - Delete button color

#### Text Colors
- `$text-primary` - Main text color
- `$text-secondary` - Secondary text color
- `$text-tertiary` - Tertiary text (subtitles)
- `$text-disabled` - Disabled/completed text
- `$text-muted` - Muted text

#### Background Colors
- `$bg-white` - Widget background
- `$bg-hover` - Hover state background
- `$bg-active` - Active/pressed state
- `$bg-focus` - Focus state highlight

### Spacing

Standard spacing scale:
- `$spacing-xs` - 0.25rem (4px)
- `$spacing-sm` - 0.5rem (8px)
- `$spacing-md` - 0.75rem (12px)
- `$spacing-lg` - 1rem (16px)
- `$spacing-xl` - 1.25rem (20px)
- `$spacing-xxl` - 1.5rem (24px)

### Border Radius

- `$radius-sm` - Small radius (4px)
- `$radius-md` - Medium radius (8px)
- `$radius-lg` - Large radius (16px)
- `$radius-full` - Full circle (50%)

### Typography

#### Font Sizes
- `$font-size-xs` - 0.75rem (12px)
- `$font-size-sm` - 0.875rem (14px)
- `$font-size-base` - 1rem (16px)
- `$font-size-lg` - 1.1rem (17.6px)
- `$font-size-xl` - 1.25rem (20px)
- `$font-size-xxl` - 1.5rem (24px)

#### Font Weights
- `$font-weight-normal` - 400
- `$font-weight-medium` - 500
- `$font-weight-semibold` - 600

### Shadows

Pre-defined shadow styles:
- `$shadow-sm` - Small shadow
- `$shadow-md` - Medium shadow (widget container)
- `$shadow-lg` - Large shadow
- `$shadow-fab` - FAB default shadow
- `$shadow-fab-hover` - FAB hover shadow

### Transitions

- `$transition-fast` - 0.2s ease
- `$transition-normal` - 0.3s ease

## Example Customization

### Blue Theme

```sass
// In _variables.sass
$primary-color: #007AFF
$primary-gradient-start: #007AFF
$primary-gradient-end: #0051D5
```

### Dark Mode (Future)

```sass
$text-primary: rgba(255, 255, 255, 0.95)
$text-secondary: rgba(255, 255, 255, 0.7)
$text-tertiary: rgba(255, 255, 255, 0.5)
$bg-white: rgba(30, 30, 30, 0.95)
$bg-hover: rgba(255, 255, 255, 0.05)
$border-color: rgba(255, 255, 255, 0.1)
```

### Compact Layout

```sass
$spacing-lg: 0.75rem
$spacing-xl: 1rem
$font-size-base: 0.875rem
$font-size-xl: 1rem
```

## Component-Specific Styling

### Todo.sass
- Main widget container
- Header with title and action buttons
- Floating Action Button (FAB)

### TodoList.sass
- List container with scrolling
- Custom scrollbar styles

### TodoItem.sass
- Individual todo item layout
- Checkbox, content area, delete button
- Completed item styles
- Hover and focus states

## Best Practices

1. **Always use variables** - Don't hardcode colors or spacing values
2. **Maintain consistency** - Use the spacing scale consistently
3. **Test changes** - Preview changes before committing
4. **Document custom values** - Add comments for non-standard values
5. **Preserve accessibility** - Ensure sufficient color contrast

## Browser Support

The styles use modern CSS features:
- CSS Variables (via SASS)
- Flexbox
- CSS Grid
- Custom scrollbars (webkit only)
- Backdrop filters

For older browser support, consider adding fallbacks.

