import { forwardRef, type InputHTMLAttributes } from 'react'

export type TextInputProps = Omit<
  InputHTMLAttributes<HTMLInputElement>,
  'size'
> & {
  label?: string
  hint?: string
  error?: string
  containerClassName?: string
}

export const TextInput = forwardRef<HTMLInputElement, TextInputProps>(
  function TextInput(
    {
      id,
      label,
      hint,
      error,
      className = '',
      containerClassName = '',
      disabled,
      required,
      ...props
    },
    ref,
  ) {
    const inputId = id ?? props.name
    const hintId = hint && inputId ? `${inputId}-hint` : undefined
    const errorId = error && inputId ? `${inputId}-error` : undefined
    const describedBy = [errorId, hintId].filter(Boolean).join(' ') || undefined

    return (
      <div className={['flex w-full flex-col gap-1.5', containerClassName].filter(Boolean).join(' ')}>
        {label ? (
          <label
            htmlFor={inputId}
            className="text-sm font-medium text-text"
          >
            {label}
            {required ? (
              <span className="text-error" aria-hidden>
                {' '}
                *
              </span>
            ) : null}
          </label>
        ) : null}

        <input
          ref={ref}
          id={inputId}
          disabled={disabled}
          required={required}
          aria-invalid={error ? true : undefined}
          aria-describedby={describedBy}
          className={[
            'h-10 w-full rounded-lg border bg-surface px-3 text-sm text-text',
            'placeholder:text-text-muted',
            'focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand focus-visible:ring-offset-2 focus-visible:ring-offset-background',
            'disabled:cursor-not-allowed disabled:opacity-60',
            error ? 'border-error' : 'border-border',
            className,
          ]
            .filter(Boolean)
            .join(' ')}
          {...props}
        />

        {error ? (
          <p id={errorId} role="alert" className="text-xs text-error">
            {error}
          </p>
        ) : hint ? (
          <p id={hintId} className="text-xs text-text-secondary">
            {hint}
          </p>
        ) : null}
      </div>
    )
  },
)
