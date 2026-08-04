import {
  forwardRef,
  type ButtonHTMLAttributes,
  type ReactNode,
} from 'react'

type ButtonVariant = 'primary' | 'secondary' | 'ghost' | 'danger'
type ButtonSize = 'sm' | 'md' | 'lg'

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  isLoading?: boolean
  fullWidth?: boolean
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    'bg-brand text-white hover:bg-brand-hover focus-visible:ring-brand disabled:bg-brand/50',
  secondary:
    'bg-surface-secondary text-text border border-border hover:bg-border/40 focus-visible:ring-border',
  ghost:
    'bg-transparent text-text hover:bg-surface-secondary focus-visible:ring-border',
  danger:
    'bg-error text-white hover:bg-error/90 focus-visible:ring-error disabled:bg-error/50',
}

const sizeClasses: Record<ButtonSize, string> = {
  sm: 'h-8 px-3 text-sm gap-1.5 rounded-md',
  md: 'h-10 px-4 text-sm gap-2 rounded-lg',
  lg: 'h-12 px-5 text-base gap-2 rounded-lg',
}

export const Button = forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = 'primary',
      size = 'md',
      isLoading = false,
      fullWidth = false,
      leftIcon,
      rightIcon,
      className = '',
      disabled,
      children,
      type = 'button',
      ...props
    },
    ref,
  ) {
    const isDisabled = disabled || isLoading

    return (
      <button
        ref={ref}
        type={type}
        disabled={isDisabled}
        aria-busy={isLoading || undefined}
        className={[
          'inline-flex items-center justify-center font-medium',
          'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-offset-2 focus-visible:ring-offset-background',
          'disabled:cursor-not-allowed disabled:opacity-60',
          variantClasses[variant],
          sizeClasses[size],
          fullWidth ? 'w-full' : '',
          className,
        ]
          .filter(Boolean)
          .join(' ')}
        {...props}
      >
        {isLoading ? (
          <span
            className="size-4 animate-spin rounded-full border-2 border-current border-r-transparent"
            aria-hidden
          />
        ) : (
          leftIcon
        )}
        {children}
        {!isLoading && rightIcon}
      </button>
    )
  },
)
