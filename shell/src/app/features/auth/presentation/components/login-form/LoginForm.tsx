import { useState, type FormEvent } from 'react'
import { useNavigate } from 'react-router-dom'

import { Button, TextInput } from '../../../../../shared'
import { ROUTES } from '../../../../../router/routes'
import { loginSchema } from '../../../validation/login.schema'
import { useAuthStore } from '../../stores/auth.store'

export type LoginFormProps = {
  className?: string
}

type FormErrors = {
  username?: string
  password?: string
}

export function LoginForm({ className = '' }: Readonly<LoginFormProps>) {
  const navigate = useNavigate()
  const setSession = useAuthStore((state) => state.setSession)

  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [errors, setErrors] = useState<FormErrors>({})

  const onSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault()

    const parsed = loginSchema.safeParse({ username, password })
    if (!parsed.success) {
      const fieldErrors: FormErrors = {}
      for (const issue of parsed.error.issues) {
        const field = issue.path[0]
        if (field === 'username' || field === 'password') {
          fieldErrors[field] ??= issue.message
        }
      }
      setErrors(fieldErrors)
      return
    }

    setErrors({})

    const normalizedUsername = parsed.data.username.trim()
    setSession(
      {
        id: normalizedUsername,
        email: normalizedUsername,
        name: normalizedUsername,
      },
      `local-${normalizedUsername}`,
    )

    void navigate(ROUTES.HOME, { replace: true })
  }

  return (
    <form
      className={['flex flex-col gap-4', className].filter(Boolean).join(' ')}
      onSubmit={onSubmit}
      noValidate
    >
      <TextInput
        name="username"
        label="Usuario"
        type="text"
        autoComplete="username"
        placeholder="Tu usuario"
        value={username}
        onChange={(event) => setUsername(event.target.value)}
        error={errors.username}
        required
      />

      <TextInput
        name="password"
        label="Password"
        type="password"
        autoComplete="current-password"
        placeholder="Tu contraseña"
        value={password}
        onChange={(event) => setPassword(event.target.value)}
        error={errors.password}
        required
      />

      <Button type="submit" fullWidth>
        Login
      </Button>
    </form>
  )
}
