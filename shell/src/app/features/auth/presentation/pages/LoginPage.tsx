import { ThemeToggle } from '../../../theme'
import { Button, TextInput } from '../../../../shared'

export function LoginPage() {
  return (
    <section className="relative flex flex-col gap-8 rounded-2xl border border-border bg-surface p-8 shadow-sm">
      <div className="absolute right-4 top-4">
        <ThemeToggle />
      </div>

      <div className="flex flex-col items-center gap-3 text-center">


        <div className="flex flex-col gap-1">
          <h1 className="text-2xl font-semibold text-text">Iniciar sesión</h1>
          <p className="text-sm text-text-secondary">
            Accede a tu Pokédex
          </p>
        </div>
      </div>

      <form
        className="flex flex-col gap-4"
        onSubmit={(event) => {
          event.preventDefault()
        }}
      >
        <TextInput
          name="username"
          label="Usuario"
          type="text"
          autoComplete="username"
          placeholder="Tu usuario"
        />

        <TextInput
          name="password"
          label="Password"
          type="password"
          autoComplete="current-password"
          placeholder="Tu contraseña"
        />

        <Button type="submit" fullWidth>
          Login
        </Button>
      </form>
    </section>
  )
}
